import AvatarMenu from '@/components/custom/navs/AvatarMenu'
import NavSheet from '@/components/teacher/NavSheet'

const APP_NAME = 'Teacher LMS';
const VERSION = 'v1.0.0';

export default function TeacherLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* side drawer */}
      <NavSheet/>
      <main className="flex flex-col ml-16 flex-1">
        <div className='flex items-center justify-end py-3 px-5'>
            <AvatarMenu/>
        </div>
        {children}
      </main>
      <footer className="ml-14 px-6 py-3 text-xs text-neutral-300 bg-black border-t flex items-center justify-between">
        <span>© {new Date().getFullYear()} {APP_NAME}. All rights reserved.</span>
        <div className="flex items-center gap-4">
          <a href="/teacher/help" className="hover:underline">Help & Support</a>
          <span className="opacity-60">{VERSION}</span>
        </div>
      </footer>
    </div>
  )
}
