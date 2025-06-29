"use client";
import React, { useState } from "react";
import { ChevronLeft, Menu } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export type SidebarNavItem = {
  label: string;
  icon: React.ReactNode;
  href: string;
};

interface DashboardSidebarProps {
  navItems?: SidebarNavItem[];
}

export default function DashboardSidebar({ navItems = [] }: DashboardSidebarProps) {
  const [expanded, setExpanded] = useState(true);

  return (
    <motion.aside
      className="hidden md:flex flex-col gap-2 min-h-full sticky top-16 bg-white border-r p-4 z-20"
      animate={{ width: expanded ? 256 : 64 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      style={{ width: expanded ? 256 : 64 }}
    >
      <div className="flex items-center justify-between mb-4">
        <Button
          variant="ghost"
          size="icon"
          aria-label={expanded ? "Collapse sidebar" : "Expand sidebar"}
          onClick={() => setExpanded((e) => !e)}
          className="rounded-full"
        >
          {expanded ? <ChevronLeft className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </Button>
        {expanded && <span className="font-bold text-blue-700 text-lg">Menu</span>}
      </div>
      <nav className="flex flex-col gap-1">
        {navItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className={`flex items-center gap-3 px-3 py-2 rounded-md text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition font-medium ${expanded ? "justify-start" : "justify-center"}`}
          >
            {item.icon}
            {expanded && <span>{item.label}</span>}
          </Link>
        ))}
      </nav>
    </motion.aside>
  );
} 