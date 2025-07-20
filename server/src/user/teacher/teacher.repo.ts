import { Injectable } from '@nestjs/common';
import { ROLE } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TeacherRepository {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async getTeacherAssistants(teacherId: string): Promise<any[]> {
    return this.prisma.user.findMany({
      where: {
        role: 'ASSISTANT',
        teacherId: teacherId,
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        avatar: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async createAssistant(data: {
    name: string;
    email: string;
    hashPassword: string;
    phone?: string;
    teacherId: string;
  }): Promise<any> {
    return this.prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        hashPassword: data.hashPassword,
        phone: data.phone,
        role: 'ASSISTANT',
        teacherId: data.teacherId,
        isInvited: false,
        isEmailVerified: false,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        teacherId: true,
        createdAt: true,
      },
    });
  }

  async createAssistantInvitation(data: {
    email: string;
    invitedBy: string;
    courseId?: string;
    permissions?: string[];
    message?: string;
    token : string 
  }): Promise<any> {
    return this.prisma.invitation.create({
      data: {
        email: data.email,
        role: ROLE.ASSISTANT,
        token: data.token, 
        invitedBy: data.invitedBy,
        courseId: data.courseId,
        permissions: data.permissions || [],
        message: data.message,
      },
    });
  }

  async isEmailUnique(email: string): Promise<boolean> {
    const existingUser = await this.prisma.user.findUnique({
      where: { email },
      select: { id: true },
    });
    return !existingUser;
  }
}
