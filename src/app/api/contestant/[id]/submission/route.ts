import { NextRequest, NextResponse } from 'next/server';

import { CustomError } from '@/lib/CustomError';
import { verifyJwt } from '@/lib/jwt';
import prisma from '@/lib/prisma';

export const POST = async (request: NextRequest, context: any) => {
  try {
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      const error = new CustomError('잘못된 인증 코드입니다.');
      error.code = 401;
      throw error;
    }

    const token = authHeader.split(' ')[1];

    const decoded = verifyJwt(token);
    if (!decoded) {
      const error = new CustomError('auth error');
      error.code = 401;
      throw error;
    }
    const { id: contestantId } = context.params;
    const { body } = await request.json();
    const { problemId, zoneAttempts, topAttempts, zoneReached, topReached } = body;

    const submission = await prisma.submission.upsert({
      where: {
        contestantId_problemId: {
          contestantId,
          problemId,
        },
      },
      update: {
        ZoneAttempts: zoneAttempts,
        TopAttempts: topAttempts,
        ZoneReached: zoneReached,
        TopReached: topReached,
      },
      create: {
        contestantId,
        problemId,
        ZoneAttempts: zoneAttempts,
        TopAttempts: topAttempts,
        ZoneReached: zoneReached,
        TopReached: topReached,
      },
    });

    return NextResponse.json(
      {
        submission,
      },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};
