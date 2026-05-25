"use client";

import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { Shield, Radio, Flame, Sparkles, Server } from "lucide-react";

export default function AdminModePage() {
  const [mode, setMode] = useState<"live" | "development">("live");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    async function fetchMode() {
      try {
        const res = await fetch("/api/mode");
        const data = await res.json();
        setMode(data.mode);
      } catch (err) {
        const savedMode = localStorage.getItem("waafa-website-mode");
        setMode(savedMode === "development" ? "development" : "live");
      }
    }
    fetchMode();
  }, []);

  const handleModeChange = async (newMode: "live" | "development") => {
    setMode(newMode);
    localStorage.setItem("waafa-website-mode", newMode);
    window.dispatchEvent(new Event("storage"));
    
    try {
      await fetch("/api/mode", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode: newMode })
      });
    } catch (err) {
      console.error("Failed to save mode in database:", err);
    }
    
    if (newMode === "development") {
      toast.warning("Website is now globally set to Under Development Mode.");
    } else {
      toast.success("Website is now LIVE and public globally!");
    }
  };

  if (!mounted) {
    return (
      <div className="flex items-center justify-center min-h-[400px] text-zinc-300 font-serif italic">
        Syncing atelier parameters...
      </div>
    );
  }

  return (
    <div className="space-y-12 pb-20 max-w-4xl">
      {/* Header Section */}
      <header>
        <h1 className="font-serif text-5xl text-zinc-900 italic tracking-tight">Website Mode</h1>
        <p className="font-sans text-xs tracking-widest text-zinc-400 uppercase mt-2">
          Toggle public accessibility & salon visibility status
        </p>
      </header>

      {/* Main Status Canvas */}
      <div className="bg-white border border-zinc-100 p-8 shadow-sm flex flex-col md:flex-row items-center justify-between gap-8 hover:border-[#ED4064]/10 transition-all duration-500">
        <div className="space-y-3 max-w-md">
          <div className="flex items-center gap-3">
            <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-zinc-400 font-bold">Atelier Status:</span>
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-[9px] uppercase tracking-widest font-semibold border ${
              mode === "live"
                ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                : "bg-amber-50 text-amber-700 border-amber-100"
            }`}>
              <span className={`w-1.5 h-1.5 rounded-full ${mode === "live" ? "bg-emerald-500 animate-pulse" : "bg-amber-500 animate-bounce"}`} />
              {mode === "live" ? "Live & Public" : "Development / Under Construction"}
            </span>
          </div>
          <h2 className="font-serif text-2xl text-zinc-900 italic leading-snug">
            {mode === "live" 
              ? "Your digital salon is open, showcasing all live collections and accepting couture orders." 
              : "Atelier is currently closed for maintenance or new seasonal design preparation."}
          </h2>
          <p className="text-xs text-zinc-400 font-sans leading-relaxed">
            Switching modes updates the public storefront immediately, redirecting clients to a premium, under-construction canvas if set to development mode.
          </p>
        </div>

        {/* Dynamic Dual-Toggle Control */}
        <div className="flex bg-zinc-50 border border-zinc-100 p-1.5 rounded-none w-full md:w-auto">
          <button
            onClick={() => handleModeChange("live")}
            className={`flex-1 md:flex-initial px-8 py-3.5 font-sans text-xs tracking-widest uppercase font-semibold transition-all duration-300 ${
              mode === "live"
                ? "bg-zinc-900 text-white shadow-md"
                : "text-zinc-400 hover:text-zinc-700"
            }`}
          >
            Live Mode
          </button>
          <button
            onClick={() => handleModeChange("development")}
            className={`flex-1 md:flex-initial px-8 py-3.5 font-sans text-xs tracking-widest uppercase font-semibold transition-all duration-300 ${
              mode === "development"
                ? "bg-zinc-900 text-white shadow-md"
                : "text-zinc-400 hover:text-zinc-700"
            }`}
          >
            Maintenance
          </button>
        </div>
      </div>

      {/* Detail Specs & Informational Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Live Card details */}
        <div className={`p-8 border shadow-sm transition-all duration-500 flex flex-col justify-between ${
          mode === "live" ? "bg-emerald-50/10 border-emerald-100/50" : "bg-white border-zinc-100"
        }`}>
          <div className="space-y-4">
            <div className="flex justify-between items-center text-zinc-400">
              <span className="font-sans text-[9px] uppercase tracking-[0.2em]">Live Mode Features</span>
              <Radio className={`h-4.5 w-4.5 ${mode === "live" ? "text-emerald-500" : ""}`} />
            </div>
            <h3 className="font-serif text-lg text-zinc-800 italic">Fully Public Storefront</h3>
            <ul className="space-y-3.5 text-xs text-zinc-500 font-sans leading-relaxed pt-2">
              <li className="flex items-start gap-2.5">
                <span className="text-emerald-500 font-bold">✓</span>
                All digital apparel grids and categories completely unlocked.
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-emerald-500 font-bold">✓</span>
                Checkout flow fully functional, allowing live order placement.
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-emerald-500 font-bold">✓</span>
                Automatic user profile matching and analytics tracking enabled.
              </li>
            </ul>
          </div>
          {mode !== "live" && (
            <button
              onClick={() => handleModeChange("live")}
              className="mt-8 w-full border border-zinc-200 hover:border-zinc-900 py-3 text-[10px] font-sans tracking-widest font-semibold uppercase text-zinc-600 hover:text-zinc-900 transition-colors"
            >
              Go Live Now
            </button>
          )}
        </div>

        {/* Development Mode details */}
        <div className={`p-8 border shadow-sm transition-all duration-500 flex flex-col justify-between ${
          mode === "development" ? "bg-amber-50/10 border-amber-100/50" : "bg-white border-zinc-100"
        }`}>
          <div className="space-y-4">
            <div className="flex justify-between items-center text-zinc-400">
              <span className="font-sans text-[9px] uppercase tracking-[0.2em]">Maintenance Mode Features</span>
              <Server className={`h-4.5 w-4.5 ${mode === "development" ? "text-amber-500 animate-pulse" : ""}`} />
            </div>
            <h3 className="font-serif text-lg text-zinc-800 italic">Atelier in Tailoring</h3>
            <ul className="space-y-3.5 text-xs text-zinc-500 font-sans leading-relaxed pt-2">
              <li className="flex items-start gap-2.5">
                <span className="text-amber-500 font-bold">⚠</span>
                Store pages hidden behind a premium "Launching Soon" screen.
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-amber-500 font-bold">⚠</span>
                Checkout pipeline fully locked, preventing accidental orders.
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-amber-500 font-bold">⚠</span>
                Admin dashboard remains fully active for backend catalog prep.
              </li>
            </ul>
          </div>
          {mode !== "development" && (
            <button
              onClick={() => handleModeChange("development")}
              className="mt-8 w-full border border-zinc-200 hover:border-zinc-900 py-3 text-[10px] font-sans tracking-widest font-semibold uppercase text-zinc-600 hover:text-zinc-900 transition-colors"
            >
              Enter Maintenance Mode
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
