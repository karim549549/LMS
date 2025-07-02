import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { TeacherCourseView, teacherCourseViewSelect } from 'libs/types/src/types/courses/TeacherCourseView';

@Injectable()
export class TeacherViewRepo {
  constructor(private readonly prisma: PrismaService) {}

  async getTeacherCourseView(courseId: string, teacherId: string): Promise<TeacherCourseView | null> {
    const course = await this.prisma.course.findUnique({
      where: { id: courseId, creatorId: teacherId },
      select: teacherCourseViewSelect,
    });
    if (!course) return null;
    // Map enrolled students
    const enrolledStudents = course.enrollments.map((enr: any) => ({
      id: enr.student.id,
      name: enr.student.name,
      email: enr.student.email,
      progress: enr.progress,
    }));
    // Map lessons
    const lessons = course.lessons.map((lesson: any) => ({
      id: lesson.id,
      title: lesson.title,
      order: lesson.order,
      description: lesson.description,
      videoUrl: lesson.videoUrl,
      resources: lesson.resources,
    }));
    const assignments = course.assignments.map((assignment: any) => ({
      id: String(assignment.id),
      title: String(assignment.title),
      dueDate:
        assignment.deadline instanceof Date
          ? assignment.deadline.toISOString()
          : String(assignment.deadline),
      status: 'pending' as 'pending', // Explicitly type as union value
      maxScore: assignment.maxScore,
      submissions: assignment.submissions?.length,
    }));
    // Map quizzes
    const quizzes = course.quizzes.map((quiz: any) => ({
      id: String(quiz.id),
      title: String(quiz.title),
      status: 'not_started' as 'not_started', // Always a valid value for teacher view
      questionsCount: quiz.questions?.length,
      attempts: quiz.attempts?.length,
      // deadline: quiz.deadline, // Uncomment if you add deadline to Quiz model
    }));
    // Map assistants
    const assistants = course.courseAssistants.map((ca: any) => ({
      id: ca.assistant.id,
      name: ca.assistant.name,
      email: ca.assistant.email,
      permissions: ca.permissions,
    }));
    // Settings
    const settings = {
      timelineEnabled: course.timelineEnabled,
      allowEnrollment: course.allowEnrollment,
      maxStudents: course.maxStudents === null ? undefined : course.maxStudents,
    };
    // Analytics (dummy for now)
    const analytics = {
      completionPercent: 0,
      engagement: 0,
    };
    return {
      id: course.id,
      title: course.title,
      description: course.description,
      grade: course.grade,
      thumbnail: course.thumbnail ?? undefined,
      price: course.price,
      visibility: course.visibility ? course.visibility.toLowerCase() as 'public' | 'private' | 'unlisted' : 'private',
      enrolledStudents,
      analytics,
      lessons,
      assignments,
      quizzes,
      settings,
      assistants,
      isEnrolled: false,
      teacherName: course.creator.name,
    };
  }
} 