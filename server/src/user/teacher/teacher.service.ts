import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { TeacherRepository } from './teacher.repo';
import { UserService } from '../user.service';
import { TokenFactory } from 'src/auth/tokenFactory';
import { ConfigService } from '@nestjs/config';
import { EmailService } from 'src/email/email.service';

export interface InviteAssistantDto {
  email: string;
  courseId?: string;
  permissions?: string[];
  message?: string;
}

@Injectable()
export class TeacherService {
  constructor(
    private readonly teacherRepo: TeacherRepository,
    private readonly userService : UserService , 
    private readonly tokenFactory : TokenFactory, 
    private readonly configService : ConfigService,
    private readonly emailServcie : EmailService
  ) {}

  async createAssistantInvitation(teacherId: string, dto: InviteAssistantDto): Promise<any> {
    const foundUser = await this.userService.findUserByEmailOrNull(dto.email);
    if (foundUser) throw new BadRequestException('Email is already registered.');



    const token = await this.tokenFactory.createInvitationToken(dto.email);
    const invitation = await this.teacherRepo.createAssistantInvitation({
      email: dto.email,
      invitedBy: teacherId,
      courseId: dto.courseId,
      permissions: dto.permissions,
      message: dto.message,
      token,
    });

    // Build invitation link
    const frontendUrl = this.configService.get<string>('FRONTEND_URL') || 'http://localhost:3000';
    const invitationLink = `${frontendUrl}/invite/assistant?token=${token}`;

    // Get teacher info for email
    const teacher = await this.userService.findUserById(teacherId);

    // Send invitation email
    await this.emailServcie.sendEmail({
      to: dto.email,
      subject: 'You are invited to become an Assistant',
      template: 'invitation',
      variables: {
        recipientEmail: dto.email,
        teacherName: teacher.name,
        teacherEmail: teacher.email,
        invitationLink,
        message: dto.message,
        year: new Date().getFullYear(),
      },
    });

    return { success: true, invitation };
  }

  async getTeacherAssistants(teacherId: string) {
    return this.teacherRepo.getTeacherAssistants(teacherId);
  }
}
