import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaTrophy, FaMedal, FaSkullCrossbones, FaClock } from "react-icons/fa6";

const EventWinners = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWinners();
  }, []);

  const fetchWinners = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:3000/api/events/winners");
      setEvents(res.data);
    } catch (err) {
      console.error("Error fetching winners");
    } finally {
      setLoading(false);
    }
  };

  // Helper to render winner or "To Be Announced"
  const renderWinner = (name, rank) => {
    const isMissing = !name || name.trim() === "";
    
    const styles = {
      first: "from-yellow-400 to-yellow-600 text-yellow-100 border-yellow-500/30",
      second: "from-slate-300 to-slate-500 text-slate-100 border-slate-400/30",
      third: "from-orange-400 to-orange-700 text-orange-100 border-orange-500/30",
    };

    if (isMissing) {
      return (
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700 border-dashed animate-pulse">
          <FaClock className="text-slate-500" />
          <span className="text-slate-500 font-mono text-xs uppercase tracking-widest">Results_Pending</span>
        </div>
      );
    }

    return (
      <div className={`flex items-center justify-between px-4 py-3 rounded-xl bg-gradient-to-r ${styles[rank]} border shadow-lg`}>
        <div className="flex items-center gap-3">
          <FaMedal className="text-xl" />
          <span className="font-black uppercase tracking-tight">{name}</span>
        </div>
        <span className="text-[10px] font-black bg-black/20 px-2 py-0.5 rounded uppercase">
          {rank === 'first' ? 'Winner' : rank === 'second' ? 'Runner Up' : '2nd Runner Up'}
        </span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#030712] text-slate-200 p-6 lg:p-12 font-sans">
      
      {/* HEADER */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-2">
          <div className="h-[2px] w-12 bg-yellow-500"></div>
          <span className="text-yellow-500 font-mono text-xs uppercase tracking-[0.3em]">Hall_Of_Fame</span>
        </div>
        <h1 className="text-5xl font-black italic tracking-tighter text-white uppercase">
          Victory <span className="text-yellow-500">Stand</span>
        </h1>
      </div>

      {loading ? (
        <div className="text-center py-20 font-mono text-slate-500 animate-pulse">DECRYPTING_VICTORIES...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <div key={event._id} className="relative group bg-slate-900/20 border border-slate-800 rounded-3xl p-8 hover:border-yellow-500/30 transition-all duration-500 shadow-2xl overflow-hidden">
              
              {/* Decorative Background Trophy Icon */}
              <FaTrophy className="absolute -bottom-6 -right-6 text-slate-800/20 text-9xl -rotate-12 group-hover:rotate-0 transition-transform duration-700" />

              <h2 className="relative z-10 text-2xl font-black text-white mb-8 tracking-tighter italic uppercase border-b border-slate-800 pb-4">
                {event.title}
              </h2>

              <div className="relative z-10 space-y-4">
                {renderWinner(event.winners?.first, "first")}
                {renderWinner(event.winners?.second, "second")}
                {renderWinner(event.winners?.third, "third")}
              </div>

              {/* Status Footer */}
              <div className="mt-8 pt-4 border-t border-slate-800/50 flex justify-between items-center text-[10px] font-bold text-slate-600 uppercase tracking-widest">
                <span>Ref: {event._id.substring(0, 8)}</span>
                <span className="text-yellow-500/50 italic">Verified_Result</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EventWinners;