import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AssistantRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findInvitationByEmail(email: string) {
    return this.prisma.invitation.findFirst({ where: { email, isUsed: false } });
  }

  async deleteInvitationById(id: string) {
    return this.prisma.invitation.delete({ where: { id } });
  }
}
