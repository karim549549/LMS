"use client"

import React, { useState, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Upload, X, File, CheckCircle, AlertCircle } from 'lucide-react'
import { FileUpload as FileUploadType } from '@/validation/course'

interface FileUploadProps {
  onUpload: (file: FileUploadType) => void
  onRemove: () => void
  accept?: string
  maxSize?: number // in MB
  currentFile?: FileUploadType | null
  label?: string
  className?: string
}

export default function FileUpload({ 
  onUpload, 
  onRemove, 
  accept = "*/*", 
  maxSize = 100, 
  currentFile,
  label = "Upload File",
  className = ""
}: FileUploadProps) {
  const [isDragOver, setIsDragOver] = useState(false)
  const [uploading, setUploading] = useState(false)

  const handleFileSelect = useCallback(async (file: File) => {
    // Validate file size
    if (file.size > maxSize * 1024 * 1024) {
      alert(`File size must be less than ${maxSize}MB`)
      return
    }

    // Validate file type
    if (accept !== "*/*" && !file.type.match(accept.replace("*/*", ".*"))) {
      alert(`File type not supported. Please upload a ${accept} file.`)
      return
    }

    const fileUpload: FileUploadType = {
      id: Date.now().toString(),
      name: file.name,
      size: file.size,
      type: file.type,
      status: 'pending',
      progress: 0
    }

    onUpload(fileUpload)
    setUploading(true)

    // Simulate upload progress (replace with actual upload logic)
    try {
      // Simulate upload delay
      for (let i = 0; i <= 100; i += 10) {
        await new Promise(resolve => setTimeout(resolve, 200))
        onUpload({
          ...fileUpload,
          progress: i,
          status: i === 100 ? 'completed' : 'uploading'
        })
      }
      
      // Simulate getting upload URL
      const uploadedFile: FileUploadType = {
        ...fileUpload,
        progress: 100,
        status: 'completed',
        url: URL.createObjectURL(file) // Replace with actual upload URL
      }
      
      onUpload(uploadedFile)
    } catch (error) {
      onUpload({
        ...fileUpload,
        status: 'error',
        error: error instanceof Error ? error.message : 'Upload failed'
      })
    } finally {
      setUploading(false)
    }
  }, [accept, maxSize, onUpload])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    
    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0) {
      handleFileSelect(files[0])
    }
  }, [handleFileSelect])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      handleFileSelect(files[0])
    }
  }, [handleFileSelect])

  const getStatusIcon = () => {
    if (!currentFile) return <Upload className="w-4 h-4" />
    
    switch (currentFile.status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'error':
        return <AlertCircle className="w-4 h-4 text-red-500" />
      case 'uploading':
        return <Upload className="w-4 h-4 animate-pulse" />
      default:
        return <File className="w-4 h-4" />
    }
  }

  const getStatusText = () => {
    if (!currentFile) return label
    
    switch (currentFile.status) {
      case 'completed':
        return 'Upload Complete'
      case 'error':
        return currentFile.error || 'Upload Failed'
      case 'uploading':
        return `Uploading... ${currentFile.progress}%`
      default:
        return currentFile.name
    }
  }

  return (
    <div className={`space-y-2 ${className}`}>
      {!currentFile ? (
        <div
          className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
            isDragOver 
              ? 'border-primary bg-primary/5' 
              : 'border-gray-300 hover:border-gray-400'
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <input
            type="file"
            accept={accept}
            onChange={handleInputChange}
            className="hidden"
            id={`file-upload-${Date.now()}`}
            disabled={uploading}
          />
          <label
            htmlFor={`file-upload-${Date.now()}`}
            className="cursor-pointer block"
          >
            <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
            <p className="text-sm text-gray-600 mb-1">
              {label}
            </p>
            <p className="text-xs text-gray-500">
              Drag and drop or click to select
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Max size: {maxSize}MB
            </p>
          </label>
        </div>
      ) : (
        <div className="border rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              {getStatusIcon()}
              <span className="text-sm font-medium">
                {getStatusText()}
              </span>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={onRemove}
              disabled={uploading}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          
          {currentFile.status === 'uploading' && (
            <Progress value={currentFile.progress || 0} className="h-2" />
          )}
          
          {currentFile.status === 'error' && (
            <p className="text-xs text-red-500 mt-1">
              {currentFile.error}
            </p>
          )}
          
          <div className="text-xs text-gray-500 mt-1">
            {(currentFile.size / 1024 / 1024).toFixed(2)} MB
          </div>
        </div>
      )}
    </div>
  )
} 