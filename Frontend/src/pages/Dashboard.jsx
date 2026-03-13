import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { FaCalendarAlt, FaUserCircle, FaSignOutAlt, FaRocket, FaBell, FaTicketAlt } from 'react-icons/fa';

const Dashboard = () => {
  const [token] = useState(JSON.parse(localStorage.getItem("auth")) || "");
  const [data, setData] = useState({ msg: "Student" });
  const navigate = useNavigate();

  const fetchDashboardData = async () => {
    let axiosConfig = {
      headers: { 'Authorization': `Bearer ${token}` }
    };

    try {
      const response = await axios.get("http://localhost:3000/api/v1/dashboard", axiosConfig);
      setData({ msg: response.data.msg });
    } catch (error) {
      toast.error(error?.response?.data?.msg || "Failed to fetch session data");
    }
  }

  useEffect(() => {
    if (token === "") {
      navigate("/login");
      toast.warn("Unauthorized access. Please login.");
    } else {
      fetchDashboardData();
    }
  }, [token, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("auth");
    toast.success("Logged out of the Grid");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 flex font-sans">
      
      {/* SIDEBAR - Fixed on Desktop */}
      <aside className="hidden md:flex w-64 bg-[#030712] border-r border-slate-800 flex-col p-6">
        <div className="mb-10">
          <h2 className="text-2xl font-black italic tracking-tighter text-cyan-500">JUIT_EVENTS</h2>
        </div>
        
        <nav className="space-y-2 flex-1">
          <Link to="/dashboard" className="flex items-center gap-3 p-3 bg-cyan-500/10 text-cyan-400 rounded-xl font-bold">
            <FaRocket /> Dashboard
          </Link>
          <Link to="/events" className="flex items-center gap-3 p-3 text-slate-400 hover:bg-slate-800 rounded-xl transition-all">
            <FaCalendarAlt /> Browse Events
          </Link>
          <Link to="/my-tickets" className="flex items-center gap-3 p-3 text-slate-400 hover:bg-slate-800 rounded-xl transition-all">
            <FaTicketAlt /> My Passes
          </Link>
          <Link to="/profile" className="flex items-center gap-3 p-3 text-slate-400 hover:bg-slate-800 rounded-xl transition-all">
            <FaUserCircle /> Identity
          </Link>
        </nav>

        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 p-3 text-red-400 hover:bg-red-500/10 rounded-xl transition-all mt-auto"
        >
          <FaSignOutAlt /> Terminate Session
        </button>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        
        {/* HEADER */}
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-black tracking-tight text-white uppercase italic">Command_Center</h1>
            <p className="text-slate-500 font-mono text-sm tracking-widest">ACTIVE_USER: {data.msg}</p>
          </div>
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 cursor-pointer hover:text-white relative">
              <FaBell />
              <span className="absolute top-0 right-0 w-2 h-2 bg-cyan-500 rounded-full"></span>
            </div>
            <div className="w-10 h-10 rounded-full bg-linear-to-tr from-cyan-500 to-purple-600 p-0.5">
               <div className="w-full h-full bg-[#020617] rounded-full flex items-center justify-center font-bold text-xs uppercase">
                 {data.msg.substring(0,2)}
               </div>
            </div>
          </div>
        </header>

        {/* BENTO GRID LAYOUT */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* WELCOME TILE */}
          <div className="md:col-span-2 bg-linear-to-br from-cyan-600/20 to-transparent border border-cyan-500/20 rounded-3xl p-8 relative overflow-hidden group">
            <div className="relative z-10">
              <h2 className="text-4xl font-black text-white mb-2">Welcome Back, {data.msg}!</h2>
              <p className="text-slate-400 max-w-md">You have 3 upcoming events this week. Ready to dive back into the campus life?</p>
              <button className="mt-6 px-6 py-2 bg-cyan-500 text-[#020617] font-black uppercase text-xs tracking-widest rounded-lg hover:bg-cyan-400 transition-all">
                View Schedule
              </button>
            </div>
            <FaRocket className="absolute -bottom-4 -right-4 text-cyan-500/10 text-[12rem] rotate-12 group-hover:rotate-0 transition-transform duration-700" />
          </div>

          {/* QUICK STATS */}
          <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-6 flex flex-col justify-between">
            <h3 className="text-slate-500 font-bold uppercase text-[10px] tracking-widest">Global Rank</h3>
            <div>
               <p className="text-5xl font-black text-white">#124</p>
               <p className="text-cyan-500 text-sm font-bold">+12 since Le Fiestus</p>
            </div>
          </div>

          {/* UPCOMING EVENT PREVIEW */}
          <div className="bg-[#030712] border border-slate-800 rounded-3xl p-6 hover:border-purple-500/50 transition-all">
            <div className="flex justify-between items-start mb-4">
              <span className="text-[10px] bg-purple-500/20 text-purple-400 px-2 py-1 rounded font-bold uppercase">Technical</span>
              <p className="text-slate-500 text-xs">Mar 24</p>
            </div>
            <h4 className="text-lg font-bold text-white mb-1">CodeCraft Hackathon</h4>
            <p className="text-slate-500 text-sm mb-4">JUIT LT-3 | 10:00 AM</p>
            <div className="w-full bg-slate-800 h-1 rounded-full overflow-hidden">
               <div className="bg-purple-500 w-3/4 h-full"></div>
            </div>
          </div>

          {/* REGISTRATION TILE */}
          <div className="bg-[#030712] border border-slate-800 rounded-3xl p-6 flex items-center justify-between group cursor-pointer hover:bg-slate-800/30 transition-all">
            <div>
              <p className="text-3xl font-black text-white">12</p>
              <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Active Events</p>
            </div>
            <div className="w-12 h-12 bg-slate-800 rounded-2xl flex items-center justify-center group-hover:bg-cyan-500 group-hover:text-black transition-all">
              <FaCalendarAlt size={20} />
            </div>
          </div>

          {/* CERTIFICATE TILE */}
          <div className="bg-[#030712] border border-slate-800 rounded-3xl p-6 flex items-center justify-between group cursor-pointer hover:bg-slate-800/30 transition-all">
            <div>
              <p className="text-3xl font-black text-white">05</p>
              <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Certificates</p>
            </div>
            <div className="w-12 h-12 bg-slate-800 rounded-2xl flex items-center justify-center group-hover:bg-purple-500 transition-all">
              <FaTicketAlt size={20} />
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default Dashboard;