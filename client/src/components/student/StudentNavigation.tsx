"use client"

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface NavItem {
  href: string
  label: string
}

const navItems: NavItem[] = [
  { href: '/student/dashboard', label: 'Dashboard' },
  { href: '/student/courses', label: 'My Courses' },
  { href: '/student/assignments', label: 'Assignments' },
  { href: '/student/quizzes', label: 'Quizzes' }
]

export default function StudentNavigation() {
  const pathname = usePathname()

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center space-x-8 h-12">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  relative pb-2 font-medium transition-all duration-200 cursor-pointer
                  ${isActive 
                    ? 'text-blue-600' 
                    : 'text-gray-600 hover:text-gray-900'
                  }
                `}
              >
                {item.label}
                {isActive && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 transform transition-transform duration-200" />
                )}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 transform scale-x-0 transition-transform duration-200 group-hover:scale-x-100" />
              </Link>
            )
          })}
        </nav>
      </div>
    </div>
  )
} 