import { create } from 'zustand';
import type { CourseEditManageView } from '@/types/course/CourseEditManageView';
import { z } from 'zod';

export type CourseEditForm = {
  title: string;
  description: string;
  grade: string | null;
  price: number;
  state: 'DRAFT' | 'PUBLIC' | 'READY';
  thumbnail: File | string | null;
};

export type CourseStaff = CourseEditManageView['courseAssistants'];

export type CourseEditState = {
  form: CourseEditForm;
  thumbnailPreview: string | null;
  uploadProgress: number;
  saveStatus: 'idle' | 'saving' | 'saved' | 'error';
  lastSaved: CourseEditForm | null;
  staff: CourseStaff;
  // Actions
  setForm: (form: Partial<CourseEditForm>) => void;
  setThumbnailPreview: (preview: string | null) => void;
  setUploadProgress: (progress: number) => void;
  setSaveStatus: (status: 'idle' | 'saving' | 'saved' | 'error') => void;
  setLastSaved: (form: CourseEditForm | null) => void;
  setStaff: (staff: CourseStaff) => void;
  reset: (initial: CourseEditManageView) => void;
};

export type CourseEditValidation = {
  success: boolean;
  errors: Record<string, string>;
};

// Add zod schema for validation
export const courseEditSchema = z.object({
  title: z.string().min(2).max(100),
  description: z.string().min(2).max(1000),
  grade: z.string().nullable(),
  price: z.number().min(0),
  state: z.enum(['DRAFT', 'PUBLIC', 'READY']),
  thumbnail: z.any().optional(), // file or string
});

export const useCourseStore = create<CourseEditState & { validateForm: () => CourseEditValidation }>((set, get) => ({
  form: {
    title: '',
    description: '',
    grade: '',
    price: 0,
    state: 'DRAFT',
    thumbnail: null,
  },
  thumbnailPreview: null,
  uploadProgress: 0,
  saveStatus: 'idle',
  lastSaved: null,
  staff: [],
  setForm: (form) => set((state) => ({ form: { ...state.form, ...form } })),
  setThumbnailPreview: (preview) => set({ thumbnailPreview: preview }),
  setUploadProgress: (progress) => set({ uploadProgress: progress }),
  setSaveStatus: (status) => set({ saveStatus: status }),
  setLastSaved: (form) => set({ lastSaved: form }),
  setStaff: (staff) => set({ staff }),
  reset: (initial) => set({
    form: {
      title: initial.title ?? '',
      description: initial.description ?? '',
      grade: initial.grade ?? '',
      price: initial.price ?? 0,
      state: initial.state ?? 'DRAFT',
      thumbnail: initial.thumbnail ?? null,
    },
    thumbnailPreview: initial.thumbnail ?? null,
    uploadProgress: 0,
    saveStatus: 'idle',
    lastSaved: null,
    staff: initial.courseAssistants ?? [],
  }),
  validateForm: () => {
    const result = courseEditSchema.safeParse(get().form);
    if (result.success) {
      return { success: true, errors: {} };
    } else {
      const errors: Record<string, string> = {};
      for (const issue of result.error.issues) {
        errors[issue.path[0] as string] = issue.message;
      }
      return { success: false, errors };
    }
  },
})); 