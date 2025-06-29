"use client"

import React from 'react'
import { FileText, ArrowRight } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface Assignment {
  id: number
  title: string
  course: string
  dueDate: string
  status: 'pending' | 'completed'
  type: 'assignment' | 'quiz'
  score?: number
}

interface RecentAssignmentsProps {
  assignments: Assignment[]
  onViewAll?: () => void
  onAssignmentClick?: (assignmentId: number) => void
}

export default function RecentAssignments({ 
  assignments, 
  onViewAll, 
  onAssignmentClick 
}: RecentAssignmentsProps) {
  const handleViewAll = () => {
    if (onViewAll) {
      onViewAll()
    }
  }

  const handleAssignmentClick = (assignmentId: number) => {
    if (onAssignmentClick) {
      onAssignmentClick(assignmentId)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="w-5 h-5" />
          Recent Assignments
        </CardTitle>
        <CardDescription>
          Stay on top of your deadlines
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {assignments.map((assignment) => (
            <div 
              key={assignment.id} 
              className="flex items-center justify-between p-3 border rounded-lg hover:shadow-md transition-all duration-200 hover:border-gray-300 cursor-pointer"
              onClick={() => handleAssignmentClick(assignment.id)}
            >
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${
                  assignment.status === 'completed' ? 'bg-green-500' : 'bg-orange-500'
                }`} />
                <div>
                  <p className="font-medium">{assignment.title}</p>
                  <p className="text-sm text-gray-600">{assignment.course}</p>
                </div>
              </div>
              <div className="text-right">
                {assignment.status === 'completed' ? (
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    {assignment.score}%
                  </Badge>
                ) : (
                  <Badge variant="destructive">
                    Due {new Date(assignment.dueDate).toLocaleDateString()}
                  </Badge>
                )}
              </div>
            </div>
          ))}
        </div>
        <Button 
          variant="outline" 
          className="w-full mt-4 hover:bg-gray-50 transition-colors cursor-pointer"
          onClick={handleViewAll}
        >
          View All Assignments
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </CardContent>
    </Card>
  )
} 