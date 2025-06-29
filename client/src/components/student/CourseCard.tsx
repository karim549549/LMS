"use client"

import React from 'react'
import { Play, Share2, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import Image, { StaticImageData } from 'next/image'
interface CourseCardProps {
  id: number
  title: string
  progress: number
  totalLectures: number
  completedLectures: number
  nextLecture: string
  thumbnail: StaticImageData | { src: string }
  rating: number
  onShare?: (courseId: number) => void
  onRate?: (courseId: number, rating: number) => void
  onContinue?: (courseId: number) => void
}

export default function CourseCard({
  id,
  title,
  progress,
  totalLectures,
  completedLectures,
  nextLecture,
  thumbnail,
  rating,
  onShare,
  onRate,
  onContinue
}: CourseCardProps) {
  const handleShare = () => {
    if (onShare) {
      onShare(id)
    } else {
      const shareUrl = `${window.location.origin}/courses/${id}`
      navigator.clipboard.writeText(shareUrl)
    }
  }

  const handleRate = (newRating: number) => {
    if (onRate) {
      onRate(id, newRating)
    }
  }

  const handleContinue = () => {
    if (onContinue) {
      onContinue(id)
    }
  }

  return (
    <div className="border rounded-lg p-4 hover:shadow-lg transition-all duration-200 hover:border-blue-200">
      <div className="flex gap-4">
        {/* Course Thumbnail */}
        <div className="flex-shrink-0">
          <Image 
            src={typeof thumbnail === 'string' ? thumbnail : thumbnail.src}
            alt={title}
            className="w-24 h-16 object-cover rounded-lg"
            width={96}
            height={64}
          />
        </div>
        
        {/* Course Content */}
        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-semibold text-lg">{title}</h3>
            <div className="flex items-center gap-2">
              {/* Share Button */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <button 
                    onClick={handleShare}
                    className="p-1 hover:bg-gray-100 rounded transition-colors cursor-pointer"
                  >
                    <Share2 className="w-4 h-4 text-gray-600" />
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Share course link</p>
                </TooltipContent>
              </Tooltip>
              
              {/* Rating Button */}
              <Dialog>
                <DialogTrigger asChild>
                  <button className="p-1 hover:bg-gray-100 rounded transition-colors cursor-pointer">
                    <Star className="w-4 h-4 text-gray-600" />
                  </button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Rate {title}</DialogTitle>
                    <DialogDescription>
                      How would you rate this course?
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex justify-center space-x-2 py-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => handleRate(star)}
                        className="p-2 hover:scale-110 transition-transform cursor-pointer"
                      >
                        <Star 
                          className={`w-8 h-8 ${
                            star <= rating 
                              ? 'fill-yellow-400 text-yellow-400' 
                              : 'text-gray-300'
                          }`} 
                        />
                      </button>
                    ))}
                  </div>
                  <div className="text-center text-sm text-gray-600">
                    Current rating: {rating}/5
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          
          <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
            <span>{completedLectures}/{totalLectures} lectures</span>
            <span>•</span>
            <span>Next: {nextLecture}</span>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Progress</span>
              <span className="font-medium">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>
        
        {/* Continue Button */}
        <Button 
          size="sm" 
          className="ml-4 hover:bg-blue-700 transition-colors cursor-pointer"
          onClick={handleContinue}
        >
          <Play className="w-4 h-4 mr-2" />
          Continue
        </Button>
      </div>
    </div>
  )
}
