import { NextRequest, NextResponse } from 'next/server';

import prisma from '@/lib/prisma';

export const POST = async (request: NextRequest, context: any) => {
  try {
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
