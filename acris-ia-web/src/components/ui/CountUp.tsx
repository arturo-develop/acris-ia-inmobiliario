import { useEffect, useState, useRef } from 'react';

interface CountUpProps {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  /** If true, the number won't animate — used for non-numeric values */
  static?: boolean;
  staticLabel?: string;
  className?: string;
}

export function CountUp({
  end,
  duration = 2000,
  prefix = '',
  suffix = '',
  className = '',
}: CountUpProps) {
  const [value, setValue] = useState(0);
  const containerRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let startTime: number | null = null;

          const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);
            // easeOutCirc — snappy yet smooth
            const eased = Math.sqrt(1 - Math.pow(progress - 1, 2));
            setValue(Math.floor(eased * end));
            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setValue(end);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.2 }
    );

    const el = containerRef.current;
    if (el) observer.observe(el);
    return () => { if (el) observer.unobserve(el); };
  }, [end, duration]);

  return (
    <span ref={containerRef} className={`whitespace-nowrap${className ? ` ${className}` : ''}`}>
      {prefix}{value}{suffix}
    </span>
  );
}
