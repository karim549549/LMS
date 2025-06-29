// Course Creation APIs
// Base URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

// ============================================================================
// COURSE MANAGEMENT APIs
// ============================================================================

/**
 * Create a new course
 * POST /api/courses
 */
export const createCourse = async (courseData: FormData) => {
  const response = await fetch('/api/courses', {
    method: 'POST',
    body: courseData, // FormData for file uploads
  })
  return response.json()
}

/**
 * Update course
 * PUT /api/courses/:id
 */
export const updateCourse = async (courseId: string, courseData: FormData) => {
  const response = await fetch(`/api/courses/${courseId}`, {
    method: 'PUT',
    body: courseData,
  })
  return response.json()
}

/**
 * Get course by ID
 * GET /api/courses/:id
 */
export const getCourse = async (courseId: string) => {
  const response = await fetch(`/api/courses/${courseId}`)
  return response.json()
}

/**
 * Get teacher's courses
 * GET /api/teacher/courses
 */
export const getTeacherCourses = async () => {
  const response = await fetch('/api/teacher/courses')
  return response.json()
}

/**
 * Delete course
 * DELETE /api/courses/:id
 */
export const deleteCourse = async (courseId: string) => {
  const response = await fetch(`/api/courses/${courseId}`, {
    method: 'DELETE',
  })
  return response.json()
}

// ============================================================================
// FILE UPLOAD APIs
// ============================================================================

/**
 * Upload course thumbnail
 * POST /api/upload/thumbnail
 */
export const uploadThumbnail = async (file: File) => {
  const formData = new FormData()
  formData.append('thumbnail', file)
  
  const response = await fetch('/api/upload/thumbnail', {
    method: 'POST',
    body: formData,
  })
  return response.json()
}

/**
 * Upload lesson video
 * POST /api/upload/video
 */
export const uploadVideo = async (file: File, lessonId: string) => {
  const formData = new FormData()
  formData.append('video', file)
  formData.append('lessonId', lessonId)
  
  const response = await fetch('/api/upload/video', {
    method: 'POST',
    body: formData,
  })
  return response.json()
}

/**
 * Upload lesson resources
 * POST /api/upload/resources
 */
export const uploadResources = async (files: File[], lessonId: string) => {
  const formData = new FormData()
  files.forEach(file => formData.append('resources', file))
  formData.append('lessonId', lessonId)
  
  const response = await fetch('/api/upload/resources', {
    method: 'POST',
    body: formData,
  })
  return response.json()
}

/**
 * Upload assignment PDF template
 * POST /api/upload/assignment-template
 */
export const uploadAssignmentTemplate = async (file: File, assignmentId: string) => {
  const formData = new FormData()
  formData.append('template', file)
  formData.append('assignmentId', assignmentId)
  
  const response = await fetch('/api/upload/assignment-template', {
    method: 'POST',
    body: formData,
  })
  return response.json()
}

/**
 * Upload quiz file (for file-based quiz creation)
 * POST /api/upload/quiz-file
 */
export const uploadQuizFile = async (file: File) => {
  const formData = new FormData()
  formData.append('quizFile', file)
  
  const response = await fetch('/api/upload/quiz-file', {
    method: 'POST',
    body: formData,
  })
  return response.json()
}

// ============================================================================
// AI INTEGRATION APIs
// ============================================================================

/**
 * Generate quiz questions from content
 * POST /api/ai/generate-quiz
 */
export const generateQuizQuestions = async (params: {
  content: string
  questionCount: number
  difficulty: 'easy' | 'medium' | 'hard'
  questionTypes: ('mcq' | 'true_false' | 'short_answer')[]
}) => {
  const response = await fetch('/api/ai/generate-quiz', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  })
  return response.json()
}

/**
 * Extract questions from uploaded file
 * POST /api/ai/extract-questions
 */
export const extractQuestionsFromFile = async (fileId: string) => {
  const response = await fetch('/api/ai/extract-questions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ fileId }),
  })
  return response.json()
}

/**
 * Process video and generate transcript
 * POST /api/ai/process-video
 */
