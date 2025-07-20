import { IsString, IsOptional } from 'class-validator';

export class RegisterAssistantDto {
  @IsString()
  token: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  password: string;

  @IsOptional()
  avatar?: any;
} 