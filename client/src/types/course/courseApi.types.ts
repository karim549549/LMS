export type TeacherCoursesQueryFilter = {
  title?: string;
  state?: 'DRAFT' | 'PUBLIC' | 'READY';
  grade?: string;
  limit?: number;
  skip?: number;
  orderBy?: 'newest' | 'oldest' | 'alphabetic' | 'highest_enrollments' | 'lowest_price' | 'highest_price';
};

export type TeacherCourseCard = {
  id: string;
  title: string;
  description: string;
  grade: string | null;
  thumbnail: string | null;
  price: number;
  state: 'DRAFT' | 'PUBLIC' | 'READY';
  totalDuration: number;
  totalLessons: number;
  totalEnrollments: number;
  createdAt: string;
  updatedAt: string;
  publishAt: string | null;
  creatorId: string;
};

export type PaginationMeta = {
  currentPage: number;
  itemPerPage: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
};

export type PaginatedResult<T> = {
  data: T[];
  meta: PaginationMeta;
}; 