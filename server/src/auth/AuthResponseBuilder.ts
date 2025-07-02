import { Response } from 'express';
import { User } from '@prisma/client';

export function buildAuthResponse(res: Response, accessToken: string, refreshToken: string, user: any) {
  // Set access token cookie (short-lived)
  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 1000 * 60 * 15, // 15 minutes
    path: '/',
  });
  // Set refresh token cookie (longer-lived)
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    path: '/',
  });
  // Return only the user object
  return { user };
} 