"use client"

import React from 'react'
import { TrendingUp } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface Stats {
  totalCourses: number
  totalAssignments: number
  completedAssignments: number
  currentStreak: number
  totalStudyTime: number
}

interface StatsOverviewProps {
  stats: Stats
  onStatClick?: (statType: string) => void
}

export default function StatsOverview({ stats, onStatClick }: StatsOverviewProps) {
  const handleStatClick = (statType: string) => {
    onStatClick?.(statType)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5" />
          Your Progress
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div 
            className="text-center p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors cursor-pointer"
            onClick={() => handleStatClick('courses')}
          >
            <p className="text-2xl font-bold text-blue-600">{stats.totalCourses}</p>
            <p className="text-sm text-gray-600">Active Courses</p>
          </div>
          <div 
            className="text-center p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors cursor-pointer"
            onClick={() => handleStatClick('assignments')}
          >
            <p className="text-2xl font-bold text-green-600">{stats.completedAssignments}</p>
            <p className="text-sm text-gray-600">Completed</p>
          </div>
        </div>
        <div 
          className="text-center p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors cursor-pointer"
          onClick={() => handleStatClick('studyTime')}
        >
          <p className="text-2xl font-bold text-purple-600">{stats.totalStudyTime}h</p>
          <p className="text-sm text-gray-600">Study Time This Week</p>
        </div>
      </CardContent>
    </Card>
  )
} 