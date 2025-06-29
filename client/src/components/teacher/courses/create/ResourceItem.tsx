"use client"

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Trash2, File, Link, Upload } from 'lucide-react'
import { Resource, FileUpload as FileUploadType } from '@/validation/course'
import FileUpload from './FileUpload'

interface ResourceItemProps {
  resource: Resource
  onUpdate: (resource: Resource) => void
  onRemove: () => void
}

export default function ResourceItem({ resource, onUpdate, onRemove }: ResourceItemProps) {
  const [activeTab, setActiveTab] = useState<'file' | 'url'>(
    resource.type
  )

  const handleFileUpload = (file: FileUploadType) => {
    const updatedResource: Resource = {
      ...resource,
      type: 'file',
      file,
      url: undefined
    }
    onUpdate(updatedResource)
  }

  const handleFileRemove = () => {
    const updatedResource: Resource = {
      ...resource,
      type: 'url',
      file: undefined,
      url: ''
    }
    onUpdate(updatedResource)
  }

  const handleUrlChange = (url: string) => {
    const updatedResource: Resource = {
      ...resource,
      type: 'url',
      url,
      file: undefined
    }
    onUpdate(updatedResource)
  }

  const handleNameChange = (name: string) => {
    const updatedResource: Resource = {
      ...resource,
      name
    }
    onUpdate(updatedResource)
  }

  const handleDescriptionChange = (description: string) => {
    const updatedResource: Resource = {
      ...resource,
      description
    }
    onUpdate(updatedResource)
  }

  return (
    <div className="p-3 bg-gray-50 rounded-lg space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">Resource</span>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={onRemove}
          className="text-red-600"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>

      {/* Resource Name */}
      <div className="space-y-2">
        <Label>Resource Name</Label>
        <Input
          value={resource.name}
          onChange={(e) => handleNameChange(e.target.value)}
          placeholder="Enter resource name"
        />
      </div>

      {/* Resource Type and Content */}
      <div className="space-y-2">
        <Label>Resource Type</Label>
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'file' | 'url')}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="file" className="flex items-center gap-2">
              <Upload className="w-4 h-4" />
              Upload File
            </TabsTrigger>
            <TabsTrigger value="url" className="flex items-center gap-2">
              <Link className="w-4 h-4" />
              URL Reference
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="file" className="mt-4">
            <FileUpload
              onUpload={handleFileUpload}
              onRemove={handleFileRemove}
              accept="*/*"
              maxSize={50} // 50MB for resources
              currentFile={resource.file || null}
              label="Upload Resource File"
            />
          </TabsContent>
          
          <TabsContent value="url" className="mt-4">
            <div className="space-y-2">
              <Input
                value={resource.url || ''}
                onChange={(e) => handleUrlChange(e.target.value)}
                placeholder="https://example.com/resource.pdf"
              />
              <p className="text-xs text-gray-500">
                Enter a direct link to the resource
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Resource Description */}
      <div className="space-y-2">
        <Label>Description (Optional)</Label>
        <Textarea
          value={resource.description || ''}
          onChange={(e) => handleDescriptionChange(e.target.value)}
          placeholder="Brief description of this resource..."
          rows={2}
        />
      </div>

      {/* Resource Preview */}
      {resource.type === 'file' && resource.file && (
        <div className="flex items-center gap-2 p-2 bg-white rounded border">
          <File className="w-4 h-4 text-blue-500" />
          <span className="text-sm">{resource.file.name}</span>
          <span className="text-xs text-gray-500">
            ({(resource.file.size / 1024 / 1024).toFixed(2)} MB)
          </span>
        </div>
      )}

      {resource.type === 'url' && resource.url && (
        <div className="flex items-center gap-2 p-2 bg-white rounded border">
          <Link className="w-4 h-4 text-green-500" />
          <span className="text-sm text-blue-600 hover:underline cursor-pointer">
            {resource.url}
          </span>
        </div>
      )}
    </div>
  )
} 