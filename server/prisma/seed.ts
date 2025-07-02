import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // Clear existing data (for dev only)
  await prisma.enrollment.deleteMany();
  await prisma.assignment.deleteMany();
  await prisma.quiz.deleteMany();
  await prisma.lesson.deleteMany();
  await prisma.course.deleteMany();
  await prisma.user.deleteMany();

  // Create users
  const teacher = await prisma.user.create({
    data: {
      name: 'Teacher One',
      email: 'teacher@example.com',
      hashPassword: 'hashedpassword',
      role: 'TEACHER',
      isEmailVerified: true,
    },
  });
  const student = await prisma.user.create({
    data: {
      name: 'Student One',
      email: 'student@example.com',
      hashPassword: 'hashedpassword',
      role: 'USER',
      isEmailVerified: true,
      grade: '3rd Secondary',
    },
  });

  // Create course
  const course = await prisma.course.create({
    data: {
      title: 'Sample Course',
      description: 'A test course',
      grade: '3rd Secondary',
      price: 100,
      visibility: 'PUBLIC',
      creatorId: teacher.id,
      timelineEnabled: true,
      allowEnrollment: true,
      maxStudents: 100,
      lessons: {
        create: [
          { title: 'Lesson 1', order: 1 },
          { title: 'Lesson 2', order: 2 },
        ],
      },
      assignments: {
        create: [
          {
            title: 'Assignment 1',
            description: 'Do it',
            deadline: new Date(Date.now() + 86400000),
            maxScore: 100,
          },
        ],
      },
      quizzes: {
        create: [{ title: 'Quiz 1', type: 'MANUAL', maxAttempts: 1 }],
      },
    },
    include: { lessons: true, assignments: true, quizzes: true },
  });

  // Enroll student
  await prisma.enrollment.create({
    data: {
      studentId: student.id,
      courseId: course.id,
      progress: 0,
      status: 'ACTIVE',
    },
  });

  console.log(
    'Seeded teacherId:',
    teacher.id,
    'studentId:',
    student.id,
    'courseId:',
    course.id,
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
