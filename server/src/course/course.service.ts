import { Injectable, NotFoundException } from '@nestjs/common';
import { StudentViewRepo } from './repositories/StudentView.repo';
import { TeacherViewRepo } from './repositories/TeacherView.repo';
import { StudentCardViewRepo } from './repositories/StudentCardView.repo';
import { TeacherCardViewRepo } from './repositories/TeacherCardView.repo';
import { PaginatedResult } from 'libs/types/src/types/pagination.types';
import { StudentCourseCardView } from 'libs/types/src/types/courses/StudentCourseCardView';
import { TeacherCourseCardView } from 'libs/types/src/types/courses/TeacherCourseCardView';
import { StudentCourseView } from 'libs/types/src/types/courses/StudentCourseView';
import { TeacherCourseView } from 'libs/types/src/types/courses/TeacherCourseView';

@Injectable()
export class CourseService {
  constructor(
    private readonly studentViewRepo: StudentViewRepo,
    private readonly teacherViewRepo: TeacherViewRepo,
    private readonly studentCardViewRepo: StudentCardViewRepo,
    private readonly teacherCardViewRepo: TeacherCardViewRepo,
  ) {}

  getStudentCourseCards(studentId: string, page = 1, itemPerPage = 20): Promise<PaginatedResult<StudentCourseCardView>> {
    return this.studentCardViewRepo.getStudentCourseCards(studentId, page, itemPerPage);
  }

  getTeacherCourseCards(teacherId: string, page = 1, itemPerPage = 20): Promise<PaginatedResult<TeacherCourseCardView>> {
    return this.teacherCardViewRepo.getTeacherCourseCards(teacherId, page, itemPerPage);
  }

  async getStudentCourseView(courseId: string, studentId: string): Promise<StudentCourseView> {
    const result = await this.studentViewRepo.getStudentCourseView(courseId, studentId);
    if (!result) throw new NotFoundException('Course not found');
    return result;
  }

  async getTeacherCourseView(courseId: string, teacherId: string): Promise<TeacherCourseView> {
    const result = await this.teacherViewRepo.getTeacherCourseView(courseId, teacherId);
    if (!result) throw new NotFoundException('Course not found');
    return result;
  }
}
