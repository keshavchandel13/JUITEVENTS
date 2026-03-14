import React from 'react';
import { FaUsers, FaStar, FaHandshake, FaLinkedin, FaEnvelope, FaPhone } from 'react-icons/fa6';

const About = () => {
  const stats = [
    { label: "Active Members", value: "600+", icon: <FaUsers /> },
    { label: "Annual Events", value: "10+", icon: <FaStar /> },
    { label: "Clubs", value: "7", icon: <FaHandshake /> },
    { label: "Committees", value: "6", icon: <FaStar /> },
  ];

  return (
    <div className="min-h-screen bg-[#030712] text-slate-200 font-sans pb-20">
      
      {/* HERO SECTION - The "Vibe" */}
      <div className="relative h-[60vh] flex items-center justify-center overflow-hidden border-b border-slate-800">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-linear-to-b from-transparent to-[#030712] z-10"></div>
          <img 
            src="https://le-fiestus.jyc.co.in/images/DSC_0140_8_11zon.webp" 
            alt="JUIT Campus" 
            className="w-full h-full object-cover opacity-40 grayscale-50"
          />
        </div>
        
        <div className="relative z-20 text-center px-6">
          <span className="text-cyan-500 font-mono text-xs uppercase tracking-[0.4em] mb-4 block">Identity_Core</span>
          <h1 className="text-6xl md:text-8xl font-black italic tracking-tighter text-white uppercase">
            JUIT <span className="text-cyan-400">YOUTH CLUB</span>
          </h1>
          <p className="mt-6 text-slate-400 max-w-2xl mx-auto text-lg font-medium leading-relaxed">
            The heart of enthusiasm and growth. Beyond academics, into the realm of culture, sports, and technology.
          </p>
        </div>
      </div>

      {/* STATS STRIP */}
      <div className="max-w-7xl mx-auto -mt-16 relative z-30 px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <div key={i} className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 p-8 rounded-3xl text-center group hover:border-cyan-500/50 transition-all">
              <div className="text-cyan-500 text-2xl mb-2 flex justify-center group-hover:scale-110 transition-transform">
                {stat.icon}
              </div>
              <p className="text-4xl font-black text-white italic">{stat.value}</p>
              <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* PHILOSOPHY SECTION */}
      <section className="max-w-7xl mx-auto px-6 mt-24 grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-4xl font-black italic text-white uppercase mb-6 tracking-tight">
            Our <span className="text-purple-500">Philosophy</span>
          </h2>
          <div className="space-y-6 text-slate-400 leading-relaxed">
            <p>
              JUIT Youth Club (JYC) is the hub of enthusiasm and growth, expanding students' horizons beyond academics into sports, literature, culture, and technology.
            </p>
            <p className="border-l-4 border-purple-500 pl-6 italic bg-purple-500/5 py-4 rounded-r-xl">
              "By organizing events and extracurricular activities, JYC provides a refreshing break from academic pressures, instilling confidence and a sense of achievement."
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
            <div className="h-64 bg-slate-800 rounded-3xl overflow-hidden grayscale hover:grayscale-0 transition-all">
                <img src="https://le-fiestus.jyc.co.in/images/DSC_0140_8_11zon.webp" className="h-full w-full object-cover" />
            </div>
            <div className="h-64 bg-slate-800 rounded-3xl mt-8 overflow-hidden grayscale hover:grayscale-0 transition-all">
                <img src="https://le-fiestus.jyc.co.in/images/DSC_0140_8_11zon.webp" className="h-full w-full object-cover" />
            </div>
        </div>
      </section>

      {/* ELIGIBILITY & JOINING */}
      <section className="max-w-7xl mx-auto px-6 mt-32">
        <div className="bg-linear-to-r from-slate-900 to-[#030712] border border-slate-800 rounded-[3rem] p-8 md:p-16">
          <h2 className="text-3xl font-black text-white uppercase italic mb-12 text-center lg:text-left">The Journey to Membership</h2>
          <div className="grid md:grid-cols-3 gap-12">
            <div>
              <span className="text-5xl font-black text-slate-800 mb-4 block">01</span>
              <h3 className="text-cyan-400 font-bold uppercase tracking-widest mb-3">Eligibility</h3>
              <p className="text-sm text-slate-400">1st & 2nd Year: General Body Members. <br/> 3rd & 4th Year: Coordinators & Mentors.</p>
            </div>
            <div>
              <span className="text-5xl font-black text-slate-800 mb-4 block">02</span>
              <h3 className="text-cyan-400 font-bold uppercase tracking-widest mb-3">The Process</h3>
              <p className="text-sm text-slate-400">Form submission followed by a strategic interview to assess your passion and suitability.</p>
            </div>
            <div>
              <span className="text-5xl font-black text-slate-800 mb-4 block">03</span>
              <h3 className="text-cyan-400 font-bold uppercase tracking-widest mb-3">Structure</h3>
              <p className="text-sm text-slate-400">Participate in up to 2 clubs and 1 committee for truly holistic leadership development.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FACULTY INCHARGE */}
      <section className="max-w-4xl mx-auto px-6 mt-32 text-center">
        <div className="inline-block p-px bg-linear-to-r from-cyan-500 to-purple-600 rounded-full mb-8">
            <div className="w-32 h-32 rounded-full bg-slate-900 border-4 border-[#030712] overflow-hidden mx-auto">
                <img src="https://jyc.co.in/images/amit%20kumar%20jhakar.jpeg" alt="Dr. Amit Kumar Jakhar" className="w-full h-full object-cover" />
            </div>
        </div>
        <h2 className="text-3xl font-black text-white italic uppercase tracking-tighter">Dr. Amit Kumar Jakhar</h2>
        <p className="text-cyan-500 font-mono text-xs uppercase tracking-[0.2em] mt-2 mb-6">Faculty Incharge</p>
        <p className="text-slate-400 leading-relaxed text-sm max-w-2xl mx-auto">
            Assistant Professor (Senior Grade) at JUIT. Ph.D. from BIT Mesra. Guiding the JYC council with academic excellence and strategic leadership.
        </p>
        <div className="flex justify-center gap-6 mt-8">
            <a href="mailto:amit.kumar@juit.ac.in" className="text-slate-500 hover:text-white transition-colors"><FaEnvelope size={20}/></a>
            <a href="tel:01792239335" className="text-slate-500 hover:text-white transition-colors"><FaPhone size={20}/></a>
        </div>
      </section>


    </div>
  );
};

export default About;