import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateCourseDto } from "../dtos/CreateCourseDto";



@Injectable()
export class CourseRepository{
    constructor(
        private readonly  prisma :PrismaService
    ){}
    async  createCoruse(id:string ) : Promise<{id:string}>{
        return this.prisma.course.create({
            data:{
                creatorId:id 
            }, 
            select:{
                id:true
            }
        })
    }
    async updateCourse(dto: Partial<CreateCourseDto>, courseId: string): Promise<any> {
        // Extract scalar fields
        const {
            title, description, grade, price, state, thumbnail,
            lessons, assignments, quizzes, announcements
        } = dto;

        // Build the data object for Prisma
        const data: any = {};
        if (title !== undefined) data.title = title;
        if (description !== undefined) data.description = description;
        if (grade !== undefined) data.grade = grade;
        if (price !== undefined) data.price = price;
        if (state !== undefined) data.state = state as any;
        if (thumbnail !== undefined) data.thumbnail = thumbnail;
        return this.prisma.course.update({
            where: { id: courseId },
            data
        });
    }
}