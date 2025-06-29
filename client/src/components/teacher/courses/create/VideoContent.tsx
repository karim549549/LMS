"use client"

import React, { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Upload, Link, Video, Youtube, File, X } from 'lucide-react'
import { VideoContent as VideoContentType, FileUpload as FileUploadType } from '@/validation/course'
import FileUpload from './FileUpload'

interface VideoContentProps {
  video: VideoContentType | null
  onUpdate: (video: VideoContentType | null) => void
}

export default function VideoContent({ video, onUpdate }: VideoContentProps) {
  const [activeTab, setActiveTab] = useState<'upload' | 'youtube'>(
    video?.type === 'file' ? 'upload' : 'youtube'
  )

  const handleFileUpload = (file: FileUploadType) => {
    const newVideo: VideoContentType = {
      type: 'file',
      file,
      youtubeUrl: undefined
    }
    onUpdate(newVideo)
  }

  const handleFileRemove = () => {
    onUpdate(null)
  }

  const handleYouTubeUrlChange = (url: string) => {
    if (!url.trim()) {
      onUpdate(null)
      return
    }

    // Basic YouTube URL validation
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+/
    if (!youtubeRegex.test(url)) {
      alert('Please enter a valid YouTube URL')
      return
    }

    const newVideo: VideoContentType = {
      type: 'youtube',
      youtubeUrl: url,
      file: undefined
    }
    onUpdate(newVideo)
  }

  const handleRemove = () => {
    onUpdate(null)
  }

  return (
    <div className="space-y-4">
      <Label>Video Content</Label>
      
      {!video ? (
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'upload' | 'youtube')}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="upload" className="flex items-center gap-2">
              <Upload className="w-4 h-4" />
              Upload Video
            </TabsTrigger>
            <TabsTrigger value="youtube" className="flex items-center gap-2">
              <Youtube className="w-4 h-4" />
              YouTube Link
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="upload" className="mt-4">
            <FileUpload
              onUpload={handleFileUpload}
              onRemove={handleFileRemove}
              accept="video/*"
              maxSize={500} // 500MB for videos
              label="Upload Video File"
            />
            <p className="text-xs text-gray-500 mt-2">
              Supported formats: MP4, MOV, AVI, WebM. Max size: 500MB
            </p>
          </TabsContent>
          
          <TabsContent value="youtube" className="mt-4">
            <div className="space-y-2">
              <Input
                placeholder="https://www.youtube.com/watch?v=..."
                onChange={(e) => handleYouTubeUrlChange(e.target.value)}
              />
              <p className="text-xs text-gray-500">
                Paste a YouTube video URL
              </p>
            </div>
          </TabsContent>
        </Tabs>
      ) : (
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                {video.type === 'file' ? (
                  <File className="w-4 h-4 text-blue-500" />
                ) : (
                  <Youtube className="w-4 h-4 text-red-500" />
                )}
                <span className="text-sm font-medium">
                  {video.type === 'file' ? 'Video File' : 'YouTube Video'}
                </span>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleRemove}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            
            {video.type === 'file' && video.file && (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Video className="w-4 h-4 text-gray-400" />
                  <span className="text-sm">{video.file.name}</span>
                </div>
                <div className="text-xs text-gray-500">
                  {(video.file.size / 1024 / 1024).toFixed(2)} MB
                </div>
                {video.file.status === 'uploading' && (
                  <div className="text-xs text-blue-500">
                    Uploading... {video.file.progress}%
                  </div>
                )}
                {video.file.status === 'error' && (
                  <div className="text-xs text-red-500">
                    {video.file.error}
                  </div>
                )}
              </div>
            )}
            
            {video.type === 'youtube' && video.youtubeUrl && (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Link className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-blue-600 hover:underline cursor-pointer">
                    {video.youtubeUrl}
                  </span>
                </div>
                <div className="text-xs text-gray-500">
                  YouTube video link
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
} 