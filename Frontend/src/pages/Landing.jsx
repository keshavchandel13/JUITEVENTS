import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaTerminal } from 'react-icons/fa6';

const Landing = () => {
  return (
    <div className="relative min-h-screen w-full bg-[#030712] overflow-hidden font-sans">
      
      {/* BACKGROUND VIDEO LAYER */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-linear-to-r from-[#030712] via-[#030712]/80 to-transparent z-10"></div>
        <div className="absolute inset-0 bg-[#030712]/40 z-10"></div> {/* Extra dimming */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover grayscale-40 opacity-60"
        >
          <source src="/hero_optimized.webm" type="video/webm" />
        </video>
      </div>

      {/* NAVIGATION OVERLAY */}
      <nav className="flex top-0 left-0 right-0 z-50  justify-between items-center px-6 py-4 lg:px-16 bg-[#030712]/10 backdrop-blur-md border-b border-white/5 transition-all duration-300">
  
  {/* LOGO & BRANDING */}
  <div className="flex items-center gap-4 group cursor-pointer">
    <div className="relative">
      {/* Subtle Glow behind logo on hover */}
      <div className="absolute -inset-1 bg-cyan-500 rounded-full blur opacity-0 group-hover:opacity-40 transition duration-500"></div>
      <img 
        src="https://jyc.co.in/images/logojyc%20white.png" 
        alt="JYC Logo" 
        className="relative h-12 w-auto object-contain drop-shadow-[0_0_10px_rgba(34,211,238,0.2)]"
      />
    </div>
    
    <div className="flex flex-col">
      <span className="text-xl font-black tracking-tighter text-white italic leading-none">
        JUIT<span className="text-cyan-400">_HUB</span>
      </span>
      <span className="text-[8px] font-bold text-slate-500 uppercase tracking-[0.3em] mt-1">
        Official Portal
      </span>
    </div>
  </div>

  {/* NAV LINKS */}
  <div className="hidden md:flex items-center gap-10">
    {[
      { name: 'Events', path: '/dashboard' },
      { name: 'About', path: '/about' },
      { name: 'Support', path: '#contact' }
    ].map((link) => (
      <a 
        key={link.name}
        href={link.path} 
        className="relative text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-white transition-colors duration-300 group"
      >
        {link.name}
        {/* Animated Underline */}
        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-500 transition-all duration-300 group-hover:w-full"></span>
      </a>
    ))}

    {/* CTA Button in Nav */}
    <a 
      href="/login" 
      className="ml-4 px-6 py-2 bg-white text-black text-[10px] font-black uppercase tracking-widest rounded-full hover:bg-cyan-400 transition-all active:scale-95 shadow-[0_0_15px_rgba(255,255,255,0.1)]"
    >
      Enter_Grid
    </a>
  </div>

  {/* MOBILE MENU TOGGLE (Optional visual) */}
  <div className="md:hidden flex flex-col gap-1 cursor-pointer">
    <div className="w-6 h-0.5 bg-white"></div>
    <div className="w-4 h-0.5 bg-cyan-500 ml-auto"></div>
    <div className="w-6 h-0.5 bg-white"></div>
  </div>
</nav>

      {/* HERO CONTENT */}
      <main className="relative z-20 flex flex-col justify-center min-h-[calc(100vh-80px)] px-8 lg:px-24">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/20 px-4 py-1.5 rounded-full mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            <span className="text-cyan-500 text-[10px] font-black uppercase tracking-[0.2em]">Live: Le Fiestus 2026 Registration Open</span>
          </div>

          <h1 className="text-6xl md:text-8xl font-black text-white leading-[0.9] tracking-tighter mb-6 uppercase italic">
            EXPERIENCE <br />
            <span className="bg-clip-text text-transparent bg-linear-to-r from-cyan-400 via-blue-500 to-purple-600">
              CAMPUS_LIFE.
            </span>
          </h1>

          <p className="text-slate-400 text-lg md:text-xl max-w-xl mb-10 leading-relaxed font-medium">
            The official portal for Jaypee University of Information Technology. 
            Streamlining every fest, workshop, and technical symposium at Waknaghat.
          </p>

          <div className="flex flex-col sm:flex-row gap-5">
            <Link 
              to="/register" 
              className="group relative px-8 py-4 bg-white text-black font-black uppercase tracking-widest rounded-xl overflow-hidden transition-all hover:scale-105 active:scale-95 text-center"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Join the Grid <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
            
            <Link 
              to="/login" 
              className="px-8 py-4 bg-transparent border-2 border-slate-800 text-white font-black uppercase tracking-widest rounded-xl hover:bg-slate-800 transition-all text-center"
            >
              Access Portal
            </Link>
          </div>
        </div>

        {/* BOTTOM STATS DECK */}
        <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-slate-800/50 pt-12">
          <div>
            <p className="text-4xl font-black text-white italic">10+</p>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1"> Events</p>
          </div>
          <div>
            <p className="text-4xl font-black text-white italic">600+</p>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">Active Users</p>
          </div>
          <div>
            <p className="text-4xl font-black text-white italic">45+</p>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">Workshops</p>
          </div>
          <div className="hidden md:block">
            <p className="text-4xl font-black text-white italic">100%</p>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">Digital Access</p>
          </div>
        </div>
      </main>

      {/* DECORATIVE CORNER BLUR */}
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-cyan-600/20 rounded-full blur-[120px]"></div>
    </div>
  );
};

export default Landing;