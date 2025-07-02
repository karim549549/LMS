import { ROLE } from "@prisma/client";

export interface TokenPayload {
  sub: string; // user id
  email: string;
  role :ROLE;
  type: string;
  iat?: number;
  exp?: number;
} 