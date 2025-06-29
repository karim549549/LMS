import React from "react";

export default function PricingSection() {
  return (
    <section className="w-full py-16 bg-blue-50 border-b border-gray-100 flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
      <p className="text-lg text-gray-700 mb-6">Choose a plan or try for free. No credit card required.</p>
      <button className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold shadow hover:bg-blue-700 transition">See Pricing</button>
    </section>
  );
} 