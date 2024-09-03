import { NextRequest, NextResponse } from 'next/server';

import prisma from '@/lib/prisma';

const GET = async (request: NextRequest, context: any) => {
  try {
    const { id } = context.params;

    const contestantInfo = await prisma.contestant.findFirst({
      where: {
        id,
      },
      select: {
        number: true,
        name: true,
        gender: true,
        difficulty: true,
      },
    });
    if (!contestantInfo) {
      return NextResponse.json(
        { errorMessage: 'no contestant' },
        {
          status: 400,
        },
      );
    }

    return NextResponse.json(
      {
        number: contestantInfo.number,
        difficulty: contestantInfo.difficulty,
        name: contestantInfo.name,
        gender: contestantInfo.gender,
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
