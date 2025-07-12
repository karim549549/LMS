import { Controller, Patch, Param, Body, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { LessonService } from './lesson.service';
import { LessonDto } from '../course/dtos/CreateCourseDto';
import { JwtAccessGuard } from '../auth/guards/jwt-access.guard';

@Controller('lesson')
export class LessonController {
  constructor(private readonly lessonService: LessonService) {}

  @Patch(':courseId')
  @UseGuards(JwtAccessGuard)
  @HttpCode(HttpStatus.ACCEPTED)
  async updateLessons(
    @Param('courseId') courseId: string,
    @Body() lessons: LessonDto[]
  ) {
    return this.lessonService.updateLessons(courseId, lessons);
  }
}
