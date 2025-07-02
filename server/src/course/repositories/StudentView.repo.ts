import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { StudentCourseView, studentCourseViewSelect } from 'libs/types/src/types/courses/StudentCourseView';

@Injectable()
export class StudentViewRepo {
  constructor(private readonly prisma: PrismaService) {}

  async getStudentCourseView(courseId: string, studentId: string): Promise<StudentCourseView | null> {
    const course = await this.prisma.course.findUnique({
      where: { id: courseId },
      select: studentCourseViewSelect,
    });
    if (!course) return null;
    // Map lessons
    const lessons = course.lessons.map((lesson: any) => ({
      id: lesson.id,
      title: lesson.title,
      order: lesson.order,
      completed:
        lesson.progress?.some(
          (lp: any) => lp.studentId === studentId && lp.completed,
        ) || false,
    }));
    // Map assignments
    const assignments = course.assignments.map((assignment: any) => {
      const sub = assignment.submissions?.find(
        (s: any) => s.studentId === studentId,
      );
      let status: 'pending' | 'submitted' | 'graded' | 'late' = 'pending';
      if (sub) {
        if (sub.status === 'GRADED') status = 'graded';
        else if (sub.status === 'LATE') status = 'late';
        else status = 'submitted';
      }
      return {
        id: String(assignment.id),
        title: String(assignment.title),
        dueDate:
          assignment.deadline instanceof Date
            ? assignment.deadline.toISOString()
            : String(assignment.deadline),
        status,
      };
    });
    // Map quizzes
    const quizzes = course.quizzes.map((quiz: any) => {
      const attempt = quiz.attempts?.find(
        (a: any) => a.studentId === studentId,
      );
      let status: 'not_started' | 'in_progress' | 'completed' = 'not_started';
      if (attempt) {
        status = attempt.completed ? 'completed' : 'in_progress';
      }
      return {
        id: String(quiz.id),
        title: String(quiz.title),
        status,
        // deadline: quiz.deadline, // Uncomment if you add deadline to Quiz model
      };
    });
    // Enrollment
    const enrollment = course.enrollments?.find(
      (e: any) => e.studentId === studentId,
    );
    return {
      id: course.id,
      title: course.title,
      description: course.description,
      grade: course.grade,
      thumbnail: course.thumbnail ?? undefined,
      isEnrolled: !!enrollment,
      progress: enrollment?.progress,
      teacherName: course.creator.name,
      lessons,
      assignments,
      quizzes,
      price: course.price,
      visibility: course.visibility ? course.visibility.toLowerCase() as 'public' | 'private' | 'unlisted' : 'private',
    };
  }
} 