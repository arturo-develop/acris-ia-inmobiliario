

export function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-[#0e0e0e]/60 backdrop-blur-xl shadow-[0_20px_40px_rgba(0,0,0,0.4)]">
      <div className="flex justify-between items-center px-8 py-4 max-w-screen-2xl mx-auto font-headline tracking-tight">
        <div className="flex items-center">
          <img src="/logo-acris-ia.png" alt="Acris IA Logo" className="h-[32px] w-auto relative z-10" />
        </div>
        <button 
          onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          className="bg-primary hover:bg-primary-dim text-white px-6 py-2 rounded-lg font-bold transition-transform active:scale-95"
        >
          Agenda tu Demo
        </button>
      </div>
    </nav>
  );
}
