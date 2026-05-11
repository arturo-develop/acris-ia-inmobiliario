
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { GlassCard } from '../ui/GlassCard';

// Antigravity Security standard: Strict Zod schema for input validation
const contactSchema = z.object({
  nombre: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  empresa: z.string().min(2, 'El nombre de empresa es requerido'),
  codigoPais: z.string().min(1, 'Requerido'),
  telefono: z.string().min(8, 'El teléfono no es válido'),
  email: z.string().email('Debe ser un email válido'),
  web: z.string().optional(),
});

type ContactFormData = z.infer<typeof contactSchema>;

export function ContactCTA() {
  const { register, handleSubmit, formState: { errors, isSubmitting, isSubmitSuccessful } } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: { codigoPais: '+52' }
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      // Zero Leak Policy: Usando variable de entorno para la URL del webhook
      const webhookUrl = import.meta.env.VITE_GHL_WEBHOOK_URL || 'https://services.leadconnectorhq.com/hooks/dOdKg7lRbJNOawBVXaBc/webhook-trigger/b8b820b7-6786-45c0-971e-ee0a74a03a6c';
      
      const payload = {
        name: data.nombre,
        email: data.email,
        phone: `${data.codigoPais}${data.telefono}`,
        companyName: data.empresa,
        website: data.web,
        source: 'Landing Page Acris IA'
      };

      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error('Error al enviar formulario a GHL');
      
      console.log("[Secure Log] Lead enviado a GHL exitosamente");
    } catch (error) {
      console.error(error);
      alert('Hubo un problema al enviar tus datos. Por favor intenta de nuevo o contáctanos directamente.');
    }
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
                <label className="text-sm font-label uppercase tracking-widest text-on-surface-variant">Celular/WhatsApp</label>
                <div className="flex gap-2">
                  <select
                    {...register('codigoPais')}
                    className="w-[120px] bg-surface-container-high border-none border-b-2 border-transparent focus:border-primary focus:ring-0 rounded-lg p-4 text-white transition-all outline-none appearance-none cursor-pointer"
                  >
                    <option value="+54">🇦🇷 +54</option>
                    <option value="+591">🇧🇴 +591</option>
                    <option value="+55">🇧🇷 +55</option>
                    <option value="+56">🇨🇱 +56</option>
                    <option value="+57">🇨🇴 +57</option>
                    <option value="+506">🇨🇷 +506</option>
                    <option value="+53">🇨🇺 +53</option>
                    <option value="+593">🇪🇨 +593</option>
                    <option value="+503">🇸🇻 +503</option>
                    <option value="+34">🇪🇸 +34</option>
                    <option value="+1">🇺🇸 +1</option>
                    <option value="+502">🇬🇹 +502</option>
                    <option value="+504">🇭🇳 +504</option>
                    <option value="+52">🇲🇽 +52</option>
                    <option value="+505">🇳🇮 +505</option>
                    <option value="+507">🇵🇦 +507</option>
                    <option value="+595">🇵🇾 +595</option>
                    <option value="+51">🇵🇪 +51</option>
                    <option value="+1">🇵🇷 +1</option>
                    <option value="+1">🇩🇴 +1</option>
                    <option value="+598">🇺🇾 +598</option>
                    <option value="+58">🇻🇪 +58</option>
                  </select>
                  <input 
                    {...register('telefono')}
                    className="flex-1 bg-surface-container-high border-none border-b-2 border-transparent focus:border-primary focus:ring-0 rounded-lg p-4 text-white transition-all outline-none" 
                    placeholder="Ej. 55 1234 5678" 
                    type="tel"
                  />
                </div>
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
