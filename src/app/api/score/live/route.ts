import { Difficulty, Gender } from '@prisma/client';
import { NextResponse } from 'next/server';

import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

async function getAllRankedContestants(difficultyQuery?: string) {
  const difficulties: Difficulty[] = ['D1', 'D2', 'D3', 'D4'];
  const genders: Gender[] = ['Men', 'Women'];

  // 쿼리스트링에 특정 난이도가 있으면 해당 난이도만 처리
  const filteredDifficulties = difficultyQuery
    ? difficulties.filter(difficulty => difficulty === difficultyQuery)
    : difficulties;

  // 문제 리스트 한번에 가져오기
  const problems = await prisma.problem.findMany({
    select: {
      id: true,
      name: true,
      difficulties: true,
    },
  });

  // 문제 리스트를 난이도별로 맵에 저장
  const problemMap = problems.reduce(
    (acc, problem) => {
      filteredDifficulties.forEach(difficulty => {
        if (problem.difficulties.includes(difficulty)) {
          if (!acc[difficulty]) acc[difficulty] = [];
          acc[difficulty].push({ id: problem.id, name: problem.name });
        }
      });
      return acc;
    },
    {} as Record<string, { id: number; name: string }[]>,
  );

  // 모든 참가자에 대해 동시에 처리
  const promises = filteredDifficulties.flatMap(difficulty =>
    genders.map(async gender => {
      // 참가자 리스트 및 submissions 가져오기
      const contestants = await prisma.contestant.findMany({
        where: { difficulty, gender },
        select: {
          id: true,
          number: true,
          name: true,
          submissions: {
            select: {
              problemId: true,
              TopReached: true,
              ZoneReached: true,
              TopAttempts: true,
              ZoneAttempts: true,
            },
          },
        },
      });

      if (contestants.length === 0) return null;

      // 참가자별 성적 계산 및 정렬
      const scoreList = contestants
        .map(contestant => {
          let totalTops = 0;
          let totalZones = 0;
          let totalTopAttempts = 0;
          let totalZoneAttempts = 0;

          // 문제별 성적 초기화
          const problemResults = (problemMap[difficulty] || []).map(problem => {
            const submission = contestant.submissions.find(sub => sub.problemId === problem.id);

            return {
              name: problem.name,
              topAttempts: submission?.TopAttempts ?? 0,
              topReached: submission?.TopReached ?? false,
              zoneAttempts: submission?.ZoneAttempts ?? 0,
              zoneReached: submission?.ZoneReached ?? false,
            };
          });

          // 전체 성적 계산
          contestant.submissions.forEach(sub => {
            totalTops += sub.TopReached ? 1 : 0;
            totalZones += sub.ZoneReached ? 1 : 0;
            totalTopAttempts += sub.TopAttempts ?? 0;
            totalZoneAttempts += sub.ZoneAttempts ?? 0;
          });

          return {
            id: contestant.id,
            number: contestant.number,
            name: contestant.name,
            totalTops,
            totalZones,
            totalTopAttempts,
            totalZoneAttempts,
            problems: problemResults,
            hasSubmission: contestant.submissions.length > 0,
          };
        })
        .sort((a, b) => {
          if (a.hasSubmission && !b.hasSubmission) return -1;
          if (!a.hasSubmission && b.hasSubmission) return 1;

          if (b.totalTops !== a.totalTops) return b.totalTops - a.totalTops;
          if (b.totalZones !== a.totalZones) return b.totalZones - a.totalZones;
          if (a.totalTopAttempts !== b.totalTopAttempts) return a.totalTopAttempts - b.totalTopAttempts;
          return a.totalZoneAttempts - b.totalZoneAttempts;
        });

      // 공동 순위 처리
      const finalScoreList = [];
      let currentRank = 1;

      for (let i = 0; i < scoreList.length; i += 1) {
        const currentContestant = scoreList[i];
        const previousContestant = scoreList[i - 1];

        // `id` 속성을 제외하고 확장하는 방식
        const { id, ...contestantData } = currentContestant;

        if (!currentContestant.hasSubmission) {
          finalScoreList.push({
            id,
            rank: '-',
            ...contestantData,
          });
        } else if (
          i > 0 &&
          currentContestant.totalTops === previousContestant?.totalTops &&
          currentContestant.totalZones === previousContestant?.totalZones &&
          currentContestant.totalTopAttempts === previousContestant?.totalTopAttempts &&
          currentContestant.totalZoneAttempts === previousContestant?.totalZoneAttempts
        ) {
          finalScoreList.push({
            id,
            rank: currentRank,
            ...contestantData,
          });
        } else {
          currentRank = i + 1;
          finalScoreList.push({
            id,
            rank: currentRank,
            ...contestantData,
          });
        }
      }

      return {
        difficulty,
        gender,
        problems: (problemMap[difficulty] || []).map(problem => problem.name),
        scoreList: finalScoreList,
      };
    }),
  );

  const result = (await Promise.all(promises)).filter(Boolean);

  return result;
}

const GET = async (request: Request) => {
  try {
    const url = new URL(request.url);
    const difficultyQuery = url.searchParams.get('difficulty'); // 쿼리스트링에서 'difficulty' 값 추출

    // difficultyQuery가 없는 경우 404 응답
    if (!difficultyQuery) {
      return NextResponse.json({ message: 'Difficulty query parameter is required' }, { status: 404 });
    }

    // 유효한 난이도 값인지 체크
    const validDifficulties: Difficulty[] = ['D1', 'D2', 'D3', 'D4'];
    if (!validDifficulties.includes(difficultyQuery as Difficulty)) {
      return NextResponse.json(
        { message: 'Invalid difficulty parameter' },
        { status: 400 }, // 400 Bad Request
      );
    }

    const rankedContestants = await getAllRankedContestants(difficultyQuery);
    return NextResponse.json(
      {
        groupedContestants: rankedContestants || [],
      },
      {
        status: 200,
      },
    );
  } catch (e: any) {
    return NextResponse.json({ message: e.message }, { status: e.code });
  }
};

export { GET };
