import { User } from '@prisma/client';

export type UserLoginView = Pick<
  User,
  | 'email'
  | 'role'
  | 'hashPassword'
  | 'name'
  | 'id'
  | 'isEmailVerified'
  | 'isPhoneVerified'
  | 'isParentPhoneVerified'
>;

export type UserProfileView = Pick<
  User,
  | 'id'
  | 'email'
  | 'role'
  | 'isEmailVerified'
  | 'isPhoneVerified'
  | 'isParentPhoneVerified'
  | 'grade'
>;

export interface StudentQueryFilter {
  email?: string;
  name?: string;
  grade?: string;
  isEmailVerified?: boolean;
  isPhoneVerified?: boolean;
  isParentPhoneVerified?: boolean;
}

export enum ROLE {
  TEACHER = "TEACHER",
  USER = "USER",
  ADMIN = "ADMIN",
  ASSISTANT = "ASSISTANT",
}