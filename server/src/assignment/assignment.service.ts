import { Injectable } from '@nestjs/common';
import { AssignmentRepository } from './assignment.repository';
import { AssignmentDto } from '../course/dtos/CreateCourseDto';

@Injectable()
export class AssignmentService {
  constructor(private readonly assignmentRepo: AssignmentRepository) {}

  async updateAssignments(courseId: string, assignments: AssignmentDto[]): Promise<any> {
    return this.assignmentRepo.updateAssignments(courseId, assignments);
  }
}
