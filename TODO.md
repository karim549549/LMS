# LMS Project TODO

This document tracks all major features and systems left to build for the LMS, based on requirements in `role.yaml` and `schema.prisma`.

---

## 1. Assignment Submission System
- [ ] Student file/text upload
- [ ] Feedback and grading display
- [ ] Resubmission logic
- [ ] Status tracking (pending, graded, late, etc.)

## 2. Quiz Taking Interface
- [ ] MCQ, open-ended, true/false support
- [ ] Instant result display (if enabled)
- [ ] Retake logic and attempt limits

## 3. Student Progress Tracking
- [ ] Dashboard with progress bars
- [ ] Alerts for overdue assignments/quizzes
- [ ] Performance analytics

## 4. Notifications & Announcements
- [ ] Real-time notifications (assignments, grades, payments, etc.)
- [ ] Notification history UI
- [ ] Bulk announcements from teacher

## 5. Payment & Subscription Flows
- [ ] Stripe, Fawry, Vodafone Cash integration
- [ ] Payment status UI
- [ ] Block access on expiry

## 6. Course Enrollment & Access Control
- [ ] Free/paid enrollment flows
- [ ] Block next lecture if requirements not met
- [ ] Enrollment management UI

## 7. Teacher Course Management
- [ ] Edit, delete, archive, schedule courses
- [ ] Set course visibility and settings

## 8. Lesson Authoring Tools
- [ ] Module/unit creation
- [ ] Resource upload (PDF, slides, links)
- [ ] Drag-and-drop lesson reordering
- [ ] External media embeds

## 9. Assignment & Quiz Management (Teacher)
- [ ] Grading interface and rubrics
- [ ] Download/export grades (CSV, Excel)
- [ ] Feedback tools

## 10. Student Monitoring
- [ ] Activity tracking (minutes watched, quiz attempts, etc.)
- [ ] Filtering, export, and flagging
- [ ] VIP/attention-needed tagging

## 11. Communication Features
- [ ] Messaging/contact teacher
- [ ] Forums, Q&A, reminders

## 12. Analytics Dashboards
- [ ] Course stats, drop-off points
- [ ] Filtering and reporting
- [ ] Dashboard widgets

## 13. Assistant/Role Management
- [ ] Invite, assign, and manage assistants
- [ ] Set/view/edit/remove permissions

## 14. File Storage Integration
- [ ] Supabase/S3/Firebase for videos, PDFs, images
- [ ] File size limits and upload UI

## 15. Email Service Integration
- [ ] SendGrid/Resend/SMTP for notifications, invitations, reminders

## 16. Background Jobs & Automation
- [ ] Grading, reminders, expiry warnings
- [ ] Other automation features

## 17. Repository Logic Completion
- [ ] Finish and test all backend repository logic for all modules

## 18. Test Coverage
- [ ] Add comprehensive tests for all modules and flows (frontend + backend)

## 19. UI/UX Polish
- [ ] Internationalization, accessibility, performance
- [ ] Mobile optimization

## 20. Advanced/Bonus Features
- [ ] AI quiz generation
- [ ] Plagiarism detection
- [ ] Live attendance tracking
- [ ] Chat with students
- [ ] Mobile app (student-focused) 