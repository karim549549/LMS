import React from 'react'
import StudentSubNav from '@/components/dashboard/student/StudentSubNav'
import WelcomeSection from '@/components/student/WelcomeSection'
import StatsOverview from '@/components/student/StatsOverview'
import QuickActions from '@/components/student/QuickActions'
import CoursesSection from '@/components/student/CoursesSection'
import RecentAssignments from '@/components/student/RecentAssignments'
import Container from '@/components/custom/Container'
import Logo from '@/components/custom/Logo'
import SearchDialog from '@/components/custom/SearchDialog'
import UserAvatar from '@/components/custom/UserAvatar'

// Mock data for demonstration
const mockCourses = [
  {
    id: 1,
    title: "Introduction to React",
    progress: 75,
    totalLectures: 12,
    completedLectures: 9,
    nextLecture: "State Management",
    thumbnail: { src: "/api/placeholder/300/200" },
    rating: 4.8
  },
  {
    id: 2,
    title: "Advanced JavaScript",
    progress: 45,
    totalLectures: 15,
    completedLectures: 7,
    nextLecture: "Async Programming",
    thumbnail: { src: "/api/placeholder/300/200" },
    rating: 4.6
  },
  {
    id: 3,
    title: "TypeScript Fundamentals",
    progress: 20,
    totalLectures: 10,
    completedLectures: 2,
    nextLecture: "Interfaces",
    thumbnail: { src: "/api/placeholder/300/200" },
    rating: 4.9
  }
]

const mockAssignments = [
  {
    id: 1,
    title: "React Component Assignment",
    course: "Introduction to React",
    dueDate: "2024-01-15",
    status: "pending" as const,
    type: "assignment" as const
  },
  {
    id: 2,
    title: "JavaScript Quiz",
    course: "Advanced JavaScript",
    dueDate: "2024-01-12",
    status: "completed" as const,
    type: "quiz" as const,
    score: 85
  },
  {
    id: 3,
    title: "TypeScript Project",
    course: "TypeScript Fundamentals",
    dueDate: "2024-01-20",
    status: "pending" as const,
    type: "assignment" as const
  }
]

const mockStats = {
  totalCourses: 5,
  completedCourses: 2,
  totalAssignments: 12,
  completedAssignments: 8,
  currentStreak: 7,
  totalStudyTime: 45
}

export default function StudentDashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header>
        <nav>
          <Container className='p-3 flex items-center justify-between'>
            <Logo />
            <SearchDialog />
            <UserAvatar />
          </Container>
        </nav>
      </header>
      {/* Student Sub Navigation */}
      <StudentSubNav />
      <Container className='my-10'>
        <div className='flex flex-col lg:flex-row gap-10'>
          <div className='flex flex-col md:gap-10 gap-5 flex-[2]'>
            <WelcomeSection 
              userName="John Doe"
              currentStreak={mockStats.currentStreak}
            />
            {/* Courses Section */}
            <CoursesSection courses={mockCourses} />
            
            {/* Recent Assignments */}
            <RecentAssignments assignments={mockAssignments} />
          </div>
          <div className='flex flex-col md:gap-10 gap-5 flex-[1]'>
            {/* Stats Overview */}
            <StatsOverview stats={mockStats} />
            
            {/* Quick Actions */}
            <QuickActions />
          </div>
        </div>
      </Container>
    </div>
  )
}
