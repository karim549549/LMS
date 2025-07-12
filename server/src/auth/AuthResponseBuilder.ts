import { Response } from 'express';
import { User } from '@prisma/client';
import { ACCESS_TOKEN_COOKIE, REFRESH_TOKEN_COOKIE } from '../../libs/types/src/cookie';

export function buildAuthResponse(res: Response, accessToken: string, refreshToken: string, user: any) {
  // Set access token cookie (short-lived)
  res.cookie(ACCESS_TOKEN_COOKIE, accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 1000 * 60 * 15, // 15 minutes
    path: '/',
  });
  // Set refresh token cookie (longer-lived)
  res.cookie(REFRESH_TOKEN_COOKIE, refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    path: '/',
  });
  // Return only the user object
  return { user };
} 