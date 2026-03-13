import React from "react";
import { FaCalendarAlt, FaRocket, FaTicketAlt } from "react-icons/fa";

const Dashboard = () => {

  return (
    <div>

      {/* PAGE TITLE */}
      <div className="mb-10">
        <h1 className="text-3xl font-black tracking-tight text-white uppercase italic">
          Command_Center
        </h1>
        <p className="text-slate-500 font-mono text-sm tracking-widest">
          ACTIVE_USER: Student
        </p>
      </div>


      {/* BENTO GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* WELCOME TILE */}
        <div className="md:col-span-2 bg-linear-to-br from-cyan-600/20 to-transparent border border-cyan-500/20 rounded-3xl p-8 relative overflow-hidden group">

          <div className="relative z-10">
            <h2 className="text-4xl font-black text-white mb-2">
              Welcome Back!
            </h2>

            <p className="text-slate-400 max-w-md">
              You have multiple upcoming events this week. Stay engaged with campus activities.
            </p>

            <button className="mt-6 px-6 py-2 bg-cyan-500 text-[#020617] font-black uppercase text-xs tracking-widest rounded-lg hover:bg-cyan-400 transition-all">
              View Schedule
            </button>
          </div>

          <FaRocket className="absolute -bottom-4 -right-4 text-cyan-500/10 text-[12rem] rotate-12 group-hover:rotate-0 transition-transform duration-700" />

        </div>


        {/* GLOBAL RANK TILE */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-6 flex flex-col justify-between">

          <h3 className="text-slate-500 font-bold uppercase text-[10px] tracking-widest">
            Global Rank
          </h3>

          <div>
            <p className="text-5xl font-black text-white">
              #124
            </p>

            <p className="text-cyan-500 text-sm font-bold">
              +12 since last event
            </p>
          </div>

        </div>


        {/* UPCOMING EVENT TILE */}
        <div className="bg-[#030712] border border-slate-800 rounded-3xl p-6 hover:border-purple-500/50 transition-all">

          <div className="flex justify-between items-start mb-4">

            <span className="text-[10px] bg-purple-500/20 text-purple-400 px-2 py-1 rounded font-bold uppercase">
              Technical
            </span>

            <p className="text-slate-500 text-xs">
              Mar 24
            </p>

          </div>

          <h4 className="text-lg font-bold text-white mb-1">
            CodeCraft Hackathon
          </h4>

          <p className="text-slate-500 text-sm mb-4">
            JUIT LT-3 | 10:00 AM
          </p>

          <div className="w-full bg-slate-800 h-1 rounded-full overflow-hidden">
            <div className="bg-purple-500 w-3/4 h-full"></div>
          </div>

        </div>


        {/* ACTIVE EVENTS TILE */}
        <div className="bg-[#030712] border border-slate-800 rounded-3xl p-6 flex items-center justify-between group cursor-pointer hover:bg-slate-800/30 transition-all">

          <div>
            <p className="text-3xl font-black text-white">
              12
            </p>

            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">
              Active Events
            </p>
          </div>

          <div className="w-12 h-12 bg-slate-800 rounded-2xl flex items-center justify-center group-hover:bg-cyan-500 group-hover:text-black transition-all">
            <FaCalendarAlt size={20} />
          </div>

        </div>


        {/* CERTIFICATES TILE */}
        <div className="bg-[#030712] border border-slate-800 rounded-3xl p-6 flex items-center justify-between group cursor-pointer hover:bg-slate-800/30 transition-all">

          <div>
            <p className="text-3xl font-black text-white">
              05
            </p>

            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">
              Certificates
            </p>
          </div>

          <div className="w-12 h-12 bg-slate-800 rounded-2xl flex items-center justify-center group-hover:bg-purple-500 transition-all">
            <FaTicketAlt size={20} />
          </div>

        </div>

      </div>

    </div>
  );
};

export default Dashboard;