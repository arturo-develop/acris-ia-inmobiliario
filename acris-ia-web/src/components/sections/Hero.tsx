
import { GlassCard } from '../ui/GlassCard';
import { Typewriter } from '../ui/Typewriter';
import { useEffect, useRef, useState } from 'react';

// ── Chat simulation data ──────────────────────────────────────────────────────
const CHAT_MESSAGES = [
  { from: 'lead', text: 'Hola, vi su publicación de apartamentos. ¿Me pueden dar información?', delay: 0 },
  { from: 'ai', text: '¡Hola! Soy el asistente de Acris Inmobiliaria 👋 Con gusto te ayudo. ¿Qué tipo de apartamento estás buscando?', delay: 1200 },
  { from: 'lead', text: 'Busco algo de 2 habitaciones, no muy grande.', delay: 2600 },
  { from: 'ai', text: 'Perfecto. Tenemos apartamentos de 2 hab desde 58 m² hasta 85 m². ¿Tienes en mente un rango de presupuesto?', delay: 4000 },
  { from: 'lead', text: 'Más o menos entre 180 y 220 millones.', delay: 5600 },
  { from: 'ai', text: 'Excelente, tienes muy buenas opciones en ese rango 🏠 En la Torre Norte hay unidades desde $185M con acabados premium. ¿Te gustaría ver disponibilidad?', delay: 7200 },
  { from: 'lead', text: 'Sí, ¿tienen alguno en piso alto?', delay: 8800 },
  { from: 'ai', text: 'Sí, el piso 14 está disponible, 72 m², con vista panorámica a la ciudad. Precio: $198M. ¿Quieres agendamos una visita esta semana?', delay: 10400 },
  { from: 'lead', text: 'Me interesa mucho. ¿Cuándo pueden?', delay: 12000 },
  { from: 'ai', text: '¡Perfecto! Tengo disponibilidad el miércoles a las 10am o el jueves a las 3pm. ¿Cuál te viene mejor?', delay: 13600 },
  { from: 'lead', text: 'El jueves a las 3pm está bien.', delay: 15200 },
  { from: 'ai', text: '✅ ¡Listo! Tu visita quedó agendada para el jueves a las 3pm. Te envío la confirmación con la dirección exacta. ¡Nos vemos pronto! 🗓️', delay: 16800 },
];

