import { Controller, Get, Query, Patch, Body, UseGuards, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { StudentQueryFilter } from './user.type';
import { JwtAccessGuard } from '../auth/guards/jwt-access.guard';
import { UpdateUserDto } from './dtos/UpdateUserDto';
import { CustomRequest } from 'libs/types/src/types/CustomRequest';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('students')
  async getStudents(
    @Query() query: StudentQueryFilter & { page?: string; limit?: string }
  ) {
    const { page = '1', limit = '20', ...filter } = query;
    return await this.userService.getStudents(
      filter,
      parseInt(page, 10),
      parseInt(limit, 10)
    );
  }

  @Patch('profile')
  @UseGuards(JwtAccessGuard)
  async updateProfile(@Req() req: CustomRequest, @Body() dto: Partial<UpdateUserDto>) {
    return await this.userService.updateUserProfile(req.user.sub, dto);
  }
}
