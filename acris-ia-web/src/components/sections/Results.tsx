

export function Results() {
  return (
    <section className="py-32 px-6 relative z-10">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl md:text-6xl font-bold mb-20 tracking-tight">Números que hablan solos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="p-10 rounded-2xl bg-surface-container-low border border-white/5 space-y-4">
            <div className="text-5xl font-black text-white">98%</div>
            <p className="text-on-surface-variant font-medium">Tasa de satisfacción de usuario</p>
          </div>
          <div className="p-10 rounded-2xl bg-surface-container-low border border-white/5 space-y-4">
            <div className="text-5xl font-black text-white">45s</div>
            <p className="text-on-surface-variant font-medium">Promedio de respuesta inicial</p>
          </div>
          <div className="p-10 rounded-2xl bg-surface-container-low border border-white/5 space-y-4">
            <div className="text-5xl font-black text-white">2.5x</div>
            <p className="text-on-surface-variant font-medium">Incremento en citas efectivas</p>
          </div>
          <div className="p-10 rounded-2xl bg-surface-container-low border border-white/5 space-y-4">
            <div className="text-5xl font-black text-white">0</div>
            <p className="text-on-surface-variant font-medium">Puntos de fricción manual</p>
          </div>
        </div>
      </div>
    </section>
  );
}
