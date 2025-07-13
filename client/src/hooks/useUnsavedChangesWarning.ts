import { useEffect, useMemo } from 'react';
import type { CourseInfoWatchedForm } from '@/stores/courseStore';

export const useUnsavedChangesWarning = (
  form: Partial<CourseInfoWatchedForm>,
  lastSaved: Partial<CourseInfoWatchedForm> | null
) => {
  // Compute if there are unsaved changes
  const hasUnsavedChanges = useMemo(
    () => JSON.stringify(form) !== JSON.stringify(lastSaved),
    [form, lastSaved]
  );

  useEffect(() => {
    const handler = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', handler);
    return () => window.removeEventListener('beforeunload', handler);
  }, [hasUnsavedChanges]);
}; 