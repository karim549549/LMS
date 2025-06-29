"use client"

import React from 'react'
import TeacherHeader from '@/components/teacher/TeacherHeader'

export default function TeacherLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      <TeacherHeader />
      <main className="pt-16">
        {children}
      </main>
    </div>
  )
}
