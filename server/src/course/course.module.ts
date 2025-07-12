import { Module } from '@nestjs/common';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';
import { CourseRepository } from './repositories/Course.repo';
import { TeacherCourseRepository } from './teacher/repositories/teacherCourser.repo';
import { TeacherCoursesServices } from './teacher/teacherCourse.services';
import { TeacherCoursesController } from './teacher/teacherCourse.controller';


@Module({
  controllers: [CourseController , TeacherCoursesController ],
  providers: [CourseService,CourseRepository , TeacherCourseRepository , TeacherCoursesServices],
  exports: [CourseService , TeacherCoursesServices],
})
export class CourseModule {}
