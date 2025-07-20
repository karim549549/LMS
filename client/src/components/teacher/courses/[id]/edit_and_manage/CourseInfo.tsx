"use client";
import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Pencil, FileText, GraduationCap, DollarSign, Layers, Save, CheckCircle } from 'lucide-react';
import { useParams } from 'next/navigation';
import { courseApis } from '@/services/apis/courseApi';
import { toast } from 'sonner';
import { courseInfoSchema, type CourseInfoFormData } from '@/validation/courseValidation';
import { GRADE_OPTIONS, type GradeOption } from '@/lib/constants/gradeOptions';

interface CourseInfoProps {
  title: string;
  description: string;
  grade: string;
  price: number;
}

export default function CourseInfo({ title, description, grade, price }: CourseInfoProps) {
  const params = useParams();
  const courseId = params?.id as string;
  const [isSaving, setIsSaving] = React.useState(false);
  const [lastSavedData, setLastSavedData] = React.useState<CourseInfoFormData | null>(null);
  const [saveStatus, setSaveStatus] = React.useState<'idle' | 'saving' | 'saved' | 'error'>('idle');

  const methods = useForm<CourseInfoFormData>({
    resolver: zodResolver(courseInfoSchema),
    defaultValues: {
      title: title || '',
      description: description || '',
      grade: grade || '',
      price: price || 0,
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    setValue,
    getValues,
    reset,
  } = methods;

  // Check if form has unsaved changes - only when needed
  const hasUnsavedChanges = React.useMemo(() => {
    if (!isDirty) return false;
    const currentData = getValues();
    return JSON.stringify(currentData) !== JSON.stringify(lastSavedData);
  }, [isDirty, lastSavedData, getValues]);

  const onSubmit = async (data: CourseInfoFormData) => {
    if (isSaving) return;    
    setIsSaving(true);
    setSaveStatus('saving');
    
    const { error } = await courseApis.updateCourseInfo(courseId, data);
    if (error) {
      setSaveStatus('error');
      toast.error('Failed to save course info. Please try again.');
    } else {
      setSaveStatus('saved');
      setLastSavedData(data);
      toast.success('Course info saved successfully!');
      reset(data, { keepDirty: false });
      setTimeout(() => setSaveStatus('idle'), 3000);
    }
    
    setIsSaving(false);
  };

  const handleFormSubmit = handleSubmit(onSubmit, (errors) => {
    // Show toast for validation errors
    const errorMessages = Object.values(errors).map(error => error?.message).filter(Boolean);
    if (errorMessages.length > 0) {
      toast.error(errorMessages[0] || 'Please fix the form errors.');
    }
  });

  const getSaveButtonContent = () => {
    switch (saveStatus) {
      case 'saving':
        return (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            Saving...
          </>
        );
      case 'saved':
        return (
          <>
            <CheckCircle className="w-4 h-4" />
            Saved!
          </>
        );
      case 'error':
        return (
          <>
            <Save className="w-4 h-4" />
            Retry Save
          </>
        );
      default:
        return (
          <>
            <Save className="w-4 h-4" />
            Save Changes
          </>
        );
    }
  };

  return (
    <div className="shadow-lg bg-neutral-100 border-2 p-6 mb-6 max-w-7xl">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <Layers className="w-5 h-5 text-cyan-700" />
          Course Details
        </h2>
        <Button
          type="submit"
          onClick={handleFormSubmit}
          disabled={!hasUnsavedChanges || isSaving}
          className={`flex items-center gap-2 transition-all ${
            saveStatus === 'saved' ? 'bg-green-600 hover:bg-green-700' :
            saveStatus === 'error' ? 'bg-red-600 hover:bg-red-700' :
            'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {getSaveButtonContent()}
        </Button>
      </div>
      
      <FormProvider {...methods}>
        <form onSubmit={handleFormSubmit} className="space-y-4">
          {/* Title */}
          <div className="flex flex-col gap-1 w-full">
            <label className="flex items-center gap-2">
              <Pencil className="w-4 h-4 text-neutral-500" />
              Title
            </label>
            <Input
              {...register("title")}
              placeholder="Course title"
              disabled={isSaving}
              className="w-full border border-neutral-300 bg-white transition-all group-hover:border-primary disabled:opacity-50 disabled:cursor-not-allowed"
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title.message}</p>
            )}
          </div>

          {/* Description */}
          <div className="flex flex-col gap-1 w-full">
            <label className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-neutral-500" />
              Description
            </label>
            <Textarea
              {...register("description")}
              placeholder="Course description"
              disabled={isSaving}
              className="w-full border border-neutral-300 bg-white transition-all group-hover:border-primary disabled:opacity-50 disabled:cursor-not-allowed"
            />
            {errors.description && (
              <p className="text-red-500 text-sm">{errors.description.message}</p>
            )}
          </div>

          {/* Grade and Price */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            {/* Grade */}
            <div className="flex flex-col gap-1 w-full">
              <label className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-neutral-500" />
                Grade
              </label>
              <Select 
                value={getValues("grade")} 
                onValueChange={(value) => setValue("grade", value)}
                disabled={isSaving}
              >
                <SelectTrigger className="w-full border border-neutral-300 bg-white transition-all group-hover:border-primary disabled:opacity-50 disabled:cursor-not-allowed">
                  <SelectValue placeholder="Select grade" />
                </SelectTrigger>
                <SelectContent>
                  {GRADE_OPTIONS.map((g: GradeOption) => (
                    <SelectItem key={g} value={g}>{g}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.grade && (
                <p className="text-red-500 text-sm">{errors.grade.message}</p>
              )}
            </div>

            {/* Price */}
            <div className="flex flex-col gap-1 w-full">
              <label className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-neutral-500" />
                Price (EGP)
              </label>
              <div className="relative flex items-center w-full">
                <Input
                  type="number"
                  {...register("price", { valueAsNumber: true })}
                  placeholder="Course price"
                  disabled={isSaving}
                  className="w-full pl-8 pr-14 border border-neutral-300 bg-white transition-all group-hover:border-primary disabled:opacity-50 disabled:cursor-not-allowed"
                />
                <span className="absolute right-3 text-xs text-neutral-500 font-semibold pointer-events-none">EGP</span>
              </div>
              {errors.price && (
                <p className="text-red-500 text-sm">{errors.price.message}</p>
              )}
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
} 