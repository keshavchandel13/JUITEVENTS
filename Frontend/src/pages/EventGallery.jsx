import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios'; // Added axios import
import { FaImage, FaUpload, FaTimes, FaExternalLinkAlt, FaSpinner, FaLink } from 'react-icons/fa';

const EventGallery = () => {
  // Simulating auth state - checking if user is an admin to show upload controls
  const [data] = useState({ msg: "Admin_User", role: "admin" }); 
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Upload form state - Changed 'file' to 'imageUrl'
  const [uploadData, setUploadData] = useState({ title: '', redirectUrl: '', imageUrl: '' });
  const [isUploading, setIsUploading] = useState(false);

  const navigate = useNavigate();

  // Function to fetch images from your database
  const fetchImages = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/v1/gallery");
      // Assuming your backend sends { images: [...] }
      console.log(response)
      setImages(response.data.images || []); 
    } catch (error) {
      toast.error("Failed to retrieve visual data.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch on component mount
  useEffect(() => {
    fetchImages();
  }, []);

  const handleUploadSubmit = async (e) => {
    e.preventDefault();
    if (!uploadData.imageUrl) return toast.error("Initialize URL payload first.");
    
    setIsUploading(true);
    
    try {
      // Get the JWT token 
      const token = JSON.parse(localStorage.getItem("auth"));
      const config = {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json' // Standard JSON now
        }
      };

      // Send the text payload to the backend
      const response = await axios.post("http://localhost:3000/api/v1/gallery/add", uploadData, config);
      
      toast.success(response.data.msg || "Image URL linked successfully.");
      setIsModalOpen(false);
      setUploadData({ title: '', redirectUrl: '', imageUrl: '' });
      
      // Refresh the gallery grid instantly
      fetchImages();
      
    } catch (error) {
      toast.error(error?.response?.data?.msg || "Transmission failed. Check console.");
      console.error(error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 flex font-sans">
      
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
        ) : images.length === 0 ? (
           <div className="flex flex-col justify-center items-center h-64 text-slate-500 border-2 border-dashed border-slate-800 rounded-3xl">
             <FaImage className="text-4xl mb-4 opacity-50" />
             <p className="font-mono tracking-widest text-sm uppercase">No Visual Data Found</p>
           </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {images.map((img) => (
              <div key={img._id} className="group relative rounded-3xl overflow-hidden bg-[#030712] border border-slate-800 hover:border-cyan-500/50 transition-all aspect-video cursor-pointer">
                
                {/* Image rendering using the raw URL from the database */}
                <img 
                  src={img.imageUrl} 
                  alt={img.title}
                  className="w-full h-full object-cover group-hover:scale-110 group-hover:opacity-40 transition-all duration-700"
                  onError={(e) => { e.target.src = "https://via.placeholder.com/800x450/020617/06b6d4?text=IMAGE_BROKEN" }} // Fallback if URL is bad
                />
                
                {/* Glassmorphism Hover Overlay for Redirection */}
                <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 p-6 text-center">
                  <h3 className="text-xl font-black text-white uppercase tracking-wider mb-2">{img.title}</h3>
                  {/* Format the date dynamically if your DB saves timestamps */}
                  <p className="text-cyan-400 font-mono text-xs mb-4">
                    {img.uploadedAt ? new Date(img.uploadedAt).toLocaleDateString() : 'Active'}
                  </p>
                  
                  {/* Event Redirection Logic */}
                  {img.redirectUrl && (
                    <button 
                      onClick={() => navigate(img.redirectUrl)}
                      className="flex items-center gap-2 px-6 py-2 bg-linear-to-r from-purple-600 to-cyan-600 text-white font-bold uppercase text-[10px] tracking-widest rounded-full hover:scale-105 transition-transform"
                    >
                      <FaExternalLinkAlt /> Access Event Data
                    </button>
                  )}
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
              <span className="text-cyan-500">LINK</span>_PAYLOAD
            </h2>

            <form onSubmit={handleUploadSubmit} className="space-y-4 font-mono text-sm">
              <div>
                <label className="block text-slate-500 mb-2 uppercase tracking-widest text-[10px]">Event Title</label>
                <input 
                  type="text" 
                  required
                  value={uploadData.title}
                  onChange={(e) => setUploadData({...uploadData, title: e.target.value})}
                  className="w-full bg-[#020617] border border-slate-800 rounded-lg p-3 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                  placeholder="e.g. CodeCraft 2026"
                />
              </div>

              <div>
                <label className="block text-slate-500 mb-2 uppercase tracking-widest text-[10px]">Image Web URL</label>
                <div className="relative">
                  <FaLink className="absolute left-3 top-3.5 text-slate-500" />
                  <input 
                    type="url" 
                    required
                    value={uploadData.imageUrl}
                    onChange={(e) => setUploadData({...uploadData, imageUrl: e.target.value})}
                    className="w-full bg-[#020617] border border-slate-800 rounded-lg p-3 pl-10 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                    placeholder="https://images.unsplash.com/..."
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-500 mb-2 uppercase tracking-widest text-[10px]">Redirection Route (Optional)</label>
                <input 
                  type="text" 
                  value={uploadData.redirectUrl}
                  onChange={(e) => setUploadData({...uploadData, redirectUrl: e.target.value})}
                  className="w-full bg-[#020617] border border-slate-800 rounded-lg p-3 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                  placeholder="e.g. /events/123"
                />
              </div>

              <button 
                type="submit" 
                disabled={isUploading}
                className="w-full mt-6 bg-cyan-500 text-[#020617] font-black uppercase tracking-widest p-3 rounded-lg hover:bg-cyan-400 disabled:opacity-50 transition-all flex justify-center items-center gap-2"
              >
                {isUploading ? <><FaSpinner className="animate-spin" /> EXECUTING...</> : "DEPLOY URL PAYLOAD"}
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default EventGallery;