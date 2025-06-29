"use client"

import React, { useState } from 'react'
import Container from '@/components/custom/Container'
import Logo from '@/components/custom/Logo'
import SearchDialog from '@/components/custom/SearchDialog'
import UserAvatar from '@/components/custom/UserAvatar'
import { Button } from '@/components/ui/button'
import { Menu, BookOpen, BarChart3, MessageSquare, Settings, Bot, Home } from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const navigationItems = [
  {
    href: '/teacher',
    label: 'Dashboard',
    icon: Home
  },
  {
    href: '/teacher/courses',
    label: 'Courses',
    icon: BookOpen
  },
  {
    href: '/teacher/analytics',
    label: 'Analytics',
    icon: BarChart3
  },
  {
    href: '/teacher/assistants',
    label: 'Assistants',
    icon: Bot
  },
  {
    href: '/teacher/messages&announcements',
    label: 'Messages',
    icon: MessageSquare
  },
  {
    href: '/teacher/settings',
    label: 'Settings',
    icon: Settings
  }
]

export default function TeacherHeader() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border">
      <Container>
        <div className="flex items-center justify-between h-16">
          {/* Logo and Burger Menu */}
          <div className="flex items-center gap-4">
            <Sheet open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Menu className="w-5 h-5 text-pink-500" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80 p-0">
                <SheetTitle className="sr-only">Teacher Navigation</SheetTitle>
                <div className="flex items-center justify-between p-4 border-b">
                  <Logo />
                </div>
                <div className="p-4">
                  <nav className="flex flex-col gap-2">
                    {navigationItems.map((item) => {
                      const Icon = item.icon
                      const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
                      
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setIsDrawerOpen(false)}
                          className={cn(
                            "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                            isActive
                              ? "bg-primary text-primary-foreground"
                              : "text-muted-foreground hover:text-foreground hover:bg-muted"
                          )}
                        >
                          <Icon className="w-4 h-4" />
                          {item.label}
                        </Link>
                      )
                    })}
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
            <Logo />
          </div>


          {/* Right Side Actions */}
          <div className="flex items-center gap-3">
            <SearchDialog />
            <UserAvatar />
          </div>
        </div>
      </Container>
    </header>
  )
} 