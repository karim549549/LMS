"use client"

import React from 'react'
import { Calendar, Target, Award } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface QuickAction {
  id: string
  label: string
  icon: React.ReactNode
  onClick?: () => void
}

interface QuickActionsProps {
  actions?: QuickAction[]
  onScheduleLearning?: () => void
  onSetGoals?: () => void
  onViewAchievements?: () => void
}

const defaultActions: QuickAction[] = [
  {
    id: 'schedule',
    label: 'Schedule Learning',
    icon: <Calendar className="w-4 h-4 mr-2" />
  },
  {
    id: 'goals',
    label: 'Set Goals',
    icon: <Target className="w-4 h-4 mr-2" />
  },
  {
    id: 'achievements',
    label: 'View Achievements',
    icon: <Award className="w-4 h-4 mr-2" />
  }
]

export default function QuickActions({ 
  actions = defaultActions,
  onScheduleLearning,
  onSetGoals,
  onViewAchievements
}: QuickActionsProps) {
  const handleActionClick = (actionId: string) => {
    switch (actionId) {
      case 'schedule':
        onScheduleLearning?.()
        break
      case 'goals':
        onSetGoals?.()
        break
      case 'achievements':
        onViewAchievements?.()
        break
      default:
        break
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {actions.map((action) => (
          <Button 
            key={action.id}
            variant="outline" 
            className="w-full justify-start hover:bg-gray-50 transition-colors cursor-pointer"
            onClick={() => handleActionClick(action.id)}
          >
            {action.icon}
            {action.label}
          </Button>
        ))}
      </CardContent>
    </Card>
  )
} 