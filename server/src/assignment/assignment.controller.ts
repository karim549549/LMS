import { Controller, Patch, Param, Body, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { AssignmentService } from './assignment.service';
import { AssignmentDto } from '../course/dtos/CreateCourseDto';
import { JwtAccessGuard } from '../auth/guards/jwt-access.guard';

@Controller('assignment')
export class AssignmentController {
  constructor(private readonly assignmentService: AssignmentService) {}

  @Patch(':courseId')
  @UseGuards(JwtAccessGuard)
  @HttpCode(HttpStatus.ACCEPTED)
  async updateAssignments(
    @Param('courseId') courseId: string,
    @Body() assignments: AssignmentDto[]
  ) {
    return this.assignmentService.updateAssignments(courseId, assignments);
  }
}
