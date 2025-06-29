import * as React from "react";
import { cn } from "@/lib/utils";

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number;
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(({ className, value = 0, ...props }, ref) => {
  return (
    <div
      ref={ref}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
      className={cn("relative w-full h-2 bg-gray-200 rounded-full overflow-hidden", className)}
      {...props}
    >
      <div
        className="absolute left-0 top-0 h-full bg-blue-500 transition-all"
        style={{ width: `${value}%` }}
      />
    </div>
  );
});
Progress.displayName = "Progress";

export { Progress };
export default Progress; 