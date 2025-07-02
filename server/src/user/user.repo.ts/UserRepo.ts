import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  UserLoginView,
  UserProfileView,
  StudentQueryFilter,
} from '../user.type';
import { User } from '@prisma/client';
import { PaginatedResult } from '../../../libs/types/src/types/pagination.types';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  private LOGINVIEW = {
    email: true,
    role: true,
    hashPassword: true,
    name: true,
    id: true,
    isEmailVerified: true,
    isPhoneVerified: true,
    isParentPhoneVerified: true,
  };

  async getUserByEmail(email: string): Promise<UserLoginView | null> {
    return await this.prisma.user.findFirst({
      where: { email },
      select: this.LOGINVIEW,
    });
  }

  async createUser(data: {
    email: string;
    hashPassword: string;
    name: string;
  }): Promise<User> {
    return await this.prisma.user.create({ data });
  }

  async updateUser(id: string, data: Partial<User>): Promise<User> {
    return await this.prisma.user.update({
      where: { id },
      data,
    });
  }

  async findById(id: string): Promise<User | null> {
    return await this.prisma.user.findUnique({ where: { id } });
  }

  async getUserProfileById(id: string): Promise<UserProfileView | null> {
    return await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        role: true,
        isEmailVerified: true,
        isPhoneVerified: true,
        isParentPhoneVerified: true,
        grade: true,
      },
    });
  }

  async getStudents(
    filter: StudentQueryFilter,
    page = 1,
    limit = 20,
  ): Promise<PaginatedResult<UserProfileView>> {
    const where: any = { role: 'USER' };
    if (filter.email)
      where.email = { contains: filter.email, mode: 'insensitive' };
    if (filter.name)
      where.name = { contains: filter.name, mode: 'insensitive' };
    if (filter.grade) where.grade = filter.grade;
    if (filter.isEmailVerified !== undefined)
      where.isEmailVerified = filter.isEmailVerified;
    if (filter.isPhoneVerified !== undefined)
      where.isPhoneVerified = filter.isPhoneVerified;
    if (filter.isParentPhoneVerified !== undefined)
      where.isParentPhoneVerified = filter.isParentPhoneVerified;
    const [data, total] = await Promise.all([
      this.prisma.user.findMany({
        where,
        select: {
          id: true,
          email: true,
          role: true,
          isEmailVerified: true,
          isPhoneVerified: true,
          isParentPhoneVerified: true,
          grade: true,
        },
        skip: (page - 1) * limit,
        take: +limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.user.count({ where }),
    ]);
    const totalPages = Math.ceil(total / limit);
    return {
      data,
      meta: {
        currentPage: page,
        itemPerPage: limit,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
    };
  }
}
