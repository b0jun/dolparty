import { NextRequest, NextResponse } from 'next/server';

import prisma from '@/lib/prisma';

const GET = async (request: NextRequest, context: any) => {
  try {
    const { id } = context.params;

    // 해당 contestant의 difficulty 확인
    const selectedDifficulty = await prisma.contestant.findUnique({
      where: {
        id,
      },
      select: {
        difficulty: true,
      },
    });

    if (!selectedDifficulty) {
      return NextResponse.json(
        { errorMessage: 'no user' },
        {
          status: 400,
        },
      );
    }

    // 문제 리스트 및 해당 contestant의 submissions 가져오기
    const problems = await prisma.problem.findMany({
      where: {
        difficulties: {
          has: selectedDifficulty.difficulty,
        },
      },
      select: {
        id: true,
        name: true,
        submissions: {
          where: {
            contestantId: id, // 해당 contestant의 submission만 가져오기
          },
          select: {
            TopReached: true,
            ZoneReached: true,
            TopAttempts: true,
            ZoneAttempts: true,
          },
        },
      },
    });

    const problemsWithResults = problems.map(problem => {
      const submission =
        problem.submissions.length > 0
          ? problem.submissions[0] // 해당 contestant의 submission
          : {
              TopReached: false,
              ZoneReached: false,
              TopAttempts: 0,
              ZoneAttempts: 0,
            };

      return {
        id: problem.id,
        name: problem.name,
        submission: {
          topReached: submission.TopReached,
          zoneReached: submission.ZoneReached,
          topAttempts: submission.TopAttempts,
          zoneAttempts: submission.ZoneAttempts,
        },
      };
    });

    return NextResponse.json(
      {
        problems: problemsWithResults,
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
