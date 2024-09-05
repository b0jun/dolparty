import { NextRequest, NextResponse } from 'next/server';

import prisma from '@/lib/prisma';

const GET = async (request: NextRequest, context: any) => {
  try {
    const { id } = context.params;

    // contestant가 존재하는지 및 해당 difficulty를 한번에 가져옴
    const contestant = await prisma.contestant.findUnique({
      where: { id },
      select: { difficulty: true },
    });

    if (!contestant) {
      return NextResponse.json({ message: 'Contestant not found' }, { status: 404 });
    }

    // contestant의 difficulty에 맞는 문제와 해당 contestant의 submissions 가져오기
    const problems = await prisma.problem.findMany({
      where: {
        difficulties: {
          has: contestant.difficulty, // difficulty에 맞는 문제 가져오기
        },
      },
      select: {
        id: true,
        name: true,
        submissions: {
          where: { contestantId: id }, // 해당 contestant의 submission만 가져오기
          select: {
            TopReached: true,
            ZoneReached: true,
            TopAttempts: true,
            ZoneAttempts: true,
          },
        },
      },
    });

    // 문제별로 contestant의 submission 데이터를 정리
    const problemsWithResults = problems.map(problem => {
      const submission = problem.submissions[0] || {
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

    return NextResponse.json({ problems: problemsWithResults }, { status: 200 });
  } catch (error) {
    console.error('Error fetching contestant data:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
};

export { GET };
