import React from 'react';
import { useCourseStore } from '@/stores/courseStore';
import { Image as ImageIcon, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Progress } from '@/components/ui/progress';

export default function CourseThumbnail() {
  const {
    thumbnailPreview,
    uploadProgress,
    setForm,
    setThumbnailPreview,
    setUploadProgress,
  } = useCourseStore();

  // Handle thumbnail upload
  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setForm({ thumbnail: file });
      const reader = new FileReader();
      reader.onload = (ev) => {
        setThumbnailPreview(ev.target?.result as string);
      };
      reader.readAsDataURL(file);
      // Simulate upload progress
      setUploadProgress(0);
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        setUploadProgress(progress);
        if (progress >= 100) {
          clearInterval(interval);
        }
      }, 80);
    }
  };

  return (
    <div className="w-full md:w-64 flex flex-col items-center justify-center relative">
      <label className={`w-full aspect-video flex items-center justify-center border-2 ${thumbnailPreview ? 'border-neutral-200' : 'border-dashed border-neutral-400'} rounded-lg cursor-pointer bg-neutral-50 hover:bg-neutral-100 transition group relative overflow-hidden`}>
        <motion.div
          className="absolute left-2 top-2 z-10"
          initial={false}
          animate={thumbnailPreview ? { color: '#6366f1' } : { color: '#737373' }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          <button
            type="button"
            className="bg-white/50 p-2 rounded-md flex items-center justify-center cursor-pointer transition-colors duration-150 hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            tabIndex={-1}
            style={{ pointerEvents: 'none' }}
          >
            <ImageIcon className="w-4 h-4" />
          </button>
        </motion.div>
        {thumbnailPreview ? (
          typeof thumbnailPreview === 'string' && thumbnailPreview?.startsWith('data:')
            ? <Image src={thumbnailPreview || ''} alt="Thumbnail preview" fill className="object-cover w-full h-full rounded-lg" />
            : <Image src={thumbnailPreview || ''} alt="Thumbnail preview" fill className="object-cover w-full h-full rounded-lg" />
        ) : (
          <span className="text-neutral-400 pl-8 w-full text-center block">No thumbnail. Click to upload.</span>
        )}
        <input
          type="file"
          accept="image/*"
          className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-20"
          style={{ display: 'block' }}
          onChange={handleThumbnailChange}
          tabIndex={0}
          aria-label="Upload course thumbnail"
        />
      </label>
      {thumbnailPreview && (
        <button
          type="button"
          className="absolute top-2 right-2 bg-white/50 p-2 rounded-md flex items-center justify-center z-30 hover:bg-red-100 transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
          onClick={e => {
            e.preventDefault();
            setThumbnailPreview(null);
            setForm({ thumbnail: undefined });
          }}
          tabIndex={0}
        >
          <Trash2 className="w-4 h-4 text-red-500" />
        </button>
      )}
      {uploadProgress > 0 && uploadProgress < 100 && (
        <div className="w-full mt-2"><Progress value={uploadProgress} /></div>
      )}
    </div>
  );
} 