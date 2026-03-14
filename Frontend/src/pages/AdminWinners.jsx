import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaTrophy, FaSave, FaCheckCircle, FaTerminal } from "react-icons/fa";
import { toast } from "react-toastify";

const AdminWinners = () => {
  const [events, setEvents] = useState([]);
  const [winnerState, setWinnerState] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:3000/api/events");
      setEvents(res.data);
    } catch (err) {
      toast.error("FETCH_ERROR: Could not load events");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (eventId, rank, value) => {
    setWinnerState((prev) => ({
      ...prev,
      [eventId]: {
        ...prev[eventId],
        [rank]: value,
      },
    }));
  };

  const updateWinner = async (eventId) => {
    const winners = winnerState[eventId];
    if (!winners) {
      toast.info("No changes detected");
      return;
    }

    try {
      await axios.put(`http://localhost:3000/api/events/${eventId}/winners`, winners);
      toast.success("WINNER_DATA_SYNCHRONIZED");
    } catch (err) {
      toast.error("UPDATE_FAILED: Check network");
    }
  };

  return (
    <div className="min-h-screen bg-[#030712] text-slate-200 p-6 lg:p-12 font-sans">
      {/* Header */}
      <div className="max-w-5xl mx-auto mb-10">
        <div className="flex items-center gap-3 mb-2">
          <FaTerminal className="text-purple-500" />
          <span className="text-purple-500 font-mono text-xs uppercase tracking-[0.3em]">Authority_Module</span>
        </div>
        <h1 className="text-4xl font-black italic tracking-tighter text-white uppercase">
          Declare <span className="text-purple-500">Champions</span>
        </h1>
      </div>

      {loading ? (
        <div className="text-center py-20 font-mono text-slate-500 animate-pulse">RETRIVING_ACTIVE_EVENTS...</div>
      ) : (
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {events.map((event) => (
            <div key={event._id} className="bg-slate-900/40 border border-slate-800 rounded-3xl p-6 hover:border-purple-500/30 transition-all duration-300 shadow-xl">
              <div className="flex items-center gap-3 mb-6">
                <FaTrophy className="text-slate-600 group-hover:text-purple-500" />
                <h2 className="text-xl font-bold text-white truncate tracking-tight uppercase italic">{event.title}</h2>
              </div>

              <div className="space-y-4">
                {/* 1st Place Input */}
                <div className="group">
                  <label className="text-[10px] font-black text-yellow-500 uppercase tracking-widest ml-1">Primary_Victor (1st)</label>
                  <input
                    placeholder={event.winners?.first || "Enter name..."}
                    className="mt-1 w-full bg-[#030712] border border-slate-800 rounded-xl px-4 py-3 focus:ring-1 focus:ring-yellow-500 outline-none transition-all placeholder:text-slate-700"
                    onChange={(e) => handleInputChange(event._id, "first", e.target.value)}
                  />
                </div>

                {/* 2nd Place Input */}
                <div className="group">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Secondary_Victor (2nd)</label>
                  <input
                    placeholder={event.winners?.second || "Enter name..."}
                    className="mt-1 w-full bg-[#030712] border border-slate-800 rounded-xl px-4 py-3 focus:ring-1 focus:ring-slate-400 outline-none transition-all placeholder:text-slate-700"
                    onChange={(e) => handleInputChange(event._id, "second", e.target.value)}
                  />
                </div>

                {/* 3rd Place Input */}
                <div className="group">
                  <label className="text-[10px] font-black text-orange-600 uppercase tracking-widest ml-1">Tertiary_Victor (3rd)</label>
                  <input
                    placeholder={event.winners?.third || "Enter name..."}
                    className="mt-1 w-full bg-[#030712] border border-slate-800 rounded-xl px-4 py-3 focus:ring-1 focus:ring-orange-600 outline-none transition-all placeholder:text-slate-700"
                    onChange={(e) => handleInputChange(event._id, "third", e.target.value)}
                  />
                </div>
              </div>

              <button
                onClick={() => updateWinner(event._id)}
                className="w-full mt-8 py-3 bg-purple-600 text-white font-black uppercase tracking-[0.2em] rounded-xl hover:bg-purple-500 shadow-[0_0_15px_rgba(147,51,234,0.2)] transition-all flex items-center justify-center gap-2 active:scale-95"
              >
                <FaSave size={14} /> Commit_Changes
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminWinners;