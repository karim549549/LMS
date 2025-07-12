export type User = {
  email: string;
  id: string;
  role: string;
  isProfileCompleted: boolean;
  name:string
};

export type AuthApiResponse = {
  data: { user: User } | null;
  error: string | null;
}; 

export type CreateUserDto = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};


export enum ROLE  {
  TEACHER = "TEACHER",
  USER = "USER",
  ASSISTANT = "ASSISTANT",
  ADMIN = "ADMIN"
}