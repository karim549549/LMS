import { Controller, Get, HttpCode, HttpStatus, Param, Query, Req, UseGuards, Patch, Body } from "@nestjs/common";
import { TeacherCoursesServices } from "./teacherCourse.services";
import { CustomRequest } from "y/types";
import { TeacherCoursesQueryFilter } from "./dtos/TeacherCourseQueryFilter";
import { UpdateCourseInfoDto } from "./dtos/UpdateCourseDto";
import { JwtAccessGuard } from "src/auth/guards/jwt-access.guard";

@Controller('teacher')
@UseGuards(JwtAccessGuard)
export class  TeacherCoursesController{
    constructor(
        private readonly teacherCoursesService: TeacherCoursesServices
    ){}
    @Get()
    @HttpCode(HttpStatus.ACCEPTED)
    async getTeacherCourses(
        @Req() req : CustomRequest , 
        @Query() filter : TeacherCoursesQueryFilter
    )
    {
        return await this.teacherCoursesService.getTeacherCourses(filter , req.user.sub)
    }

    @Get(':courseId')
    @HttpCode(HttpStatus.ACCEPTED)
    async getCourseEditManageData(@Req() req : CustomRequest , 
    @Param('courseId') courseId : string)
    {
        return  await this.teacherCoursesService.getCourseEditManageData(req.user.sub , courseId);
    }

    @Patch('courseInfo/:courseId')
    @HttpCode(HttpStatus.OK)
    async updateCourseInfo(
        @Req() req: CustomRequest,
        @Param('courseId') courseId: string,
        @Body() updateData: UpdateCourseInfoDto
    ) {
        return await this.teacherCoursesService.updateCourseInfo(req.user.sub, courseId, updateData);
    }
    
}