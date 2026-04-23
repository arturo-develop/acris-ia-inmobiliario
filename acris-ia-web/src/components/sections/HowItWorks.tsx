
import { useState, useEffect, useRef } from 'react';
import { GlassCard } from '../ui/GlassCard';
import { MobileCarousel } from '../ui/MobileCarousel';

export function HowItWorks() {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [visibleMessages, setVisibleMessages] = useState<number[]>([]);
  const [typingIdx, setTypingIdx] = useState<number | null>(null);
  const [streamingIdx, setStreamingIdx] = useState<number | null>(null);
  const [streamingText, setStreamingText] = useState('');
  
  const sectionRef = useRef<HTMLElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  const steps = [
    {
      title: "1. Entendemos tu negocio",
      text: "Analizamos cómo vendes hoy y como potenciamos tu proceso comercial."
    },
    {
      title: "2. Construimos tu sistema",
      text: "Desarrollamos el agente, integramos CRM, estructuramos tu pipeline y automatizaciones a medida."
    },
    {
      title: "3. Conectamos todos tus canales",
      text: "WhatsApp, Instagram, Facebook, portales, web y pauta en un solo lugar."
    },
    {
      title: "4. Lanzamos y capacitamos",
      text: "Activamos el sistema y entrenamos a tu equipo para aprovecharlo al 100%."
    },
    {
      title: "5. Optimizamos cada mes",
      text: "Ajustamos, mejoramos y hacemos que rinda más continuamente."
    }
  ];

  // Logic for steps carousel and auto-switch
  useEffect(() => {
    if (!isInView) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isInView, steps.length]);

  const messages = [
    { type: 'client', time: '10:02 AM', text: "Hola, vi el anuncio del proyecto 'Torres del Sol'. ¿Me dan info?" },
    { type: 'ai', time: '10:02 AM', text: "¡Hola! Claro que sí, estás hablando con el asistente virtual de Torres del Sol. Tenemos unidades disponibles desde los $120,000 USD. ¿Qué tipo de departamento buscas?" },
    { type: 'client', time: '10:03 AM', text: "Busco de 2 habitaciones, ¿qué metraje tienen?" },
    { type: 'ai', time: '10:03 AM', text: "Los departamentos de 2 recámaras tienen entre 75m² y 85m², y vienen equipados con balcón y acabados premium. Cuentan con amenidades como alberca, gym y cowork. ¿Tienes algún presupuesto en mente?" },
    { type: 'client', time: '10:05 AM', text: "Alrededor de 130k USD. ¿Tienen entrega inmediata?" },
    { type: 'ai', time: '10:05 AM', text: "Sí, contamos con unidades de entrega inmediata en ese rango dentro de la Torre A. Lo ideal sería que nos visites para conocer los espacios y ver nuestro esquema de crédito directo. ¿Te gustaría agendar una cita al showroom esta semana?" },
    { type: 'client', time: '10:06 AM', text: "Dale, el sábado por la mañana puedo ir." },
    { type: 'ai', time: '10:06 AM', text: "¡Perfecto! Tengo disponibilidad este sábado a las 10:00 AM o a las 11:30 AM. ¿Qué horario te queda mejor?" },
    { type: 'client', time: '10:07 AM', text: "A las 11:30 AM." },
    { type: 'ai', time: '10:07 AM', text: "Cita confirmada ✅. Se ha notificado a nuestro gerente de ventas para recibirte este sábado a las 11:30 AM. Pronto te llegará un WhatsApp con la ubicación y código de acceso al parking. ¡Te esperamos!" }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setIsInView(true);
      }
    }, { threshold: 0.3 });

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isInView) return;
    
    // We run an infinite loop here
    let isMounted = true;
    
    const runChatSequence = async () => {
      while (isMounted) {
        setVisibleMessages([]);
        setTypingIdx(null);
        setStreamingIdx(null);
        setStreamingText('');

        await new Promise(r => setTimeout(r, 1000));

        for (let i = 0; i < messages.length; i++) {
          if (!isMounted) return;
          const msg = messages[i];
          
          if (msg.type === 'client') {
            // Client showing typing dots
            setTypingIdx(i);
            const typingTime = 1000 + Math.random() * 800;
            await new Promise(r => setTimeout(r, typingTime));
            
            if (!isMounted) return;
            setTypingIdx(null);
            setVisibleMessages(prev => [...prev, i]);
            await new Promise(r => setTimeout(r, 500));
          } else {
            // AI quick think then stream
            setTypingIdx(i);
            await new Promise(r => setTimeout(r, 400));
            if (!isMounted) return;
            setTypingIdx(null);
            
            setStreamingIdx(i);
            const words = msg.text.split(' ');
            let currentText = '';
            for (let w = 0; w < words.length; w++) {
               if (!isMounted) return;
               currentText += (w === 0 ? '' : ' ') + words[w];
               setStreamingText(currentText);
               await new Promise(r => setTimeout(r, 40 + Math.random() * 40));
            }
            
            if (!isMounted) return;
            setStreamingIdx(null);
            setVisibleMessages(prev => [...prev, i]);
            await new Promise(r => setTimeout(r, 1200));
          }
        }
        
        // Wait 5 seconds after conversation finishes before resetting and repeating
        await new Promise(r => setTimeout(r, 5000));
      }
    };

    runChatSequence();

    return () => { isMounted = false; };
  }, [isInView]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [visibleMessages, typingIdx, streamingIdx, streamingText]);

  return (
    <section ref={sectionRef} className="py-32 px-6 overflow-hidden relative z-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div className="space-y-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-12">Cómo transformamos tu proceso.</h2>
          <div className="relative border-l-2 border-primary/20 ml-4 space-y-12 pb-8">
            {steps.map((step, index) => (
              <div 
                key={index}
                className={`relative pl-12 py-2 transition-all duration-300 cursor-pointer ${activeStep === index ? 'scale-105 transform origin-left' : 'opacity-60 hover:opacity-100'}`}
                onMouseEnter={() => setActiveStep(index)}
                onClick={() => setActiveStep(index)}
              >
                <div className={`absolute -left-[11px] top-1/2 -translate-y-1/2 w-5 h-5 rounded-full border-2 transition-all duration-300 ${activeStep === index ? 'bg-primary ring-4 ring-primary/20 border-primary scale-125' : 'bg-surface border-primary'}`}></div>
                <h4 className="text-xl font-bold text-white mb-2">{step.title}</h4>
                <p className="text-on-surface-variant leading-relaxed">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
        
        <div className="relative">
          <div className="absolute -inset-10 bg-primary/10 blur-3xl rounded-full"></div>
          <GlassCard className="rounded-3xl overflow-hidden shadow-2xl relative z-10 p-0 transform transition-transform hover:scale-[1.02] duration-500">
            <div className="bg-surface-container-highest px-6 py-4 flex items-center gap-4 border-b border-white/5">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center relative">
                <span className="material-symbols-outlined text-white text-sm">smart_toy</span>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-surface-container-highest"></span>
              </div>
              <div>
                <div className="font-bold text-sm text-white">Acris IA - Agente Inteligente</div>
                <div className="text-xs text-green-400 font-medium flex items-center gap-1">
                  En línea
                </div>
              </div>
            </div>
            
            <div ref={chatContainerRef} className="p-6 space-y-6 h-[500px] overflow-y-auto custom-scrollbar flex flex-col scroll-smooth">
              <div className="flex-1 min-h-[auto]"></div>
              {messages.map((msg, idx) => {
                const isVisible = visibleMessages.includes(idx);
                const isTyping = typingIdx === idx;
                const isStreaming = streamingIdx === idx;

                if (!isVisible && !isTyping && !isStreaming) return null;

                const isClient = msg.type === 'client';

                return (
                  <div key={idx} className={`flex flex-col ${isClient ? 'items-end' : 'items-start'} transition-all opacity-100 translate-y-0`}>
                    {isTyping && (
                       <div className={`p-4 rounded-2xl flex items-center gap-2 h-[48px] ${isClient ? 'bg-surface-container-high rounded-tr-none' : 'bg-primary/20 border border-primary/20 rounded-tl-none'}`}>
                         <span className="w-1.5 h-1.5 rounded-full bg-on-surface-variant animate-pulse" style={{ animationDelay: '0ms' }} />
                         <span className="w-1.5 h-1.5 rounded-full bg-on-surface-variant animate-pulse" style={{ animationDelay: '150ms' }} />
                         <span className="w-1.5 h-1.5 rounded-full bg-on-surface-variant animate-pulse" style={{ animationDelay: '300ms' }} />
                       </div>
                    )}
                    
                    {(isVisible || isStreaming) && (
                      <>
                        <div className={`p-4 rounded-2xl max-w-[85%] text-sm md:text-base leading-relaxed ${isClient ? 'bg-surface-container-high rounded-tr-none text-white' : 'bg-primary/20 border border-primary/20 rounded-tl-none text-white shadow-[0_0_15px_rgba(232,25,44,0.1)]'}`}>
                          {isStreaming ? streamingText : msg.text}
                          {isStreaming && <span className="inline-block w-2 h-4 ml-1 bg-white/70 animate-pulse align-middle" />}
                        </div>
                        <span className="text-[10px] font-medium text-on-surface-variant mt-1 px-1">
                          {isClient ? 'Cliente' : 'Acris IA'} • {msg.time}
                        </span>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}
