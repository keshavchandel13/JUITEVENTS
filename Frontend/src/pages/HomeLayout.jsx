import React from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { FaCalendarAlt, FaUserCircle, FaSignOutAlt, FaRocket, FaBell, FaTicketAlt, FaImage } from "react-icons/fa";
import { FaTrophy } from "react-icons/fa6";
const HomeLayout = () => {

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("auth");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 flex font-sans">

      {/* SIDEBAR */}
      <aside className="hidden md:flex w-56 bg-[#030712] border-r border-slate-800 flex-col p-6">

        <div className="mb-10">
          <h2 className="text-2xl font-black italic tracking-tighter text-cyan-500">
            JUIT_EVENTS
          </h2>
        </div>

        <nav className="space-y-2 flex-1">

          <Link to="/dashboard" className="flex items-center gap-3 p-3 hover:bg-slate-800 rounded-xl">
            <FaRocket /> Dashboard
          </Link>

          <Link to="/events" className="flex items-center gap-3 p-3 hover:bg-slate-800 rounded-xl">
            <FaCalendarAlt /> Browse Events
          </Link>

          {/* <Link to="/registrations" className="flex items-center gap-3 p-3 hover:bg-slate-800 rounded-xl">
            <FaTicketAlt /> Registrations
          </Link> */}

          <Link to="/gallery" className="flex items-center gap-3 p-3 hover:bg-slate-800 rounded-xl">
            <FaImage /> Event Gallery
          </Link>
          <Link to="/winner" className="flex items-center gap-3 p-3 hover:bg-slate-800 rounded-xl">
            <FaTrophy/> Victory Stand
          </Link>

          <Link to="/profile" className="flex items-center gap-3 p-3 hover:bg-slate-800 rounded-xl">
            <FaUserCircle /> Profile
          </Link>

        </nav>

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 p-3 text-red-400 hover:bg-red-500/10 rounded-xl"
        >
          <FaSignOutAlt /> Logout
        </button>

      </aside>


      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col">

        {/* TOPBAR */}
        <header className="flex justify-between items-center p-6 border-b border-slate-800 bg-[#020617]">

          <h1 className="text-xl font-bold text-white">
            JUIT EVENT SYSTEM
          </h1>

          <div className="flex items-center gap-4">

            <div className="relative">
              <FaBell className="text-xl cursor-pointer" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-cyan-500 rounded-full"></span>
            </div>

            <div className="w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center text-black font-bold">
              U
            </div>

          </div>

        </header>


        {/* PAGE CONTENT */}
        <main className="p-6 flex-1 overflow-y-auto">

          <Outlet />

        </main>

      </div>
    </div>
  );
};

export default HomeLayout;