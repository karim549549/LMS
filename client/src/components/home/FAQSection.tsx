import React from "react";

export default function FAQSection() {
  return (
    <section className="w-full py-16 bg-white border-b border-gray-100 flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-8">Frequently Asked Questions</h2>
      <div className="w-full max-w-3xl flex flex-col gap-4">
        {/* TODO: Replace with real FAQs */}
        <div className="bg-gray-100 rounded-lg p-4">[FAQ 1]</div>
        <div className="bg-gray-100 rounded-lg p-4">[FAQ 2]</div>
        <div className="bg-gray-100 rounded-lg p-4">[FAQ 3]</div>
      </div>
    </section>
  );
} 