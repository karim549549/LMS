import React from "react";
import { TeacherCourseCardProps } from '@/components/teacher/TeacherCourseCard';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/components/ui/select';

interface TeacherCourseFilterBarProps {
  search: string;
  setSearch: (v: string) => void;
  filter: "all" | TeacherCourseCardProps['state'];
  setFilter: (v: "all" | TeacherCourseCardProps['state']) => void;
  stateOptions: ("all" | TeacherCourseCardProps['state'])[];
  orderBy: string;
  setOrderBy: (v: string) => void;
}

const ORDER_BY_OPTIONS = [
  { value: 'newest', label: 'Newest' },
  { value: 'oldest', label: 'Oldest' },
  { value: 'alphabetic', label: 'A-Z' },
  { value: 'highest_enrollments', label: 'Most Enrolled' },
  { value: 'lowest_price', label: 'Lowest Price' },
  { value: 'highest_price', label: 'Highest Price' },
];

export default function TeacherCourseFilterBar({
  search,
  setSearch,
  filter,
  setFilter,
  stateOptions,
  orderBy,
  setOrderBy,
}: TeacherCourseFilterBarProps) {
  return (
    <div className="flex flex-col md:flex-row gap-3 items-center justify-between w-full">
      <input
        type="text"
        placeholder="Search your courses..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="border border-gray-300 rounded px-4 py-2 w-full md:w-72 focus:outline-none focus:ring-2 focus:ring-pink-400"
      />
      <Select value={filter} onValueChange={setFilter}>
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