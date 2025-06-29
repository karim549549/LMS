import React from "react";

export default function DifferentiatorsSection() {
  return (
    <section className="w-full py-16 bg-gray-50 border-b border-gray-100 flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-8">Why Choose [LMS Name]?</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-5xl">
        {/* TODO: Replace with real differentiators */}
        <div className="bg-white rounded-lg p-6 text-center shadow">[Unique Feature 1]</div>
        <div className="bg-white rounded-lg p-6 text-center shadow">[Unique Feature 2]</div>
        <div className="bg-white rounded-lg p-6 text-center shadow">[Unique Feature 3]</div>
      </div>
    </section>
  );
} 