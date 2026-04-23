import { useEffect, useRef, useState } from 'react';

/* ─── Fade-up hook ─────────────────────────────────────── */
function useFadeUp(delay = 0) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    const el = ref.current;
    if (el) observer.observe(el);
    return () => { if (el) observer.unobserve(el); };
  }, []);

  return {
    ref,
    style: {
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(32px)',
      transition: `opacity 0.75s ease ${delay}s, transform 0.75s ease ${delay}s`,
    },
  };
}

/* ─── Stat block ────────────────────────────────────────── */
function StatBlock({ text, delay }: { text: string; delay: number }) {
  const fu = useFadeUp(delay);
  return (
    <div ref={fu.ref} style={fu.style} className="flex flex-col items-center gap-4">
      <p className="text-on-surface-variant text-lg md:text-xl text-center max-w-lg leading-relaxed">
        {text}
      </p>
    </div>
  );
}

/* ─── Main section ──────────────────────────────────────── */
export function CostOfInaction() {
  const tag      = useFadeUp(0);
  const title    = useFadeUp(0.12);
  const lines    = useFadeUp(0.24);
  const stats    = useFadeUp(0.36);
  const remate   = useFadeUp(0.50);
  const { ref: ctaRef, style: ctaStyle } = useFadeUp(0.62);

  return (
    <section className="relative overflow-hidden py-36 px-6">

      {/* ── Background city image ── */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1920&q=80"
          alt="Ciudad latinoamericana nocturna"
          className="w-full h-full object-cover"
        />
        {/* Dark black overlay with adjusted opacity to let the image show more */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(135deg, rgba(5,5,5,0.88) 0%, rgba(10,10,10,0.82) 50%, rgba(5,5,5,0.88) 100%)',
          }}
        />
        {/* Extra vignette */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 80% 60% at 50% 50%, transparent 0%, rgba(0,0,0,0.6) 100%)',
          }}
        />
      </div>


      {/* ── Content ── */}
      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center text-center gap-14">

        {/* Tag */}
        <div ref={tag.ref} style={tag.style}>
          <span className="text-primary text-xs font-bold uppercase tracking-[0.25em] border border-primary/30 px-4 py-1.5 rounded-full">
            Por qué tu equipo no puede solo
          </span>
        </div>

        {/* Title */}
        <div ref={title.ref} style={title.style}>
          <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight tracking-tight">
            Los leads inmobiliarios necesitan dos cosas que tu equipo no puede garantizar.
          </h2>
        </div>

        {/* Two red lines */}
        <div ref={lines.ref} style={lines.style} className="flex flex-col gap-2">
          <p
            className="text-3xl md:text-4xl font-bold text-primary"
            style={{ textShadow: '0 0 30px rgba(232,25,44,0.4)' }}
          >
            Respuesta inmediata.
          </p>
          <p
            className="text-3xl md:text-4xl font-bold text-primary"
            style={{ textShadow: '0 0 30px rgba(232,25,44,0.4)' }}
          >
            Seguimiento sin rendirse.
          </p>
        </div>

        {/* Three stat blocks with red dividers */}
        <div ref={stats.ref} style={stats.style} className="w-full flex flex-col items-center gap-0">

          <div className="flex flex-col items-center gap-4 py-8 w-full">
            <p className="text-on-surface-variant text-lg md:text-xl text-center max-w-lg leading-relaxed">
              El <strong className="text-white">80%</strong> de las ventas inmobiliarias requieren entre{' '}
              <strong className="text-white">5 y 12 contactos</strong> antes del cierre.
            </p>
          </div>

          {/* Divider */}
          <div
            className="w-24 h-px"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(232,25,44,0.5), transparent)' }}
          />

          <div className="flex flex-col items-center gap-4 py-8 w-full">
            <p className="text-on-surface-variant text-lg md:text-xl text-center max-w-lg leading-relaxed">
              Más del <strong className="text-white">50% de tus leads</strong> no pasa del primer seguimiento.
            </p>
          </div>

          {/* Divider */}
          <div
            className="w-24 h-px"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(232,25,44,0.5), transparent)' }}
          />

          <div className="flex flex-col items-center gap-4 py-8 w-full">
            <p className="text-on-surface-variant text-lg md:text-xl text-center max-w-lg leading-relaxed">
              Tu equipo <strong className="text-white">no responde a tiempo.</strong> Y cuando lo hace,{' '}
              <strong className="text-white">se rinde demasiado pronto.</strong>
            </p>
          </div>
        </div>



        {/* Remate */}
        <div ref={remate.ref} style={remate.style} className="flex flex-col items-center gap-3">
          <p className="text-white text-xl md:text-2xl font-medium">
            Acris IA responde en menos de 30 segundos.
          </p>
          <p
            className="text-primary text-xl md:text-2xl font-bold"
            style={{ textShadow: '0 0 20px rgba(232,25,44,0.35)' }}
          >
            Y sigue hasta el contacto 12 si es necesario.
          </p>

        </div>

        {/* CTA Button */}
        <div ref={ctaRef} style={ctaStyle} className="mt-8">
          <button 
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-primary hover:bg-primary-dim text-white px-10 py-4 rounded-xl font-bold text-lg transition-all active:scale-95 shadow-[0_0_25px_rgba(232,25,44,0.4)] hover:shadow-[0_0_35px_rgba(232,25,44,0.6)]"
          >
            Agenda una asesoría gratis
          </button>
        </div>

      </div>
    </section>
  );
}
