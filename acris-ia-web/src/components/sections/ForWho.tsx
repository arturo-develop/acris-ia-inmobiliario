
import { GlassCard } from '../ui/GlassCard';
import { MobileCarousel } from '../ui/MobileCarousel';

export function ForWho() {
  return (
    <section className="py-32 px-6 bg-surface-container-low relative z-10">
      <div className="max-w-5xl mx-auto">
        <MobileCarousel desktopGridClass="hidden md:grid md:grid-cols-2 gap-12">
          <GlassCard className="p-12 rounded-3xl border-t-4 border-t-green-500/50 h-full">
            <h3 className="text-3xl font-bold mb-8 text-white">✓ Es para ti si...</h3>
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <span className="material-symbols-outlined text-green-500">check_circle</span>
                <span className="text-on-surface-variant">Recibes más de 200 leads mensuales y no das abasto.</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="material-symbols-outlined text-green-500">check_circle</span>
                <span className="text-on-surface-variant">Buscas automatizar el 80% de las tareas operativas de ventas.</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="material-symbols-outlined text-green-500">check_circle</span>
                <span className="text-on-surface-variant">Necesitas trazabilidad total de lo que ocurre con cada interesado.</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="material-symbols-outlined text-green-500">check_circle</span>
                <span className="text-on-surface-variant">Quieres escalar tus proyectos sin contratar más personal de call center.</span>
              </li>
            </ul>
          </GlassCard>
          <GlassCard className="p-12 rounded-3xl border-t-4 border-t-primary/50 h-full">
            <h3 className="text-3xl font-bold mb-8 text-white">✗ No es para ti si...</h3>
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <span className="material-symbols-outlined text-primary">cancel</span>
                <span className="text-on-surface-variant">Tus leads son referidos directos y no haces pauta digital.</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="material-symbols-outlined text-primary">cancel</span>
                <span className="text-on-surface-variant">No crees en la tecnología como palanca de crecimiento.</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="material-symbols-outlined text-primary">cancel</span>
                <span className="text-on-surface-variant">Prefieres que tus asesores pierdan tiempo en leads no calificados.</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="material-symbols-outlined text-primary">cancel</span>
                <span className="text-on-surface-variant">Tu ticket promedio es menor a $50,000 USD.</span>
              </li>
            </ul>
          </GlassCard>
        </MobileCarousel>
      </div>
    </section>
  );
}
