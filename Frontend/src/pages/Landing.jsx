import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaTerminal } from 'react-icons/fa6';

const Landing = () => {
  return (
    <div className="relative min-h-screen w-full bg-[#030712] overflow-hidden font-sans">
      
      {/* BACKGROUND VIDEO LAYER */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-[#030712] via-[#030712]/80 to-transparent z-10"></div>
        <div className="absolute inset-0 bg-[#030712]/40 z-10"></div> {/* Extra dimming */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover grayscale-[40%] opacity-60"
        >
          <source src="/hero_optimized.webm" type="video/webm" />
        </video>
      </div>

      {/* NAVIGATION OVERLAY */}
      <nav className="relative z-20 flex justify-between items-center px-8 py-6 lg:px-16">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-cyan-500 rounded-lg flex items-center justify-center text-[#030712]">
            <FaTerminal size={20} />
          </div>
          <span className="text-xl font-black tracking-tighter text-white italic">JUIT_HUB</span>
        </div>
        <div className="hidden md:flex gap-8 text-sm font-bold uppercase tracking-widest text-slate-400">
          <a href="#events" className="hover:text-cyan-400 transition-colors">Events</a>
          <a href="#about" className="hover:text-cyan-400 transition-colors">About</a>
          <a href="#contact" className="hover:text-cyan-400 transition-colors">Support</a>
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
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
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
            <p className="text-4xl font-black text-white italic">12+</p>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">Live Events</p>
          </div>
          <div>
            <p className="text-4xl font-black text-white italic">5.2K</p>
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