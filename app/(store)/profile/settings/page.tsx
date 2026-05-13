"use client";

import React from "react";

export default function SettingsPage() {
  return (
    <div className="space-y-12">
      <div className="border-b border-zinc-100 pb-8">
        <h1 className="font-serif text-4xl text-zinc-900 italic tracking-tight">Account Settings</h1>
        <p className="text-[10px] font-sans uppercase tracking-[0.3em] text-zinc-400 mt-2">Manage your personal details and preferences</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Personal Information */}
        <section className="space-y-6">
          <h3 className="text-[11px] font-sans uppercase tracking-[0.2em] text-zinc-900 font-bold">Personal Information</h3>
          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-[9px] uppercase tracking-widest text-zinc-400">Full Name</label>
              <input type="text" defaultValue="Aria Montgomery" className="w-full bg-zinc-50 border border-zinc-100 px-4 py-3 text-sm outline-none focus:border-zinc-300 transition-all" />
            </div>
            <div className="space-y-1">
              <label className="text-[9px] uppercase tracking-widest text-zinc-400">Email Address</label>
              <input type="email" defaultValue="aria@example.com" className="w-full bg-zinc-50 border border-zinc-100 px-4 py-3 text-sm outline-none focus:border-zinc-300 transition-all" />
            </div>
          </div>
        </section>

        {/* Security */}
        <section className="space-y-6">
          <h3 className="text-[11px] font-sans uppercase tracking-[0.2em] text-zinc-900 font-bold">Security</h3>
          <div className="space-y-4">
            <button className="w-full py-4 border border-zinc-200 text-[10px] font-sans uppercase tracking-widest hover:bg-zinc-50 transition-all">
              Change Password
            </button>
            <button className="w-full py-4 border border-zinc-200 text-[10px] font-sans uppercase tracking-widest hover:bg-zinc-50 transition-all text-red-500">
              Deactivate Account
            </button>
          </div>
        </section>
      </div>
      
      <div className="pt-12 border-t border-zinc-50">
        <button className="bg-[#ED4064] text-white px-10 py-4 font-sans text-[11px] font-semibold tracking-[0.2em] uppercase hover:bg-[#D63056] transition-all">
          Save Changes
        </button>
      </div>
    </div>
  );
}
