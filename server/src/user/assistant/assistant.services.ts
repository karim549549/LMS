import { Injectable, UnauthorizedException, BadRequestException, NotFoundException } from '@nestjs/common';
import { AssistantRepository } from './assistant.repo';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user.service';
import { BlobService } from 'src/blob/blob.service';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { AuthRepsonse } from 'src/auth/authResposnse.type';

@Injectable()
export class AssistantService {
  constructor(
    private readonly assistantRepo: AssistantRepository,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly blobService: BlobService,
    private readonly configService: ConfigService,
  ) {}

  async registerAssistant(data: any): Promise<AuthRepsonse> {
    // 1. Verify token and extract email
    const email = this.verifyInvitationToken(data.token);
    // 2. Fetch invitation by email
    const invitation = await this.getInvitationOrThrow(email);
    // 3. Hash password
    const hashPassword = await bcrypt.hash(data.password, 10);
    // 4. Handle avatar upload (optional)
    const avatarUrl = await this.handleAvatarUpload(email, data.avatar);
    // 5. Create user
    const user = await this.createAssistantUser(email, hashPassword, data, invitation, avatarUrl);
    // 6. Delete invitation
    await this.cleanupInvitation(invitation.id);
    // 7. Return AuthResponse
    return {
      user: {
        email: user.email,
        id: user.id,
        role: user.role,
        isProfileCompleted: false,
      },
    };
  }

  private verifyInvitationToken(token: string): string {
    const invitationSecret = this.configService.get<string>('JWT_INVITATION_SECRET');
    let payload: any;
    try {
      payload = this.jwtService.verify(token, { secret: invitationSecret, ignoreExpiration: false });
    } catch (e) {
      throw new UnauthorizedException('Invalid or expired invitation token');
    }
    const email = payload.email;
    if (!email) throw new BadRequestException('Token does not contain email');
    return email;
  }

  private async getInvitationOrThrow(email: string) {
    const invitation = await this.assistantRepo.findInvitationByEmail(email);
    if (!invitation) throw new NotFoundException('Invitation not found or already used');
    return invitation;
  }

  private async handleAvatarUpload(email: string, avatar: any): Promise<string | undefined> {
    if (avatar && avatar.buffer) {
      const uploaded = await this.blobService.uploadAvatar(email, avatar.buffer, avatar.originalname);
      return uploaded?.path || uploaded?.fullPath || undefined;
    }
    return undefined;
  }

  private async createAssistantUser(email: string, hashPassword: string, data: any, invitation: any, avatarUrl?: string) {
    const name = `${data.firstName} ${data.lastName}`.trim();
    const user = await this.userService.createUser({
      email,
      hashPassword,
      name,
    });
    await this.userService.updateUser(user.id, {
      role: 'ASSISTANT',
      teacherId: invitation.invitedBy,
      isInvited: true,
      ...(avatarUrl ? { avatar: avatarUrl } : {}),
    });
    if (avatarUrl) user.avatar = avatarUrl;
    return user;
  }

  private async cleanupInvitation(invitationId: string) {
    await this.assistantRepo.deleteInvitationById(invitationId);
  }
}
