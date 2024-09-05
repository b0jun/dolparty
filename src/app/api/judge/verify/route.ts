import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';

import { CustomError } from '@/lib/CustomError';
import { verifyJwt } from '@/lib/jwt';

const POST = async (request: NextRequest) => {
  try {
    const { body } = await request.json();
    const { acToken } = body;
    if (!acToken) {
      const error = new CustomError('no token');
      error.code = 401;
      throw error;
    }

    const decoded = verifyJwt(acToken);
    if (decoded) {
      return NextResponse.json(
        { message: '인증 완료' },
        {
          status: 201,
        },
      );
    }
    const error = new CustomError('인증 오류가 발생했습니다.');
    error.code = 401;
    throw error;
  } catch (e: any) {
    return NextResponse.json({ message: e.message }, { status: e.code });
  }
};

export { POST };
