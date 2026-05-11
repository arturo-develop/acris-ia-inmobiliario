import React from 'react';

const LOGOS = Array.from({ length: 15 }, (_, i) => `/portales/${i + 1}.png`);

export function Integrations() {
  return (
    <section className="py-24 px-6 relative z-10">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-[2rem] p-10 md:p-14 shadow-[0_0_20px_rgba(232,25,44,0.2)] border border-primary/10 relative overflow-hidden flex flex-col items-center">
          
          <h2 className="text-2xl md:text-4xl font-bold text-slate-900 text-center mb-12">
            <span className="text-primary">Acris IA</span> puede conectarse a cualquier portal inmobiliario
          </h2>

          {/* Marquee Container */}
          <div className="w-full overflow-hidden relative mb-12 flex items-center">
            {/* Gradient masks for smooth fade out at edges (optional but looks good) */}
            <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>
            
            <div className="flex animate-marquee whitespace-nowrap">
              {/* First set of logos */}
              {LOGOS.map((src, idx) => (
                <div key={`logo-1-${idx}`} className="flex-shrink-0 w-40 md:w-56 mx-3 flex items-center justify-center">
                  <img src={src} alt={`Portal ${idx + 1}`} className="max-h-24 w-auto object-contain transition-all duration-300 hover:scale-105" />
                </div>
              ))}
              {/* Duplicated set for seamless loop */}
              {LOGOS.map((src, idx) => (
                <div key={`logo-2-${idx}`} className="flex-shrink-0 w-40 md:w-56 mx-3 flex items-center justify-center">
                  <img src={src} alt={`Portal ${idx + 1}`} className="max-h-24 w-auto object-contain transition-all duration-300 hover:scale-105" />
                </div>
              ))}
            </div>
          </div>

          <p className="text-lg md:text-xl text-slate-600 text-center font-medium max-w-3xl">
            Atiende los requerimientos al instante no importa de dónde vengan y notifica a tus asesores inmobiliarios.
          </p>

        </div>
      </div>
    </section>
  );
}
