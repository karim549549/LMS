import React from "react";

export default function TestimonialsSection() {
  return (
    <section className="w-full py-16 bg-white border-b border-gray-100 flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-8">What Our Users Say</h2>
      <div className="flex flex-col md:flex-row gap-8 w-full max-w-4xl justify-center">
        {/* TODO: Replace with real testimonials */}
        <div className="flex-1 bg-gray-100 rounded-lg p-6 text-center">[Testimonial 1]</div>
        <div className="flex-1 bg-gray-100 rounded-lg p-6 text-center">[Testimonial 2]</div>
      </div>
    </section>
  );
} 