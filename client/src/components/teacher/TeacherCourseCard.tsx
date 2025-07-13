import React from "react";
import Image from "next/image";
import FallThumbnail from '@/assets/thumbnailfallback.webp';
import Link from "next/link";

export interface TeacherCourseCardProps {
  id: string;
  title: string;
  description: string;
  grade: string | null;
  thumbnail: string | null;
  price: number;
  state: 'DRAFT' | 'PUBLIC' | 'READY';
  totalDuration: number;
  totalLessons: number;
  totalEnrollments: number;
  createdAt: string;
  updatedAt: string;
  publishAt: string | null;
  creatorId: string;
}

const stateColors: Record<TeacherCourseCardProps['state'], string> = {
  DRAFT: 'bg-yellow-100 text-yellow-800',
  PUBLIC: 'bg-green-100 text-green-800',
  READY: 'bg-blue-100 text-blue-800',
};

export default function TeacherCourseCard(props: TeacherCourseCardProps) {
  return (
    <Link 
      href={`/teacher/courses/${props.id}/edit_and_manage`} 
      className="cursor-pointer border border-gray-300 shadow-lg flex flex-row hover:shadow-xl transition-shadow duration-200"
    >
      {/* Thumbnail left */}
      <div className="flex-shrink-0 h-full flex flex-col">
        <div className="flex-1 h-full">
          <Image
            src={props.thumbnail || FallThumbnail}
            alt={props.title}
            className="object-cover h-full w-[150px]"
            width={150}
            height={150}
          />
        </div>
      </div>
      {/* Card content right */}
      <div className="flex flex-col flex-1 p-5 gap-2 justify-between bg-gradient-to-br from-white from-[60%] to-cyan-100">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-lg text-gray-900 truncate">{props.title}</h2>
          <span className={`ml-2 px-3 py-1 rounded-full text-xs font-semibold ${stateColors[props.state]}`}>
            {props.state}
          </span>
        </div>
        <div className="text-gray-700 text-sm line-clamp-2">{props.description}</div>
        <div className="flex flex-wrap gap-2 text-xs text-gray-500 mt-1">
          <span>Grade: {props.grade || 'N/A'}</span>
          <span>Lessons: {props.totalLessons}</span>
          <span>Duration: {props.totalDuration} min</span>
          <span>Enrollments: {props.totalEnrollments}</span>
          <span>Price: {props.price === 0 ? 'Free' : `$${props.price}`}</span>
        </div>
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>Created: {new Date(props.createdAt).toLocaleDateString()}</span>
          <span>Updated: {new Date(props.updatedAt).toLocaleDateString()}</span>
        </div>
      </div>
    </Link>
  );
}