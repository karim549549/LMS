import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from './user.repo.ts/UserRepo';
import { User } from '@prisma/client';
import { UserLoginView, UserProfileView, StudentQueryFilter } from './user.type';
import { UpdateUserDto } from './dtos/UpdateUserDto';

@Injectable()
export class UserService {
  constructor(private readonly userRepo: UserRepository) {}

  async findUserByEmail(email: string):Promise<UserLoginView> {
    const user = await this.userRepo.getUserByEmail(email);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async findUserByEmailOrNull(email: string): Promise<UserLoginView | null> {
    return await this.userRepo.getUserByEmail(email);
  }

  async createUser(data: { email: string; hashPassword: string; name: string }) {
    return await this.userRepo.createUser(data);
  }

  async updateUser(id: string, data: Partial<User>) {
    return await this.userRepo.updateUser(id, data);
  }

  async findUserById(id: string) {
    const user = await this.userRepo.findById(id);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async getUserProfileById(id: string): Promise<UserProfileView> {
    const profile = await this.userRepo.getUserProfileById(id);
    if (!profile) throw new Error('User not found');
    return profile;
  }

  isProfileCompleted(profile: UserProfileView): boolean {
    return (
      profile.isEmailVerified &&
      profile.isPhoneVerified &&
      profile.isParentPhoneVerified &&
      !!profile.grade
    );
  }

  async getStudents(filter: StudentQueryFilter, page = 1, limit = 20) {
    return await this.userRepo.getStudents(filter, page, limit);
  }

  async updateUserProfile(userId: string, dto: Partial<UpdateUserDto>) {
    const updateData: any = {};
    if (dto.firstName || dto.lastName) {
      // Optionally update name if either is present
      // You may want to fetch the current user to get the other part
      const user = await this.userRepo.findById(userId);
      updateData.name = `${dto.firstName ?? user?.name?.split(' ')[0] ?? ''} ${dto.lastName ?? user?.name?.split(' ')[1] ?? ''}`.trim();
    }
    if (dto.phone !== undefined) {
      updateData.phone = dto.phone;
      updateData.isPhoneVerified = false;
    }
    if (dto.parentPhone !== undefined) {
      updateData.parentPhone = dto.parentPhone;
      updateData.isParentPhoneVerified = false;
    }
    if (dto.grade !== undefined) {
      updateData.grade = dto.grade;
    }
    if (dto.avatar !== undefined) {
      updateData.avatar = dto.avatar;
    }
    return await this.userRepo.updateUser(userId, updateData);
  }
}
