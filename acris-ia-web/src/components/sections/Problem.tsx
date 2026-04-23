
import { GlassCard } from '../ui/GlassCard';
import { MobileCarousel } from '../ui/MobileCarousel';

export function Problem() {
  return (
    <section className="py-24 px-6 relative z-10 bg-background/50">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-5xl font-bold mt-4 mb-4 max-w-4xl mx-auto leading-tight text-white drop-shadow-md">Seamos honestos. Esto le pasa al 90% de los negocios inmobiliarios en LATAM</h2>
        <p className="text-xl text-on-surface-variant mb-16 max-w-2xl mx-auto">No es tu equipo. No es tu proyecto. Es el sistema.</p>
        <MobileCarousel>
          <GlassCard className="p-8 rounded-xl hover:border-primary/50 transition-colors text-left flex flex-col items-start min-h-[14rem]">
            <span className="text-4xl mb-4">💬</span>
            <h3 className="text-xl font-bold text-white mb-2">Mensajes sin responder</h3>
            <p className="text-on-surface-variant leading-relaxed text-sm md:text-base">Llegan leads que no se responden de inmediato, pueden pasar horas, en muchos casos dias. "La respuesta inmediata" es un no negociable.</p>
          </GlassCard>
          <GlassCard className="p-8 rounded-xl hover:border-primary/50 transition-colors text-left flex flex-col items-start min-h-[14rem]">
            <span className="text-4xl mb-4">💸</span>
            <h3 className="text-xl font-bold text-white mb-2">Pagaste por esos leads</h3>
            <p className="text-on-surface-variant leading-relaxed text-sm md:text-base">Cada lead ignorado fue pagado con pauta. No contactarlo no es gratis. Es dinero tirado a la basura.</p>
          </GlassCard>
          <GlassCard className="p-8 rounded-xl hover:border-primary/50 transition-colors text-left flex flex-col items-start min-h-[14rem]">
            <span className="text-4xl mb-4">⚡</span>
            <h3 className="text-xl font-bold text-white mb-2">Tu equipo no vende, administra</h3>
            <p className="text-on-surface-variant leading-relaxed text-sm md:text-base">Responder WhatsApp, confirmar citas, actualizar el CRM, llamar fríos. Eso no es vender.</p>
          </GlassCard>
          <GlassCard className="p-8 rounded-xl hover:border-primary/50 transition-colors text-left flex flex-col items-start min-h-[14rem]">
            <span className="text-4xl mb-4">🔁</span>
            <h3 className="text-xl font-bold text-white mb-2">Sin seguimiento no hay venta</h3>
            <p className="text-on-surface-variant leading-relaxed text-sm md:text-base">El 73% de los compradores necesitan más de 5 contactos antes de decidir. Tu equipo hace 2 y se rinde.</p>
          </GlassCard>
          <GlassCard className="p-8 rounded-xl hover:border-primary/50 transition-colors text-left flex flex-col items-start min-h-[14rem]">
            <span className="text-4xl mb-4">🧊</span>
            <h3 className="text-xl font-bold text-white mb-2">"Lo pienso" y desaparece</h3>
            <p className="text-on-surface-variant leading-relaxed text-sm md:text-base">Sin seguimiento automático y perpetuo ese prospecto se enfría para siempre. El dinero que dejaste sobre la mesa no vuelve.</p>
          </GlassCard>
          <GlassCard className="p-8 rounded-xl hover:border-primary/50 transition-colors text-left flex flex-col items-start min-h-[14rem]">
            <span className="text-4xl mb-4">📊</span>
            <h3 className="text-xl font-bold text-white mb-2">Tu pipeline es un misterio</h3>
            <p className="text-on-surface-variant leading-relaxed text-sm md:text-base">¿Quién está listo para visitar hoy? ¿Quién necesita un empujón? No lo sabes. Y eso cuesta ventas.</p>
          </GlassCard>
        </MobileCarousel>
        <div className="mt-16">
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
