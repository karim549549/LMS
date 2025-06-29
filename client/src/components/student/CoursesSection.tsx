"use client"

import React from 'react'
import { BookOpen } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import CourseCard from './CourseCard'
import ViewAllButton from './ViewAllButton'
import  { StaticImageData } from 'next/image'
interface Course {
  id: number
  title: string
  progress: number
  totalLectures: number
  completedLectures: number
  nextLecture: string
  thumbnail: StaticImageData | { src: string }
  rating: number
}

interface CoursesSectionProps {
  courses: Course[]
}

export default function CoursesSection({ courses }: CoursesSectionProps) {
  const handleViewAllCourses = () => {
    console.log('View all courses clicked')
    // Add navigation logic here
  }

  const handleShare = (courseId: number) => {
    const shareUrl = `${window.location.origin}/courses/${courseId}`
    navigator.clipboard.writeText(shareUrl)
    // You can add a toast notification here
  }

  const handleRateCourse = (courseId: number, rating: number) => {
    console.log(`Rating course ${courseId} with ${rating} stars`)
    // Add rating submission logic here
  }

  const handleContinueCourse = (courseId: number) => {
    console.log(`Continue course ${courseId}`)
    // Add navigation logic here
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="w-5 h-5" />
          My Courses
        </CardTitle>
        <CardDescription>
          Continue where you left off
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {courses.map((course) => (
          <CourseCard
            key={course.id}
            {...course}
            onShare={handleShare}
            onRate={handleRateCourse}
            onContinue={handleContinueCourse}
          />
        ))}
        <ViewAllButton 
          label="View All Courses"
          onClick={handleViewAllCourses}
        />
      </CardContent>
    </Card>
  )
}