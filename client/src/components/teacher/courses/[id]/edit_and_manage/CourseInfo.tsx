"use client";
import React from "react";
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Pencil, FileText, GraduationCap, DollarSign, Layers } from 'lucide-react';
import { useCourseStore } from '@/stores/courseStore';
import { useUnsavedChangesWarning } from '@/hooks/useUnsavedChangesWarning';
import { useAutoSave } from '@/hooks/useAutoSave';
import { useParams } from 'next/navigation';

const GRADE_OPTIONS = [
  '1st Primary', '2nd Primary', '3rd Primary', '4th Primary', '5th Primary', '6th Primary',
  '1st Prep', '2nd Prep', '3rd Prep',
  '1st Secondary', '2nd Secondary', '3rd Secondary',
];

export default function CourseInfo() {
  const { title, description, grade, price } = useCourseStore(state => state.form);
  const setForm = useCourseStore(state => state.setForm);
  const lastSaved = useCourseStore(state => state.lastSaved);
  const setLastSaved = useCourseStore(state => state.setLastSaved);
  const validate = useCourseStore(state => state.validate);
  const params = useParams();
  const courseId = params?.id as string;

  // Auto-save with debounce and validation
  useAutoSave({
    courseId,
    form: { title, description, grade, price },
    lastSaved,
    setLastSaved,
    validate,
    debounceMs: 800,
  });

  // Unsaved changes warning for navigation
  useUnsavedChangesWarning(
    { title, description, grade, price },
    lastSaved ?? { title: '', description: '', grade: '', price: 0 }
  );

  return (
    <div className="shadow-lg bg-neutral-100 border-2 p-6 mb-6 max-w-7xl">
      <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
        <Layers className="w-5 h-5 text-cyan-700" />
        Course Details
      </h2>
      <form className="mb-4 grid grid-cols-1 gap-4">
        {/* Title */}
        <div className="flex flex-col gap-1 w-full">
          <label className="flex items-center gap-2">
            <Pencil className="w-4 h-4 text-neutral-500 transition-colors group-focus-within:text-primary group-hover:text-primary" />
            Title
          </label>
          <Input
            value={title ?? ''}
            onChange={e => setForm({ title: e.target.value })}
            placeholder="Course title"
            className="w-full border border-neutral-300 bg-white transition-all group-hover:border-primary"
          />
        </div>
        {/* Description */}
        <div className="flex flex-col gap-1 w-full">
          <label className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-neutral-500 transition-colors group-focus-within:text-primary group-hover:text-primary" />
            Description
          </label>
          <Textarea
            value={description ?? ''}
            onChange={e => setForm({ description: e.target.value })}
            placeholder="Course description"
            className="w-full border border-neutral-300 bg-white transition-all group-hover:border-primary"
          />
        </div>
        {/* Grade and Price */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
          {/* Grade */}
          <div className="flex flex-col gap-1 w-full">
            <label className="flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-neutral-500 transition-colors group-focus-within:text-primary group-hover:text-primary" />
              Grade
            </label>
            <Select value={grade ?? ''} onValueChange={v => setForm({ grade: v })}>
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
                value={price ?? 0}
                onChange={e => {
                  const val = e.target.value;
                  setForm({ price: val === '' ? 0 : Number(val) });
                }}
                placeholder="Course price"
                className="w-full pl-8 pr-14 border border-neutral-300 bg-white transition-all group-hover:border-primary"
              />
              <span className="absolute right-3 text-xs text-neutral-500 font-semibold pointer-events-none">EGP</span>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
} 