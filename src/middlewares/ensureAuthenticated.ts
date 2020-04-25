import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { jwt } from '../config/auth';
import { AppError } from '../errors/AppError';

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

  if (!authHeader) throw new AppError('JWT token is missing', 401);

  const token = authHeader.split(' ')[1];

  try {
    const decoded = verify(token, jwt.secret) as TokenPayload;

    const { sub } = decoded;

    req.user = {
      id: sub,
    };

    return next();
  } catch {
    throw new AppError('Invalid JWT token', 401);
  }
}
