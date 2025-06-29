"use client"

import React, { useCallback, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Calendar, Plus, Trash2, Clock, BookOpen, FileText } from 'lucide-react'
import { CourseSettings } from '@/validation/course'
import { useCourseStore } from '@/stores/courseStore'

interface TimelineItem {
  id: string
  type: 'assignment' | 'quiz'
  title: string
  lessonId: string
  scheduledDate: Date
  isEnabled: boolean
}

const Step5Settings: React.FC = React.memo(() => {
  // Zustand store for settings and course data
  const settings = useCourseStore((state) => state.settings)
  const setSettings = useCourseStore((state) => state.setSettings)
  const lessons = useCourseStore((state) => state.lessons as import('@/validation/course').Lesson[])
  const assignments = useCourseStore((state) => state.assignments as import('@/validation/course').Assignment[])
  const quizzes = useCourseStore((state) => state.quizzes as import('@/validation/course').Quiz[])

  const [timelineItems, setTimelineItems] = useState<TimelineItem[]>([])
  const [coTeacherLinks, setCoTeacherLinks] = useState<string[]>([])

  // Settings update
  const handleSettingChange = useCallback((updates: Partial<CourseSettings>) => {
    setSettings({ ...settings, ...updates })
  }, [settings, setSettings])

  // Timeline management
  const addToTimeline = (type: 'assignment' | 'quiz', itemId: string, title: string) => {
    const newItem: TimelineItem = {
      id: Date.now().toString(),
      type,
      title,
      lessonId: lessons[0]?.id || '',
      scheduledDate: new Date(),
      isEnabled: true
    }
    setTimelineItems([...timelineItems, newItem])
  }
  const removeFromTimeline = (itemId: string) => {
    setTimelineItems(timelineItems.filter(item => item.id !== itemId))
  }
  const updateTimelineItem = (itemId: string, updates: Partial<TimelineItem>) => {
    setTimelineItems(timelineItems.map(item => item.id === itemId ? { ...item, ...updates } : item))
  }

  // Co-teacher links
  const createCoTeacherLink = () => {
    const newLink = `https://your-lms.com/join/${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    setCoTeacherLinks([...coTeacherLinks, newLink])
  }
  const removeCoTeacherLink = (index: number) => {
    setCoTeacherLinks(coTeacherLinks.filter((_, i) => i !== index))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          Course Settings & Timeline
        </CardTitle>
        <CardDescription>
          Manage course visibility, co-teachers, and schedule assignments/quizzes
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-6">
          {/* Visibility */}
          <div className="space-y-2">
            <Label htmlFor="visibility">Visibility</Label>
            <Select
              value={settings.visibility || 'private'}
              onValueChange={(value) => handleSettingChange({ visibility: value as 'public' | 'private' | 'unlisted' })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="public">Public</SelectItem>
                <SelectItem value="private">Private</SelectItem>
                <SelectItem value="unlisted">Unlisted</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Price */}
          <div className="space-y-2">
            <Label htmlFor="price">Price (EGP)</Label>
            <Input
              id="price"
              type="number"
              min={0}
              step={0.01}
              value={settings.price ?? 0}
              onChange={e => handleSettingChange({ price: parseFloat(e.target.value) })}
              placeholder="0 for free"
            />
            <p className="text-xs text-gray-500">
              Set to 0 for free courses, or enter amount in Egyptian Pounds
            </p>
          </div>

          {/* Timeline Management */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-lg font-medium">Timeline Management</Label>
              <Switch
                checked={!!settings.timelineEnabled}
                onCheckedChange={(checked) => handleSettingChange({ timelineEnabled: checked })}
              />
            </div>
            {settings.timelineEnabled && (
              <div className="space-y-4 p-4 border rounded-lg">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock className="w-4 h-4" />
                  Schedule assignments and quizzes within lesson timeline
                </div>
                {/* Available Items to Schedule */}
                <div className="space-y-3">
                  <h4 className="font-medium">Available Items</h4>
                  {/* Assignments */}
                  {Array.isArray(assignments) && assignments.length > 0 && (
                    <div className="space-y-2">
                      <Label className="text-sm font-medium flex items-center gap-2">
                        <FileText className="w-4 h-4" />
                        Assignments ({assignments.length})
                      </Label>
                      <div className="space-y-2">
                        {assignments.map((assignment: import('@/validation/course').Assignment) => (
                          <div key={assignment.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                            <span className="text-sm">{assignment.title}</span>
                            <Button
                              type="button"
                              size="sm"
                              variant="outline"
                              onClick={() => addToTimeline('assignment', assignment.id, assignment.title)}
                            >
                              <Plus className="w-3 h-3 mr-1" />
                              Add to Timeline
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {/* Quizzes */}
                  {Array.isArray(quizzes) && quizzes.length > 0 && (
                    <div className="space-y-2">
                      <Label className="text-sm font-medium flex items-center gap-2">
                        <BookOpen className="w-4 h-4" />
                        Quizzes ({quizzes.length})
                      </Label>
                      <div className="space-y-2">
                        {quizzes.map((quiz: import('@/validation/course').Quiz) => (
                          <div key={quiz.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                            <span className="text-sm">{quiz.title}</span>
                            <Button
                              type="button"
                              size="sm"
                              variant="outline"
                              onClick={() => addToTimeline('quiz', quiz.id, quiz.title)}
                            >
                              <Plus className="w-3 h-3 mr-1" />
                              Add to Timeline
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                {/* Timeline Items */}
                {timelineItems.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="font-medium">Scheduled Items</h4>
                    <div className="space-y-2">
                      {timelineItems.map((item) => (
                        <div key={item.id} className="flex items-center gap-3 p-3 border rounded-lg">
                          <div className="flex-1 space-y-2">
                            <div className="flex items-center gap-2">
                              {item.type === 'assignment' ? (
                                <FileText className="w-4 h-4 text-blue-600" />
                              ) : (
                                <BookOpen className="w-4 h-4 text-green-600" />
                              )}
                              <span className="text-sm font-medium">{item.title}</span>
                            </div>
                            <div className="flex gap-2">
                              <Select
                                value={item.lessonId}
                                onValueChange={(value) => updateTimelineItem(item.id, { lessonId: value })}
                              >
                                <SelectTrigger className="w-32">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  {lessons.map((lesson: import('@/validation/course').Lesson) => (
                                    <SelectItem key={lesson.id} value={lesson.id}>
                                      Lesson {lesson.order}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <Input
                                type="date"
                                value={item.scheduledDate.toISOString().split('T')[0]}
                                onChange={(e) => updateTimelineItem(item.id, { scheduledDate: new Date(e.target.value) })}
                                className="w-32"
                              />
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Switch
                              checked={item.isEnabled}
                              onCheckedChange={(checked) => updateTimelineItem(item.id, { isEnabled: checked })}
                            />
                            <Button
                              type="button"
                              size="sm"
                              variant="ghost"
                              onClick={() => removeFromTimeline(item.id)}
                              className="text-red-600"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Co-Teachers */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-lg font-medium">Co-Teachers</Label>
              <Button type="button" onClick={createCoTeacherLink} size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Create Invite Link
              </Button>
            </div>
            <div className="space-y-2">
              <Label htmlFor="coTeachers">Co-Teacher Emails (comma separated)</Label>
              <Input
                id="coTeachers"
                value={settings.coTeachers?.join(', ') || ''}
                onChange={e => {
                  const emails = e.target.value.split(',').map(s => s.trim()).filter(s => s.length > 0)
                  handleSettingChange({ coTeachers: emails })
                }}
                placeholder="Add co-teacher emails"
              />
            </div>
            {/* Invite Links */}
            {coTeacherLinks.length > 0 && (
              <div className="space-y-2">
                <Label className="text-sm font-medium">Invite Links</Label>
                <div className="space-y-2">
                  {coTeacherLinks.map((link, index) => (
                    <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                      <Input value={link} readOnly className="flex-1 text-sm" />
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        onClick={() => navigator.clipboard.writeText(link)}
                      >
                        Copy
                      </Button>
                      <Button
                        type="button"
                        size="sm"
                        variant="ghost"
                        onClick={() => removeCoTeacherLink(index)}
                        className="text-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  )
})

Step5Settings.displayName = 'Step5Settings'
export default Step5Settings