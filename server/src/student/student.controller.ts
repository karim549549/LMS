import { Controller, UseGuards, Get, Post, Body } from '@nestjs/common';
import { JwtAccessGuard } from 'src/auth/guards/jwt-access.guard';
import { StudentService } from './student.service';

@Controller('student')
@UseGuards(JwtAccessGuard)
export class StudentController {
    constructor(
        private readonly studentService : StudentService
    ){}

    // --- Dashboard/Overview ---
    @Get('dashboard')
    getDashboard() {}

    // --- Alerts/Notifications ---
    @Get('alerts')
    getAlerts() {}

    @Get('notifications')
    listNotifications() {}

    @Post('notifications/mark-read')
    markNotificationsRead(@Body() body: any) {}

    // --- Progress Overview ---
    @Get('progress')
    getOverallProgress() {}
}
