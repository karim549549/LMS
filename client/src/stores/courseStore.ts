import { create } from 'zustand';
import { z } from 'zod';
import type { CourseEditManageView } from '@/types/course/CourseEditManageView';

// Form state we want to watch
export type CourseInfoWatchedForm = {
  title: string;
  description: string;
  grade: string | null;
  price: number;
  state?: string; // Make state optional
};

// Unwatched values (like thumbnail)
export type CourseThumbnail = File | string | null;
export type CourseStaff = CourseEditManageView['courseAssistants'];
export type SaveStatus = 'idle' | 'saving' | 'saved' | 'error';

// Zod schema for just the watched part
export const courseInfoSchema = z.object({
  title: z.string().min(2).max(100),
  description: z.string().min(2).max(1000),
  grade: z.string().nullable(),
  price: z.number().min(0),
  state: z.enum(['DRAFT', 'PUBLIC', 'READY']),
});

type CourseEditStore = {
  form: CourseInfoWatchedForm;
  saveStatus: SaveStatus;
  lastSaved: CourseInfoWatchedForm | null;

  thumbnail: CourseThumbnail;
  staff: CourseStaff;
  
  setForm: (form: Partial<CourseInfoWatchedForm>) => void;
  setSaveStatus: (status: SaveStatus) => void;
  setLastSaved: (form: CourseInfoWatchedForm | null) => void;
  validate: () => { success: boolean; errors: Record<string, string> };

  setThumbnail: (thumbnail: CourseThumbnail) => void;
  setStaff: (staff: CourseStaff) => void;
  reset: (initial: CourseEditManageView) => void;
};

export const useCourseStore = create<CourseEditStore>((set, get) => ({
  form: {
    title: '',
    description: '',
    grade: '',
    price: 0,
    state: 'DRAFT',
  },
  saveStatus: 'idle',
  lastSaved: null,
  thumbnail: null,
  staff: [],

  setForm: (form) => set((state) => ({ form: { ...state.form, ...form } })),
  setSaveStatus: (status) => set({ saveStatus: status }),
  setLastSaved: (form) => set({ lastSaved: form }),

  validate: () => {
    const result = courseInfoSchema.safeParse(get().form);
    if (result.success) {
      return { success: true, errors: {} };
    }
    const errors: Record<string, string> = {};
    for (const issue of result.error.issues) {
      errors[issue.path[0] as string] = issue.message;
    }
    return { success: false, errors };
  },

  setThumbnail: (thumbnail) => set({ thumbnail }),
  setStaff: (staff) => set({ staff }),

  reset: (initial) => set({
    form: {
      title: initial.title ?? '',
      description: initial.description ?? '',
      grade: initial.grade ?? '',
      price: initial.price ?? 0,
      state: initial.state ?? 'DRAFT',
    },
    saveStatus: 'idle',
    lastSaved: null,
    thumbnail: initial.thumbnail ?? null,
    staff: initial.courseAssistants ?? [],
  }),
}));
