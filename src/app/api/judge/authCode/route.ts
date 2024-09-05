import { NextRequest, NextResponse } from 'next/server';

import { CustomError } from '@/lib/CustomError';
import { signJwtAccessToken } from '@/lib/jwt';

const JUDGE_AUTH_CODE = process.env.AUTH_CODE;

const POST = async (request: NextRequest) => {
  try {
    const { body } = await request.json();
    const { authCode } = body;
    if (!authCode) {
      throw Error('no auth code');
    }

    if (authCode === JUDGE_AUTH_CODE) {
      const token = signJwtAccessToken({
        sub: 'judge',
        role: 'judge',
        iat: Math.floor(Date.now() / 1000), // 발급 시간
      });
      return NextResponse.json(
        {
          accessToken: token,
        },
        {
          status: 201,
        },
      );
    }

    const error = new CustomError('잘못된 인증 코드입니다.');
    error.code = 401;
    throw error;
  } catch (e: any) {
    return NextResponse.json({ message: e.message }, { status: e.code });
  }
};

export { POST };
