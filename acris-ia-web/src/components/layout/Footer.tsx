

export function Footer() {
  return (
    <footer className="bg-surface border-t border-white/5 relative z-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center px-12 py-16 w-full max-w-screen-2xl mx-auto gap-12 font-headline">
        <div className="space-y-4 max-w-sm">
          <div className="text-3xl font-black text-white">Acris IA</div>
          <p className="text-gray-500 text-sm normal-case tracking-normal font-body">
            Transformando la industria inmobiliaria a través de inteligencia artificial de élite. Automatización que genera resultados, no solo datos.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-12 text-sm uppercase tracking-widest">
          <div className="space-y-4">
            <h5 className="text-white font-bold">Plataforma</h5>
            <ul className="space-y-2">
              <li><a className="text-gray-500 hover:text-white transition-colors" href="#">Características</a></li>
              <li><a className="text-gray-500 hover:text-white transition-colors" href="#">Seguridad</a></li>
              <li><a className="text-gray-500 hover:text-white transition-colors" href="#">Precios</a></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h5 className="text-white font-bold">Legal</h5>
            <ul className="space-y-2">
              <li><a className="text-gray-500 hover:text-white transition-colors" href="#">Privacidad</a></li>
              <li><a className="text-gray-500 hover:text-white transition-colors" href="#">Términos</a></li>
              <li><a className="text-gray-500 hover:text-white transition-colors" href="#">Cookies</a></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h5 className="text-white font-bold">Social</h5>
            <ul className="space-y-2">
              <li><a className="text-gray-500 hover:text-white transition-colors" href="#">LinkedIn</a></li>
              <li><a className="text-gray-500 hover:text-white transition-colors" href="#">Instagram</a></li>
              <li><a className="text-gray-500 hover:text-white transition-colors" href="#">Twitter</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="px-12 py-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-xs text-gray-600 uppercase tracking-[0.2em]">
        <span>© {new Date().getFullYear()} Acris IA Intelligence. All rights reserved.</span>
        <div className="flex gap-6 mt-4 md:mt-0">
          <a className="hover:text-white transition-colors" href="#">Global Realty Network</a>
          <a className="hover:text-white transition-colors" href="#">Contact Support</a>
        </div>
      </div>
    </footer>
  );
}
