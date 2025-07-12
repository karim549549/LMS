import { Type } from 'class-transformer';
import { IsOptional, ValidateNested } from 'class-validator';
// Placeholder DTOs - define these in their respective files
// import { LessonDto } from './LessonDto';
// import { AssignmentDto } from './AssignmentDto';
// import { QuizDto } from './QuizDto';
// import { AnnouncementDto } from './AnnouncementDto';

export class CreateCourseDto {
    @IsOptional()
    title?: string;

    @IsOptional()
    description?: string;

    @IsOptional()
    grade?: string;

    @IsOptional()
    price?: number;

    @IsOptional()
    state?: string; // Use COURSE_STATE enum in service/validation

    // Accept file upload for thumbnail (handled in controller)
    @IsOptional()
    thumbnail?: any; // Will be handled as file in controller (e.g., Express.Multer.File)

    // Nested updates for related entities
    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => LessonDto)
    lessons?: LessonDto[];

    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => AssignmentDto)
    assignments?: AssignmentDto[];

    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => QuizDto)
    quizzes?: QuizDto[];

    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => AnnouncementDto)
    announcements?: AnnouncementDto[];
}

// Placeholder DTOs for nested relations. Replace with real DTOs as needed.
// All fields are optional for draft/partial updates. Decouple into separate files later.

export class LessonDto {
    id?: string;
    title?: string;
    description?: string;
    order?: number;
    duration?: number;
    videoType?: string; // Use VIDEO_TYPE enum in service/validation
    videoUrl?: string;
    videoFile?: string;
    resources?: ResourceDto[];
}

export class ResourceDto {
    id?: string;
    name?: string;
    type?: string; // Use RESOURCE_TYPE enum in service/validation
    url?: string;
    fileUrl?: string;
    description?: string;
    size?: number;
}

export class AssignmentDto {
    id?: string;
    title?: string;
    description?: string;
    deadline?: Date | string;
    maxScore?: number;
    allowLateSubmission?: boolean;
    requiresPDFSubmission?: boolean;
    pdfTemplate?: string;
    attachments?: AssignmentAttachmentDto[];
}

export class AssignmentAttachmentDto {
    id?: string;
    name?: string;
    type?: string; // Use RESOURCE_TYPE enum
    url?: string;
    size?: number;
}

export class QuizDto {
    id?: string;
    title?: string;
    description?: string;
    type?: string; // Use QUIZ_TYPE enum
    timeLimit?: number;
    maxAttempts?: number;
    autoCorrect?: boolean;
    isActive?: boolean;
    questions?: QuestionDto[];
}

export class QuestionDto {
    id?: string;
    text?: string;
    type?: string; // Use QUESTION_TYPE enum
    options?: string[];
    correctAnswer?: string;
    points?: number;
    order?: number;
}

export class AnnouncementDto {
    id?: string;
    title?: string;
    content?: string;
    priority?: string; // Use PRIORITY enum
}