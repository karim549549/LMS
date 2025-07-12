import { Injectable } from '@nestjs/common';
import { LessonRepository } from './lesson.repository';
import { LessonDto } from '../course/dtos/CreateCourseDto';

@Injectable()
export class LessonService {
  constructor(private readonly lessonRepo: LessonRepository) {}

  async updateLessons(courseId: string, lessons: LessonDto[]): Promise<any> {
    return this.lessonRepo.updateLessons(courseId, lessons);
  }
}
