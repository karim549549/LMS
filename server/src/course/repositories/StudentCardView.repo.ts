import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { StudentCourseCardView, studentCourseCardSelect } from 'libs/types/src/types/courses/StudentCourseCardView';
import { PaginatedResult, PaginationMeta } from 'libs/types/src/types/pagination.types';

@Injectable()
export class StudentCardViewRepo {
  constructor(private readonly prisma: PrismaService) {}

  async getStudentCourseCards(studentId: string, page = 1, itemPerPage = 20): Promise<PaginatedResult<StudentCourseCardView>> {
    const skip = (page - 1) * itemPerPage;
    const [courses, total] = await Promise.all([
      this.prisma.course.findMany({
        skip,
        take: itemPerPage,
        select: studentCourseCardSelect,
      }),
      this.prisma.course.count(),
    ]);
    const data = courses.map((course: any) => ({
      id: course.id,
      title: course.title,
      thumbnail: course.thumbnail,
      grade: course.grade,
      price: course.price,
      isEnrolled: course.enrollments.some((e: any) => e.studentId === studentId),
      progress: course.enrollments.find((e: any) => e.studentId === studentId)?.progress,
      teacherName: course.creator.name,
    }));
    const totalPages = Math.ceil(total / itemPerPage);
    const meta: PaginationMeta = {
      currentPage: page,
      itemPerPage,
      totalPages,
      hasNext: page < totalPages,
      hasPrev: page > 1,
    };
    return { data, meta };
  }
} 