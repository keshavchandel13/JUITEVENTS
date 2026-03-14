import React from "react";
import { Outlet, Link } from "react-router-dom";
import { FaPlus, FaUsers, FaRocket } from "react-icons/fa";
import { FaTrophy } from "react-icons/fa6";
const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 flex">

      {/* SIDEBAR */}
      <aside className="w-56 bg-[#030712] border-r border-slate-800 flex flex-col p-6">

        <h2 className="text-2xl font-black text-cyan-500 mb-10">
          ADMIN_PANEL
        </h2>

        <nav className="space-y-2">

          <Link
            to="/admin/dashboard"
            className="flex items-center gap-3 p-3 hover:bg-slate-800 rounded-xl"
          >
            <FaRocket /> Dashboard
          </Link>

          <Link
            to="/admin/create-event"
            className="flex items-center gap-3 p-3 hover:bg-slate-800 rounded-xl"
          >
            <FaPlus /> Create Event
          </Link>

          <Link
            to="/admin/participant"
            className="flex items-center gap-3 p-3 hover:bg-slate-800 rounded-xl"
          >
            <FaUsers /> Participants
          </Link>
          <Link
            to="/admin/winners"
            className="flex items-center gap-3 p-3 hover:bg-slate-800 rounded-xl"
          >
            <FaTrophy /> Declare Winner
          </Link>

        </nav>

      </aside>


      {/* CONTENT */}
      <div className="flex-1 p-8">

        <Outlet />

      </div>

    </div>
  );
};

export default AdminLayout;