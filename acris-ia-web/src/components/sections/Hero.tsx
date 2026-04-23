
import { GlassCard } from '../ui/GlassCard';
import { Typewriter } from '../ui/Typewriter';

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-32 pb-20 px-6 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          className="w-full h-full object-cover opacity-20" 
          alt="Futuristic skyscraper city skyline at night with deep red and blue lighting accents, cinematic wide angle" 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBc3dZU1mdZ6ILb2LEF0rfy9c8KpBrepevcOJlzVVugSKajTGN5Sok_3imcK5G6UrYEs5e2vjWvz-A6GVMaCzBQZG5Rhap-AwfvzgCvREwP-vflu9eZ-hoKLEVIVo3Jg5rJVNV7Xk_ulaIuEa3CbJx782nI8jW7M3wSJB84JMqsWar4cvN15TsD2IOEw8yes3LpCmBVTkCNqAWXzivXHN6FJEvUliBAK2pIiKLfvy9Jh17UGc5RHNIslNnioI0wWKOdEgczpZJT5YM"
        />
        <div className="absolute inset-0 hero-overlay"></div>
      </div>
      <div className="relative z-10 max-w-5xl text-center space-y-10">
        <div className="animated-gradient-border">
          <span className="block px-4 py-1 rounded-full bg-surface/90 backdrop-blur-xl text-white text-sm font-medium tracking-widest uppercase">
            Sistema exclusivo de IA para Real Estate
          </span>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold leading-tight tracking-tighter drop-shadow-lg">
          <span className="block text-white">Tu equipo no puede</span>
          <span className="block text-primary min-h-[1.2em] my-1">
            <Typewriter words={['Responder al instante', 'Agendar citas', 'Calificar Leads', 'Hacer seguimiento perpetuo', 'Trabajar 24/7']} />
          </span>
          <span className="block text-white">al mismo tiempo.</span>
          <span className="block mt-4 md:mt-6 text-3xl md:text-5xl">
            <span className="text-primary font-bold">Acris IA</span> <span className="text-white">lo hace 100% en automático.</span>
          </span>
        </h1>
        <div className="space-y-12">
          <GlassCard className="w-full max-w-4xl mx-auto aspect-video rounded-xl overflow-hidden relative group cursor-pointer p-0">
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/20 transition-all z-10">
              <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center shadow-2xl shadow-primary/50 transition-transform group-hover:scale-110">
                <span className="material-symbols-outlined text-white text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
              </div>
            </div>
            <img 
              className="w-full h-full object-cover absolute inset-0" 
              alt="Minimalist luxury office interior with floor to ceiling windows overlooking a metropolis at sunset" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuB8ZLuAY5LBVTZgZMnzWuh6P7W0PxG_q8_QKCmKVaroJUmjMnJ16wSTnQldDRiil8qiXtPfGbGATs21-ay2Ui7g7r0Wx4OsxppNgUjyk6rMzYp5nKFDe4wcs2uJNC-VmLwekdJWz8Ye5dRk4UNB0PtzoDmcDxudZ6oCxSlqAQiQshL7ggqW_cxnNm1YH-5lDC9_EirGgMP0Z58gfiW9Xul44MRudbDuz-_RW2ZZjrwmKkf56YYYLJHx0W_ahPxfvYQ1x3GQmuyehDQ"
            />
          </GlassCard>

          <div className="pt-8">
            <button 
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-primary hover:bg-primary-dim text-white px-10 py-4 rounded-xl font-bold text-lg transition-all active:scale-95 shadow-[0_0_20px_rgba(232,25,44,0.3)] hover:shadow-[0_0_30px_rgba(232,25,44,0.5)]"
            >
               Agenda una asesoría gratis
            </button>
          </div>
          
        </div>
      </div>
    </section>
  );
}
