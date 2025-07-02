import { Controller, Get, Query } from '@nestjs/common';
import { CourseService } from './course.service';
import { PrismaService } from '../prisma/prisma.service';

@Controller('course')
export class CourseController {
  constructor(
    private readonly courseService: CourseService,
    private readonly prisma: PrismaService,
  ) {}

  @Get('health')
  async health() {
    // Fetch seeded IDs dynamically
    const teacher = await this.prisma.user.findUnique({ where: { email: 'teacher@example.com' } });
    const student = await this.prisma.user.findUnique({ where: { email: 'student@example.com' } });
    const course = await this.prisma.course.findFirst({ where: { title: 'Sample Course' } });
    if (!teacher || !student || !course) {
      return { ok: false, error: 'Seed data not found' };
    }
    const studentCards = await this.courseService.getStudentCourseCards(student.id, 1, 2);
    const teacherCards = await this.courseService.getTeacherCourseCards(teacher.id, 1, 2);
    const studentView = await this.courseService.getStudentCourseView(course.id, student.id);
    const teacherView = await this.courseService.getTeacherCourseView(course.id, teacher.id);
    return {
      ok: true,
      studentCards,
      teacherCards,
      studentView,
      teacherView,
    };
  }

  @Get('student-cards')
  getStudentCards(@Query('studentId') studentId: string, @Query('page') page = 1, @Query('itemPerPage') itemPerPage = 20) {
    return this.courseService.getStudentCourseCards(studentId, Number(page), Number(itemPerPage));
  }

  @Get('teacher-cards')
  getTeacherCards(@Query('teacherId') teacherId: string, @Query('page') page = 1, @Query('itemPerPage') itemPerPage = 20) {
    return this.courseService.getTeacherCourseCards(teacherId, Number(page), Number(itemPerPage));
  }

  @Get('student-view')
  getStudentView(@Query('courseId') courseId: string, @Query('studentId') studentId: string) {
    return this.courseService.getStudentCourseView(courseId, studentId);
  }

  @Get('teacher-view')
  getTeacherView(@Query('courseId') courseId: string, @Query('teacherId') teacherId: string) {
    return this.courseService.getTeacherCourseView(courseId, teacherId);
  }
}
