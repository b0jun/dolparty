import { Difficulty } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

import prisma from '@/lib/prisma';

const GET = async (request: NextRequest) => {
  try {
    const { searchParams } = request.nextUrl;
    const difficulty = searchParams.get('difficulty') as Difficulty | null;
    console.log(difficulty);
    const contestantListData = await prisma.contestant.findMany({
      select: {
        number: true,
        name: true,
        difficulty: true,
        gender: true,
      },
      where: difficulty && Object.values(Difficulty).includes(difficulty) ? { difficulty } : undefined,
      orderBy: {
        number: 'asc',
      },
    });

    return NextResponse.json(
      {
        contestantList: contestantListData || [],
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
