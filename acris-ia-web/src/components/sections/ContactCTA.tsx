
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { GlassCard } from '../ui/GlassCard';

// Antigravity Security standard: Strict Zod schema for input validation
const contactSchema = z.object({
  nombre: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  empresa: z.string().min(2, 'El nombre de empresa es requerido'),
  telefono: z.string().min(8, 'El teléfono no es válido'),
  email: z.string().email('Debe ser un email válido'),
  web: z.string().url('Debe ser una URL válida (ej. https://miweb.com)').or(z.literal('')),
});

type ContactFormData = z.infer<typeof contactSchema>;

export function ContactCTA() {
  const { register, handleSubmit, formState: { errors, isSubmitting, isSubmitSuccessful } } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    // Zero Leak Policy: API/Webhook URLs should not be hardcoded. 
    // Here we simulate the logic.
    console.log("[Secure Log] Lead captured securely, sanitized:", data);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));
  };

  return (
    <section id="contact" className="py-32 px-6 relative">
      <div className="absolute inset-0 z-0">
        <img 
          className="w-full h-full object-cover opacity-10" 
          alt="Futuristic luxury glass office building" 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAR97RgHVthwH8WkmlUAIhzP6FYp-8FborSasdVysFUuiJDBInv3TGMoU9xEwH1d64cDl1O_gHuRR1d3aNpDi1GXRZl6hF9_0tBxGVXJRLM1uvjpR98y3GfHPYAPKTGXcTrbEn3XRwfjcojuFqv_Wqjeh_HighFa4tt_nPu9q_dXUFQNxG-96n1OKV5MNnwbxIt8uKyexH8PRRg9K51tvxzY72EVv2iw0TII60oOMy2s52FV5mwhZCNTp4XjA8Hoj8BygSMoLbmyW4"
        />
      </div>
      <div className="max-w-4xl mx-auto relative z-10">
        <GlassCard className="p-12 md:p-16 rounded-[2rem] text-center border-primary/20 red-light-trail">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">¿Quieres ver cómo funcionaría en tu negocio?</h2>
          <p className="text-xl text-on-surface-variant mb-12">
            Agenda una llamada de 30 minutos <br className="hidden md:block" />
            y te mostramos en vivo cómo integrarlo <br className="hidden md:block" />
            a tu proceso comercial.
          </p>
          
          {isSubmitSuccessful ? (
            <div className="bg-green-500/10 border border-green-500/30 text-green-400 p-6 rounded-xl font-medium">
              ¡Gracias! Tu información ha sido enviada de forma segura. En breve nos pondremos en contacto contigo para agendar tu llamada.
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 text-left max-w-xl mx-auto">
              <div className="space-y-2">
                <label className="text-sm font-label uppercase tracking-widest text-on-surface-variant">Nombre</label>
                <input 
                  {...register('nombre')}
                  className="w-full bg-surface-container-high border-none border-b-2 border-transparent focus:border-primary focus:ring-0 rounded-lg p-4 text-white transition-all outline-none" 
                  placeholder="Escribe tu nombre completo" 
                  type="text"
                />
                {errors.nombre && <p className="text-red-500 text-xs mt-1">{errors.nombre.message}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-label uppercase tracking-widest text-on-surface-variant">Celular/Whatsaap</label>
                <input 
                  {...register('telefono')}
                  className="w-full bg-surface-container-high border-none border-b-2 border-transparent focus:border-primary focus:ring-0 rounded-lg p-4 text-white transition-all outline-none" 
                  placeholder="+52 ..." 
                  type="tel"
                />
                {errors.telefono && <p className="text-red-500 text-xs mt-1">{errors.telefono.message}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-label uppercase tracking-widest text-on-surface-variant">Correo electronico</label>
                <input 
                  {...register('email')}
                  className="w-full bg-surface-container-high border-none border-b-2 border-transparent focus:border-primary focus:ring-0 rounded-lg p-4 text-white transition-all outline-none" 
                  placeholder="juan@empresa.com" 
                  type="email"
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-label uppercase tracking-widest text-on-surface-variant">Nombre de tu empresa</label>
                <input 
                  {...register('empresa')}
                  className="w-full bg-surface-container-high border-none border-b-2 border-transparent focus:border-primary focus:ring-0 rounded-lg p-4 text-white transition-all outline-none" 
                  placeholder="Escribe el nombre de tu empresa" 
                  type="text"
                />
                {errors.empresa && <p className="text-red-500 text-xs mt-1">{errors.empresa.message}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-label uppercase tracking-widest text-on-surface-variant">Sitio web</label>
                <input 
                  {...register('web')}
                  className="w-full bg-surface-container-high border-none border-b-2 border-transparent focus:border-primary focus:ring-0 rounded-lg p-4 text-white transition-all outline-none" 
                  placeholder="https://tuproyecto.com" 
                  type="text"
                />
                {errors.web && <p className="text-red-500 text-xs mt-1">{errors.web.message}</p>}
              </div>

              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary hover:bg-primary-dim text-white font-bold py-5 rounded-xl text-lg transition-all transform hover:scale-[1.02] active:scale-95 flex items-center justify-center disabled:opacity-50 disabled:scale-100 uppercase tracking-widest"
              >
                {isSubmitting ? 'PROCESANDO...' : 'AGENDAR MI ASESORÍA GRATIS'}
              </button>
            </form>
          )}
        </GlassCard>
      </div>
    </section>
  );
}
