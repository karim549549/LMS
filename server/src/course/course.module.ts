import { Module } from '@nestjs/common';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';
import { PrismaService } from '../prisma/prisma.service';
import { StudentViewRepo } from './repositories/StudentView.repo';
import { TeacherViewRepo } from './repositories/TeacherView.repo';
import { StudentCardViewRepo } from './repositories/StudentCardView.repo';
import { TeacherCardViewRepo } from './repositories/TeacherCardView.repo';

@Module({
  controllers: [CourseController],
  providers: [CourseService, PrismaService, StudentViewRepo, TeacherViewRepo, StudentCardViewRepo, TeacherCardViewRepo],
  exports: [CourseService],
})
export class CourseModule {}
