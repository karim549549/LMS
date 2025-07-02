import { Injectable, Inject } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class BlobService {
    constructor(
        @Inject('SUPABASE_CLIENT') private readonly supabase: SupabaseClient,
    ){}

    // Create a bucket for a course and initialize folder structure
    async createCourseBucket(courseId: string, courseName: string, createdAt: Date) {
        const timestamp = Math.floor(createdAt.getTime() / 1000);
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
}
