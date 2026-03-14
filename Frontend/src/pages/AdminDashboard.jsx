import React from "react";
import { FaCalendarAlt, FaUsers } from "react-icons/fa";

const AdminDashboard = () => {

  return (

    <div>

      <h1 className="text-3xl font-bold mb-8">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-2 gap-6">

        <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
          <FaCalendarAlt className="text-cyan-400 text-2xl mb-3" />
          <p className="text-xl font-bold">Manage Events</p>
          <p className="text-slate-400 text-sm">
            Create and update campus events
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
          <FaUsers className="text-purple-400 text-2xl mb-3" />
          <p className="text-xl font-bold">Participants</p>
          <p className="text-slate-400 text-sm">
            View event registrations
          </p>
        </div>

      </div>

    </div>

  );

};

export default AdminDashboard;