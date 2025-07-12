"use client";
import React, { useEffect, useRef } from "react";
import type { CourseEditManageView } from '@/types/course/CourseEditManageView';
import CourseStaffTable from './CourseStaffTable';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Pencil, FileText, GraduationCap, DollarSign, Layers } from 'lucide-react';
import { useCourseStore } from '@/stores/courseStore';
import CourseThumbnail from './CourseThumbnail';

const GRADE_OPTIONS = [
  '1st Primary', '2nd Primary', '3rd Primary', '4th Primary', '5th Primary', '6th Primary',
  '1st Prep', '2nd Prep', '3rd Prep',
  '1st Secondary', '2nd Secondary', '3rd Secondary',
];

interface InlineStaffSectionProps {
  course: CourseEditManageView;
}

export default function InlineStaffSection({ course }: InlineStaffSectionProps) {
  const {
    form,
    saveStatus,
    lastSaved,
    setForm,
    setSaveStatus,
    setLastSaved,
    reset,
  } = useCourseStore();

  // On mount or when course changes, initialize the store
  useEffect(() => {
    if (course) reset(course);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [course?.id]);

  // Debounced auto-save
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  useEffect(() => {
    if (JSON.stringify(form) === JSON.stringify(lastSaved)) return;
    setSaveStatus('idle');
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      setSaveStatus('saving');
      // TODO: Call your save API here
      // await saveCourse(form.getValues());
      setLastSaved(form);
      setSaveStatus('saved');
    }, 800);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [form, lastSaved, setLastSaved, setSaveStatus]);

  // Warn on unsaved changes
  useEffect(() => {
    const handler = (e: BeforeUnloadEvent) => {
      if (JSON.stringify(form) !== JSON.stringify(lastSaved)) {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', handler);
    return () => window.removeEventListener('beforeunload', handler);
  }, [form, lastSaved]);

  return (
    <div className="  shadow-lg bg-neutral-100 border-2 p-6 mb-6 max-w-7xl">
        <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
            <Layers className="w-5 h-5 text-cyan-700" />
            Course Details
        </h2>
        <form className="mb-4 grid grid-cols-1 gap-4">
            {/* Title full width */}
            <div className="flex flex-col gap-1 w-full">
              <label className="flex items-center gap-2">
                <Pencil className="w-4 h-4 text-neutral-500 transition-colors group-focus-within:text-primary group-hover:text-primary" />
                Title
              </label>
              <Input
                value={form.title ?? ''}
                onChange={e => setForm({ title: e.target.value })}
                placeholder="Course title"
                className="w-full border border-neutral-300 bg-white transition-all group-hover:border-primary"
              />
            </div>
            {/* Description full width */}
            <div className="flex flex-col gap-1 w-full">
              <label className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-neutral-500 transition-colors group-focus-within:text-primary group-hover:text-primary" />
                Description
              </label>
              <Textarea
                value={form.description ?? ''}
                onChange={e => setForm({ description: e.target.value })}
                placeholder="Course description"
                className="w-full border border-neutral-300 bg-white transition-all group-hover:border-primary"
              />
            </div>
            {/* Grade, Price in a row on md+ */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
              {/* Grade */}
              <div className="flex flex-col gap-1 w-full">
                <label className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-neutral-500 transition-colors group-focus-within:text-primary group-hover:text-primary" />
                  Grade
                </label>
                <Select value={form.grade ?? ''} onValueChange={v => setForm({ grade: v })}>
                  <SelectTrigger className="w-full border border-neutral-300 bg-white transition-all group-hover:border-primary">
                    <SelectValue placeholder="Select grade" />
                  </SelectTrigger>
                  <SelectContent>
                    {GRADE_OPTIONS.map(g => (
                      <SelectItem key={g} value={g}>{g}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {/* Price */}
              <div className="flex flex-col gap-1 w-full">
                <label className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-neutral-500 transition-colors group-focus-within:text-primary group-hover:text-primary" />
                  Price (EGP)
                </label>
                <div className="relative flex items-center w-full">
                  <Input
                    type="number"
                    value={form.price ?? 0}
                    onChange={e => {
                      // Always store as number
                      const val = e.target.value;
                      setForm({ price: val === '' ? 0 : Number(val) });
                    }}
                    placeholder="Course price"
                    className="w-full pl-8 pr-14 border border-neutral-300 bg-white transition-all group-hover:border-primary"
                  />
                  <span className="absolute right-3 text-xs text-neutral-500 font-semibold pointer-events-none">EGP</span>
                </div>
              </div>
              {/* (State field removed) */}
            </div>
            {/* Thumbnail upload and preview - moved to end */}
            <div className="col-span-1 flex flex-col md:flex-row gap-4 items-start mt-2">
            <CourseThumbnail />
            {/* Thumbnail notes/info */}
            <div className="flex-1 flex flex-col justify-center md:pl-2 mt-4 md:mt-0">
                <div className="flex items-start gap-2  bg-gradient-to-br  from-yellow-500/15 to-yellow-500/5 text-yellow-800  border border-yellow-500 rounded-md p-3 text-xs">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M12 20a8 8 0 100-16 8 8 0 000 16z" /></svg>
                <div>
                    <div><b>Recommended:</b> 16:9 aspect ratio (e.g. 1280x720px) for best results.</div>
                    <div>This thumbnail will be <b>publicly visible</b> to students and may appear on course listings and search results.</div>
                    <div>Use a clear, high-quality image that represents your course.</div>
                </div>
                </div>
            </div>
            </div>
        </form>
        <div className="text-xs mt-2">
            {saveStatus === 'saving' && <span className="text-blue-500">Saving...</span>}
            {saveStatus === 'saved' && <span className="text-green-600">Saved</span>}
            {saveStatus === 'error' && <span className="text-red-500">Error saving</span>}
        </div>
        <h2 className="text-lg font-semibold mb-2 mt-6">Staff (Assistants)</h2>
        <CourseStaffTable  />
    </div>
  );
}