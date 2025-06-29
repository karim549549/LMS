import { z } from 'zod'

// File upload schema
export const FileUploadSchema = z.object({
  id: z.string(),
  name: z.string(),
  size: z.number(),
  type: z.string(),
  url: z.string().optional(), // For uploaded files
  progress: z.number().min(0).max(100).optional(),
  status: z.enum(['pending', 'uploading', 'completed', 'error']).optional(),
  error: z.string().optional()
})

// Video content schema - either file upload or YouTube link
export const VideoContentSchema = z.object({
  type: z.enum(['file', 'youtube']),
  file: FileUploadSchema.optional(), // For uploaded video files
  youtubeUrl: z.string().optional(), // For YouTube links (remove .url() validation for now)
  duration: z.number().optional(), // Duration in seconds
  thumbnail: z.string().optional()
})

// Resource schema - can be file upload or URL reference
export const ResourceSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Resource name is required'),
  type: z.enum(['file', 'url']),
  file: FileUploadSchema.optional(), // For uploaded files
  url: z.string().url('Must be a valid URL').optional(), // For URL references
  description: z.string().optional()
})

// Question schema
export const QuestionSchema = z.object({
  id: z.string(),
  text: z.string().min(1, 'Question text is required'),
  type: z.enum(['mcq', 'true_false', 'short_answer']),
  options: z.array(z.string()).optional(),
  correctAnswer: z.string().min(1, 'Correct answer is required')
})

// Lesson schema
export const LessonSchema = z.object({
  id: z.string(),
  title: z.string().min(1, 'Lesson title is required'),
  video: VideoContentSchema.optional(),
  resources: z.array(ResourceSchema),
  order: z.number()
})

// Quiz schema
export const QuizSchema = z.object({
  id: z.string(),
  title: z.string().min(1, 'Quiz title is required'),
  type: z.enum(['auto', 'manual']),
  questions: z.array(QuestionSchema),
  timeLimit: z.number().optional(),
  attempts: z.number().min(1, 'At least 1 attempt required'),
  autoCorrect: z.boolean().optional()
})

// Assignment schema
export const AssignmentSchema = z.object({
  id: z.string(),
  title: z.string().min(1, 'Assignment title is required'),
  description: z.string().min(1, 'Assignment description is required'),
  deadline: z.date(),
  allowLateSubmission: z.boolean(),
  maxScore: z.number().min(1, 'Max score must be at least 1'),
  attachments: z.array(ResourceSchema),
  requiresPDFSubmission: z.boolean().optional(),
  pdfTemplate: z.instanceof(File).optional()
})

// Step 1: Course Info schema
export const CourseInfoSchema = z.object({
  title: z.string().min(3, 'Course title must be at least 3 characters'),
  description: z.string().min(10, 'Course description must be at least 10 characters'),
  category: z.string().min(1, 'Category is required'),
  thumbnail: z.instanceof(File).optional()
})

// Step 2: Lessons schema
export const LessonsSchema = z.object({
  lessons: z.array(LessonSchema).min(1, 'At least one lesson is required')
})

// Step 3: Quizzes schema
export const QuizzesSchema = z.object({
  quizzes: z.array(QuizSchema),
  questionBank: z.string().optional()
})

// Step 4: Assignments schema
export const AssignmentsSchema = z.object({
  assignments: z.array(AssignmentSchema)
})

// Step 5: Settings schema
export const CourseSettingsSchema = z.object({
  visibility: z.enum(['public', 'private', 'unlisted']),
  price: z.number().min(0, 'Price cannot be negative'),
  coTeachers: z.array(z.string()).optional(),
  timelineEnabled: z.boolean().optional()
})

// Complete course schema
export const CourseSchema = z.object({
  // Step 1
  title: z.string().min(3, 'Course title must be at least 3 characters'),
  description: z.string().min(10, 'Course description must be at least 10 characters'),
  category: z.string().min(1, 'Category is required'),
  thumbnail: z.instanceof(File).optional(),
  
  // Step 2
  lessons: z.array(LessonSchema).min(1, 'At least one lesson is required'),
  
  // Step 3
  quizzes: z.array(QuizSchema),
  questionBank: z.string().optional(),
  
  // Step 4
  assignments: z.array(AssignmentSchema),
  
  // Step 5
  visibility: z.enum(['public', 'private', 'unlisted']),
  price: z.number().min(0, 'Price cannot be negative'),
  coTeachers: z.array(z.string()).optional(),
  timelineEnabled: z.boolean().optional()
})

// Export types
export type FileUpload = z.infer<typeof FileUploadSchema>
export type VideoContent = z.infer<typeof VideoContentSchema>
export type Resource = z.infer<typeof ResourceSchema>
export type Question = z.infer<typeof QuestionSchema>
export type Lesson = z.infer<typeof LessonSchema>
export type Quiz = z.infer<typeof QuizSchema>
export type Assignment = z.infer<typeof AssignmentSchema>
export type CourseInfo = z.infer<typeof CourseInfoSchema>
export type Lessons = z.infer<typeof LessonsSchema>
export type Quizzes = z.infer<typeof QuizzesSchema>
export type Assignments = z.infer<typeof AssignmentsSchema>
export type CourseSettings = z.infer<typeof CourseSettingsSchema>
export type Course = z.infer<typeof CourseSchema>

// Step validation schemas
export const StepValidationSchemas = {
  1: CourseInfoSchema,
  2: LessonsSchema,
  3: QuizzesSchema,
  4: AssignmentsSchema,
  5: CourseSettingsSchema
} as const

export type StepValidationSchema = typeof StepValidationSchemas 