"use client"

import React, { useCallback } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Plus, FileText, Trash2, Paperclip, FileUp } from 'lucide-react'
import { Assignment, Resource } from '@/validation/course'
import { useCourseStore } from '@/stores/courseStore'

const Step4Assignments: React.FC = React.memo(() => {
  // Zustand store for assignments
  const assignments = useCourseStore((state) => state.assignments)
  const setAssignments = useCourseStore((state) => state.setAssignments)

  // Assignment actions
  const addAssignment = useCallback(() => {
    const newAssignment: Assignment = {
      id: Date.now().toString(),
      title: `Assignment ${assignments.length + 1}`,
      description: '',
      deadline: new Date(),
      allowLateSubmission: false,
      maxScore: 100,
      attachments: [],
      requiresPDFSubmission: false
    }
    setAssignments([...assignments, newAssignment])
  }, [assignments, setAssignments])

  const updateAssignment = useCallback((index: number, updates: Partial<Assignment>) => {
    const updatedAssignments = [...assignments]
    updatedAssignments[index] = { ...updatedAssignments[index], ...updates }
    setAssignments(updatedAssignments)
  }, [assignments, setAssignments])

  const removeAssignment = useCallback((index: number) => {
    const updatedAssignments = assignments.filter((_, i) => i !== index)
    setAssignments(updatedAssignments)
  }, [assignments, setAssignments])

  // Attachment actions
  const addAttachment = useCallback((assignmentIndex: number) => {
    const attachment: Resource = {
      id: Date.now().toString(),
      name: `Attachment ${assignments[assignmentIndex].attachments.length + 1}`,
      type: 'file',
      url: ''
    }
    const updatedAssignments = [...assignments]
    updatedAssignments[assignmentIndex] = {
      ...updatedAssignments[assignmentIndex],
      attachments: [...updatedAssignments[assignmentIndex].attachments, attachment]
    }
    setAssignments(updatedAssignments)
  }, [assignments, setAssignments])

  const updateAttachment = useCallback((assignmentIndex: number, attachmentIndex: number, updates: Partial<Resource>) => {
    const updatedAssignments = [...assignments]
    updatedAssignments[assignmentIndex].attachments[attachmentIndex] = {
      ...updatedAssignments[assignmentIndex].attachments[attachmentIndex],
      ...updates
    }
    setAssignments(updatedAssignments)
  }, [assignments, setAssignments])

  const removeAttachment = useCallback((assignmentIndex: number, attachmentIndex: number) => {
    const updatedAssignments = [...assignments]
    updatedAssignments[assignmentIndex].attachments = updatedAssignments[assignmentIndex].attachments.filter((_, i) => i !== attachmentIndex)
    setAssignments(updatedAssignments)
  }, [assignments, setAssignments])

  const handlePDFUpload = (assignmentIndex: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && file.type === 'application/pdf') {
      updateAssignment(assignmentIndex, { pdfTemplate: file })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="w-5 h-5" />
          Course Assignments
        </CardTitle>
        <CardDescription>
          Add assignments, deadlines, and attachments
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-6">
          {/* Add Assignment Button */}
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Assignments ({assignments.length})</h3>
            <Button type="button" onClick={addAssignment} size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Assignment
            </Button>
          </div>

          {/* Assignments List */}
          <div className="space-y-4">
            {assignments.map((assignment, assignmentIndex) => (
              <Card key={assignment.id} className="p-4">
                <div className="space-y-4">
                  {/* Assignment Header */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-500">
                      Assignment {assignmentIndex + 1}
                    </span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeAssignment(assignmentIndex)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>

                  {/* Assignment Title */}
                  <div className="space-y-2">
                    <Label>Title</Label>
                    <Input
                      value={assignment.title}
                      onChange={(e) => updateAssignment(assignmentIndex, { title: e.target.value })}
                      placeholder="Enter assignment title"
                    />
                  </div>

                  {/* Assignment Description */}
                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea
                      value={assignment.description}
                      onChange={(e) => updateAssignment(assignmentIndex, { description: e.target.value })}
                      placeholder="Describe the assignment..."
                      rows={3}
                    />
                  </div>

                  {/* Assignment Settings Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    {/* Deadline */}
                    <div className="space-y-2">
                      <Label>Deadline</Label>
                      <Input
                        type="date"
                        value={assignment.deadline instanceof Date ? assignment.deadline.toISOString().split('T')[0] : assignment.deadline}
                        onChange={(e) => updateAssignment(assignmentIndex, { deadline: new Date(e.target.value) })}
                      />
                    </div>

                    {/* Max Score */}
                    <div className="space-y-2">
                      <Label>Max Score</Label>
                      <Input
                        type="number"
                        value={assignment.maxScore}
                        onChange={(e) => updateAssignment(assignmentIndex, { maxScore: parseInt(e.target.value) })}
                        min={1}
                      />
                    </div>
                  </div>

                  {/* Switches */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm font-medium">Allow Late Submission</Label>
                      <Switch
                        checked={assignment.allowLateSubmission}
                        onCheckedChange={(checked) => updateAssignment(assignmentIndex, { allowLateSubmission: checked })}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label className="text-sm font-medium">Requires PDF Submission</Label>
                      <Switch
                        checked={assignment.requiresPDFSubmission}
                        onCheckedChange={(checked) => updateAssignment(assignmentIndex, { requiresPDFSubmission: checked })}
                      />
                    </div>
                  </div>

                  {/* PDF Template Upload */}
                  {assignment.requiresPDFSubmission && (
                    <div className="space-y-2">
                      <Label>PDF Template (Optional)</Label>
                      <div className="flex items-center gap-3">
                        <Input
                          type="file"
                          accept=".pdf"
                          onChange={(e) => handlePDFUpload(assignmentIndex, e)}
                          className="flex-1"
                        />
                        {assignment.pdfTemplate && (
                          <div className="flex items-center gap-2 text-sm text-green-600">
                            <FileUp className="w-4 h-4" />
                            {assignment.pdfTemplate.name}
                          </div>
                        )}
                      </div>
                      <p className="text-xs text-gray-500">
                        Upload a PDF template that students can use as a reference
                      </p>
                    </div>
                  )}

                  {/* Attachments */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm font-medium">Attachments</Label>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => addAttachment(assignmentIndex)}
                      >
                        <Paperclip className="w-4 h-4 mr-2" />
                        Add Attachment
                      </Button>
                    </div>

                    {assignment.attachments.map((attachment, attachmentIndex) => (
                      <div key={attachment.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <div className="flex-1 space-y-2">
                          <Input
                            value={attachment.name}
                            onChange={(e) => updateAttachment(assignmentIndex, attachmentIndex, { name: e.target.value })}
                            placeholder="Attachment name"
                          />
                          <Input
                            value={attachment.url}
                            onChange={(e) => updateAttachment(assignmentIndex, attachmentIndex, { url: e.target.value })}
                            placeholder="Attachment URL"
                          />
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeAttachment(assignmentIndex, attachmentIndex)}
                          className="text-red-600"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </form>
      </CardContent>
    </Card>
  )
})

Step4Assignments.displayName = 'Step4Assignments'
export default Step4Assignments