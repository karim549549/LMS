import { Injectable, NotFoundException } from "@nestjs/common";
import { TeacherCourseRepository } from "./repositories/teacherCourser.repo";
import { TeacherCoursesQueryFilter } from "./dtos/TeacherCourseQueryFilter";
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
} 