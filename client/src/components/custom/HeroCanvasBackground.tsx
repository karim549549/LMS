"use client";

import { useEffect, useRef } from "react";

export default function HeroCanvasBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const parentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = parentRef.current?.parentElement;
    if (!canvas || !parent) return;

    function draw() {
      if (!canvas || !parent) return;
      const width = parent.offsetWidth;
      const height = parent.offsetHeight;
      canvas.width = width;
      canvas.height = height  ;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Background color
      ctx.fillStyle = "#10034b";
      ctx.fillRect(0, 0, width, height);

      // Subtle spotlights (fake lighting effect)
      for (let i = 0; i < 40; i++) {
        const x = Math.random() * width;
        const y = 0.33 * height + Math.random() * 0.5 * height;
        const radius = 80 + Math.random() * 150;
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
        gradient.addColorStop(0, "rgba(58,42,119,0.06)");
        gradient.addColorStop(1, "rgba(58,42,119,0)");
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw decorative shapes ✦ ✕ •
      const shapes = ["✦", "✕", "•"];
      ctx.font = "20px sans-serif";
      for (let i = 0; i < 25; i++) {
        const x = Math.random() * width;
        const y = 0.15 * height + Math.random() * 0.7 * height;
        const shape = shapes[Math.floor(Math.random() * shapes.length)];
        ctx.fillStyle = "rgba(255,255,255,0.15)";
        ctx.fillText(shape, x, y);
      }

      // Draw bottom cosine wave (white, reduced amplitude)
      ctx.beginPath();
      ctx.moveTo(0, height);
      const amplitude = 24; // reduced amplitude
      const frequency = (2 * Math.PI) / width * 3;
      for (let x = 0; x <= width; x++) {
        const y = amplitude * Math.cos(frequency * x) + 40;
        ctx.lineTo(x, y + height - 80); // keep wave at the bottom
      }
      ctx.lineTo(width, height);
      ctx.closePath();
      ctx.fillStyle = "#ffffff";
      ctx.fill();
    }

    draw();
    const resizeObserver = new window.ResizeObserver(() => draw());
    resizeObserver.observe(parent);
    return () => resizeObserver.disconnect();
  }, []);

  return (
    <div ref={parentRef} className="absolute inset-0 w-full h-full z-0 pointer-events-none select-none">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        aria-hidden="true"
      />
    </div>
  );
} 