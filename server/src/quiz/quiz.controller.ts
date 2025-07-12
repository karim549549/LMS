import { Controller, Patch, Param, Body, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { QuizDto } from '../course/dtos/CreateCourseDto';
import { JwtAccessGuard } from '../auth/guards/jwt-access.guard';

@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Patch(':courseId')
  @UseGuards(JwtAccessGuard)
  @HttpCode(HttpStatus.ACCEPTED)
  async updateQuizzes(
    @Param('courseId') courseId: string,
    @Body() quizzes: QuizDto[]
  ) {
    return this.quizService.updateQuizzes(courseId, quizzes);
  }
}
