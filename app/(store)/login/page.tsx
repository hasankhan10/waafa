"use client";

import React, { useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [showPassword, setShowPassword] = useState(false);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (mode === "login") {
        const { error: authError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (authError) throw authError;

        toast.success("Authentication successful");
        
        // Use window.location to force a full refresh and redirect
        // This is the most robust way to ensure session is recognized
        window.location.href = "/admin"; 
      } else {
        const { error: authError } = await supabase.auth.signUp({
          email,
          password,
        });

        if (authError) throw authError;

        toast.success("Account created successfully");
        window.location.href = "/profile";
      }
    } catch (err: any) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-[5vw] bg-[#FDFDFD]">
      <div className="max-w-md w-full bg-white border border-zinc-200 p-12 rounded-none shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
        <div className="text-center mb-10">
          <h1 className="font-serif text-3xl text-zinc-900 mb-2">
            {mode === "login" ? "Sign In" : "Sign Up"}
          </h1>
          <p className="text-[10px] text-zinc-400 font-sans uppercase tracking-[0.2em]">
            {mode === "login" ? "Welcome back to WAAFA" : "Create your WAAFA account"}
          </p>
        </div>

        <form onSubmit={handleAuth} className="space-y-8">
          {error && (
            <div className="p-3 bg-red-50 text-red-600 text-[11px] border border-red-100 font-sans tracking-wide">
              {error}
            </div>
          )}
          
          <div className="space-y-6">
            <div className="space-y-1.5">
              <label className="text-[10px] font-sans uppercase tracking-widest text-zinc-400">Email Address</label>
              <input
                type="email"
                placeholder="name@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#F9F9F9] border border-zinc-100 px-4 py-3.5 text-zinc-900 font-sans text-sm focus:border-zinc-300 focus:bg-white transition-all outline-none"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-sans uppercase tracking-widest text-zinc-400">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#F9F9F9] border border-zinc-100 px-4 py-3.5 text-zinc-900 font-sans text-sm focus:border-zinc-300 focus:bg-white transition-all outline-none pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 transition-colors"
                >
                  <span className="material-symbols-outlined text-[20px]">
                    {showPassword ? "visibility_off" : "visibility"}
                  </span>
                </button>
              </div>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-[#ED4064] text-white font-sans text-[11px] font-semibold tracking-[0.2em] py-5 uppercase hover:bg-[#D63056] active:scale-[0.99] transition-all disabled:opacity-50"
          >
            {loading ? "Authenticating..." : mode === "login" ? "Sign In" : "Sign Up"}
          </button>
        </form>

        <div className="text-center mt-10 space-y-6">
          <button
            onClick={() => setMode(mode === "login" ? "signup" : "login")}
            className="text-[10px] text-zinc-400 hover:text-zinc-600 font-sans uppercase tracking-widest underline underline-offset-8 decoration-zinc-100 hover:decoration-zinc-300 transition-all"
          >
            {mode === "login" ? "Need an account? Register" : "Already registered? Sign in"}
          </button>
          
          <div className="pt-4 border-t border-zinc-50">
            <Link href="/" className="text-[9px] uppercase tracking-[0.3em] text-zinc-300 hover:text-[#ED4064] transition-colors">
              Return to Gallery
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
