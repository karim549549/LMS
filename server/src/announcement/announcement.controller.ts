import { Controller, Patch, Param, Body, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { AnnouncementService } from './announcement.service';
import { AnnouncementDto } from '../course/dtos/CreateCourseDto';
import { JwtAccessGuard } from '../auth/guards/jwt-access.guard';

@Controller('announcement')
export class AnnouncementController {
  constructor(private readonly announcementService: AnnouncementService) {}

  @Patch(':courseId')
  @UseGuards(JwtAccessGuard)
  @HttpCode(HttpStatus.ACCEPTED)
  async updateAnnouncements(
    @Param('courseId') courseId: string,
    @Body() announcements: AnnouncementDto[]
  ) {
    return this.announcementService.updateAnnouncements(courseId, announcements);
  }
}
