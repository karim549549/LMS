import { Body, Controller, HttpCode, HttpStatus, Param, Patch, Post, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CourseService } from './course.service';
import { CustomRequest } from 'y/types';
import { JwtAccessGuard } from 'src/auth/guards/jwt-access.guard';
import { CreateCourseDto} from './dtos/CreateCourseDto';

@Controller('course')
export class CourseController {
  constructor(
    private readonly courseService: CourseService,
  ) {}


  @Post()
  @UseGuards(JwtAccessGuard)
  @HttpCode(HttpStatus.CREATED)
  async createCourseDraft(@Req() req : CustomRequest){
    return await this.courseService.createDraftCourse(req.user.sub); 
  }

  @Patch(':id')
  @UseGuards(JwtAccessGuard)
  @UseInterceptors(FileInterceptor('thumbnail'))
  @HttpCode(HttpStatus.ACCEPTED)
  async updateCourse(
    @Param('id') courseId: string,
    @Body() dto: Partial<CreateCourseDto>,
    @UploadedFile() thumbnail?: any
  ) {
    return await this.courseService.updateCourse(dto, courseId, thumbnail);
  }
}
