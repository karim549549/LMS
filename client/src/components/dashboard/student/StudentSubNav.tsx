"use client";
import React, { useRef, useLayoutEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { GraduationCap, FileText, BarChart3 } from "lucide-react";
import Link from "next/link";
import Container from "@/components/custom/Container";
import { motion } from "framer-motion";

const studentNav = [
  { label: "My Learning", href: "/dashboard/student", icon: <GraduationCap className="w-5 h-5" /> },
  { label: "Assignments", href: "/dashboard/student/assignments", icon: <FileText className="w-5 h-5" /> },
  { label: "Results", href: "/dashboard/student/results", icon: <BarChart3 className="w-5 h-5" /> },
];

export default function StudentSubNav({ className = "" }: { className?: string }) {
  const pathname = usePathname();
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
  const tabRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  useLayoutEffect(() => {
    const idx = studentNav.findIndex(
      (item) => pathname === item.href || (item.href !== "/dashboard/student" && pathname.startsWith(item.href))
    );
    if (tabRefs.current[idx]) {
      const el = tabRefs.current[idx];
      setIndicatorStyle({
        left: el.offsetLeft,
        width: el.offsetWidth,
      });
    }
  }, [pathname]);

  return (
    <div className={`bg-gradient-to-r from-blue-500 text-white to-violet-500 border-b sticky top-16 z-20 ${className}`} style={{ boxShadow: "0 2px 8px 0 rgba(16,30,54,0.04)" }}>
      <Container>
        <div className="relative flex gap-2 sm:gap-4 overflow-x-auto no-scrollbar py-2 rounded-xl">
          {/* Animated pill indicator */}
          <motion.div
            className="absolute top-1 bottom-1 bg-blue-600 rounded-full z-0"
            style={{ left: indicatorStyle.left, width: indicatorStyle.width }}
            layout
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          />
          {studentNav.map((item, idx) => {
            const isActive = pathname === item.href || (item.href !== "/dashboard/student" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.label}
                href={item.href}
                ref={el => { tabRefs.current[idx] = el; }}
                className={`relative z-10 flex flex-col items-center gap-1 px-4 py-2 font-semibold text-sm rounded-full transition-colors duration-200 focus:outline-none ${isActive ? "text-white" : "text-blue-900 hover:text-blue-600"}`}
                style={{ minWidth: 100 }}
                tabIndex={0}
                aria-current={isActive ? "page" : undefined}
              >
                {item.icon}
                <span className="text-xs font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </Container>
    </div>
  );
} 