import { StudentCourseView } from './StudentCourseView';
export interface TeacherCourseView extends Omit<StudentCourseView, 'assignments' | 'quizzes' | 'lessons'> {
  enrolledStudents: Array<{
    id: string;
    name: string;
    email: string;
    progress: number;
  }>;
  analytics: {
    completionPercent: number;
    engagement: number;
    // add more analytics as needed
  };
  lessons: Array<{
    id: string;
    title: string;
    order: number;
    description?: string;
    videoUrl?: string;
    resources?: Array<{ id: string; name: string; type: string; url?: string }>;
    completed?: boolean;
    // add more lesson details as needed
  }>;
  assignments: Array<{
    id: string;
    title: string;
    dueDate: string;
    status: 'pending' | 'submitted' | 'graded' | 'late';
    maxScore?: number;
    submissions?: number;
    // add more assignment details as needed
  }>;
  quizzes: Array<{
    id: string;
    title: string;
    status: 'not_started' | 'in_progress' | 'completed';
    questionsCount?: number;
    attempts?: number;
    deadline?: string;
    // add more quiz details as needed
  }>;
  settings: {
    timelineEnabled: boolean;
    allowEnrollment: boolean;
    maxStudents?: number;
    // add more settings as needed
  };
  assistants: Array<{
    id: string;
    name: string;
    email: string;
    permissions: string[];
  }>;
  revenue?: number;
}

export const teacherCourseViewSelect = {
  id: true,
  title: true,
  description: true,
  grade: true,
  thumbnail: true,
  price: true,
  visibility: true,
  timelineEnabled: true,
  allowEnrollment: true,
  maxStudents: true,
  lessons: {
    select: {
      id: true,
      title: true,
      order: true,
      description: true,
      videoUrl: true,
      resources: { select: { id: true, name: true, type: true, url: true } },
    },
  },
  assignments: {
    select: {
      id: true,
      title: true,
      deadline: true,
      maxScore: true,
      submissions: true,
    },
  },
  quizzes: {
    select: {
      id: true,
      title: true,
      questions: { select: { id: true } },
      attempts: true,
      // deadline: true, // Uncomment if you add deadline to Quiz model
    },
  },
  enrollments: {
    select: {
      student: { select: { id: true, name: true, email: true } },
      progress: true,
    },
  },
  creator: { select: { id: true, name: true, email: true } },
  courseAssistants: {
    select: {
      assistant: { select: { id: true, name: true, email: true } },
      permissions: true,
    },
  },
  // Add more as needed
}; 