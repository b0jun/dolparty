import jwt, { JwtPayload } from 'jsonwebtoken';

import { CustomError } from './CustomError';

interface SignOption {
  expiresIn?: string | number;
}

const DEFAULT_SIGN_OPTION: SignOption = {
  expiresIn: '15h',
};
const SECRET_KEY = process.env.JWT_SECRET;

export function signJwtAccessToken(payload: JwtPayload, options: SignOption = DEFAULT_SIGN_OPTION) {
  const token = jwt.sign(payload, SECRET_KEY!, options);
  return token;
}

export function verifyJwt(token: string) {
  try {
    const decoded = jwt.verify(token, SECRET_KEY!);
    return decoded as JwtPayload;
  } catch (e: any) {
    const error = new CustomError(e.name);
    error.code = 401;
    throw error;
  }
}
