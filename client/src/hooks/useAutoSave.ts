import { useEffect } from 'react';
import { useDebounce } from './useDebounce';
import { courseApis } from '@/services/apis/courseApi';
import type { CourseInfoWatchedForm } from '@/stores/courseStore';

export function useAutoSave({
  courseId,
  form,
  lastSaved,
  setLastSaved,
  validate,
  debounceMs = 800,
  onError,
}: {
  courseId: string;
  form: CourseInfoWatchedForm;
  lastSaved: CourseInfoWatchedForm | null;
  setLastSaved: (form: CourseInfoWatchedForm) => void;
  validate: () => { success: boolean; errors: Record<string, string> };
  debounceMs?: number;
  onError?: (error: string) => void;
}) {
  const debouncedForm = useDebounce(form, debounceMs);

  useEffect(() => {
    if (JSON.stringify(debouncedForm) !== JSON.stringify(lastSaved)) {
      const { success } = validate();
      if (success) {
        courseApis.updateCourseInfo(courseId, debouncedForm)
          .then(({ data, error }) => {
            if (data) {
              setLastSaved(debouncedForm);
            } else if (error && onError) {
              onError(error);
            }
          });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedForm, lastSaved, courseId]);
} 