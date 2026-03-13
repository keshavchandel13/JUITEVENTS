import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaImage, FaUpload, FaTimes, FaExternalLinkAlt, FaSpinner } from 'react-icons/fa';

const EventGallery = () => {
  // Simulating auth state - checking if user is an admin to show upload controls
  const [data] = useState({ msg: "Admin_User", role: "admin" }); 
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Upload form state
  const [uploadData, setUploadData] = useState({ title: '', redirectUrl: '', file: null });
  const [isUploading, setIsUploading] = useState(false);

  const navigate = useNavigate();

  // Mocking the fetch - this is where you'd call your GET /api/v1/gallery route
  useEffect(() => {
    // Simulating API delay
    setTimeout(() => {
      setImages([
        {
          _id: "1",
          title: "CodeCraft Hackathon '25",
          // The magic Drive format: https://drive.google.com/uc?export=view&id=FILE_ID
          driveUrl: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=800&auto=format&fit=crop", // Placeholder for Drive URL
          redirectUrl: "/events/codecraft",
          date: "Mar 24, 2026"
        },
        {
          _id: "2",
          title: "Le Fiestus Night",
          driveUrl: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=800&auto=format&fit=crop",
          redirectUrl: "/events/le-fiestus",
          date: "Feb 14, 2026"
        },
        {
          _id: "3",
          title: "Robotics Workshop",
          driveUrl: "https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?q=80&w=800&auto=format&fit=crop",
          redirectUrl: "/events/robotics",
          date: "Jan 10, 2026"
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const handleFileChange = (e) => {
    setUploadData({ ...uploadData, file: e.target.files[0] });
  };

const handleUploadSubmit = async (e) => {
    e.preventDefault();
    if (!uploadData.file) return toast.error("Initialize file payload first.");
    
    setIsUploading(true);
    
    // Construct the payload exactly as multer expects it
    const formData = new FormData();
    formData.append("image", uploadData.file);
    formData.append("title", uploadData.title);
    formData.append("redirectUrl", uploadData.redirectUrl);
    
    try {
      // Assuming you have the JWT token stored in your frontend state/localStorage
      const token = JSON.parse(localStorage.getItem("auth"));
      const config = {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data' // Crucial for file uploads
        }
      };

      const response = await axios.post("http://localhost:3000/api/v1/gallery/upload", formData, config);
      
      toast.success(response.data.msg);
      setIsModalOpen(false);
      setUploadData({ title: '', redirectUrl: '', file: null });
      
      // Optional: You can fetch the updated gallery list here to refresh the UI immediately
      
    } catch (error) {
      toast.error(error?.response?.data?.msg || "Upload failed. Check console.");
      console.error(error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 flex font-sans">
      
      {/* Assuming Sidebar is handled by a parent Layout component, keeping main content full width here for snippet clarity */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto w-full">
        
        {/* HEADER */}
        <header className="flex justify-between items-center mb-10 border-b border-slate-800 pb-6">
          <div>
            <h1 className="text-3xl font-black tracking-tight text-white uppercase italic flex items-center gap-3">
              <FaImage className="text-cyan-500" /> EVENT_GALLERY
            </h1>
            <p className="text-slate-500 font-mono text-sm tracking-widest mt-1">VISUAL_ARCHIVE // JUIT_EVENTS</p>
          </div>
          
          {data.role === 'admin' && (
            <button 
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 px-5 py-2.5 bg-cyan-500/10 border border-cyan-500 text-cyan-400 font-bold uppercase text-xs tracking-widest rounded-lg hover:bg-cyan-500 hover:text-[#020617] transition-all"
            >
              <FaUpload /> Initialize Upload
            </button>
          )}
        </header>

        {/* GALLERY GRID */}
        {loading ? (
          <div className="flex justify-center items-center h-64 text-cyan-500">
            <FaSpinner className="animate-spin text-4xl" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {images.map((img) => (
              <div key={img._id} className="group relative rounded-3xl overflow-hidden bg-[#030712] border border-slate-800 hover:border-cyan-500/50 transition-all aspect-video cursor-pointer">
                {/* Image rendering */}
                <img 
                  src={img.driveUrl} 
                  alt={img.title}
                  className="w-full h-full object-cover group-hover:scale-110 group-hover:opacity-40 transition-all duration-700"
                />
                
                {/* Glassmorphism Hover Overlay for Redirection */}
                <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 p-6 text-center">
                  <h3 className="text-xl font-black text-white uppercase tracking-wider mb-2">{img.title}</h3>
                  <p className="text-cyan-400 font-mono text-xs mb-4">{img.date}</p>
                  
                  {/* Event Redirection Logic */}
                  <button 
                    onClick={() => navigate(img.redirectUrl)}
                    className="flex items-center gap-2 px-6 py-2 bg-linear-to-r from-purple-600 to-cyan-600 text-white font-bold uppercase text-[10px] tracking-widest rounded-full hover:scale-105 transition-transform"
                  >
                    <FaExternalLinkAlt /> Access Event Data
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </main>

      {/* ADMIN UPLOAD MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#020617]/80 backdrop-blur-sm p-4">
          <div className="bg-[#030712] border border-slate-700 w-full max-w-md rounded-2xl p-6 relative shadow-2xl shadow-cyan-900/20">
            
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-slate-500 hover:text-red-400 transition-colors"
            >
              <FaTimes size={20} />
            </button>

            <h2 className="text-2xl font-black text-white italic tracking-tighter mb-6 border-b border-slate-800 pb-4">
              <span className="text-cyan-500">UPLOAD</span>_PAYLOAD
            </h2>

            <form onSubmit={handleUploadSubmit} className="space-y-4 font-mono text-sm">
              <div>
                <label className="block text-slate-500 mb-2 uppercase tracking-widest text-[10px]">Event Title</label>
                <input 
                  type="text" 
                  required
                  value={uploadData.title}
                  onChange={(e) => setUploadData({...uploadData, title: e.target.value})}
                  className="w-full bg-[#020617] border border-slate-800 rounded-lg p-3 text-white focus:outline-hidden focus:border-cyan-500 transition-colors"
                  placeholder="e.g. CodeCraft 2026"
                />
              </div>

              <div>
                <label className="block text-slate-500 mb-2 uppercase tracking-widest text-[10px]">Redirection Route</label>
                <input 
                  type="text" 
                  value={uploadData.redirectUrl}
                  onChange={(e) => setUploadData({...uploadData, redirectUrl: e.target.value})}
                  className="w-full bg-[#020617] border border-slate-800 rounded-lg p-3 text-white focus:outline-hidden focus:border-cyan-500 transition-colors"
                  placeholder="e.g. /events/123 or https://..."
                />
              </div>

              <div>
                <label className="block text-slate-500 mb-2 uppercase tracking-widest text-[10px]">Image File</label>
                <div className="border-2 border-dashed border-slate-700 hover:border-cyan-500 bg-[#020617] rounded-lg p-6 text-center transition-colors relative cursor-pointer group">
                  <input 
                    type="file" 
                    required
                    accept="image/*"
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  <FaImage className="mx-auto text-3xl text-slate-600 group-hover:text-cyan-500 mb-2 transition-colors" />
                  <p className="text-slate-400">
                    {uploadData.file ? uploadData.file.name : "Click or drag payload here"}
                  </p>
                </div>
              </div>

              <button 
                type="submit" 
                disabled={isUploading}
                className="w-full mt-6 bg-cyan-500 text-[#020617] font-black uppercase tracking-widest p-3 rounded-lg hover:bg-cyan-400 disabled:opacity-50 transition-all flex justify-center items-center gap-2"
              >
                {isUploading ? <><FaSpinner className="animate-spin" /> EXECUTING...</> : "TRANSMIT TO DRIVE"}
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default EventGallery;