"use client"

import React, { useImperativeHandle, forwardRef } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { BookOpen, Upload } from 'lucide-react'
import { CourseInfo, CourseInfoSchema } from '@/validation/course'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useCourseStore } from '@/stores/courseStore'

export interface Step1CourseInfoRef {
  getValues: () => CourseInfo
}

const Step1CourseInfo = forwardRef<Step1CourseInfoRef>(
  function Step1CourseInfo(_props, ref) {
    const courseInfo = useCourseStore((state) => state.courseInfo)
    const setCourseInfo = useCourseStore((state) => state.setCourseInfo)

    const {
      register,
      formState: { errors },
      watch,
      setValue,
      getValues
    } = useForm<CourseInfo>({
      resolver: zodResolver(CourseInfoSchema),
      defaultValues: {
        title: courseInfo.title || '',
        description: courseInfo.description || '',
        category: courseInfo.category || '',
        thumbnail: courseInfo.thumbnail as File | undefined
      },
      mode: 'onBlur'
    })

    useImperativeHandle(ref, () => ({
      getValues
    }), [getValues])

    // Sync form changes to store on blur
    React.useEffect(() => {
      const subscription = watch((value) => {
        setCourseInfo(value)
      })
      return () => subscription.unsubscribe()
    }, [watch, setCourseInfo])

    const watchedValues = watch()

    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            Course Information
          </CardTitle>
          <CardDescription>
            Set up the basic information for your course
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            {/* Course Title */}
            <div className="space-y-2">
              <Label htmlFor="title">Course Title</Label>
              <Input
                id="title"
                {...register('title')}
                placeholder="Enter course title"
                className={errors.title ? 'border-red-500' : ''}
              />
              {errors.title && (
                <p className="text-sm text-red-500">{errors.title.message}</p>
              )}
            </div>

            {/* Course Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                {...register('description')}
                placeholder="Describe your course..."
                rows={4}
                className={errors.description ? 'border-red-500' : ''}
              />
              {errors.description && (
                <p className="text-sm text-red-500">{errors.description.message}</p>
              )}
            </div>

            {/* Category */}
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={watchedValues.category}
                onValueChange={(value) => setValue('category', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="programming">Programming</SelectItem>
                  <SelectItem value="design">Design</SelectItem>
                  <SelectItem value="business">Business</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="languages">Languages</SelectItem>
                  <SelectItem value="music">Music</SelectItem>
                  <SelectItem value="photography">Photography</SelectItem>
                  <SelectItem value="fitness">Fitness</SelectItem>
                  <SelectItem value="cooking">Cooking</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              {errors.category && (
                <p className="text-sm text-red-500">{errors.category.message}</p>
              )}
            </div>

            {/* Thumbnail Upload */}
            <div className="space-y-2">
              <Label htmlFor="thumbnail">Course Thumbnail</Label>
              <div className="flex items-center gap-4">
                <Input
                  id="thumbnail"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) {
                      setValue('thumbnail', file)
                    }
                  }}
                  className="flex-1"
                />
                {watchedValues.thumbnail && (
                  <div className="flex items-center gap-2 text-sm text-green-600">
                    <Upload className="w-4 h-4" />
                    {(watchedValues.thumbnail as File).name}
                  </div>
                )}
              </div>
              <p className="text-xs text-gray-500">
                Upload a thumbnail image for your course (JPG, PNG, WEBP)
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    )
  }
)

export default Step1CourseInfo