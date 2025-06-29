"use client";

import React, { Suspense } from "react";
import Container from "@/components/custom/Container";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
// import NavBar from "@/components/custom/NavBar"; // Uncomment if you have a NavBar component

const mockCourses = [
  {
    id: "1",
    title: "Mathematics for Grade 10",
    desc: "Master algebra, geometry, and more with interactive lessons and real exam practice.",
    tags: ["Math", "Grade 10"],
    price: 0,
    thumbnail: "https://placehold.co/300x180?text=Math+10",
  },
  {
    id: "2",
    title: "Biology: Human Body Essentials",
    desc: "Explore the wonders of the human body with engaging videos and quizzes.",
    tags: ["Biology", "Science"],
    price: 200,
    thumbnail: "https://placehold.co/300x180?text=Biology",
  },
  {
    id: "3",
    title: "English Literature: Poetry & Prose",
    desc: "Analyze classic and modern texts, improve your writing, and ace your exams.",
    tags: ["English", "Literature"],
    price: 150,
    thumbnail: "https://placehold.co/300x180?text=English",
  },
  {
    id: "4",
    title: "Physics: Mechanics & Motion",
    desc: "Learn the fundamentals of physics with step-by-step video explanations.",
    tags: ["Physics", "Science"],
    price: 250,
    thumbnail: "https://placehold.co/300x180?text=Physics",
  },
  // ...add more mock courses as needed
];

const categories = ["All", "Math", "Science", "English", "Literature", "Biology", "Physics", "Grade 10"];

function CoursesPageClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Read filters from query params
  const search = searchParams.get("search") || "";
  const category = searchParams.get("category") || "All";
  const price = searchParams.get("price") || "all";
  const page = parseInt(searchParams.get("page") || "1", 10);
  const perPage = 3;

  // Filter logic
  const filtered = mockCourses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(search.toLowerCase()) ||
      course.desc.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      category === "All" || course.tags.includes(category);
    const matchesPrice =
      price === "all" || (price === "free" ? course.price === 0 : course.price > 0);
    return matchesSearch && matchesCategory && matchesPrice;
  });
  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  // Handlers
  function updateQuery(params: Record<string, string | number | undefined>) {
    const newParams = new URLSearchParams(searchParams.toString());
    Object.entries(params).forEach(([key, value]) => {
      if (value === undefined || value === "" || value === "All" || value === "all" || value === 1) {
        newParams.delete(key);
      } else {
        newParams.set(key, String(value));
      }
    });
    router.push(`/courses?${newParams.toString()}`);
  }

  function handleFilterSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Always reset to page 1 on filter
    updateQuery({ search, category, price, page: 1 });
  }

  return (
    <section className="w-full min-h-screen bg-white py-8">
      {/* <NavBar /> */}
      <nav className="w-full border-b bg-white mb-8">
        <Container>
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="font-bold text-xl text-blue-700">LMS</Link>
            <div className="flex gap-6 text-sm font-medium">
              <Link href="/" className="hover:text-blue-600 transition">Home</Link>
              <Link href="/courses" className="hover:text-blue-600 transition">Courses</Link>
              <Link href="/about" className="hover:text-blue-600 transition">About</Link>
              <Link href="/contact" className="hover:text-blue-600 transition">Contact</Link>
            </div>
            <div className="flex gap-2">
              <Link href="/auth/login" className="text-blue-700 hover:underline">Login</Link>
              <Button asChild size="sm" variant="default">
                <Link href="/auth/register">Register</Link>
              </Button>
            </div>
          </div>
        </Container>
      </nav>
      <Container>
        <h1 className="text-3xl font-bold mb-6 text-center">Browse Courses</h1>
        {/* Filter/Search Bar */}
        <form
          className="flex flex-col md:flex-row gap-4 mb-8 items-center justify-between"
          onSubmit={handleFilterSubmit}
        >
          <input
            type="text"
            placeholder="Search courses..."
            defaultValue={search}
            onChange={(e) => updateQuery({ search: e.target.value, page: 1 })}
            className="border rounded px-4 py-2 w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-blue-200"
            aria-label="Search courses"
          />
          <Select
            value={category}
            onValueChange={(val) => updateQuery({ category: val, page: 1 })}
          >
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            value={price}
            onValueChange={(val) => updateQuery({ price: val, page: 1 })}
          >
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Price" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="free">Free</SelectItem>
              <SelectItem value="paid">Paid</SelectItem>
            </SelectContent>
          </Select>
          <Button type="submit" size="sm" variant="secondary">Filter</Button>
        </form>
        {/* Course Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {paginated.length === 0 ? (
            <div className="col-span-full text-center text-gray-500 py-12">
              No courses found.
            </div>
          ) : (
            paginated.map((course) => (
              <div
                key={course.id}
                className="bg-gray-50 border rounded-lg shadow-sm flex flex-col overflow-hidden hover:shadow-md transition"
              >
                <Image
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4 flex-1 flex flex-col">
                  <div className="flex flex-wrap gap-2 mb-2">
                    {course.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h2 className="font-bold text-lg mb-1">{course.title}</h2>
                  <p className="text-gray-600 text-sm mb-4 flex-1">{course.desc}</p>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="font-semibold text-blue-700">
                      {course.price === 0 ? "Free" : `EGP ${course.price}`}
                    </span>
                    <Button asChild size="sm" variant="default">
                      <Link href={`/courses/${course.id}`}>{course.price === 0 ? "View" : "Enroll"}</Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-10 gap-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <Button
                key={i}
                onClick={() => updateQuery({ page: i + 1 })}
                size="sm"
                variant={page === i + 1 ? "default" : "outline"}
                aria-current={page === i + 1 ? "page" : undefined}
              >
                {i + 1}
              </Button>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}

export default function CoursesPage() {
  return (
    <Suspense fallback={<div className="py-20 text-center text-gray-400">Loading courses...</div>}>
      <CoursesPageClient />
    </Suspense>
  );
}