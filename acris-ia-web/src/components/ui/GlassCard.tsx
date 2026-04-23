import type { ReactNode } from 'react';
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function GlassCard({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("glass-card", className)}>
      {children}
    </div>
  );
}
