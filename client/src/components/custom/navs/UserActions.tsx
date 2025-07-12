"use client";
import React  from "react";
import { HoverCard , HoverCardContent , HoverCardTrigger } from "@/components/ui/hover-card";
import { BookOpen , ShoppingCart , Flag , Bell , MessageCircle , Star , Megaphone  } from "lucide-react";
import { useUserStore } from "@/stores/userStore";
import Link  from "next/link";
import Image  from "next/image";
import LanguageToggle from "../LanguageToggle";
import AvatarMenu from "./AvatarMenu";
export default function  UserActions({ theme = 'light' }: { theme?: 'light' | 'dark' }){
    const { user } = useUserStore();
    const iconColor = theme === 'dark' ? 'text-white' : 'text-neutral-700';
    
    if (!user) return (
        <div className="flex items-center gap-2">
            <Link className="px-5 py-1  border-1  border-violet-500  bg-violet-500 text-white " href='/auth/login'>
                login
            </Link>
            <Link className={ `px-5  py-1 border-1 border-violet-500 ${theme ==='dark'?'text-white': 'text-black' }`} href='/auth/register'>
                signup
            </Link>
            <LanguageToggle/>
        </div>
    );
    return (
        <ul className='flex items-center gap-5'>
            <li className="md:inline  hidden">
                <HoverCard openDelay={0}>
                    <HoverCardTrigger className={` ${iconColor}`}>
                        <Flag className="w-4 h-4" />
                    </HoverCardTrigger>
                    <HoverCardContent className="w-64 p-0">
                    <div className="p-3">
                        <div className="font-semibold mb-2 text-blue-700">Recent Lessons</div>
                        <ul className="space-y-2">
                        <li className="flex items-center gap-2">
                            <BookOpen className="w-4 h-4 text-blue-500" />
                            <span>Introduction to React</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <BookOpen className="w-4 h-4 text-blue-500" />
                            <span>Advanced CSS Tricks</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <BookOpen className="w-4 h-4 text-blue-500" />
                            <span>JavaScript ES6 Features</span>
                        </li>
                        </ul>
                        <button className="mt-3 w-full py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm">View all lessons</button>
                    </div>
                    </HoverCardContent>
                </HoverCard>
            </li>
            <li className="md:inline hidden">
                <HoverCard openDelay={0}>
                    <HoverCardTrigger>
                    <ShoppingCart className={`w-4 h-4 ${iconColor}`} />
                    </HoverCardTrigger>
                    <HoverCardContent className="w-64 p-0">
                    <div className="p-3">
                        <div className="font-semibold mb-2 text-blue-700">Cart Items</div>
                        <ul className="space-y-2">
                        <li className="flex items-center gap-2">
                            <Image src="https://placehold.co/32x32" alt="Course A" width={25} height={25} className="rounded" />
                            <span>React for Beginners</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <Image src="https://placehold.co/32x32" alt="Course B" width={25} height={25} className="rounded" />
                            <span>Mastering TypeScript</span>
                        </li>
                        </ul>
                        <button className="mt-3 w-full py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm">Go to cart</button>
                    </div>
                    </HoverCardContent>
                </HoverCard>
            </li>
            <li className="md:inline hidden">
                <HoverCard openDelay={0}>
                    <HoverCardTrigger>
                    <div className="relative">
                        <Bell className={`w-4 h-4 ${iconColor}`} />
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1">3</span>
                    </div>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-72 p-0">
                    <div className="p-3">
                        <div className="font-semibold mb-2 text-blue-700">Notifications</div>
                        <ul className="space-y-2">
                        <li className="flex items-center gap-2 text-sm">
                            <Star className="w-4 h-4 text-yellow-500" />
                            <span>New course available: Next.js Mastery</span>
                            <span className="ml-auto text-xs text-gray-400">2m ago</span>
                        </li>
                        <li className="flex items-center gap-2 text-sm">
                            <MessageCircle className="w-4 h-4 text-blue-500" />
                            <span>Assignment feedback received</span>
                            <span className="ml-auto text-xs text-gray-400">10m ago</span>
                        </li>
                        <li className="flex items-center gap-2 text-sm">
                            <Megaphone className="w-4 h-4 text-pink-500" />
                            <span>Platform update: Dark mode!</span>
                            <span className="ml-auto text-xs text-gray-400">1h ago</span>
                        </li>
                        </ul>
                        <button className="mt-3 w-full py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm">View all notifications</button>
                    </div>
                    </HoverCardContent>
                </HoverCard>
            </li>
            <hr className={`h-8 mx-1 md:inline hidden  border-[1px] ${theme === 'dark' ?'border-neutral-800':'border-neutral-300'}`} />
            <li>
                <AvatarMenu/>
            </li>
        </ul>
    )
}