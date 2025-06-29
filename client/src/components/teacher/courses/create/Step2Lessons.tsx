"use client"

import React, { useCallback } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus, Video } from 'lucide-react'
import { Lesson } from '@/validation/course'
import LessonCard from './LessonCard'
import { useCourseStore } from '@/stores/courseStore'

const Step2Lessons: React.FC = React.memo(() => {
  const lessons = useCourseStore((state) => state.lessons)
  const setLessons = useCourseStore((state) => state.setLessons)

  const addLesson = useCallback(() => {
    const newLesson: Lesson = {
      id: Date.now().toString(),
      title: `Lesson ${lessons.length + 1}`,
      resources: [],
      order: lessons.length
    }
    setLessons([...lessons, newLesson])
  }, [lessons, setLessons])

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Video className="w-5 h-5" />
          Course Lessons
        </CardTitle>
        <CardDescription>
          Add video content and resources for your course
        </CardDescription>
      </CardHeader>
      <CardContent>
        <section className="space-y-6" aria-label="Course Lessons">
          {/* Add Lesson Button */}
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Lessons ({lessons.length})</h3>
            <Button type="button" onClick={addLesson} size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Lesson
            </Button>
          </div>

          {/* Lessons List */}
          <div className="space-y-4">
            {lessons.map((_, lessonIndex) => (
              <LessonCard
                key={lessonIndex}
                lessonIndex={lessonIndex}
              />
            ))}
          </div>
        </section>
      </CardContent>
    </Card>
  )
})

Step2Lessons.displayName = 'Step2Lessons'
export default Step2Lessons