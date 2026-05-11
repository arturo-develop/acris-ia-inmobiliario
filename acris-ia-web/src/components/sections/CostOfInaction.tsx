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

        {/* Two glass phrases */}
        <div ref={lines.ref} style={lines.style} className="flex flex-col md:flex-row gap-6 justify-center w-full max-w-4xl mx-auto">
          <div className="glass-card px-10 py-5 rounded-2xl border-2 border-primary/20 bg-primary/5 shadow-[0_0_15px_rgba(232,25,44,0.15)]">
            <span className="text-xl md:text-2xl font-bold text-white uppercase tracking-wider" style={{ textShadow: '0 0 10px rgba(232,25,44,0.4)' }}>Respuesta Inmediata</span>
          </div>
          <div className="glass-card px-10 py-5 rounded-2xl border-2 border-primary/20 bg-primary/5 shadow-[0_0_15px_rgba(232,25,44,0.15)]">
            <span className="text-xl md:text-2xl font-bold text-white uppercase tracking-wider" style={{ textShadow: '0 0 10px rgba(232,25,44,0.4)' }}>Seguimiento Perpetuo</span>
          </div>
        </div>

        {/* Big data boxes */}
        <div ref={stats.ref} style={stats.style} className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl mx-auto mt-8">
          {/* Box 1: +50% */}
          <div className="glass-card rounded-2xl p-10 relative overflow-hidden group border border-white/10 flex flex-col items-center text-center">
            <div className="relative z-10 text-6xl md:text-8xl font-black text-primary mb-6 animate-pulse" style={{ textShadow: '0 0 20px rgba(232,25,44,0.4)' }}>
              +50%
            </div>
            <p className="relative z-10 text-xl text-on-surface-variant font-medium leading-relaxed">
              <span className="text-white font-bold underline decoration-primary underline-offset-4">De tus leads</span> no pasa del primer seguimiento.
            </p>
          </div>

          {/* Box 2: +80% */}
          <div className="glass-card rounded-2xl p-10 relative overflow-hidden group border border-white/10 flex flex-col items-center text-center">
            <div className="relative z-10 text-6xl md:text-8xl font-black text-primary mb-6 animate-pulse" style={{ textShadow: '0 0 20px rgba(232,25,44,0.4)' }}>
              +80%
            </div>
            <p className="relative z-10 text-xl text-on-surface-variant font-medium leading-relaxed">
              <span className="text-white font-bold underline decoration-primary underline-offset-4">De las ventas inmobiliarias</span> requieren entre 5 y 12 contactos antes del cierre.
            </p>
          </div>
        </div>

        {/* Remate final */}
        <div ref={remate.ref} style={remate.style} className="mt-6 flex flex-col items-center">
          <p className="text-white text-xl md:text-2xl font-medium max-w-3xl text-center leading-relaxed">
            Acris IA responde en menos de 30 segundos y hace seguimiento perpetuo a los contactos que no están listos para comprar.
          </p>
        </div>

        {/* CTA Button */}
        <div ref={ctaRef} style={ctaStyle} className="mt-8">
          <button 
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-primary hover:bg-primary-dim text-white px-10 py-4 rounded-xl font-bold text-lg transition-all active:scale-95 shadow-[0_0_15px_rgba(232,25,44,0.15)] hover:shadow-[0_0_25px_rgba(232,25,44,0.3)]"
          >
            Agenda una asesoría gratis
          </button>
        </div>

      </div>
    </section>
  );
}
