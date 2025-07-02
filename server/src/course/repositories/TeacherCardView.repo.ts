import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { TeacherCourseCardView, teacherCourseCardSelect } from 'libs/types/src/types/courses/TeacherCourseCardView';
import { PaginatedResult, PaginationMeta } from 'libs/types/src/types/pagination.types';

@Injectable()
export class TeacherCardViewRepo {
  constructor(private readonly prisma: PrismaService) {}

  async getTeacherCourseCards(teacherId: string, page = 1, itemPerPage = 20): Promise<PaginatedResult<TeacherCourseCardView>> {
    const skip = (page - 1) * itemPerPage;
    const [courses, total] = await Promise.all([
      this.prisma.course.findMany({
        where: { creatorId: teacherId },
        skip,
        take: itemPerPage,
        select: teacherCourseCardSelect,
      }),
      this.prisma.course.count({ where: { creatorId: teacherId } }),
    ]);
    const data = courses.map((course: any) => ({
      id: course.id,
      title: course.title,
      thumbnail: course.thumbnail,
      grade: course.grade,
      price: course.price,
      enrolledCount: course.enrollments.length,
      visibility: course.visibility,
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