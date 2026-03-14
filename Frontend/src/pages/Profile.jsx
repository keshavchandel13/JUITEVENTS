import React, { useState, useEffect } from 'react';
import { FaUserCircle, FaIdCard, FaGraduationCap, FaMapMarkerAlt, FaEnvelope, FaPen, FaTimes, FaSpinner, FaSave } from 'react-icons/fa';
import { toast } from 'react-toastify';
import axios from 'axios';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [userData, setUserData] = useState({
    name: "Loading...",
    email: "Loading...",
    enrollmentNo: "Not Set",
    branch: "CSE",
    semester: "6th Semester",
    residence: "Hosteler",
    role: "student"
  });

  const [formData, setFormData] = useState({ ...userData });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = JSON.parse(localStorage.getItem("auth"));
        const config = { headers: { Authorization: `Bearer ${token}` } };
        
        const response = await axios.get("http://localhost:3000/api/v1/me", config);
        const fetchedUser = response.data.user;

        const syncData = {
          name: fetchedUser.name || "",
          email: fetchedUser.email || "", 
          enrollmentNo: fetchedUser.enrollmentNo || "Not Set",
          branch: fetchedUser.branch || "CSE",
          semester: fetchedUser.semester || "6th Semester",
          residence: fetchedUser.residence || "Hosteler",
          role: fetchedUser.role || "student"
        };

        setUserData(syncData);
        setFormData(syncData);
        setIsLoading(false);
      } catch (error) {
        console.error("GET ERROR:", error);
        toast.error("Failed to establish connection for user data.");
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
    if (isEditing) setFormData({ ...userData });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUpdating(true);

    try {
      const token = JSON.parse(localStorage.getItem("auth"));
      const config = {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json' 
        }
      };

      const payload = {
        name: formData.name,
        enrollmentNo: formData.enrollmentNo,
        branch: formData.branch,
        semester: formData.semester,
        residence: formData.residence
      };

      const response = await axios.put("http://localhost:3000/api/v1/profile", payload, config);
      const updatedUser = response.data.user;
      
      setUserData({
        ...userData,
        name: updatedUser.name,
        enrollmentNo: updatedUser.enrollmentNo || "Not Set",
        branch: updatedUser.branch,
        semester: updatedUser.semester,
        residence: updatedUser.residence
      });

      toast.success("Identity parameters locked and saved.");
      setIsUpdating(false);
      setIsEditing(false);

    } catch (error) {
      console.error("PUT ERROR:", error);
      toast.error(error?.response?.data?.msg || "Transmission failed.");
      setIsUpdating(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#020617] text-cyan-500 flex items-center justify-center font-sans">
        <FaSpinner className="animate-spin text-4xl" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 flex font-sans w-full">
      <main className="flex-1 p-6 md:p-10 overflow-y-auto w-full">
        
        <header className="flex justify-between items-center mb-10 border-b border-slate-800 pb-6">
          <div>
            <h1 className="text-3xl font-black tracking-tight text-white uppercase italic flex items-center gap-3">
              <FaUserCircle className="text-cyan-500" /> IDENTITY_MATRIX
            </h1>
            <p className="text-slate-500 font-mono text-sm tracking-widest mt-1">USER_DATA // JUIT_EVENTS</p>
          </div>
          
          <button 
            onClick={toggleEditMode}
            className={`flex items-center gap-2 px-5 py-2.5 font-bold uppercase text-xs tracking-widest rounded-lg transition-all border ${
              isEditing 
                ? "bg-red-500/10 text-red-400 border-red-500/30 hover:bg-red-500/20" 
                : "bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700"
            }`}
          >
            {isEditing ? <><FaTimes /> Abort Override</> : <><FaPen /> Edit Parameters</>}
          </button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="col-span-1">
            <div className="bg-[#030712] border border-slate-800 rounded-3xl p-8 relative overflow-hidden group h-full">
              <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-cyan-900/30 to-transparent"></div>
              
              <div className="relative z-10 flex flex-col items-center text-center mt-4">
                <div className="relative mb-6">
                  <div className="w-32 h-32 rounded-full border-2 border-cyan-500 p-1 overflow-hidden bg-slate-800 flex items-center justify-center">
                    <FaUserCircle className="text-7xl text-cyan-500" />
                  </div>
                </div>
                
                <h2 className="text-2xl font-black text-white uppercase tracking-wider">{isEditing ? formData.name : userData.name}</h2>
                <p className="text-cyan-400 font-mono text-sm mb-6 uppercase tracking-widest">{userData.role}</p>
              </div>
            </div>
          </div>

          <div className="col-span-1 lg:col-span-2">
            <div className="bg-[#030712] border border-slate-800 rounded-3xl p-8 h-full">
              
              <h3 className="text-lg font-black text-white mb-6 uppercase tracking-widest border-b border-slate-800 pb-4">
                {isEditing ? "Reconfigure Telemetry" : "Academic Telemetry"}
              </h3>

              {isEditing ? (
                <form onSubmit={handleSubmit} className="space-y-6 font-mono text-sm">
                  
                  <div>
                    <label className="block text-slate-500 mb-2 uppercase tracking-widest text-[10px] font-bold">Comm Link (Sign-in Email)</label>
                    <input 
                      type="text" value={userData.email} disabled
                      className="w-full bg-slate-900/50 border border-slate-800 rounded-xl p-4 text-slate-500 cursor-not-allowed"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-slate-500 mb-2 uppercase tracking-widest text-[10px] font-bold">Callsign (Full Name)</label>
                      <input 
                        type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full bg-[#020617] border border-slate-800 rounded-xl p-4 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-500 mb-2 uppercase tracking-widest text-[10px] font-bold">Enrollment No.</label>
                      <input 
                        type="text" value={formData.enrollmentNo} onChange={(e) => setFormData({...formData, enrollmentNo: e.target.value})} placeholder="e.g. 231030300"
                        className="w-full bg-[#020617] border border-slate-800 rounded-xl p-4 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-slate-500 mb-2 uppercase tracking-widest text-[10px] font-bold">Degree Program</label>
                      <select 
                        value={formData.branch} onChange={(e) => setFormData({...formData, branch: e.target.value})}
                        className="w-full bg-[#020617] border border-slate-800 rounded-xl p-4 text-white focus:outline-none focus:border-cyan-500 transition-colors appearance-none cursor-pointer"
                      >
                        <option value="CSE">Computer Science Engineering (CSE)</option>
                        <option value="ECE">Electronics and Comm. (ECE)</option>
                        <option value="Civil">Civil Engineering</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-slate-500 mb-2 uppercase tracking-widest text-[10px] font-bold">Semester</label>
                      <select 
                        value={formData.semester} onChange={(e) => setFormData({...formData, semester: e.target.value})}
                        className="w-full bg-[#020617] border border-slate-800 rounded-xl p-4 text-white focus:outline-none focus:border-cyan-500 transition-colors appearance-none cursor-pointer"
                      >
                        <option value="1st Semester">1st Semester</option>
                        <option value="2nd Semester">2nd Semester</option>
                        <option value="3rd Semester">3rd Semester</option>
                        <option value="4th Semester">4th Semester</option>
                        <option value="5th Semester">5th Semester</option>
                        <option value="6th Semester">6th Semester</option>
                        <option value="7th Semester">7th Semester</option>
                        <option value="8th Semester">8th Semester</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-500 mb-2 uppercase tracking-widest text-[10px] font-bold">Current Base (Residence)</label>
                    <select 
                      value={formData.residence} onChange={(e) => setFormData({...formData, residence: e.target.value})}
                      className="w-full bg-[#020617] border border-slate-800 rounded-xl p-4 text-white focus:outline-none focus:border-cyan-500 transition-colors appearance-none cursor-pointer"
                    >
                      <option value="Hosteler">Hosteler</option>
                      <option value="Day Scholar">Day Scholar</option>
                    </select>
                  </div>

                  <div className="pt-4">
                    <button 
                      type="submit" disabled={isUpdating}
                      className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-black uppercase tracking-widest p-4 rounded-xl hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100 transition-all flex justify-center items-center gap-3 shadow-lg shadow-cyan-900/20"
                    >
                      {isUpdating ? <><FaSpinner className="animate-spin text-xl" /> EXECUTING...</> : <><FaSave className="text-xl" /> COMPILE & SAVE PARAMETERS</>}
                    </button>
                  </div>
                </form>

              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-start gap-4 p-4 rounded-2xl border border-transparent hover:border-slate-800">
                    <div className="w-10 h-10 rounded-full bg-cyan-500/10 text-cyan-500 flex items-center justify-center shrink-0"><FaIdCard size={18} /></div>
                    <div>
                      <p className="text-slate-500 text-[10px] uppercase tracking-widest font-bold mb-1">Enrollment No.</p>
                      <p className="text-white font-mono">{userData.enrollmentNo}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 rounded-2xl border border-transparent hover:border-slate-800">
                    <div className="w-10 h-10 rounded-full bg-purple-500/10 text-purple-400 flex items-center justify-center shrink-0"><FaGraduationCap size={18} /></div>
                    <div>
                      <p className="text-slate-500 text-[10px] uppercase tracking-widest font-bold mb-1">Degree Program</p>
                      <p className="text-white font-mono">{userData.branch}</p>
                      <p className="text-slate-400 text-xs mt-1">{userData.semester}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 rounded-2xl border border-transparent hover:border-slate-800">
                    <div className="w-10 h-10 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0"><FaEnvelope size={18} /></div>
                    <div>
                      <p className="text-slate-500 text-[10px] uppercase tracking-widest font-bold mb-1">Comm Link</p>
                      <p className="text-white font-mono text-sm break-all">{userData.email}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 rounded-2xl border border-transparent hover:border-slate-800">
                    <div className="w-10 h-10 rounded-full bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0"><FaMapMarkerAlt size={18} /></div>
                    <div>
                      <p className="text-slate-500 text-[10px] uppercase tracking-widest font-bold mb-1">Current Base</p>
                      <p className="text-white font-mono">{userData.residence}</p>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default Profile;