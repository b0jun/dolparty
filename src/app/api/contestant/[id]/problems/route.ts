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
      select: { id: true, name: true },
    });

    return NextResponse.json(
      {
        problems: problems || [],
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
