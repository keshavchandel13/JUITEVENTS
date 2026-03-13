import React, { useEffect, useState } from "react";
import Image from "../assets/image.png"; 
import Logo from "../assets/logojuit.png";
import GoogleSvg from "../assets/icons8-google.svg";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [token] = useState(JSON.parse(localStorage.getItem("auth")) || "");
  const navigate = useNavigate();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    if (!email || !password) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post("http://localhost:3000/api/v1/login", { email, password });
      localStorage.setItem("auth", JSON.stringify(response.data.token));
      toast.success("Welcome to the Grid!");
      navigate("/dashboard");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token !== "") navigate("/dashboard");
  }, [token, navigate]);

  return (
<div className="min-h-screen flex bg-[#030712] text-slate-200 selection:bg-cyan-500/30 font-sans overflow-x-hidden">
      
      {/* LEFT SIDE: THE VIBE (Hidden on mobile) */}
      <div className="hidden lg:flex w-7/12 relative items-center justify-center bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]">
        {/* Animated Glow Backgrounds */}
        <div className="absolute top-2 left-1/4 w-64 h-64 bg-cyan-600/20 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-600/20 rounded-full blur-[120px] animate-pulse delay-700"></div>

        <div className="relative z-10 text-center max-w-xl px-12">
          <div className="relative inline-block group">
            <div className="absolute -inset-1 bg-linear-to-r from-cyan-500 to-purple-600 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-1000"></div>
            <img src={"https://le-fiestus.jyc.co.in/images/DSC_0140_8_11zon.webp"} alt="fest-vibes" className="relative rounded-2xl shadow-2xl border border-white/10 h-64 " />
          </div>

          <h2 className="text-5xl font-black mt-4 mb-6 bg-clip-text text-transparent bg-linear-to-r from-white via-slate-200 to-slate-500 tracking-tight">
            Jaypee University <br /> <span className="text-cyan-400">.</span>
          </h2>

          <div className="flex justify-center gap-6 mt-10">
            <div className="text-center">
              <p className="text-2xl font-bold text-white">20+</p>
              <p className="text-xs text-slate-500 uppercase tracking-widest">Events</p>
            </div>
            <div className="w-px h-10 bg-slate-800"></div>
            <div className="text-center">
              <p className="text-2xl font-bold text-white">5k+</p>
              <p className="text-xs text-slate-500 uppercase tracking-widest">Students</p>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE: LOGIN FORM */}
      <div className="flex w-full lg:w-5/12 items-center justify-center p-6 lg:bg-[#030712]">
        <div className="w-full max-w-md">
          
          <div className="mb-10 lg:text-left text-center">
            <img src={Logo} className="h-16 mb-8 lg:mx-0 mx-auto drop-shadow-[0_0_8px_rgba(34,211,238,0.4)]" />
            <h1 className="text-4xl font-extrabold text-white tracking-tighter italic">GATEWAY_LOGIN</h1>
            <p className="text-slate-500 mt-2 font-mono text-sm uppercase tracking-widest">Accessing JUIT Secured Portal...</p>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-5">
            <div>
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Terminal.Identity</label>
              <input
                type="email"
                name="email"
                placeholder="astar69@gmail.com"
                className="mt-2 w-full px-5 py-4 bg-slate-900/50 border border-slate-800 rounded-xl focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 outline-none transition-all placeholder:text-slate-700"
              />
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Secure.Key</label>
                <span className="text-xs text-cyan-500 font-bold hover:text-cyan-400 cursor-pointer transition-colors uppercase">Lost Credentials?</span>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="••••••••"
                  className="w-full px-5 py-4 bg-slate-900/50 border border-slate-800 rounded-xl focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 outline-none transition-all placeholder:text-slate-700"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-600 hover:text-cyan-500 transition-colors"
                >
                  {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-cyan-600 text-black font-black uppercase tracking-[0.2em] rounded-xl hover:bg-cyan-400 transition-all shadow-[0_0_20px_rgba(8,145,178,0.3)] active:scale-95"
            >
              {loading ? "Decrypting..." : "Initialize Session"}
            </button>

          </form>

          <p className="text-center text-sm text-slate-500 mt-10 font-medium">
            New to the portal? 
            <Link to="/register" className="text-white font-bold ml-2 hover:text-cyan-400 transition-colors underline decoration-cyan-500/30 underline-offset-4">
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;