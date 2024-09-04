import { Difficulty, Gender } from '@prisma/client';
import { NextResponse } from 'next/server';

import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';
// https://www.prisma.io/docs/orm/more/help-and-troubleshooting/help-articles/nextjs-prisma-client-dynamic

async function getAllRankedContestants() {
  const difficulties: Difficulty[] = ['D1', 'D2', 'D3', 'D4'];
  const genders: Gender[] = ['Men', 'Women'];

  const promises = [];

  for (const difficulty of difficulties) {
    for (const gender of genders) {
      promises.push(
        (async () => {
          // 문제 리스트 가져오기
          const problems = await prisma.problem.findMany({
            where: {
              difficulties: {
                has: difficulty,
              },
            },
            select: {
              id: true,
              name: true,
            },
          });

          // 참가자 리스트 및 submissions 가져오기
          const contestants = await prisma.contestant.findMany({
            where: {
              difficulty,
              gender,
            },
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

          if (contestants.length === 0) {
            return null;
          }

          // 참가자별 성적 계산 및 정렬
          const scoreList = contestants
            .map(contestant => {
              let totalTops = 0;
              let totalZones = 0;
              let totalTopAttempts = 0;
              let totalZoneAttempts = 0;

              // 문제별 성적 초기화
              const problemResults = problems.map(problem => {
                // 해당 문제에 대한 submission이 있는지 확인
                const submission = contestant.submissions.find(sub => sub.problemId === problem.id);

                return {
                  name: problem.name,
                  topAttempts: submission?.TopAttempts ?? 0,
                  topReached: submission?.TopReached ?? false,
                  zoneAttempts: submission?.ZoneAttempts ?? 0,
                  zoneReached: submission?.ZoneReached ?? false,
                };
              });

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
                problems: problemResults, // 문제별 성적을 포함
                hasSubmission: contestant.submissions.length > 0, // Submission이 있는지 여부를 체크
              };
            })
            // 우선 Submission이 있는 참가자들을 위로 정렬, 그 다음 성적에 따라 정렬
            .sort((a, b) => {
              if (a.hasSubmission && !b.hasSubmission) return -1;
              if (!a.hasSubmission && b.hasSubmission) return 1;

              const totalTopsA = a.totalTops;
              const totalTopsB = b.totalTops;
              const totalZonesA = a.totalZones;
              const totalZonesB = b.totalZones;
              const totalTopAttemptsA = a.totalTopAttempts;
              const totalTopAttemptsB = b.totalTopAttempts;
              const totalZoneAttemptsA = a.totalZoneAttempts;
              const totalZoneAttemptsB = b.totalZoneAttempts;

              if (totalTopsB !== totalTopsA) return totalTopsB - totalTopsA;
              if (totalZonesB !== totalZonesA) return totalZonesB - totalZonesA;
              if (totalTopAttemptsA !== totalTopAttemptsB) return totalTopAttemptsA - totalTopAttemptsB;
              return totalZoneAttemptsA - totalZoneAttemptsB;
            });

          // 공동 순위 처리
          const finalScoreList = [];
          let currentRank = 1;

          for (let i = 0; i < scoreList.length; i += 1) {
            const currentContestant = scoreList[i];
            const previousContestant = scoreList[i - 1];

            // Submission이 없는 경우 rank를 '-'로 설정
            if (!currentContestant.hasSubmission) {
              finalScoreList.push({
                id: currentContestant.id,
                rank: '-',
                number: currentContestant.number,
                name: currentContestant.name,
                totalTops: currentContestant.totalTops,
                totalZones: currentContestant.totalZones,
                totalTopAttempts: currentContestant.totalTopAttempts,
                totalZoneAttempts: currentContestant.totalZoneAttempts,
                problems: currentContestant.problems, // 문제별 성적을 포함
              });
            } else if (
              i > 0 &&
              currentContestant.totalTops === previousContestant.totalTops &&
              currentContestant.totalZones === previousContestant.totalZones &&
              currentContestant.totalTopAttempts === previousContestant.totalTopAttempts &&
              currentContestant.totalZoneAttempts === previousContestant.totalZoneAttempts
            ) {
              // 이전 참가자와 점수 및 시도 횟수가 같다면 동일한 순위 부여
              finalScoreList.push({
                id: currentContestant.id,
                rank: currentRank,
                number: currentContestant.number,
                name: currentContestant.name,
                totalTops: currentContestant.totalTops,
                totalZones: currentContestant.totalZones,
                totalTopAttempts: currentContestant.totalTopAttempts,
                totalZoneAttempts: currentContestant.totalZoneAttempts,
                problems: currentContestant.problems, // 문제별 성적을 포함
              });
            } else {
              // 순위 증가 및 새로운 순위 부여
              currentRank = i + 1;
              finalScoreList.push({
                id: currentContestant.id,
                rank: currentRank,
                number: currentContestant.number,
                name: currentContestant.name,
                totalTops: currentContestant.totalTops,
                totalZones: currentContestant.totalZones,
                totalTopAttempts: currentContestant.totalTopAttempts,
                totalZoneAttempts: currentContestant.totalZoneAttempts,
                problems: currentContestant.problems, // 문제별 성적을 포함
              });
            }
          }

          return {
            difficulty,
            gender,
            problems: problems.map(problem => problem.name),
            scoreList: finalScoreList,
          };
        })(),
      );
    }
  }

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
