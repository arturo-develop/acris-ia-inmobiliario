
import { GlassCard } from '../ui/GlassCard';
import { Typewriter } from '../ui/Typewriter';
import { useEffect, useRef, useState } from 'react';

// ── Types ─────────────────────────────────────────────────────────────────────
interface ChatMessage {
  from: 'lead' | 'ai';
  text?: string;
  image?: string;
  imageCaption?: string;
  delay: number;
}

// ── Chat simulation data ──────────────────────────────────────────────────────
const CHAT_MESSAGES: ChatMessage[] = [
  { from: 'ai', text: 'Hola! Vi que te interesaste en Torre Altavista desde Encuentra24. Soy el asistente virtual de la inmobiliaria. ¿En qué te puedo ayudar? 😊', delay: 0 },
  { from: 'lead', text: 'Hola, sí, quiero información del apartamento de 2 habitaciones', delay: 3000 },
  { from: 'ai', text: '¡Perfecto! Torre Altavista tiene apartamentos de 2 hab desde 95,000 USD. Están en el piso 8 al 14 con vista a la ciudad. ¿Tienes un presupuesto aproximado en mente?', delay: 6000 },
  { from: 'lead', text: 'Tengo como 110-120k', delay: 9000 },
  { from: 'ai', text: '¡Excelente! Tenemos opciones perfectas para ese rango. Te mando algunas fotos 📸', delay: 12000 },
  { from: 'ai', image: '/chat-living.png', imageCaption: 'Sala con vista panorámica', delay: 15000 },
  { from: 'ai', image: '/chat-bedroom.png', imageCaption: 'Habitación principal', delay: 18000 },
  { from: 'lead', text: 'Wow se ve muy bien! ¿Tiene zonas comunes?', delay: 21000 },
  { from: 'ai', text: 'Sí! Contamos con piscina, gimnasio, cowork y terraza BBQ 🏊', delay: 24000 },
  { from: 'ai', image: '/chat-exterior.png', imageCaption: 'Zonas comunes - Torre Altavista', delay: 27000 },
  { from: 'ai', text: '¿Para cuándo estás pensando en hacer el cambio? ¿Es para vivienda propia o inversión?', delay: 30000 },
  { from: 'lead', text: 'Para vivienda propia, queremos mudarnos antes de diciembre', delay: 33000 },
  { from: 'ai', text: 'Perfecto, tenemos unidades con entrega inmediata que te convienen. ¿Te gustaría visitar el showroom esta semana? 😊', delay: 36000 },
  { from: 'lead', text: 'Sí, me interesa. ¿Qué días tienen disponibles?', delay: 39000 },
  { from: 'ai', text: 'Tenemos disponibilidad en:\n📅 Martes 10am - 12pm\n📅 Jueves 3pm - 5pm\n📅 Sábado 9am - 11am\n\n¿Cuál te queda mejor?', delay: 42000 },
  { from: 'lead', text: 'El sábado por la mañana perfecto', delay: 45000 },
  { from: 'ai', text: '¡Listo! Quedaste agendado para el sábado. Te envío la confirmación por aquí. ¡Nos vemos! 🎉', delay: 48000 },
];

