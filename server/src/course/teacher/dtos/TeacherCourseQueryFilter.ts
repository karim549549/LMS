import { COURSE_STATE } from "@prisma/client"
import { IsOptional, IsString, IsEnum, IsInt, Min, Max } from 'class-validator';

export class TeacherCoursesQueryFilter {
    // Search by title (partial match)
    @IsOptional()
    @IsString()
    title?: string;

    // Filter by course state (DRAFT, PUBLIC, READY)
    @IsOptional()
    @IsEnum(COURSE_STATE)
    state?: COURSE_STATE;

    // Filter by grade (e.g., "3rd Secondary")
    @IsOptional()
    @IsString()
    grade?: string;

    // Pagination
    @IsOptional()
    @IsInt()
    @Min(1)
    limit?: number;

    @IsOptional()
    @IsInt()
    @Min(0)
    skip?: number;

    // Sorting options
    @IsOptional()
    @IsString()
    orderBy?: 'newest' | 'oldest' | 'alphabetic' | 'highest_enrollments' | 'lowest_price' | 'highest_price';
}