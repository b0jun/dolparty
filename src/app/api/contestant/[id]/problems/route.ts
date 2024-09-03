import { NextRequest, NextResponse } from 'next/server';

import prisma from '@/lib/prisma';

const GET = async (request: NextRequest, context: any) => {
  try {
    const { id } = context.params;

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
    // ex) selectedDifficulty :{ difficulty: 'D1' }

    const problems = await prisma.problem.findMany({
      where: {
        difficulties: {
          has: selectedDifficulty?.difficulty,
        },
      },
      select: {
        id: true,
        name: true,
        submissions: {
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
          ? problem.submissions[0]
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
