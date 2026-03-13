import React, { useEffect, useState } from "react";
import Logo from "../assets/logojuit.png";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [token] = useState(JSON.parse(localStorage.getItem("auth")) || "");
  const navigate = useNavigate();

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const lastname = e.target.lastname.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const confirmPassword = e.target.confirmPassword.value;

    if (password !== confirmPassword) {
      toast.error("Security keys do not match");
      return;
    }

    const formData = {
      username: `${name} ${lastname}`,
      email,
      password,
    };

    try {
      setLoading(true);
      await axios.post("http://localhost:3000/api/v1/register", formData);
      toast.success("Account initialized successfully!");
      navigate("/login");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token !== "") navigate("/dashboard");
  }, [token, navigate]);

  return (
    <div className="min-h-screen flex bg-[#030712] text-slate-200 font-sans">
      
      {/* LEFT SIDE: THE VIBE */}
      <div className="hidden lg:flex w-1/2 relative items-center justify-center bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] border-r border-slate-800/50">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-600/10 rounded-full blur-[120px] animate-pulse"></div>
        
        <div className="relative z-10 text-center max-w-lg px-12">
          <div className="relative group inline-block">
            <div className="absolute -inset-1 bg-linear-to-r from-purple-600 to-cyan-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
            <img 
              src={"https://le-fiestus.jyc.co.in/images/DSC_0140_8_11zon.webp"} 
              alt="fest-vibes" 
              className="relative rounded-2xl shadow-2xl border border-white/5 border-b-purple-500/50 border-b-4" 
            />
          </div>

          <h2 className="text-4xl font-black mt-10 mb-4 tracking-tighter italic">
            JOIN THE <span className="text-purple-500">NETWORK.</span>
          </h2>
          <p className="text-slate-500 font-mono text-sm tracking-widest uppercase">
            Create your unique student identity to participate.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE: REGISTER FORM */}
      <div className="flex w-full lg:w-1/2 items-center justify-center p-6 bg-[#030712]">
        <div className="w-full max-w-md">
          
          <div className="mb-8 lg:text-left text-center">
            <img src={Logo} className="h-14 mb-6 lg:mx-0 mx-auto" />
            <h1 className="text-3xl font-black text-white tracking-tighter italic uppercase">Identity_Setup</h1>
            <p className="text-slate-500 mt-2 text-sm font-medium">Please enter your credentials to register.</p>
          </div>

          <form onSubmit={handleRegisterSubmit} className="space-y-4">
            {/* NAME ROW */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] ml-1">First.Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Keshav"
                  required
                  className="mt-1 w-full px-4 py-3 bg-slate-900/50 border border-slate-800 rounded-xl focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 outline-none transition-all placeholder:text-slate-700"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] ml-1">Last.Name</label>
                <input
                  type="text"
                  name="lastname"
                  placeholder="Chandel"
                  required
                  className="mt-1 w-full px-4 py-3 bg-slate-900/50 border border-slate-800 rounded-xl focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 outline-none transition-all placeholder:text-slate-700"
                />
              </div>
            </div>

            {/* EMAIL */}
            <div>
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] ml-1">Terminal.Mail</label>
              <input
                type="email"
                name="email"
                placeholder="chandelkeshav4@gmail.com"
                required
                className="mt-1 w-full px-4 py-3 bg-slate-900/50 border border-slate-800 rounded-xl focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 outline-none transition-all placeholder:text-slate-700"
              />
            </div>

            {/* PASSWORD */}
            <div>
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] ml-1">Secure.Pass</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="••••••••"
                  required
                  className="mt-1 w-full px-4 py-3 bg-slate-900/50 border border-slate-800 rounded-xl focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 outline-none transition-all placeholder:text-slate-700"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600 hover:text-purple-500 transition-colors"
                >
                  {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                </button>
              </div>
            </div>

            {/* CONFIRM PASSWORD */}
            <div>
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] ml-1">Verify.Pass</label>
              <input
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="••••••••"
                required
                className="mt-1 w-full px-4 py-3 bg-slate-900/50 border border-slate-800 rounded-xl focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 outline-none transition-all placeholder:text-slate-700"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-4 py-4 bg-purple-600 text-white font-black uppercase tracking-[0.2em] rounded-xl hover:bg-purple-500 transition-all shadow-[0_0_20px_rgba(147,51,234,0.3)] active:scale-95"
            >
              {loading ? "Syncing..." : "Create_Account"}
            </button>
          </form>

          <p className="text-center text-sm text-slate-500 mt-8 font-medium">
            Already registered? 
            <Link to="/login" className="text-white font-bold ml-2 hover:text-purple-500 transition-colors underline decoration-purple-500/30 underline-offset-4">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;