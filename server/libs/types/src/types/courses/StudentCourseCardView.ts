export interface StudentCourseCardView {
  id: string;
  title: string;
  thumbnail?: string;
  grade: string;
  price: number;
  isEnrolled: boolean;
  progress?: number;
  teacherName: string;
}

export const studentCourseCardSelect = {
  id: true,
  title: true,
  thumbnail: true,
  grade: true,
  price: true,
  creator: { select: { name: true } },
  enrollments: true, // For isEnrolled and progress
}; 