// ── WhatsApp Chat Component ───────────────────────────────────────────────────
function WhatsAppChat() {
  const [visibleCount, setVisibleCount] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (visibleCount >= CHAT_MESSAGES.length) return;

    const nextDelay = visibleCount === 0 ? 1000 : CHAT_MESSAGES[visibleCount].delay - CHAT_MESSAGES[visibleCount - 1].delay;
    const msg = CHAT_MESSAGES[visibleCount];

    if (msg.from === 'ai') {
      setIsTyping(true);
      const typingTimer = setTimeout(() => {
        setIsTyping(false);
        setVisibleCount(v => v + 1);
      }, msg.image ? 2000 : 2500);
      return () => clearTimeout(typingTimer);
    }

    const timer = setTimeout(() => {
      setVisibleCount(v => v + 1);
    }, nextDelay);

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
    if (visibleCount >= CHAT_MESSAGES.length && !isTyping) {
      const restartTimer = setTimeout(() => setVisibleCount(0), 5000);
      return () => clearTimeout(restartTimer);
    }
  }, [visibleCount, isTyping]);

  const getTime = (index: number): string => {
    const baseHour = 10;
    const baseMin = 2;
    const offset = Math.floor(index / 2);
    const min = baseMin + offset;
    return `${baseHour}:${min.toString().padStart(2, '0')} a.m.`;
  };

  return (
    <div className="flex flex-col rounded-2xl overflow-hidden shadow-2xl shadow-black/40" style={{ width: '306px', height: '544px' }}>
      {/* WhatsApp Header */}
      <div className="flex items-center gap-3 px-4 py-2.5 bg-[#075E54] flex-shrink-0">
        <div className="flex items-center gap-3 flex-1">
          <div className="w-4 h-4 flex items-center">
            <svg viewBox="0 0 24 24" fill="#FFFFFF" width="20" height="20"><path d="M12 4l1.41 1.41L7.83 11H20v2H7.83l5.58 5.59L12 20l-8-8 8-8z"/></svg>
          </div>
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center overflow-hidden">
              <img src="/logo.png" alt="Acris IA" className="w-full h-full object-cover" />
            </div>
          </div>
          <div className="flex-1">
            <p className="text-white font-medium text-[15px] leading-none">Acris IA</p>
            <p className="text-[#d1f4cc] text-[13px] mt-0.5">en línea</p>
          </div>
          <div className="flex items-center gap-4">
            <svg viewBox="0 0 24 24" fill="#FFFFFF" width="22" height="22"><path d="M15.5 1h-8C6.12 1 5 2.12 5 3.5v17C5 21.88 6.12 23 7.5 23h8c1.38 0 2.5-1.12 2.5-2.5v-17C18 2.12 16.88 1 15.5 1zm-4 21c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm4.5-4H7V4h9v14z"/></svg>
            <svg viewBox="0 0 24 24" fill="#FFFFFF" width="5" height="20"><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>
          </div>
        </div>
      </div>

      {/* WhatsApp Chat Body */}
      <div
        ref={containerRef}
        className="flex-1 overflow-hidden px-3 py-3 space-y-1"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'360\' height=\'640\'%3E%3Cdefs%3E%3Cpattern id=\'pattern\' x=\'0\' y=\'0\' width=\'250\' height=\'250\' patternUnits=\'userSpaceOnUse\'%3E%3Cg fill=\'%23d9d9d9\' opacity=\'0.09\'%3E%3Cpath d=\'M82.5 47.5c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32zm0-58c-14.3 0-26 11.7-26 26s11.7 26 26 26 26-11.7 26-26-11.7-26-26-26z\'/%3E%3C/g%3E%3C/pattern%3E%3C/defs%3E%3Crect fill=\'%23ECE5DD\' width=\'360\' height=\'640\'/%3E%3Crect fill=\'url(%23pattern)\' width=\'360\' height=\'640\'/%3E%3C/svg%3E")',
          backgroundColor: '#ECE5DD',
          pointerEvents: 'none',
        }}
      >
        {/* Date chip */}
        <div className="flex justify-center mb-2">
          <span className="bg-[#FFFFFF] text-[#667781] text-[11px] px-3 py-1 rounded-lg shadow-sm font-medium">HOY</span>
        </div>

        {CHAT_MESSAGES.slice(0, visibleCount).map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.from === 'lead' ? 'justify-end' : 'justify-start'} animate-fade-in-up mb-[2px]`}
          >
            <div
              className={`relative max-w-[82%] rounded-lg shadow-md ${
                msg.from === 'lead'
                  ? 'bg-[#DCF8C6] rounded-tr-none'
                  : 'bg-[#FFFFFF] rounded-tl-none'
              } ${msg.image ? 'p-1' : 'px-2.5 py-1.5'}`}
            >
              {/* WhatsApp tail */}
              {i === 0 || CHAT_MESSAGES[i - 1]?.from !== msg.from ? (
                <div
                  className={`absolute top-0 w-2 h-3 ${
                    msg.from === 'lead' ? '-right-1.5' : '-left-1.5'
                  }`}
                  style={{
                    background: msg.from === 'lead' ? '#DCF8C6' : '#FFFFFF',
                    clipPath: msg.from === 'lead'
                      ? 'polygon(0 0, 100% 0, 0 100%)'
                      : 'polygon(100% 0, 0 0, 100% 100%)',
                  }}
                />
              ) : null}

              {msg.image ? (
                <div className="rounded-md overflow-hidden">
                  <img
                    src={msg.image}
                    alt={msg.imageCaption ?? 'Foto del inmueble'}
                    className="w-full h-auto max-h-48 object-cover rounded-md"
                  />
                  {msg.imageCaption && (
                    <p className="text-[#000000] text-[12.5px] leading-snug px-1.5 pt-1 pb-0.5 text-left">
                      {msg.imageCaption}
                      <span className="float-right text-[10px] text-[#667781] mt-0.5 ml-2">
                        {getTime(i)}
                        {msg.from === 'lead' && (
                          <span className="ml-0.5 text-[#4FC3F7]">✓✓</span>
                        )}
                      </span>
                    </p>
                  )}
                </div>
              ) : (
                <p className="text-[#000000] text-[13px] leading-[19px] text-left" style={{ whiteSpace: 'pre-line' }}>
                  {msg.text}
                  <span className="float-right text-[10px] text-[#667781] mt-1 ml-3 flex items-center gap-0.5">
                    {getTime(i)}
                    {msg.from === 'lead' && (
                      <span className="text-[#4FC3F7]">✓✓</span>
                    )}
                  </span>
                </p>
              )}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start animate-fade-in-up mb-[2px]">
            <div className="bg-[#FFFFFF] px-4 py-2.5 rounded-lg rounded-tl-none flex items-center gap-1.5 shadow-md">
              <span className="w-2 h-2 bg-[#90949c] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
              <span className="w-2 h-2 bg-[#90949c] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
              <span className="w-2 h-2 bg-[#90949c] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
            </div>
          </div>
        )}
      </div>

      {/* WhatsApp Input Bar */}
      <div className="flex items-center gap-2 px-2 py-2 bg-[#F0F0F0] flex-shrink-0 border-t border-[#d1d1d6]">
        <div className="flex items-center gap-1">
          <div className="w-9 h-9 flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="#7C7C7C" width="26" height="26"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/><circle cx="15.5" cy="9.5" r="1.5"/><circle cx="8.5" cy="9.5" r="1.5"/></svg>
          </div>
        </div>
        <div className="flex-1 flex items-center bg-white rounded-full px-4 py-2 border border-[#d1d1d6]">
          <span className="text-[#999999] text-[15px] flex-1">Mensaje</span>
          <div className="flex items-center gap-2 ml-2">
            <svg viewBox="0 0 24 24" fill="#7C7C7C" width="22" height="22"><path d="M1.816 15.556v.002c0 1.502.584 2.912 1.646 3.972s2.472 1.647 3.974 1.647a5.58 5.58 0 003.972-1.645l9.547-9.548c.769-.768 1.147-1.767 1.058-2.817-.079-.968-.548-1.927-1.319-2.698-1.594-1.592-4.068-1.711-5.517-.262l-7.916 7.915c-.881.881-.792 2.25.214 3.261.501.501 1.155.779 1.773.779.641 0 1.211-.314 1.478-.581l4.812-4.812-.354-.354-4.812 4.812c-.239.239-.757.51-1.337.269-.639-.266-1.109-.895-1.109-1.47v-.002c0-.372.145-.721.409-.985l7.916-7.916c1.186-1.186 3.267-1.092 4.565.207.657.658 1.057 1.487 1.126 2.334.074.895-.267 1.745-.955 2.398l-.04.039-9.548 9.549-.039.039a4.365 4.365 0 01-3.106 1.291c-1.17 0-2.274-.459-3.107-1.291a4.38 4.38 0 01-1.292-3.107v-.002c0-1.17.459-2.272 1.292-3.106l7.916-7.915.354.354-7.916 7.915a3.157 3.157 0 00-.932 2.241z"/></svg>
            <svg viewBox="0 0 24 24" fill="#7C7C7C" width="22" height="22"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-5 6c0 1.66-1.34 3-3 3s-3-1.34-3-3 1.34-3 3-3 3 1.34 3 3zm-9 8c0-2 4-3.1 6-3.1s6 1.1 6 3.1v1H6v-1z"/></svg>
          </div>
        </div>
        <div className="w-9 h-9 bg-[#007AFF] rounded-full flex items-center justify-center flex-shrink-0">
          <svg viewBox="0 0 24 24" fill="white" width="20" height="20"><path d="M11.999 14.942c2.001 0 3.531-1.53 3.531-3.531V4.35c0-2.001-1.53-3.531-3.531-3.531S8.469 2.35 8.469 4.35v7.061c0 2.001 1.53 3.531 3.53 3.531zm6.238-3.53c0 3.531-2.942 6.002-6.238 6.002s-6.238-2.471-6.238-6.002H4.761c0 3.885 3.118 7.061 7.003 7.532v3.707h.471v-3.707c3.885-.471 7.003-3.648 7.003-7.532h-1.001z"/></svg>
        </div>
      </div>
    </div>
  );
}

// ── Hero ─────────────────────────────────────────────────────────────────────
export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-14 md:pt-28 pb-10 md:pb-20 px-6 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          className="w-full h-full object-cover opacity-20"
          alt="Futuristic skyscraper city skyline at night with deep red and blue lighting accents, cinematic wide angle"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBc3dZU1mdZ6ILb2LEF0rfy9c8KpBrepevcOJlzVVugSKajTGN5Sok_3imcK5G6UrYEs5e2vjWvz-A6GVMaCzBQZG5Rhap-AwfvzgCvREwP-vflu9eZ-hoKLEVIVo3Jg5rJVNV7Xk_ulaIuEa3CbJx782nI8jW7M3wSJB84JMqsWar4cvN15TsD2IOEw8yes3LpCmBVTkCNqAWXzivXHN6FJEvUliBAK2pIiKLfvy9Jh17UGc5RHNIslNnioI0wWKOdEgczpZJT5YM"
        />
        <div className="absolute inset-0 hero-overlay"></div>
      </div>

      <div className="relative z-10 max-w-5xl w-full text-center space-y-4 md:space-y-8">

        {/* Logo — compact */}
        <div className="relative w-full flex justify-center mb-8 md:mb-10">
          <div className="absolute inset-0 bg-primary/10 blur-[60px] rounded-full scale-75"></div>
          <img
            src="/logo.png"
            alt="Acris IA Logo"
            className="relative w-[86px] md:w-[106px] lg:w-[125px] h-auto object-contain drop-shadow-[0_0_15px_rgba(232,25,44,0.15)] transition-transform duration-700 hover:scale-105"
          />
        </div>

        {/* Pill Badge */}
        <div className="animated-gradient-border mb-8 md:mb-10 mx-auto">
          <span className="block px-4 py-1.5 rounded-full bg-surface/90 backdrop-blur-xl text-white text-xs md:text-sm font-semibold tracking-widest uppercase">
            🤖 Sistema integrado de IA + CRM exclusivo para inmobiliarias y constructoras
          </span>
        </div>

        {/* H1 Headline */}
        <h1 className="text-[24px] sm:text-3xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tighter drop-shadow-lg">
          <span className="block text-white">Tu equipo no puede</span>
          <span className="block text-primary min-h-[1.2em] my-1 whitespace-nowrap">
            <Typewriter words={['Responder al instante', 'Agendar citas', 'Calificar Leads', 'Hacer seguimiento perpetuo', 'Trabajar 24/7']} />
          </span>
          <span className="block text-white">al mismo tiempo.</span>
          <span className="block mt-3 md:mt-5 text-2xl md:text-4xl lg:text-5xl">
            <span className="text-primary font-bold">Acris IA</span>{' '}
            <span className="text-white">lo hace 100% en automático.</span>
          </span>
        </h1>

        <div className="space-y-8 md:space-y-14 mt-12 md:mt-16">

          {/* ── "Nuestro sistema con IA está diseñado para:" ── */}
          <div className="max-w-4xl mx-auto w-full">
            <div className="animated-border-card relative rounded-3xl p-[1px]">
              <div className="relative rounded-3xl bg-surface-container-highest/70 backdrop-blur-xl px-8 py-10 md:px-14 md:py-14 shadow-[0_0_60px_rgba(232,25,44,0.18)] overflow-hidden">
                <div className="absolute top-0 left-0 w-40 h-40 bg-primary/10 blur-[60px] rounded-full pointer-events-none"></div>
                <div className="absolute bottom-0 right-0 w-40 h-40 bg-primary/10 blur-[60px] rounded-full pointer-events-none"></div>

                <div className="relative z-10 text-center">
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-6 tracking-tight">
                    Nuestro sistema con IA está diseñado para:
                  </h3>
                  <p className="text-lg md:text-2xl font-light text-on-surface-variant leading-relaxed max-w-3xl mx-auto">
                    Responder, filtrar, calificar, agendar. Y si no está listo —&nbsp;
                    <span className="text-white font-medium">lo sigue siempre, solo, hasta que lo esté.</span>
                    {' '}Acris IA maneja todo tu proceso comercial de forma automática, mueve los leads dentro del pipeline y sabe exactamente quién está listo para visitar tu proyecto hoy.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ── CTA Button ── */}
          <div className="mt-12 md:mt-16">
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-primary hover:bg-primary-dim text-white px-10 py-4 rounded-xl font-bold text-lg transition-all active:scale-95 shadow-[0_0_15px_rgba(232,25,44,0.15)] hover:shadow-[0_0_25px_rgba(232,25,44,0.3)]"
            >
              Agenda una asesoría gratis
            </button>
          </div>

          {/* ── WhatsApp Chat Simulation ── */}
          <div className="flex flex-col items-center w-full mt-12 md:mt-16">
            <p className="text-xs uppercase tracking-[0.2em] text-on-surface-variant mb-3 font-semibold flex items-center justify-center gap-2">
              <svg viewBox="0 0 24 24" fill="#25D366" width="16" height="16"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492l4.625-1.476A11.929 11.929 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818c-2.168 0-4.19-.596-5.926-1.632l-.425-.249-3.238 1.034 1.055-3.14-.277-.44A9.774 9.774 0 012.182 12c0-5.423 4.395-9.818 9.818-9.818S21.818 6.577 21.818 12s-4.395 9.818-9.818 9.818z"/></svg>
              Conversación real · Acris IA en acción
            </p>
            <WhatsAppChat />
          </div>

        </div>
      </div>
    </section>
  );
}
