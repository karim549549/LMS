import React, { useState, useEffect } from 'react';
import { useCourseStore } from '@/stores/courseStore';
import { Image as ImageIcon, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Progress } from '@/components/ui/progress';
import { courseApis } from '@/services/apis/courseApi';
import { useParams } from 'next/navigation';
import { toast } from 'sonner';

interface   CourseThumbnailProps{
  thumbnail: string | File | null
}

export default function CourseThumbnail({ thumbnail } : CourseThumbnailProps) {
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const setThumbnail = useCourseStore(state => state.setThumbnail);
  const params = useParams();
  const courseId = params?.id as string;

  useEffect(() => {
    if (typeof thumbnail === 'string') {
      setThumbnailPreview(thumbnail);
    } else if (!thumbnail) {
      setThumbnailPreview(null);
    }
  }, [thumbnail]);

  // Handle thumbnail upload
  const handleThumbnailChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setThumbnail(file);
      const reader = new FileReader();
      reader.onload = (ev) => {
        setThumbnailPreview(ev.target?.result as string);
      };
      reader.readAsDataURL(file);
      setUploadProgress(10);
      // Upload to backend
      const { data, error } = await courseApis.updateCourseThumbnail(courseId, file);
      setUploadProgress(100);
      if (error) {
        toast.error('Failed to upload thumbnail. Please try again.');
      }
      if (data?.thumbnail) setThumbnail(data.thumbnail);
    }
  };

  // Handle thumbnail delete
  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault();
    setThumbnailPreview(null);
    setThumbnail(null);
    setUploadProgress(10);
    const { data, error } = await courseApis.updateCourseThumbnail(courseId, null);
    setUploadProgress(100);
    if (error) {
      toast.error('Failed to remove thumbnail. Please try again.');
    }
    if (data?.thumbnail === null) setThumbnail(null);
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
          <Image src={thumbnailPreview} alt="Thumbnail preview" fill className="object-cover w-full h-full rounded-lg" />
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
          onClick={handleDelete}
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