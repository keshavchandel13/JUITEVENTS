import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaUsers, FaFileCsv, FaUserGraduate, FaPeopleGroup, FaSitemap } from "react-icons/fa6";

const AdminEventRegistrations = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:3000/api/admin/event-registrations");
      setData(res.data);
    } catch (error) {
      console.error("Error fetching registrations");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#030712] text-slate-200 p-6 lg:p-12 font-sans">
      
      {/* HEADER & CONTROLS */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <FaSitemap className="text-cyan-500" />
            <span className="text-cyan-500 font-mono text-xs uppercase tracking-[0.3em]">Registry_Database</span>
          </div>
          <h2 className="text-4xl font-black italic tracking-tighter text-white uppercase">
            Event <span className="text-cyan-400">Registrations</span>
          </h2>
        </div>

        <button className="flex items-center gap-2 bg-emerald-600/10 border border-emerald-500/20 text-emerald-500 px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-emerald-500 hover:text-white transition-all">
          <FaFileCsv size={18} /> EXPORT_MASTER_LIST
        </button>
      </div>

      {loading ? (
        <div className="text-center py-20 font-mono text-slate-500 animate-pulse">SYNCHRONIZING_DATA...</div>
      ) : (
        <div className="space-y-8">
          {data.map((event) => (
            <div key={event._id} className="bg-slate-900/20 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
              
              {/* Event Sub-Header */}
              <div className="bg-slate-800/40 px-8 py-5 border-b border-slate-700/50 flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center text-cyan-400">
                    <FaUsers size={20} />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-white uppercase tracking-tight">{event.eventTitle}</h3>
                    <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">
                      Total Registrations: {event.students.length}
                    </p>
                  </div>
                </div>
              </div>

              {/* Participants Grid */}
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {event.students.map((student, i) => (
                  <div key={i} className="bg-[#030712]/50 border border-slate-800 p-5 rounded-2xl hover:border-slate-600 transition-colors group">
                    
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-slate-800 rounded-lg text-slate-400 group-hover:text-cyan-400 transition-colors">
                          {student.teamName ? <FaPeopleGroup size={18} /> : <FaUserGraduate size={18} />}
                        </div>
                        <div>
                          <p className="text-xs text-slate-500 font-bold uppercase tracking-tighter">Participant</p>
                          <p className="font-bold text-slate-200">{student.studentName}</p>
                        </div>
                      </div>
                    </div>

                    {student.teamName && (
                      <div className="mb-3 px-3 py-2 bg-cyan-500/5 border border-cyan-500/10 rounded-lg">
                        <p className="text-[10px] text-cyan-500 font-black uppercase tracking-widest">Team Identity</p>
                        <p className="text-sm font-bold text-cyan-100">{student.teamName}</p>
                      </div>
                    )}

                    {student.teamMembers?.length > 0 && (
                      <div className="mt-4 space-y-2">
                        <p className="text-[10px] text-slate-600 font-black uppercase tracking-widest ml-1">Unit_Members</p>
                        <div className="flex flex-wrap gap-2">
                          {student.teamMembers.map((m, idx) => (
                            <span key={idx} className="text-[10px] bg-slate-800 px-2 py-1 rounded-md text-slate-400 font-mono">
                              {m.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Footer empty check */}
              {event.students.length === 0 && (
                <div className="p-10 text-center text-slate-600 italic font-mono text-sm">
                  NO_RECORDS_FOUND_FOR_THIS_NODE
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminEventRegistrations;