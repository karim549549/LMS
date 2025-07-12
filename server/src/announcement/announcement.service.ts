import { Injectable } from '@nestjs/common';
import { AnnouncementRepository } from './announcement.repository';
import { AnnouncementDto } from '../course/dtos/CreateCourseDto';

@Injectable()
export class AnnouncementService {
  constructor(private readonly announcementRepo: AnnouncementRepository) {}

  async updateAnnouncements(courseId: string, announcements: AnnouncementDto[]): Promise<any> {
    return this.announcementRepo.updateAnnouncements(courseId, announcements);
  }
}
