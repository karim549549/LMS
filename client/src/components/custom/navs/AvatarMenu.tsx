"use client";
import React  from "react"
import { Avatar , AvatarFallback  , AvatarImage  } from "@/components/ui/avatar"
import { HoverCard , HoverCardTrigger , HoverCardContent  } from "@/components/ui/hover-card"
import {
  LogOut,
  ShoppingCart,
  ChevronsRight,
  BookOpen,
  BookMarked,
  FileText,
  Brain,
  MessageSquare,
  Bell as BellIcon,
  Settings,
  User,
  HelpCircle,
  Users,
  UserPlus,
  DollarSign
} from "lucide-react";
import Link from "next/link"
import { useRouter  } from "next/navigation"
import { useUserStore } from "@/stores/userStore";
import { ROLE } from "@/types/user/user.types";
export default  function  AvatarMenu (){
    const router  =  useRouter();
    const  { user ,   logout } =  useUserStore();
    const handleLogout = ()=>{
        logout();
        router.push('auth/login');
    }
    if (!user) return null;
    const role = (user.role as ROLE) || ROLE.USER;
    // Define which groups to show for each role
    const groupVisibility: Record<ROLE, string[][]> = {
      [ROLE.TEACHER]: [
        ["main"],
        ["manage"],
        ["account"],
        ["support"],
        ["logout"]
      ],
      [ROLE.USER]: [
        ["main"],
        ["learning"],
        ["comm"],
        ["account"],
        ["support"],
        ["logout"]
      ],
      [ROLE.ADMIN]: [["main"],["account"],["logout"]],
      [ROLE.ASSISTANT]: [["main"],["account"],["logout"]],
    };
    const shouldRenderGroup = (group: string) => groupVisibility[role].some(arr => arr.includes(group));
    
    return(
        <HoverCard openDelay={0}>
        <HoverCardTrigger>
        <Avatar className='w-8 h-8 '>
            <AvatarImage  src='https://placehild.co//40x40' alt='karim'  />
            <AvatarFallback className="bg-violet-600 text-white "> K </AvatarFallback>
        </Avatar>
        </HoverCardTrigger>
        <HoverCardContent className="w-fit p-0  flex flex-col shadow-lg">
            <div className="flex bg-gradient-to-br from-sky-200 via-pink-200 gap-2 to-orange-200 items-center  p-5">
                <Avatar className="w-12 h-12 ">
                    <AvatarFallback className="bg-cyan-600 font-black text-white">{user?.name?.[0] ?? ''}</AvatarFallback>
                </Avatar>
                <p className="text-sm">
                    {user?.name}
                    <br />
                    <span className="text-xs text-neutral-600">{user?.email}</span>
                </p>
            </div>
            <hr className="my-1  border-[1px] w-full  border-neutral-100 "  />
            {/* Only render groups that are visible for this role */}
            {[
              // main
              <React.Fragment key="main">
                <hr className="my-1  border-[1px] w-full  border-neutral-100 "  />
                {shouldRenderGroup("main") && (
                  <div className="flex flex-col gap-2">
                    <Link className="text-sm px-4 py-2 flex items-center justify-between cursor-pointer hover:bg-gray-200 transition-colors duration-200 group text-neutral-700" href='/'>
                      <div className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4" />
                        My Courses
                      </div>
                      <ChevronsRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                    </Link>
                    <Link className="text-sm px-4 py-2 flex items-center justify-between cursor-pointer hover:bg-gray-200 transition-colors duration-200 group text-neutral-700" href='/'>
                      <div className="flex items-center gap-2">
                        <ShoppingCart className="w-4 h-4" />
                        My Cart
                      </div>
                      <ChevronsRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                    </Link>
                    <Link className="text-sm px-4 py-2 flex items-center justify-between cursor-pointer hover:bg-gray-200 transition-colors duration-200 group text-neutral-700" href='/'>
                      <div className="flex items-center gap-2">
                        <BookMarked className="w-4 h-4" />
                        My Saves
                      </div>
                      <ChevronsRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                    </Link>
                  </div>
                )}
              </React.Fragment>,
              // manage (teacher only)
              <React.Fragment key="manage">
                {shouldRenderGroup("manage") && (
                  <>
                    <hr className="my-1 border-1 w-full border-neutral-100 "  />
                    <div className="flex flex-col gap-2">
                      <Link className="text-sm px-4 py-2 flex items-center justify-between cursor-pointer hover:bg-gray-200 transition-colors duration-200 group text-neutral-700" href='/teacher/students'>
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          Students
                        </div>
                        <ChevronsRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                      </Link>
                      <Link className="text-sm px-4 py-2 flex items-center justify-between cursor-pointer hover:bg-gray-200 transition-colors duration-200 group text-neutral-700" href='/teacher/assistants'>
                        <div className="flex items-center gap-2">
                          <UserPlus className="w-4 h-4" />
                          Assistants
                        </div>
                        <ChevronsRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                      </Link>
                      <Link className="text-sm px-4 py-2 flex items-center justify-between cursor-pointer hover:bg-gray-200 transition-colors duration-200 group text-neutral-700" href='/teacher/assignments'>
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4" />
                          Assignments
                        </div>
                        <ChevronsRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                      </Link>
                      <Link className="text-sm px-4 py-2 flex items-center justify-between cursor-pointer hover:bg-gray-200 transition-colors duration-200 group text-neutral-700" href='/teacher/performance'>
                        <div className="flex items-center gap-2">
                          <Brain className="w-4 h-4" />
                          Performance
                        </div>
                        <ChevronsRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                      </Link>
                      <Link className="text-sm px-4 py-2 flex items-center justify-between cursor-pointer hover:bg-gray-200 transition-colors duration-200 group text-neutral-700" href='/teacher/income'>
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-4 h-4" />
                          Income
                        </div>
                        <ChevronsRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </>
                )}
              </React.Fragment>,
              // learning (student only)
              <React.Fragment key="learning">
                {shouldRenderGroup("learning") && (
                  <>
                    <hr className="my-1 border-1 w-full border-neutral-100 "  />
                    <div className="flex flex-col gap-2">
                      <Link className="text-sm px-4 py-2 flex items-center justify-between cursor-pointer hover:bg-gray-200 transition-colors duration-200 group text-neutral-700" href='/assignments'>
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4" />
                          My Assignments
                        </div>
                        <ChevronsRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                      </Link>
                      <Link className="text-sm px-4 py-2 flex items-center justify-between cursor-pointer hover:bg-gray-200 transition-colors duration-200 group text-neutral-700" href='/quizzes'>
                        <div className="flex items-center gap-2">
                          <Brain className="w-4 h-4" />
                          My Quizzes
                        </div>
                        <ChevronsRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </>
                )}
              </React.Fragment>,
              // comm (student only)
              <React.Fragment key="comm">
                {shouldRenderGroup("comm") && (
                  <>
                    <hr className="my-1 border-1 w-full border-neutral-100 "  />
                    <div className="flex flex-col gap-2">
                      <Link className="text-sm px-4 py-2 flex items-center justify-between cursor-pointer hover:bg-gray-200 transition-colors duration-200 group text-neutral-700" href='/messages'>
                        <div className="flex items-center gap-2">
                          <MessageSquare className="w-4 h-4" />
                          Messages
                        </div>
                        <ChevronsRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                      </Link>
                      <Link className="text-sm px-4 py-2 flex items-center justify-between cursor-pointer hover:bg-gray-200 transition-colors duration-200 group text-neutral-700" href='/notifications'>
                        <div className="flex items-center gap-2">
                          <BellIcon className="w-4 h-4" />
                          Notifications
                        </div>
                        <ChevronsRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </>
                )}
              </React.Fragment>,
              // account
              <React.Fragment key="account">
                <hr className="my-1 border-1 w-full border-neutral-100 "  />
                <div className="flex flex-col gap-2">
                  <Link className="text-sm px-4 py-2 flex items-center justify-between cursor-pointer hover:bg-gray-200 transition-colors duration-200 group text-neutral-700" href='/settings'>
                    <div className="flex items-center gap-2">
                      <Settings className="w-4 h-4" />
                      Account Settings
                    </div>
                    <ChevronsRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </Link>
                  <Link className="text-sm px-4 py-2 flex items-center justify-between cursor-pointer hover:bg-gray-200 transition-colors duration-200 group text-neutral-700" href='/profile'>
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Profile
                    </div>
                    <ChevronsRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </Link>
                </div>
              </React.Fragment>,
              // support
              <React.Fragment key="support">
                <hr className="my-1 border-1 w-full  border-neutral-100 "  />
                <div className="flex flex-col gap-2">
                  <Link className="text-sm px-4 py-2 flex items-center justify-between cursor-pointer hover:bg-gray-200 transition-colors duration-200 group text-neutral-700" href='/help'>
                    <div className="flex items-center gap-2">
                      <HelpCircle className="w-4 h-4" />
                      Help & Support
                    </div>
                    <ChevronsRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </Link>
                </div>
              </React.Fragment>,
              // logout
              <React.Fragment key="logout">
                <hr className="my-1 border-1 w-full  border-neutral-100 "  />
                <div className="flex flex-col gap-2">
                  <button onClick={handleLogout} className="text-sm px-4 py-2 flex items-center justify-between cursor-pointer hover:bg-gray-200 transition-colors duration-200 group text-neutral-700">
                    <div className="flex items-center gap-2">
                      <LogOut className="w-4 h-4" />
                      Logout
                    </div>
                    <ChevronsRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </button>
                </div>
              </React.Fragment>
            ]}
        </HoverCardContent>
    </HoverCard>
    )

}