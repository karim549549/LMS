import { Injectable, NotFoundException } from "@nestjs/common";
import { TeacherCourseRepository } from "./repositories/teacherCourser.repo";
import { TeacherCoursesQueryFilter } from "./dtos/TeacherCourseQueryFilter";
import { UpdateCourseInfoDto } from "./dtos/UpdateCourseDto";
import { PaginatedResult } from "y/types";
import { Course } from "@prisma/client";
import { CourseEditManageView } from "y/types/courses/CourseEditManageView";

@Injectable()
export  class  TeacherCoursesServices{
    constructor(
        private readonly teacherCourseRepo :  TeacherCourseRepository
    ){}
    async getTeacherCourses(filter :  TeacherCoursesQueryFilter ,   teacherId: string ) : Promise<PaginatedResult<Omit<Course , 'deletedAt'|'creatorId'>>> {
        return await   this.teacherCourseRepo.getTeacherCourses(filter , teacherId);
    }
    async getCourseEditManageData(teacherId: string , courseId: string)
    :Promise<CourseEditManageView>{
        const result  = await this.teacherCourseRepo.getCourseEditManageData(teacherId , courseId);
        if(!result) 
            throw new NotFoundException('Course Not Found')
        return  result  ;
    }
    async updateCourseInfo(teacherId: string, courseId: string, updateData: UpdateCourseInfoDto) 
        :Promise<{ id: string; title: string; description: string; grade: string | null; price: number }> {
        const course = await this.teacherCourseRepo.getCourseEditManageData(teacherId, courseId);
        if (!course) {
            throw new NotFoundException('Course Not Found');
        }
        const updatedCourse = await this.teacherCourseRepo.updateCourseInfo(courseId, updateData);
        if (!updatedCourse) {
            throw new NotFoundException('Failed to update course');
        }
        
        return updatedCourse;
    }
} 