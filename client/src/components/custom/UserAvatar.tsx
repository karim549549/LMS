"use client";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import {
  DoorOpen,
  Settings,
  UserIcon,
  BookOpen,
  ClipboardList,
  Users,
  GraduationCap,
  BarChart3,
  ChevronsRight,
} from "lucide-react";

interface UserData {
  name: string;
  email: string;
  role: "teacher" | "student";
  avatarUrl: string;
}

const DEFAULT_USER: UserData = {
  name: "Karim Khaled",
  email: "karim@example.com",
  role: "student",
  avatarUrl: "/user.jpg",
};

const NAV_ITEMS = [
  { href: "/dashboard", icon: BookOpen, text: "Dashboard", color: "text-purple-600", roles: ["teacher", "student"] },
  { href: "/courses", icon: ClipboardList, text: "My Courses", color: "text-pink-600", roles: ["teacher"] },
  { href: "/students", icon: Users, text: "Students", color: "text-indigo-600", roles: ["teacher"] },
  { href: "/assignments", icon: BarChart3, text: "Assignments", color: "text-teal-600", roles: ["teacher"] },
  { href: "/my-courses", icon: GraduationCap, text: "Enrolled Courses", color: "text-green-600", roles: ["student"] },
  { href: "/progress", icon: BarChart3, text: "My Progress", color: "text-yellow-600", roles: ["student"] },
  { href: "/profile", icon: UserIcon, text: "Profile", color: "text-gray-700", roles: ["teacher", "student"] },
  { href: "/settings", icon: Settings, text: "Settings", color: "text-gray-700", roles: ["teacher", "student"] },
  { href: "/logout", icon: DoorOpen, text: "Logout", color: "text-red-600", roles: ["teacher", "student"] },
];

export default function UserAvatar({ user = DEFAULT_USER }: { user?: Partial<UserData> }) {
  const { role, name, email, avatarUrl } = { ...DEFAULT_USER, ...user };

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Avatar className="cursor-pointer bg-gradient-to-r from-purple-500 to-indigo-500 text-white hover:opacity-90 transition duration-200">
          <AvatarImage src={avatarUrl} alt={`${name}'s avatar`} />
          <AvatarFallback className="bg-gradient-to-r from-purple-500 to-indigo-500">
            {name.charAt(0)}
          </AvatarFallback>
        </Avatar>
      </HoverCardTrigger>

      <HoverCardContent className="w-72 p-0 overflow-hidden bg-transparent shadow-xl">
        <div className="px-4 py-5 bg-gradient-to-r from-purple-400 to-indigo-400 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <Avatar className="bg-white ring-2 ring-white">
              <AvatarImage src={avatarUrl} alt="" />
              <AvatarFallback>{name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-semibold text-white">{name}</p>
              <p className="text-xs text-white opacity-80">{email}</p>
            </div>
          </div>
          <span className="mt-3 inline-block text-xs uppercase bg-white/30 text-white px-2 py-0.5 rounded-full">
            {role}
          </span>
        </div>

        <nav className="bg-white p-4 space-y-1">
          {NAV_ITEMS.map((item) => {
            if (!item.roles.includes(role)) return null;
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className="group flex items-center justify-between px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors duration-150"
              >
                <div className="flex items-center gap-1 text-xs">
                  <item.icon className={`w-5 h-5 ${item.color} group-hover:text-gray-800`} />
                  <span className="text-gray-700 group-hover:text-gray-900">
                    {item.text}
                  </span>
                </div>
                <ChevronsRight className="w-4 h-4 mr-2 group-hover:text-violet-500 text-gray-400 transform rotate-300 group-hover:scale-105 group-hover:mr-0 group-hover:rotate-0 transition-all duration-300" />
              </Link>
            );
          })}
        </nav>
      </HoverCardContent>
    </HoverCard>
  );
}