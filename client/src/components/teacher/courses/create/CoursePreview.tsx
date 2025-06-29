"use client"

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { BookOpen, Video, Brain, FileText, Users, Eye, EyeOff, Link, DollarSign } from 'lucide-react'
import { useCourseStore } from '@/stores/courseStore'

export default function CoursePreview() {
  // Subscribe to only the needed fields from Zustand
  const title = useCourseStore((state) => state.courseInfo.title)
  const description = useCourseStore((state) => state.courseInfo.description)
  const category = useCourseStore((state) => state.courseInfo.category)
  const thumbnail = useCourseStore((state) => state.courseInfo.thumbnail)
  const lessons = useCourseStore((state) => state.lessons)
  const quizzes = useCourseStore((state) => state.quizzes)
  const assignments = useCourseStore((state) => state.assignments)
  const settings = useCourseStore((state) => state.settings)

  const getVisibilityIcon = (visibility?: string) => {
    switch (visibility) {
      case 'public':
        return <Eye className="w-4 h-4" />
      case 'private':
        return <EyeOff className="w-4 h-4" />
      case 'unlisted':
        return <Link className="w-4 h-4" />
      default:
        return <EyeOff className="w-4 h-4" />
    }
  }

  const getVisibilityText = (visibility?: string) => {
    switch (visibility) {
      case 'public':
        return 'Public'
      case 'private':
        return 'Private'
      case 'unlisted':
        return 'Unlisted'
      default:
        return 'Private'
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Course Preview</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Thumbnail */}
        <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
          {thumbnail ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={URL.createObjectURL(thumbnail as File)}
              alt="Course thumbnail"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="text-gray-400 flex flex-col items-center gap-2">
              <BookOpen className="w-8 h-8" />
              <span className="text-sm">No thumbnail</span>
            </div>
          )}
        </div>
        
        {/* Course Info */}
        <div>
          <h3 className="font-semibold text-lg">
            {title || 'Untitled Course'}
          </h3>
          <p className="text-sm text-gray-600 mt-1 line-clamp-2">
            {description || 'No description provided'}
          </p>
        </div>

        {/* Category */}
        {category && (
          <div>
            <Badge variant="secondary" className="capitalize">
              {category}
            </Badge>
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Video className="w-4 h-4 text-blue-500" />
            <div>
              <span className="text-gray-500">Lessons:</span>
              <span className="ml-1 font-medium">{lessons.length}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Brain className="w-4 h-4 text-purple-500" />
            <div>
              <span className="text-gray-500">Quizzes:</span>
              <span className="ml-1 font-medium">{quizzes.length}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-green-500" />
            <div>
              <span className="text-gray-500">Assignments:</span>
              <span className="ml-1 font-medium">{assignments.length}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-yellow-500" />
            <div>
              <span className="text-gray-500">Price:</span>
              <span className="ml-1 font-medium">
                {settings.price === 0 || !settings.price ? 'Free' : `$${settings.price}`}
              </span>
            </div>
          </div>
        </div>

        {/* Visibility */}
        <div className="flex items-center gap-2 pt-2 border-t">
          {getVisibilityIcon(settings.visibility)}
          <span className="text-sm text-gray-600">
            {getVisibilityText(settings.visibility)} Course
          </span>
        </div>

        {/* Co-teachers */}
        {settings.coTeachers && settings.coTeachers.length > 0 && (
          <div className="flex items-center gap-2 pt-2 border-t">
            <Users className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-600">
              {settings.coTeachers.length} co-teacher{settings.coTeachers.length !== 1 ? 's' : ''}
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}