export interface StudentCourseView {
    id: string;
    title: string;
    description: string;
    grade: string;
    thumbnail?: string;
    isEnrolled: boolean;
    progress?: number; // percent
    teacherName: string;
    lessons: Array<{
      id: string;
      title: string;
      order: number;
      completed?: boolean;
    }>;
    assignments: Array<{
      id: string;
      title: string;
      dueDate: string;
      status: 'pending' | 'submitted' | 'graded' | 'late';
    }>;
    quizzes: Array<{
      id: string;
      title: string;
      status: 'not_started' | 'in_progress' | 'completed';
      deadline?: string;
    }>;
    price: number;
    visibility: 'public' | 'private' | 'unlisted';
  }
export const studentCourseViewSelect = {
  id: true,
  title: true,
  description: true,
  grade: true,
  thumbnail: true,
  price: true,
  visibility: true,
  creator: { select: { name: true } },
  lessons: {
    select: {
      id: true,
      title: true,
      order: true,
      progress: true,
    },
  },
  assignments: {
    select: {
      id: true,
      title: true,
      deadline: true,
      submissions: true,
    },
  },
  quizzes: {
    select: {
      id: true,
      title: true,
      attempts: true,
      // deadline: true, // Uncomment if you add deadline to Quiz model
    },
  },
  enrollments: true,
};