function ChatSimulation() {
  const [visibleCount, setVisibleCount] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (visibleCount >= CHAT_MESSAGES.length) return;

    const currentMsg = CHAT_MESSAGES[visibleCount];
    const nextMsg = CHAT_MESSAGES[visibleCount + 1];

    // Show typing indicator before AI messages
    if (currentMsg.from === 'ai') {
      setIsTyping(true);
      const typingTimer = setTimeout(() => {
        setIsTyping(false);
        setVisibleCount(v => v + 1);
      }, 900);
      return () => clearTimeout(typingTimer);
    }

    const timer = setTimeout(() => {
      setVisibleCount(v => v + 1);
      if (nextMsg?.from === 'ai') setIsTyping(true);
    }, nextMsg ? nextMsg.delay - currentMsg.delay : 1500);

    return () => clearTimeout(timer);
  }, [visibleCount]);

  // Auto-scroll
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [visibleCount, isTyping]);

  // Restart loop
  useEffect(() => {
    if (visibleCount === 0) return;
    if (visibleCount >= CHAT_MESSAGES.length && !isTyping) {
      const restartTimer = setTimeout(() => setVisibleCount(0), 4000);
      return () => clearTimeout(restartTimer);
    }
  }, [visibleCount, isTyping]);

  return (
    <div className="flex flex-col h-full">
      {/* Chat header */}
      <div className="flex items-center gap-3 px-5 py-4 border-b border-white/10 bg-surface-container-highest/80 rounded-t-2xl">
        <div className="relative">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary-dim flex items-center justify-center text-white font-bold text-sm shadow-lg">AI</div>
          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-surface-container-highest"></span>
        </div>
        <div>
          <p className="text-white font-semibold text-sm leading-none">Acris IA · Asistente</p>
          <p className="text-emerald-400 text-xs mt-0.5">● En línea ahora</p>
        </div>
        <div className="ml-auto flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/70"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/70"></div>
        </div>
      </div>

      {/* Messages */}
      <div
        ref={containerRef}
        className="flex-1 overflow-y-auto px-4 py-4 space-y-3 scroll-smooth"
        style={{ maxHeight: '340px', scrollbarWidth: 'none' }}
      >
        {CHAT_MESSAGES.slice(0, visibleCount).map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.from === 'lead' ? 'justify-end' : 'justify-start'} animate-fade-in-up`}
          >
            {msg.from === 'ai' && (
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary to-primary-dim flex items-center justify-center text-white text-xs font-bold mr-2 mt-auto flex-shrink-0 shadow-md">
                AI
              </div>
            )}
            <div
              className={`max-w-[78%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed shadow-sm ${
                msg.from === 'lead'
                  ? 'bg-primary/90 text-white rounded-br-sm'
                  : 'bg-surface-container-highest text-on-surface rounded-bl-sm border border-white/10'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start animate-fade-in-up">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary to-primary-dim flex items-center justify-center text-white text-xs font-bold mr-2 mt-auto flex-shrink-0 shadow-md">
              AI
            </div>
            <div className="bg-surface-container-highest border border-white/10 px-4 py-3 rounded-2xl rounded-bl-sm flex items-center gap-1.5 shadow-sm">
              <span className="w-2 h-2 bg-on-surface-variant rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
              <span className="w-2 h-2 bg-on-surface-variant rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
              <span className="w-2 h-2 bg-on-surface-variant rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
            </div>
          </div>
        )}
      </div>

      {/* Input bar */}
      <div className="px-4 py-3 border-t border-white/10 bg-surface-container-highest/60 rounded-b-2xl">
        <div className="flex items-center gap-2 bg-surface/60 rounded-xl px-4 py-2 border border-white/10">
          <span className="text-on-surface-variant text-sm flex-1 italic opacity-60">Escribe un mensaje...</span>
          <div className="w-7 h-7 bg-primary rounded-lg flex items-center justify-center cursor-not-allowed opacity-50">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M2 21l21-9L2 3v7l15 2-15 2v7z"/></svg>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Hero ─────────────────────────────────────────────────────────────────────
export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-32 pb-20 px-6 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          className="w-full h-full object-cover opacity-20"
          alt="Futuristic skyscraper city skyline at night with deep red and blue lighting accents, cinematic wide angle"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBc3dZU1mdZ6ILb2LEF0rfy9c8KpBrepevcOJlzVVugSKajTGN5Sok_3imcK5G6UrYEs5e2vjWvz-A6GVMaCzBQZG5Rhap-AwfvzgCvREwP-vflu9eZ-hoKLEVIVo3Jg5rJVNV7Xk_ulaIuEa3CbJx782nI8jW7M3wSJB84JMqsWar4cvN15TsD2IOEw8yes3LpCmBVTkCNqAWXzivXHN6FJEvUliBAK2pIiKLfvy9Jh17UGc5RHNIslNnioI0wWKOdEgczpZJT5YM"
        />
        <div className="absolute inset-0 hero-overlay"></div>
      </div>

      <div className="relative z-10 max-w-5xl w-full text-center space-y-10">

        {/* Logo */}
        <div className="relative w-full flex justify-center mb-10 md:mb-14">
          <div className="absolute inset-0 bg-primary/10 blur-[80px] rounded-full scale-110"></div>
          <img
            src="/logo.png"
            alt="Acris IA Logo"
            className="relative w-64 md:w-80 lg:w-[400px] h-auto object-contain drop-shadow-[0_0_20px_rgba(232,25,44,0.15)] transition-transform duration-700 hover:scale-105"
          />
        </div>

        {/* Pill Badge */}
        <div className="animated-gradient-border mb-6 mx-auto">
          <span className="block px-4 py-1.5 rounded-full bg-surface/90 backdrop-blur-xl text-white text-sm font-semibold tracking-widest uppercase">
            🤖 Sistema integrado de IA + CRM exclusivo para inmobiliarias y constructoras
          </span>
        </div>

        {/* H1 Headline */}
        <h1 className="text-[26px] sm:text-4xl md:text-6xl font-bold leading-tight tracking-tighter drop-shadow-lg">
          <span className="block text-white">Tu equipo no puede</span>
          <span className="block text-primary min-h-[1.2em] my-1 whitespace-nowrap">
            <Typewriter words={['Responder al instante', 'Agendar citas', 'Calificar Leads', 'Hacer seguimiento perpetuo', 'Trabajar 24/7']} />
          </span>
          <span className="block text-white">al mismo tiempo.</span>
          <span className="block mt-4 md:mt-6 text-3xl md:text-5xl">
            <span className="text-primary font-bold">Acris IA</span>{' '}
            <span className="text-white">lo hace 100% en automático.</span>
          </span>
        </h1>

        <div className="space-y-14">



          {/* ── Chat simulation ── */}
          <div className="max-w-2xl mx-auto w-full">
            <p className="text-xs uppercase tracking-[0.2em] text-on-surface-variant mb-3 font-semibold">
              Conversación real · Acris IA en acción
            </p>
            <GlassCard className="rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_40px_rgba(232,25,44,0.08)]">
              <ChatSimulation />
            </GlassCard>
          </div>

          {/* ── "Nuestro sistema con IA está diseñado para:" ── */}
          <div className="max-w-4xl mx-auto w-full">
            <div className="animated-border-card relative rounded-3xl p-[1px]">
              <div className="relative rounded-3xl bg-surface-container-highest/70 backdrop-blur-xl px-10 py-12 md:px-14 md:py-14 shadow-[0_0_60px_rgba(232,25,44,0.18)] overflow-hidden">
                {/* Inner red glow corners */}
                <div className="absolute top-0 left-0 w-40 h-40 bg-primary/10 blur-[60px] rounded-full pointer-events-none"></div>
                <div className="absolute bottom-0 right-0 w-40 h-40 bg-primary/10 blur-[60px] rounded-full pointer-events-none"></div>

                <div className="relative z-10 text-center">
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-6 tracking-tight">
                    Nuestro sistema con IA está diseñado para:
                  </h3>
                  <p className="text-xl md:text-2xl font-light text-on-surface-variant leading-relaxed max-w-3xl mx-auto">
                    Responder, filtrar, calificar, agendar. Y si no está listo —&nbsp;
                    <span className="text-white font-medium">lo sigue siempre, solo, hasta que lo esté.</span>
                    {' '}Acris IA maneja todo tu proceso comercial de forma automática, mueve los leads dentro del pipeline y sabe exactamente quién está listo para visitar tu proyecto hoy.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ── CTA Button ── */}
          <div className="pt-4">
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-primary hover:bg-primary-dim text-white px-10 py-4 rounded-xl font-bold text-lg transition-all active:scale-95 shadow-[0_0_15px_rgba(232,25,44,0.15)] hover:shadow-[0_0_25px_rgba(232,25,44,0.3)]"
            >
              Agenda una asesoría gratis
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
