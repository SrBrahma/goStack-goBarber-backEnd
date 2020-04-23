import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { jwt } from '../config/auth';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const authHeader = req.headers.authorization;

  if (!authHeader) throw new Error('JWT token is missing');

  const token = authHeader.split(' ')[1];

  try {
    const decoded = verify(token, jwt.secret) as TokenPayload;

    const { sub } = decoded;

    req.user = {
      id: sub,
    };

    return next();
  } catch {
    throw new Error('Invalid JWT token');
  }
}
