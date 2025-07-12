import { Injectable } from '@nestjs/common';
import { QuizRepository } from './quiz.repository';
import { QuizDto } from '../course/dtos/CreateCourseDto';

@Injectable()
export class QuizService {
  constructor(private readonly quizRepo: QuizRepository) {}

  async updateQuizzes(courseId: string, quizzes: QuizDto[]): Promise<any> {
    return this.quizRepo.updateQuizzes(courseId, quizzes);
  }
}
