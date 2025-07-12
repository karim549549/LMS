import { Injectable } from '@nestjs/common';
import { CourseRepository } from './repositories/Course.repo';
import { CreateCourseDto } from './dtos/CreateCourseDto';
import { BlobService } from 'src/blob/blob.service';

@Injectable()
export class CourseService {
  constructor(
    private readonly  courseRepo : CourseRepository ,
    private readonly  blob :  BlobService
  ) {}

  async  createDraftCourse(teacherId : string ): Promise<{id: string}>{
    const course =  await this.courseRepo.createCoruse(teacherId);
    await this.blob.createCourseBucket(course.id);
    return  course;
  }


  async updateCourse(dto : Partial<CreateCourseDto>, courseId: string, thumbnail?: any):Promise<any>{
    if (thumbnail) {
      const url = await this.blob.uploadCourseThumbnail(courseId, thumbnail);
      dto.thumbnail = url;
    }
    return this.courseRepo.updateCourse(dto, courseId);
  }
}
