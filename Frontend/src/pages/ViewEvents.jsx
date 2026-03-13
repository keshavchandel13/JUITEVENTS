import { useEffect, useState } from "react";
import { getEvents, markComing } from "../api/createevent";
import { FaLocationDot, FaCalendarDays, FaEye, FaUsers, FaFire } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
export default function ViewEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      const data = await getEvents();
      setEvents(data);
    } catch (err) {
      console.error("Failed to load events");
    } finally {
      setLoading(false);
    }
  };

  const handleComing = async (id) => {
    await markComing(id);
    loadEvents();
  };

  return (
    <div className="min-h-screen bg-[#030712] text-slate-200 p-6 lg:p-12">
      {/* Header Section */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-2">
          <div className="h-0.5 w-12 bg-cyan-500"></div>
          <span className="text-cyan-500 font-mono text-xs uppercase tracking-[0.3em]">Live_Feed</span>    
        </div>
        <h1 className="text-5xl font-black italic tracking-tighter text-white uppercase">
          Upcoming <span className="text-cyan-400">Events</span>
        </h1>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <div 
              key={event._id} 
              className="group relative bg-slate-900/40 border border-slate-800 rounded-3xl overflow-hidden hover:border-cyan-500/50 transition-all duration-500 hover:-translate-y-2"
            >
              {/* Event Image with Overlay */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={event.image || "https://via.placeholder.com/600x400/0f172a/64748b?text=JUIT+Event"}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  alt={event.title}
                />
                <div className="absolute inset-0 bg-linear-to-t from-[#030712] via-transparent to-transparent"></div>
                
                {/* Hot Badge for high coming count */}
                {event.weAreComingCount > 10 && (
                  <div className="absolute top-4 left-4 bg-orange-500 text-black px-3 py-1 rounded-full text-[10px] font-black uppercase flex items-center gap-1 shadow-[0_0_15px_rgba(249,115,22,0.5)]">
                    <FaFire /> Trending
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-2xl font-black text-white mb-3 tracking-tight group-hover:text-cyan-400 transition-colors">
                  {event.title}
                </h3>
                
                <p className="text-slate-400 text-sm line-clamp-2 mb-6 font-medium leading-relaxed">
                  {event.description || "No description provided for this campus event."}
                </p>

                {/* Details Meta */}
                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-3 text-xs font-bold text-slate-500 uppercase tracking-widest">
                    <FaLocationDot className="text-cyan-500" />
                    {event.location}
                  </div>
                  <div className="flex items-center gap-3 text-xs font-bold text-slate-500 uppercase tracking-widest">
                    <FaCalendarDays className="text-purple-500" />
                    {event.startDate || "TBA"}
                  </div>
                </div>

                {/* Stats Bar */}
                <div className="flex items-center justify-between py-4 border-t border-slate-800/50">
                  <div className="flex gap-4">
                    <div className="flex items-center gap-2 text-slate-500">
                      <FaEye size={14} />
                      <span className="text-xs font-mono">{event.views || 0}</span>
                    </div>
                    <div className="flex items-center gap-2 text-cyan-500 font-bold">
                      <FaUsers size={14} />
                      <span className="text-xs font-mono">{event.weAreComingCount || 0}</span>
                    </div>
                  </div>
                  <button
  onClick={() => navigate(`/register-event/${event._id}`)}
>
  Register
</button>
                  <button
                    onClick={() => handleComing(event._id)}
                    className="relative px-6 py-2 bg-white text-black text-[10px] font-black uppercase tracking-widest rounded-full hover:bg-cyan-400 transition-all active:scale-90"
                  >
                    I'm Coming
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && events.length === 0 && (
        <div className="text-center py-20 border-2 border-dashed border-slate-800 rounded-3xl">
          <p className="text-slate-500 font-mono uppercase tracking-widest">No active transmissions found.</p>
        </div>
      )}
    </div>
  );
}