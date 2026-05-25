"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Sparkles, Mail, ShieldAlert } from "lucide-react";
import { toast } from "sonner";

export default function ModeWrapper({ children }: { children: React.ReactNode }) {
  const [isDevelopment, setIsDevelopment] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Check mode
    const checkMode = async () => {
      try {
        const res = await fetch("/api/mode");
        const data = await res.json();
        setIsDevelopment(data.mode === "development");
      } catch (err) {
        const savedMode = localStorage.getItem("waafa-website-mode");
        setIsDevelopment(savedMode === "development");
      }
    };

    checkMode();

    // Listen to mode updates in other tabs or components
    window.addEventListener("storage", checkMode);
    return () => window.removeEventListener("storage", checkMode);
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    toast.success("Bespoke launch invitation registered!");
  };

  if (!mounted) {
    return <>{children}</>;
  }

  if (isDevelopment) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white flex flex-col justify-between p-8 md:p-12 relative overflow-hidden font-body antialiased selection:bg-[#ED4064] selection:text-white">
        {/* Sleek Glowing Orbs */}
        <div className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-[#ED4064]/5 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-15%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-zinc-800/10 blur-[150px] pointer-events-none" />

        {/* Top Header */}
        <header className="flex justify-between items-center z-10">
          <div className="flex items-center gap-2">
            <Image
              src="/waafa-logo.jpeg"
              alt="WAAFA Logo"
              width={80}
              height={32}
              className="object-contain w-auto h-8 rounded-sm brightness-95 opacity-90"
            />
          </div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/5 border border-white/10 text-[8px] tracking-[0.2em] uppercase text-zinc-400 font-bold font-sans">
            <Sparkles className="h-3 w-3 text-[#ED4064] animate-pulse" /> Atelier in Tailoring
          </span>
        </header>

        {/* Main Content */}
        <main className="max-w-3xl mx-auto text-center space-y-10 py-16 z-10 flex flex-col items-center justify-center my-auto">
          <div className="space-y-4">
            <span className="text-[10px] uppercase tracking-[0.4em] text-[#ED4064] font-bold block">Exclusive Preview</span>
            <h1 className="font-serif text-5xl md:text-7xl text-white italic tracking-tighter leading-[1.05]">
              Threading a <br />
              <span className="font-sans font-extralight not-italic tracking-[0.05em] uppercase text-3xl md:text-5xl block mt-2 text-white/90">new narrative</span>
            </h1>
          </div>
          
          <p className="font-serif italic text-zinc-400 text-lg md:text-xl max-w-xl leading-relaxed">
            &ldquo;Our digital studio is undergoing meticulous tailoring. We are curating our next grand luxury couture edits to redefine modern elegance.&rdquo;
          </p>

          {/* Luxury Subscription Box */}
          <div className="w-full max-w-md pt-4">
            {subscribed ? (
              <div className="p-6 bg-white/5 border border-white/10 rounded-none text-center space-y-2 animate-in fade-in zoom-in duration-500">
                <p className="font-serif italic text-sm text-[#ED4064]">Bespoke Invitation Registered</p>
                <p className="text-[10px] font-sans text-zinc-400 uppercase tracking-widest leading-relaxed">
                  We will notify you the moment the runway doors open.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Enter email for private access"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-grow bg-white/5 border border-white/10 px-5 py-4 text-xs font-sans tracking-wider rounded-none text-white focus:outline-none focus:border-[#ED4064] focus:bg-white/10 transition-all duration-300 placeholder:text-zinc-500"
                />
                <button
                  type="submit"
                  className="bg-white hover:bg-[#ED4064] text-zinc-950 hover:text-white px-8 py-4 font-sans text-xs uppercase tracking-widest font-semibold rounded-none transition-all duration-500 shadow-lg whitespace-nowrap active:scale-[0.98]"
                >
                  Join Private List
                </button>
              </form>
            )}
          </div>
        </main>

        {/* Footer */}
        <footer className="flex flex-col sm:flex-row justify-between items-center gap-4 text-zinc-500 text-[9px] uppercase tracking-[0.25em] z-10 border-t border-white/5 pt-8">
          <p>© 2026 WAAFA Studio. All rights reserved.</p>
          <div className="flex gap-4">
            <span className="text-zinc-600">Kolkata, 700104</span>
          </div>
        </footer>
      </div>
    );
  }

  return <>{children}</>;
}
