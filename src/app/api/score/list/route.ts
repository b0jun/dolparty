import { Difficulty, Gender } from '@prisma/client';
import { NextResponse } from 'next/server';

import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';
// https://www.prisma.io/docs/orm/more/help-and-troubleshooting/help-articles/nextjs-prisma-client-dynamic

async function getAllRankedContestants() {
  const difficulties: Difficulty[] = ['D1', 'D2', 'D3', 'D4'];
  const genders: Gender[] = ['Men', 'Women'];

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
      difficulties.forEach(difficulty => {
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
  const promises = difficulties.flatMap(difficulty =>
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

const GET = async () => {
  try {
    const rankedContestants = await getAllRankedContestants();
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
