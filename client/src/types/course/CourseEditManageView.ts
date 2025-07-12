export type CourseAssistantView = {
  id: string;
  assignedAt: string;
  permissions: string[];
  assistant: {
    id: string;
    name: string;
    email: string;
    avatar?: string | null;
    phone?: string | null;
    role: string;
    grade?: string | null;
  };
};

export type CourseEditManageView = {
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
  deletedAt: string | null;
  creatorId: string;
  courseAssistants: CourseAssistantView[];
}; 