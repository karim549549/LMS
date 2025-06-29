"use client"

import React, { useCallback } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Trash2, Plus, Video } from 'lucide-react'
import { Lesson, Resource } from '@/validation/course'
import VideoContent from './VideoContent'
import ResourceItem from './ResourceItem'
import { useCourseStore } from '@/stores/courseStore'

interface LessonCardProps {
  lessonIndex: number
}

const LessonCard: React.FC<LessonCardProps> = React.memo(({ lessonIndex }) => {
  const lessons = useCourseStore((state) => state.lessons)
  const setLessons = useCourseStore((state) => state.setLessons)
  const lesson = lessons[lessonIndex]

  // Update lesson in store
  const updateLesson = useCallback((updates: Partial<Lesson>) => {
    const updatedLessons = [...lessons]
    updatedLessons[lessonIndex] = { ...updatedLessons[lessonIndex], ...updates }
    setLessons(updatedLessons)
  }, [lessons, lessonIndex, setLessons])

  const removeLesson = useCallback(() => {
    const updatedLessons = lessons.filter((_, i) => i !== lessonIndex)
    const reorderedLessons = updatedLessons.map((l, i) => ({ ...l, order: i }))
    setLessons(reorderedLessons)
  }, [lessons, lessonIndex, setLessons])

  // Resource helpers
  const addResource = useCallback(() => {
    const newResource: Resource = {
      id: Date.now().toString(),
      name: `Resource ${lesson.resources.length + 1}`,
      type: 'file',
      file: undefined,
      url: '',
      description: ''
    }
    updateLesson({ resources: [...lesson.resources, newResource] })
  }, [lesson, updateLesson])

  const removeResource = useCallback((resourceIndex: number) => {
    const updatedResources = lesson.resources.filter((_, i) => i !== resourceIndex)
    updateLesson({ resources: updatedResources })
  }, [lesson, updateLesson])

  const updateResource = useCallback((resourceIndex: number, updates: Partial<Resource>) => {
    const updatedResources = [...lesson.resources]
    updatedResources[resourceIndex] = { ...updatedResources[resourceIndex], ...updates }
    updateLesson({ resources: updatedResources })
  }, [lesson, updateLesson])

  return (
    <Card className="p-4">
      <div className="space-y-4">
        {/* Lesson Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Video className="w-4 h-4 text-gray-400 cursor-move" />
            <span className="text-sm font-medium text-gray-500">
              Lesson {lessonIndex + 1}
            </span>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={removeLesson}
            className="text-red-600 hover:text-red-700"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>

        {/* Lesson Title */}
        <div className="space-y-2">
          <Label>Lesson Title</Label>
          <Input
            value={lesson.title}
            onChange={(e) => updateLesson({ title: e.target.value })}
            placeholder="Enter lesson title"
          />
        </div>

        {/* Video Content */}
        <VideoContent
          video={lesson.video || null}
          onUpdate={(video) => updateLesson({ video: video || undefined })}
        />

        {/* Resources */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium">Resources</Label>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addResource}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Resource
            </Button>
          </div>

          {lesson.resources.map((resource, resourceIndex) => (
            <ResourceItem
              key={resource.id}
              resource={resource}
              onUpdate={(updatedResource) => updateResource(resourceIndex, updatedResource)}
              onRemove={() => removeResource(resourceIndex)}
            />
          ))}
        </div>
      </div>
    </Card>
  )
})

LessonCard.displayName = 'LessonCard'
export default LessonCard