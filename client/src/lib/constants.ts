// Permission definitions
export const AVAILABLE_PERMISSIONS = [
  {
    id: "GRADE_ASSIGNMENTS",
    label: "Grade Assignments",
    description: "Can grade student assignments and provide feedback"
  },
  {
    id: "VIEW_ANALYTICS",
    label: "View Analytics",
    description: "Can view course analytics and student progress"
  },
  {
    id: "MANAGE_CONTENT",
    label: "Manage Content",
    description: "Can edit lessons, quizzes, and course materials"
  },
  {
    id: "MANAGE_STUDENTS",
    label: "Manage Students",
    description: "Can view and manage student enrollments"
  },
  {
    id: "SEND_ANNOUNCEMENTS",
    label: "Send Announcements",
    description: "Can send announcements to course students"
  }
];

// Permission color mapping
export const PERMISSION_COLORS: Record<string, string> = {
  "GRADE_ASSIGNMENTS": "bg-green-100 text-green-800",
  "VIEW_ANALYTICS": "bg-blue-100 text-blue-800",
  "MANAGE_CONTENT": "bg-purple-100 text-purple-800",
  "MANAGE_STUDENTS": "bg-orange-100 text-orange-800",
  "SEND_ANNOUNCEMENTS": "bg-pink-100 text-pink-800",
}; 