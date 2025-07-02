import { Controller, Get } from '@nestjs/common';
import { EmailService } from './email.service';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Get('health')
  async healthCheck() {
    await this.emailService.sendEmail({
      to: 'karimkhaled549@gmail.com',
      subject: 'Welcome to the LMS!',
      template: 'welcome',
      variables: {
        name: 'Karim',
        ctaUrl: 'https://your-lms.com/dashboard',
        ctaText: 'Go to Dashboard',
      },
      queue: false,
    });
    return { success: true, message: 'Welcome email sent to kairmkhaled549@gmail.com' };
  }

  @Get('queue-health')
  async queueHealthCheck() {
    await this.emailService.sendEmail({
      to: 'karimkhaled549@gmail.com',
      subject: 'Welcome to the LMS! (Queued)',
      template: 'welcome',
      variables: {
        name: 'Karim',
        ctaUrl: 'https://your-lms.com/dashboard',
        ctaText: 'Go to Dashboard',
      },
      queue: true,
    });
    return { success: true, message: 'Welcome email queued for karimkhaled549@gmail.com' };
  }
} 