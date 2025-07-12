"use client";

import React, { useRef, useLayoutEffect, useState } from "react";

const categories = [
  { name: "Courses" },
  { name: "Assignments" },
  { name: "Quizzes" },
  { name: "Progress" },
];

interface MegaMenuProps {
  active: number;
  setActive: (idx: number) => void;
}

export default function MegaMenu({ active, setActive }: MegaMenuProps) {
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [triangleStyle, setTriangleStyle] = useState({ left: 0, width: 0 });

  useLayoutEffect(() => {
    const tab = tabRefs.current[active];
    const container = containerRef.current;
    if (tab && container) {
      const tabRect = tab.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      setTriangleStyle({
        left: tabRect.left - containerRect.left + tabRect.width / 2 - 8,
        width: 16
      });
    }
  }, [active]);

  return (
    <div className="relative w-full flex items-center justify-center" ref={containerRef}>
      <div className="flex gap-6 px-2 py-2 bg-white  border-gray-200 text-sm font-medium relative z-10">
        {categories.map((cat, idx) => (
          <button
            key={cat.name}
            ref={el => { tabRefs.current[idx] = el; }}
            className={`px-1 pb-1 transition-colors ${active === idx ? "text-blue-700 underline underline-offset-4" : "text-gray-700 hover:text-blue-700"}`}
            onMouseEnter={() => setActive(idx)}
            onFocus={() => setActive(idx)}
            type="button"
          >
            {cat.name}
          </button>
        ))}
      </div>
      {/* Triangle indicator */}
      <div
        className="absolute top-full flex justify-center transition-all duration-200"
        style={{ left: triangleStyle.left, width: triangleStyle.width, height: 0 }}
      >
        <svg width="20" height="10" viewBox="0 0 20 10" className="block" style={{ transform: 'translateY(-1px) rotate(180deg)' }}>
          <polygon points="10,10 0,0 20,0" fill="#18181b" />
        </svg>
      </div>
    </div>
  );
}