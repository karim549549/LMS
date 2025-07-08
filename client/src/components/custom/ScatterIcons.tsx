import { Pen, Pencil, Eraser, Ruler, Star, BookOpen, Users, Sparkles, GraduationCap } from "lucide-react";

const ICONS = [Pen, Pencil, Eraser, Ruler, Star, BookOpen, Users, Sparkles, GraduationCap];
const COLORS = [
  "text-blue-900",
  "text-pink-900",
  "text-yellow-900",
  "text-green-900",
  "text-purple-900",
  "text-sky-900",
  "text-white"
];
const OPACITIES = ["opacity-10", "opacity-5", "opacity-15"];

function getRandom(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

// Custom pulse animation for low opacity
const customPulse = `
@keyframes scatter-pulse {
  0%, 100% { opacity: 0; }
  50% { opacity: 0.1; }
}
.scatter-pulse {
  animation: scatter-pulse 2.2s infinite;
}
`;

// Inject style tag once
if (typeof window !== 'undefined' && !document.getElementById('scatter-pulse-style')) {
  const style = document.createElement('style');
  style.id = 'scatter-pulse-style';
  style.innerHTML = customPulse;
  document.head.appendChild(style);
}

export default function ScatterIcons({ count = 12 }: { count?: number }) {
  const icons = Array.from({ length: count }).map((_, i) => {
    const Icon = ICONS[Math.floor(Math.random() * ICONS.length)];
    const size = getRandom(1.1, 2.2).toFixed(2);
    const color = COLORS[Math.floor(Math.random() * COLORS.length)];
    const opacity = OPACITIES[Math.floor(Math.random() * OPACITIES.length)];
    const top = `${getRandom(5, 85).toFixed(2)}%`;
    const left = `${getRandom(5, 90).toFixed(2)}%`;
    return (
      <Icon
        key={i}
        className={`absolute ${color} ${opacity} scatter-pulse`}
        style={{
          top,
          left,
          width: `${size}rem`,
          height: `${size}rem`,
          animationDelay: `${getRandom(0, 2.5).toFixed(2)}s`,
        }}
      />
    );
  });
  return <div className="absolute inset-0 pointer-events-none">{icons}</div>;
} 