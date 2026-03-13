import { useState } from "react";
import { createEvent } from "../api/createevent";
import {  FaCircleCheck, FaTerminal } from "react-icons/fa6";
import { toast } from "react-toastify";
import { FaCloudUploadAlt } from "react-icons/fa";

export default function CreateEvents() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    type: "",
    startDate: "",
    endDate: "",
    image: ""
  });
  const [loading, setLoading] = useState(false);

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleImage = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const base64 = await convertToBase64(file);
      setForm({ ...form, image: base64 });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createEvent(form);
      toast.success("EVENT_BROADCAST_SUCCESSFUL");
      setForm({
        title: "",
        description: "",
        location: "",
        type: "",
        startDate: "",
        endDate: "",
        image: ""
      });
    } catch (err) {
      toast.error("DATA_TRANSMISSION_ERROR");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#030712] text-slate-200 p-6 lg:p-12 font-sans">
      {/* Header */}
      <div className="max-w-5xl mx-auto mb-10">
        <div className="flex items-center gap-3 mb-2">
          <FaTerminal className="text-cyan-500 animate-pulse" />
          <span className="text-cyan-500 font-mono text-xs uppercase tracking-[0.3em]">System_Admin</span>
        </div>
        <h1 className="text-4xl font-black italic tracking-tighter text-white uppercase">
          Initialize <span className="text-cyan-400">New_Event</span>
        </h1>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
        
        {/* Left Side: Form Fields */}
        <form onSubmit={handleSubmit} className="space-y-5 bg-slate-900/40 p-8 rounded-3xl border border-slate-800 shadow-2xl">
          <div className="space-y-4">
            <div>
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Event.Title</label>
              <input
                className="mt-1 w-full bg-[#030712] border border-slate-800 rounded-xl px-4 py-3 focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all"
                placeholder="e.g. HackJUIT 4.0"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Type</label>
                <input
                  className="mt-1 w-full bg-[#030712] border border-slate-800 rounded-xl px-4 py-3 focus:ring-1 focus:ring-cyan-500 outline-none"
                  placeholder="Technical / Cultural"
                  value={form.type}
                  onChange={(e) => setForm({ ...form, type: e.target.value })}
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Location</label>
                <input
                  className="mt-1 w-full bg-[#030712] border border-slate-800 rounded-xl px-4 py-3 focus:ring-1 focus:ring-cyan-500 outline-none"
                  placeholder="LT-1 / Open Air Theater"
                  value={form.location}
                  onChange={(e) => setForm({ ...form, location: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Description</label>
              <textarea
                className="mt-1 w-full bg-[#030712] border border-slate-800 rounded-xl px-4 py-3 focus:ring-1 focus:ring-cyan-500 outline-none min-h-[100px]"
                placeholder="Enter event brief..."
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Start.Date</label>
                <input
                  type="date"
                  className="mt-1 w-full bg-[#030712] border border-slate-800 rounded-xl px-4 py-3 focus:ring-1 focus:ring-cyan-500 outline-none text-slate-400"
                  value={form.startDate}
                  onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">End.Date</label>
                <input
                  type="date"
                  className="mt-1 w-full bg-[#030712] border border-slate-800 rounded-xl px-4 py-3 focus:ring-1 focus:ring-cyan-500 outline-none text-slate-400"
                  value={form.endDate}
                  onChange={(e) => setForm({ ...form, endDate: e.target.value })}
                />
              </div>
            </div>
          </div>

          <button 
            disabled={loading}
            className="w-full py-4 bg-cyan-600 text-black font-black uppercase tracking-[0.2em] rounded-xl hover:bg-cyan-400 transition-all shadow-[0_0_20px_rgba(8,145,178,0.3)] active:scale-95 flex items-center justify-center gap-2"
          >
            {loading ? "TRANSMITTING..." : <><FaCircleCheck /> BROADCAST_EVENT</>}
          </button>
        </form>

        {/* Right Side: Image Upload & Live Preview */}
        <div className="space-y-6">
          <div className="bg-slate-900/40 p-8 rounded-3xl border border-slate-800 border-dashed relative group">
            <input
              type="file"
              onChange={handleImage}
              className="absolute inset-0 opacity-0 cursor-pointer z-20"
            />
            <div className="text-center py-10">
              <FaCloudUploadAlt className="text-5xl text-slate-600 mx-auto mb-4 group-hover:text-cyan-500 transition-colors" />
              <p className="font-bold text-slate-400">UPLOAD_VISUAL_ASSET</p>
              <p className="text-[10px] text-slate-600 mt-2 uppercase tracking-widest">Supports JPG, PNG, WEBP</p>
            </div>
          </div>

          {/* Live Preview Card */}
          <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-[#030712]">
             <div className="absolute top-4 left-4 z-10 bg-black/50 backdrop-blur px-2 py-1 rounded text-[10px] font-mono text-cyan-400 border border-cyan-500/30">
               LIVE_PREVIEW
             </div>
             {form.image ? (
               <img src={form.image} alt="Preview" className="w-full h-64 object-cover opacity-80" />
             ) : (
               <div className="w-full h-64 bg-slate-900 flex items-center justify-center text-slate-700 font-mono italic">
                 NO_IMAGE_DATA
               </div>
             )}
             <div className="p-6">
                <h3 className="text-xl font-black text-white uppercase italic">{form.title || "EVENT_TITLE"}</h3>
                <p className="text-slate-500 text-sm mt-1">{form.location || "LOCATION_STUB"}</p>
             </div>
          </div>
        </div>

      </div>
    </div>
  );
}