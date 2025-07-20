import { COURSE_STATE } from "@prisma/client"
import { IsOptional, IsString, MinLength, IsNumber, IsEnum, IsDefined } from 'class-validator';

export class UpdateCourseInfoDto {
  @IsOptional()
  @IsString()
  @MinLength(2)
  title?: string;

  @IsOptional()
  @IsString()
  @MinLength(2)
  description?: string;

  @IsOptional()
  @IsString()
  grade?: string;

  @IsOptional()
  @IsNumber()
  price?: number;

  @IsOptional()
  @IsEnum(COURSE_STATE)
  state?: COURSE_STATE;
}