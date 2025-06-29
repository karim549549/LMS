"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Container from "@/components/custom/Container";
import Link from "next/link";
import { Search, User, Settings, Bell } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import Logo from "../custom/Logo";

export default function DashboardNavbar() {
  const [searchOpen, setSearchOpen] = useState(false);
  return (
    <motion.nav
      className="h-16 bg-blue-900 border-b flex items-center px-0 justify-between sticky top-0 z-30 shadow-md"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <Container className="flex items-center justify-between w-full">
        {/* Left: Logo */}
        <Logo/>
        {/* Center: Search */}
        <Dialog open={searchOpen} onOpenChange={setSearchOpen}>
          <DialogTrigger asChild>
            <button
              className="flex items-center gap-2 bg-blue-800/80 hover:bg-blue-700 text-white px-4 py-2 rounded-full transition shadow-sm focus:outline-none"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
              <span className=" sm:inline">Search</span>
            </button>
          </DialogTrigger>
          <DialogContent className="max-w-lg w-full">
            <div className="flex flex-col gap-4 p-4">
              <input
                type="text"
                placeholder="Search courses, assignments, results..."
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                autoFocus
              />
              <div className="text-gray-500 text-sm">Type to search. (Search functionality coming soon!)</div>
            </div>
          </DialogContent>
        </Dialog>
        {/* Right: User Avatar & Hover Card */}
        <HoverCard>
          <HoverCardTrigger asChild>
            <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow hover:ring-2 hover:ring-blue-400 transition">
              <User className="w-6 h-6 text-blue-900" />
            </button>
          </HoverCardTrigger>
          <HoverCardContent className="w-56 p-0 overflow-hidden">
            <div className="bg-white rounded-lg shadow flex flex-col divide-y">
              <Link href="/dashboard/student/profile" className="flex items-center gap-2 px-4 py-3 hover:bg-blue-50 text-blue-900">
                <User className="w-4 h-4" /> Profile
              </Link>
              <Link href="/dashboard/student/settings" className="flex items-center gap-2 px-4 py-3 hover:bg-blue-50 text-blue-900">
                <Settings className="w-4 h-4" /> Settings
              </Link>
              <Link href="/dashboard/student/notifications" className="flex items-center gap-2 px-4 py-3 hover:bg-blue-50 text-blue-900">
                <Bell className="w-4 h-4" /> Notifications
              </Link>
              <div className="px-4 py-3 text-xs text-gray-400">Student</div>
            </div>
          </HoverCardContent>
        </HoverCard>
      </Container>
    </motion.nav>
  );
} 