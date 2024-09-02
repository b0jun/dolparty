import { NextRequest, NextResponse } from 'next/server';

import prisma from '@/lib/prisma';

const POST = async (request: NextRequest) => {
  try {
    const { body } = await request.json();
    const { number } = body;
    if (!number) {
      throw Error('no search text');
    }
    const contestantId = await prisma.contestant.findUnique({
      select: {
        id: true,
      },
      where: {
        number,
      },
    });
    if (!contestantId) {
      return NextResponse.json(
        { message: '해당 번호의 선수를 찾을 수 없습니다.' },
        {
          status: 400,
        },
      );
    }
    return NextResponse.json(
      {
        contestantId: contestantId.id,
      },
      {
        status: 200,
      },
    );
  } catch (e: any) {
    return NextResponse.json({ message: e.message }, { status: e.code });
  }
};

export { POST };
