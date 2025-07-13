"use client";
import React, { useState, useEffect, useCallback } from "react";
import { TeacherCourseCardProps } from '@/components/teacher/TeacherCourseCard';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/components/ui/select';
import { useRouter } from "next/navigation";
import { useDebounce } from "@/hooks/useDebounce";

const stateOptions: ("all" | TeacherCourseCardProps['state'])[] = [
  "all",
  "DRAFT",
  "PUBLIC",
  "READY"
];

const ORDER_BY_OPTIONS = [
  { value: 'newest', label: 'Newest' },
  { value: 'oldest', label: 'Oldest' },
  { value: 'alphabetic', label: 'A-Z' },
  { value: 'highest_enrollments', label: 'Most Enrolled' },
  { value: 'lowest_price', label: 'Lowest Price' },
  { value: 'highest_price', label: 'Highest Price' },
];

interface FilterbarProps { 
  initialFilters?: Record<string, string | undefined>;
}

export default function TeacherCourseFilterBar({ initialFilters = {} }: FilterbarProps) {
  const router = useRouter();
  const [search, setSearch] = useState(initialFilters.title ?? "");
  const [filter, setFilter] = useState<"all" | TeacherCourseCardProps['state']>(
    (initialFilters.state as TeacherCourseCardProps['state']) || "all"
  );
  const [orderBy, setOrderBy] = useState<string>(initialFilters.orderBy ?? 'newest');
  const debouncedSearch = useDebounce(search, 300);

  const updateURL = useCallback(() => {
    const params = new URLSearchParams();
    if (debouncedSearch) params.set('title', debouncedSearch);
    if (filter && filter !== 'all') params.set('state', filter);
    if (orderBy && orderBy !== 'newest') params.set('orderBy', orderBy);
    const query = params.toString();
    router.push(query ? `?${query}` : '?');
  }, [debouncedSearch, filter, orderBy, router]);

  useEffect(() => {
    updateURL();
  }, [updateURL]);

  return (
    <div className="flex flex-col md:flex-row gap-3 items-center justify-between w-full">
      <input
        type="text"
        placeholder="Search your courses..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="border border-gray-300 rounded px-4 py-2 w-full md:w-72 focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all duration-200"
      />
      <Select value={filter} onValueChange={(val) => setFilter(val as "all" | TeacherCourseCardProps['state'])}>
        <SelectTrigger className="w-36">
          <SelectValue placeholder="State" />
        </SelectTrigger>
        <SelectContent>
          {stateOptions.map(f => (
            <SelectItem key={f} value={f}>
              {f === 'all' ? 'All States' : f.charAt(0) + f.slice(1).toLowerCase()}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select value={orderBy} onValueChange={setOrderBy}>
        <SelectTrigger className="w-44">
          <SelectValue placeholder="Order By" />
        </SelectTrigger>
        <SelectContent>
          {ORDER_BY_OPTIONS.map(o => (
            <SelectItem key={o.value} value={o.value}>
              {o.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}