
import { GlassCard } from '../ui/GlassCard';
import { MobileCarousel } from '../ui/MobileCarousel';

export function Solution() {
  return (
    <section className="py-32 px-6 bg-surface-container-low relative z-10">
      <div className="max-w-7xl mx-auto">
        {/* Description card */}
        <div className="mb-16 max-w-4xl mx-auto">
          <GlassCard className="w-full p-10 md:p-14 rounded-3xl border-0 bg-surface-container-highest/60 backdrop-blur-xl relative group">
            <div className="animated-border-card-overlay"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-50 rounded-3xl pointer-events-none z-0"></div>
            <div className="relative z-10 text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 tracking-tight leading-snug">
                Acris IA es un sistema completo donde la inteligencia artificial y el CRM se integran y comparten la misma información en tiempo real
              </h2>
              <p className="text-xl md:text-2xl font-light text-on-surface-variant leading-relaxed">
                — parametrizado específicamente para tu operación comercial. Todo conectado con todo.
              </p>
            </div>
          </GlassCard>
        </div>
        <MobileCarousel>
          <GlassCard className="p-10 rounded-2xl border-l-4 border-l-primary h-full">
            <h3 className="text-2xl font-bold text-white mb-4">Responde 24/7</h3>
            <p className="text-on-surface-variant"><em>Menos de 30 segundos.</em> Cada mensaje tiene respuesta inmediata — a las 3am, un domingo, en festivo. Ningún lead sin atender. Nunca.</p>
          </GlassCard>
          <GlassCard className="p-10 rounded-2xl h-full">
            <h3 className="text-2xl font-bold text-white mb-4">Filtra y Califica</h3>
            <p className="text-on-surface-variant"><em>Curiosos vs compradores reales.</em> El agente separa automáticamente a quien está listo de quien solo está mirando. Tu equipo solo recibe los buenos.</p>
          </GlassCard>
          <GlassCard className="p-10 rounded-2xl h-full">
            <h3 className="text-2xl font-bold text-white mb-4">Agenda Citas</h3>
            <p className="text-on-surface-variant"><em>Sin intermediarios.</em> Cuando el lead califica, el agente agenda directamente en el calendario de tu asesor. Sin llamadas, sin coordinación, sin errores.</p>
          </GlassCard>
          <GlassCard className="p-10 rounded-2xl h-full">
            <h3 className="text-2xl font-bold text-white mb-4">CRM Automatizado</h3>
            <p className="text-on-surface-variant"><em>Pipeline que se mueve solo.</em> Cada conversación crea y mueve oportunidades en el pipeline según el estado real del cliente. Sin que nadie escriba nada.</p>
          </GlassCard>
          <GlassCard className="p-10 rounded-2xl h-full">
            <h3 className="text-2xl font-bold text-white mb-4">Seguimiento Perpetuo</h3>
            <p className="text-on-surface-variant"><em>Hasta que esté listo.</em> Si hoy no está listo, el sistema lo sigue solo — con el mensaje correcto, en el momento correcto — hasta que decida.</p>
          </GlassCard>
          <GlassCard className="p-10 rounded-2xl h-full">
            <h3 className="text-2xl font-bold text-white mb-4">Reportes en Tiempo Real</h3>
            <p className="text-on-surface-variant"><em>Decisiones basadas en datos.</em> Pauta, pipeline, prospectos y citas. Todo visible en tiempo real para decidir con información real.</p>
          </GlassCard>
        </MobileCarousel>
        <div className="mt-20 text-center">
          <button 
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-primary hover:bg-primary-dim text-white px-10 py-4 rounded-xl font-bold text-lg transition-all active:scale-95 shadow-[0_0_20px_rgba(232,25,44,0.3)] hover:shadow-[0_0_30px_rgba(232,25,44,0.5)]"
          >
            Agenda una asesoría gratis
          </button>
        </div>
      </div>
    </section>
  );
}
