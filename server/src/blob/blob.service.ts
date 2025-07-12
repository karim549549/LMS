import { Injectable, Inject } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class BlobService {
    constructor(
        @Inject('SUPABASE_CLIENT') private readonly supabase: SupabaseClient,
    ){}
    async createCourseBucket(courseId: string) {
        const timestamp = Math.floor(Date.now() / 1000);
        const bucketName = `course_${courseId}_${timestamp}`;
        const { error } = await this.supabase.storage.createBucket(bucketName, { public: false });
        if (error) throw error;
        const folders = [
            'meta/',
            'templates/',
            'quizzes/',
            'assignments/',
            'submissions/',
            'lessons/',
            'announcements/',
            'resources/'
        ];
        const emptyFile = Buffer.from('');
        for (const folder of folders) {
            await this.supabase.storage.from(bucketName).upload(`${folder}.keep`, emptyFile, { upsert: true });
        }
        return bucketName;
    }

    // Teacher video bucket management
    async getTeacherVideoBucket(teacherId: string): Promise<string> {
        const bucketName = `teacher_${teacherId}_videos`;
        const { data: buckets } = await this.supabase.storage.listBuckets();
        const bucketExists = buckets?.some(bucket => bucket.name === bucketName);
        
        if (!bucketExists) {
            await this.createTeacherVideoBucket(teacherId);
        }
        
        return bucketName;
    }

    async createTeacherVideoBucket(teacherId: string): Promise<string> {
        const bucketName = `teacher_${teacherId}_videos`;
        const { error } = await this.supabase.storage.createBucket(bucketName, { 
            public: false,
            allowedMimeTypes: ['video/mp4', 'video/webm', 'video/avi', 'video/mov']
        });
        
        if (error) throw error;
        return bucketName;
    }

    async uploadTeacherVideo(teacherId: string, file: Buffer, filename: string) {
        const bucketName = await this.getTeacherVideoBucket(teacherId);
        const path = `${filename}`;
        
        const { data, error } = await this.supabase.storage
            .from(bucketName)
            .upload(path, file, { 
                upsert: true,
                contentType: 'video/mp4'
            });
            
        if (error) throw error;
        
        // Get public URL
        const { data: urlData } = this.supabase.storage
            .from(bucketName)
            .getPublicUrl(path);
            
        return {
            path: data.path,
            url: urlData.publicUrl,
            size: file.length
        };
    }

    async listTeacherVideos(teacherId: string) {
        const bucketName = await this.getTeacherVideoBucket(teacherId);
        const { data, error } = await this.supabase.storage
            .from(bucketName)
            .list('', { limit: 100 });
            
        if (error) throw error;
        
        return data?.map(file => ({
            name: file.name,
            size: file.metadata?.size,
            created_at: file.created_at,
            url: this.supabase.storage.from(bucketName).getPublicUrl(file.name).data.publicUrl
        })) || [];
    }

    async deleteTeacherVideo(teacherId: string, filename: string) {
        const bucketName = await this.getTeacherVideoBucket(teacherId);
        const { error } = await this.supabase.storage
            .from(bucketName)
            .remove([filename]);
            
        if (error) throw error;
        return { success: true };
    }

    async uploadAvatar(userId: string, file: Buffer | Blob, filename?: string) {
        const path = `${userId}/${filename || 'avatar.png'}`;
        const { data, error } = await this.supabase.storage.from('users-avatars').upload(path, file, { upsert: true });
        if (error) throw error;
        return data;
    }
    
    async deleteAvatar(userId: string, filename = 'avatar.png') {
        const path = `${userId}/${filename}`;
        const { data, error } = await this.supabase.storage.from('users-avatars').remove([path]);
        if (error) throw error;
        return data;
    }

    async uploadCourseThumbnail(courseId: string, file: Buffer | { buffer: Buffer, originalname?: string }): Promise<string> {
        // Find the latest course bucket for this courseId
        const { data: buckets, error: listError } = await this.supabase.storage.listBuckets();
        if (listError) throw listError;
        // Find the bucket with the courseId in its name and the latest timestamp
        const courseBuckets = buckets?.filter(b => b.name.startsWith(`course_${courseId}_`));
        if (!courseBuckets || courseBuckets.length === 0) throw new Error('Course bucket not found');
        // Sort by timestamp descending
        const latestBucket = courseBuckets.sort((a, b) => b.name.localeCompare(a.name))[0];
        const bucketName = latestBucket.name;
        // Prepare file path
        const filename = (file as any).originalname || 'thumbnail.png';
        const path = `meta/${filename}`;
        // Upload file
        const { data, error } = await this.supabase.storage.from(bucketName).upload(path, (file as any).buffer || file, { upsert: true });
        if (error) throw error;
        // Get public URL
        const { data: urlData } = this.supabase.storage.from(bucketName).getPublicUrl(path);
        return urlData.publicUrl;
    }
}
