import { Controller, Get, Patch, Body, Req, UseGuards, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { CustomRequest } from 'y/types';
import { JwtAccessGuard } from 'src/auth/guards/jwt-access.guard';

@Controller('teacher')
@UseGuards(JwtAccessGuard)
export class TeacherController {
  constructor(
    private readonly teacherService: TeacherService,
  ) {}

  @Post('invite-assistant')
  @HttpCode(HttpStatus.OK)
  async inviteAssistant(
    @Body() dto: {
      email: string;
      courseId?: string;
      permissions?: string[];
      message?: string;
    },
    @Req() req: CustomRequest
  ) {
    return await this.teacherService.createAssistantInvitation(req.user.sub , dto);
  }

  @Get('assistants')
  async getTeacherAssistants(@Req() req: CustomRequest) {
    const teacherId = req.user.sub;
    return this.teacherService.getTeacherAssistants(teacherId);
  }
}
