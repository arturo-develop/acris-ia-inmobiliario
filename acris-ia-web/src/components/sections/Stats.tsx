import { useEffect, useRef, useState } from 'react';
import { CountUp } from '../ui/CountUp';

interface Stat {
  /** Numeric value to animate up to (null for non-numeric) */
  numericValue: number | null;
  /** Full display label, e.g. "100%", "4x", "< 30seg", "45%" */
  display: string;
  /** Prefix before the number (for CountUp) */
  prefix?: string;
  /** Suffix after the number (for CountUp) */
  suffix?: string;
  label: string;
}

const STATS: Stat[] = [
  {
    numericValue: 100,
    display: '100%',
    suffix: '%',
    label: 'Leads atendidos',
  },
  {
    numericValue: 4,
    display: '4x',
    suffix: 'x',
    label: 'Visitas agendadas',
  },
  {
    numericValue: 30,
    display: '< 30seg',
    prefix: '< ',
    suffix: 'seg',
    label: 'en tiempo de respuesta',
  },
];

function StatCard({ stat, index }: { stat: Stat; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    const el = ref.current;
    if (el) observer.observe(el);
    return () => { if (el) observer.unobserve(el); };
  }, []);

  return (
    <div
      ref={ref}
      className="flex flex-col items-center text-center px-6 py-8 md:px-10 md:py-10"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(20px)',
        transition: `opacity 0.6s ease ${index * 0.15}s, transform 0.6s ease ${index * 0.15}s`,
      }}
    >
      {/* Number */}
      <div
        className="whitespace-nowrap text-4xl md:text-6xl lg:text-7xl font-bold text-primary tracking-tight leading-none mb-4"
        style={{ textShadow: '0 0 28px rgba(232,25,44,0.4)' }}
      >
        {stat.numericValue !== null ? (
          <CountUp
            end={stat.numericValue}
            prefix={stat.prefix ?? ''}
            suffix={stat.suffix ?? ''}
            duration={3500}
          />
        ) : (
          stat.display
        )}
      </div>

      {/* Label */}
      <p className="text-xs md:text-sm font-label uppercase tracking-widest text-on-surface-variant leading-relaxed">
        {stat.label}
      </p>
    </div>
  );
}

export function Stats() {
  return (
    <section className="relative py-0 border-y border-white/5 overflow-hidden">
      {/* Subtle red ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 100% at 50% 50%, rgba(232,25,44,0.04) 0%, transparent 70%)',
        }}
      />

      {/* Glass-tinted backdrop */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'rgba(13,13,13,0.85)', backdropFilter: 'blur(2px)' }}
      />

      <div className="relative z-10 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/5">
          {STATS.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
