import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { TeacherCoursesQueryFilter } from "../dtos/TeacherCourseQueryFilter";
import { PaginatedResult } from "y/types";
import { Course } from "@prisma/client";
import { CourseEditManageView } from "y/types/courses/CourseEditManageView";


@Injectable()

export class TeacherCourseRepository{
    constructor(
        private readonly prisma : PrismaService
    ){}
    private TeacherCoursesCardView = {
        id: true,
        title: true,
        description: true,
        grade: true,
        thumbnail: true,
        price: true,
        state: true,
        totalDuration: true,
        totalLessons: true,
        totalEnrollments: true,
        createdAt: true,
        updatedAt: true,
        publishAt: true,
    };
    async getTeacherCourses(filter: TeacherCoursesQueryFilter, teacherId: string): Promise<PaginatedResult<Omit<Course , 'deletedAt'|'creatorId'>>> {
        // Build Prisma where clause
        const where: any = {
            creatorId: teacherId,
        };
        if (filter.title) {
            where.title = { contains: filter.title, mode: 'insensitive' };
        }
        if (filter.state) {
            where.state = filter.state;
        }
        if (filter.grade) {
            where.grade = filter.grade;
        }

        // Sorting
        let orderBy: any = { createdAt: 'desc' };
        if (filter.orderBy) {
            switch (filter.orderBy) {
                case 'newest':
                    orderBy = { createdAt: 'desc' };
                    break;
                case 'oldest':
                    orderBy = { createdAt: 'asc' };
                    break;
                case 'alphabetic':
                    orderBy = { title: 'asc' };
                    break;
                case 'highest_enrollments':
                    orderBy = { totalEnrollments: 'desc' };
                    break;
                case 'lowest_price':
                    orderBy = { price: 'asc' };
                    break;
                case 'highest_price':
                    orderBy = { price: 'desc' };
                    break;
            }
        }

        const take = filter.limit ?? 10;
        const skip = filter.skip ?? 0;

        const [data, total] = await Promise.all([
            this.prisma.course.findMany({
                where,
                orderBy,
                take,
                skip,
                select: this.TeacherCoursesCardView,
            }),
            this.prisma.course.count({ where }),
        ]);
        const meta = {
            currentPage: Math.floor(skip / take) + 1,
            itemPerPage: take,
            totalPages: Math.ceil(total / take),
            hasNext: skip + take < total,
            hasPrev: skip > 0,
        };

        return { data, meta };
    }

    async getCourseEditManageData(teacherId: string  , courseId: string):Promise<CourseEditManageView | null>{
        const course = await this.prisma.course.findFirst({
            where: {
                id: courseId,
                creatorId: teacherId
            },
            include: {
                courseAssistants: {
                  include: {
                    assistant: true 
                  }
                }
            }
        });
        if (!course) return null;
        return {
            id: course.id,
            title: course.title,
            description: course.description,
            grade: course.grade,
            thumbnail: course.thumbnail,
            price: course.price,
            state: course.state,
            totalDuration: course.totalDuration,
            totalLessons: course.totalLessons,
            totalEnrollments: course.totalEnrollments,
            createdAt: course.createdAt.toISOString(),
            updatedAt: course.updatedAt.toISOString(),
            publishAt: course.publishAt ? course.publishAt.toISOString() : null,
            deletedAt: course.deletedAt ? course.deletedAt.toISOString() : null,
            creatorId: course.creatorId,
            courseAssistants: course.courseAssistants.map(a => ({
                id: a.id,
                assignedAt: a.assignedAt.toISOString(),
                permissions: a.permissions,
                assistant: {
                    id: a.assistant.id,
                    name: a.assistant.name,
                    email: a.assistant.email,
                    avatar: a.assistant.avatar ?? null,
                    phone: a.assistant.phone ?? null,
                    role: a.assistant.role,
                    grade: a.assistant.grade ?? null,
                }
            })),
        };
    }
}