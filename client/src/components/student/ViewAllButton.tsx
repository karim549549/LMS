"use client"

import React from 'react'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ViewAllButtonProps {
  label: string
  onClick?: () => void
}

export default function ViewAllButton({ label, onClick }: ViewAllButtonProps) {
  return (
    <Button 
      variant="outline" 
      className="w-full hover:bg-gray-50 transition-colors cursor-pointer"
      onClick={onClick}
    >
      {label}
      <ArrowRight className="w-4 h-4 ml-2" />
    </Button>
  )
} 