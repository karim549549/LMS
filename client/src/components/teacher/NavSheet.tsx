"use client";
import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  BookOpen,
  BarChart2,
  Users,
  GraduationCap,
  Mail,
  LifeBuoy,
  Settings as SettingsIcon
} from 'lucide-react'

const navLinks = [
  { label: 'Courses', href: '/teacher', icon: <BookOpen size={24} /> },
  { label: 'Performance', href: '/teacher/performance', icon: <BarChart2 size={24} /> },
  { label: 'Assistants', href: '/teacher/assistants', icon: <Users size={24} /> },
  { label: 'Students', href: '/teacher/students', icon: <GraduationCap size={24} /> },
  { label: 'Inbox', href: '/teacher/inbox', icon: <Mail size={24} /> },
  { label: 'Help & Support', href: '/teacher/help', icon: <LifeBuoy size={24} /> },
  { label: 'Settings', href: '/teacher/settings', icon: <SettingsIcon size={24} /> },
]

export default function NavSheet() {
  const pathname = usePathname();
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-screen z-40
          flex flex-col items-center
          bg-background  bg-black transition-all duration-200
          ${expanded ? 'w-56' : 'w-16'}
        `}
        onMouseEnter={() => setExpanded(true)}
        onMouseLeave={() => setExpanded(false)}
        style={{ transitionProperty: 'width' }}
      >
        <nav className="flex flex-col gap-2 mt-8 w-full">
          {/* You can add a logo or home link here if desired */}
          {navLinks.map(link => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`
                  w-full flex items-center gap-3 py-3 px-4 
                  border-l-6
                  ${isActive ? 'border-violet-600 bg-primary text-white' : 'border-transparent hover:bg-cyan-100 text-muted-foreground'}
                  transition-colors duration-150
                `}
              >
                <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
                  {link.icon}
                </span>
                {expanded && (
                  <span className="ml-2 text-base font-medium whitespace-nowrap">
                    {link.label}
                  </span>
                )}
              </Link>
            )
          })}
        </nav>
      </aside>
      {/* Spacer for sidebar (so content is not covered) */}
      <div className="w-16" />
    </>
  )
} 