export interface TeacherCourseCardView {
  id: string;
  title: string;
  thumbnail?: string;
  grade: string;
  price: number;
  enrolledCount: number;
  visibility: 'PUBLIC' | 'PRIVATE' | 'UNLISTED';
}

export const teacherCourseCardSelect = {
  id: true,
  title: true,
  thumbnail: true,
  grade: true,
  price: true,
  enrollments: { select: { id: true } }, // For enrolledCount
  visibility: true,
  timelineEnabled: true,
  allowEnrollment: true,
  maxStudents: true,
}; 