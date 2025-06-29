"use client"

import React from 'react'
import { Flame, HelpCircle } from 'lucide-react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'

interface WelcomeSectionProps {
  userName: string
  currentStreak: number
}

export default function WelcomeSection({ userName, currentStreak }: WelcomeSectionProps) {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-2">Welcome back, {userName}!</h1>
          <p className="text-blue-100">Ready to continue your learning journey?</p>
        </div>
        <div className="hidden md:flex items-center gap-4">
          <div className="flex items-center space-x-2 bg-white/20 rounded-lg p-3">
            <Flame className="w-6 h-6 text-orange-300" />
            <div>
              <p className="text-sm text-blue-100">Current Streak</p>
              <p className="text-xl font-bold">{currentStreak} days</p>
            </div>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <button className="bg-white/20 rounded-lg p-2 hover:bg-white/30 transition-colors cursor-pointer">
                <HelpCircle className="w-5 h-5 text-blue-100" />
              </button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>About Learning Streaks</DialogTitle>
                <DialogDescription>
                  Complete both your visit and minutes watched rings to maintain your weekly streak.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                  <div>
                    <p className="font-medium">Watch Ring</p>
                    <p className="text-sm text-gray-600">Watch 30 minutes of course videos</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <div>
                    <p className="font-medium">Visit Ring</p>
                    <p className="text-sm text-gray-600">Visit the course at least once</p>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  )
} 