export const processVideo = async (videoId: string) => {
  const response = await fetch('/api/ai/process-video', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ videoId }),
  })
  return response.json()
}

/**
 * Split video into segments
 * POST /api/ai/split-video
 */
export const splitVideo = async (videoId: string, segments: number) => {
  const response = await fetch('/api/ai/split-video', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ videoId, segments }),
  })
  return response.json()
}

// ============================================================================
// TIMELINE MANAGEMENT APIs
// ============================================================================

/**
 * Create course timeline
 * POST /api/courses/:id/timeline
 */
export const createTimeline = async (courseId: string, timelineData: Record<string, unknown>) => {
  const response = await fetch(`/api/courses/${courseId}/timeline`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(timelineData),
  })
  return response.json()
}

/**
 * Update timeline item
 * PUT /api/courses/:id/timeline/:itemId
 */
export const updateTimelineItem = async (courseId: string, itemId: string, updates: Record<string, unknown>) => {
  const response = await fetch(`/api/courses/${courseId}/timeline/${itemId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updates),
  })
  return response.json()
}

/**
 * Delete timeline item
 * DELETE /api/courses/:id/timeline/:itemId
 */
export const deleteTimelineItem = async (courseId: string, itemId: string) => {
  const response = await fetch(`/api/courses/${courseId}/timeline/${itemId}`, {
    method: 'DELETE',
  })
  return response.json()
}

// ============================================================================
// CO-TEACHER MANAGEMENT APIs
// ============================================================================

/**
 * Create co-teacher invite link
 * POST /api/courses/:id/invite
 */
export const createCoTeacherInvite = async (courseId: string) => {
  const response = await fetch(`/api/courses/${courseId}/invite`, {
    method: 'POST',
  })
  return response.json()
}

/**
 * Get course invite links
 * GET /api/courses/:id/invites
 */
export const getCourseInvites = async (courseId: string) => {
  const response = await fetch(`/api/courses/${courseId}/invites`)
  return response.json()
}

/**
 * Revoke invite link
 * DELETE /api/courses/:id/invite/:inviteId
 */
export const revokeInvite = async (courseId: string, inviteId: string) => {
  const response = await fetch(`/api/courses/${courseId}/invite/${inviteId}`, {
    method: 'DELETE',
  })
  return response.json()
}

/**
 * Accept co-teacher invite
 * POST /api/invite/:inviteId/accept
 */
export const acceptCoTeacherInvite = async (inviteId: string) => {
  const response = await fetch(`/api/invite/${inviteId}/accept`, {
    method: 'POST',
  })
  return response.json()
}

// ============================================================================
// CATEGORY & UTILITY APIs
// ============================================================================

/**
 * Get course categories
 * GET /api/categories
 */
export const getCategories = async () => {
  const response = await fetch('/api/categories')
  return response.json()
}

/**
 * Get upload progress
 * GET /api/upload/progress/:uploadId
 */
export const getUploadProgress = async (uploadId: string) => {
  const response = await fetch(`/api/upload/progress/${uploadId}`)
  return response.json()
}

/**
 * Validate YouTube URL
 * POST /api/validate/youtube
 */
export const validateYouTubeUrl = async (url: string) => {
  const response = await fetch('/api/validate/youtube', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ url }),
  })
  return response.json()
}

// ============================================================================
// ERROR HANDLING UTILITY
// ============================================================================

export const handleApiError = (error: unknown) => {
  console.error('API Error:', error)
  return {
    success: false,
    error: error instanceof Error ? error.message : 'An unexpected error occurred',
  }
}

// ============================================================================
// API RESPONSE TYPES
// ============================================================================

export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface UploadResponse {
  success: boolean
  fileId: string
  url: string
  filename: string
  size: number
  type: string
}

export interface CourseResponse {
  success: boolean
  course: {
    id: string
    title: string
    description: string
    category: string
    thumbnail?: string
    price: number
    visibility: 'public' | 'private' | 'unlisted'
    lessons: unknown[]
    quizzes: unknown[]
    assignments: unknown[]
    coTeachers: string[]
    timelineEnabled: boolean
    createdAt: string
    updatedAt: string
  }
} 