import { create } from "zustand";
import {
  CourseInfo,
  Lesson,
  Quiz,
  Assignment,
  CourseSettings,
} from "@/validation/course";

interface CourseStoreState {
  // Step data
  courseInfo: Partial<CourseInfo>;
  lessons: Lesson[];
  quizzes: Quiz[];
  assignments: Assignment[];
  settings: Partial<CourseSettings>;

  // Actions
  setCourseInfo: (info: Partial<CourseInfo>) => void;
  setLessons: (lessons: Lesson[]) => void;
  setQuizzes: (quizzes: Quiz[]) => void;
  setAssignments: (assignments: Assignment[]) => void;
  setSettings: (settings: Partial<CourseSettings>) => void;

  // Reset all
  reset: () => void;
}

export const useCourseStore = create<CourseStoreState>((set) => ({
  courseInfo: {},
  lessons: [],
  quizzes: [],
  assignments: [],
  settings: {},

  setCourseInfo: (info) => set({ courseInfo: info }),
  setLessons: (lessons) => set({ lessons }),
  setQuizzes: (quizzes) => set({ quizzes }),
  setAssignments: (assignments) => set({ assignments }),
  setSettings: (settings) => set({ settings }),

  reset: () =>
    set({
      courseInfo: {},
      lessons: [],
      quizzes: [],
      assignments: [],
      settings: {},
    }),
}));
