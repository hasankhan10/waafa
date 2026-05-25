import React from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function ContactPage() {
  return (
    <div className="max-w-[1440px] mx-auto px-[5vw] pt-24 pb-32">
      <div className="max-w-2xl mx-auto text-center mb-20">
        <h1 className="font-serif italic text-5xl text-zinc-950 tracking-tight mb-4">Contact The Atelier</h1>
        <p className="font-body-lg text-secondary text-sm">
          For private appointments, bespoke styling consultations, or assistance with your couture order, our concierge is at your service.
        </p>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-16">
        {/* Left Column: Contact details */}
        <div className="md:col-span-5 space-y-12">
          <div className="space-y-4">
            <h2 className="font-sans text-[10px] tracking-[0.25em] text-[#ED4064] uppercase font-bold">The Atelier</h2>
            <p className="font-serif italic text-3xl text-zinc-900 leading-tight">WAAFA Studio</p>
            <p className="font-sans text-sm text-zinc-500 leading-relaxed uppercase tracking-wider">
              Kolkata, 700104
            </p>
          </div>

          <div className="space-y-4 border-t border-zinc-100 pt-8">
            <h3 className="font-sans text-[10px] tracking-[0.25em] text-zinc-400 uppercase font-semibold">Concierge & Bespoke</h3>
            <p className="font-sans text-sm text-zinc-600">
              Email: <a href="mailto:studio@waafa.in" className="hover:text-[#ED4064] transition-colors font-medium">studio@waafa.in</a>
            </p>
            <p className="font-sans text-sm text-zinc-600">
              Phone: <span className="font-medium">+91 99999 88888</span>
            </p>
          </div>

          <div className="space-y-4 border-t border-zinc-100 pt-8">
            <h3 className="font-sans text-[10px] tracking-[0.25em] text-zinc-400 uppercase font-semibold">Studio Hours</h3>
            <p className="font-sans text-xs text-zinc-500 leading-relaxed uppercase tracking-wider">
              Monday &ndash; Saturday<br />
              11:00 AM &ndash; 7:00 PM IST
            </p>
          </div>
        </div>

        {/* Right Column: Message Form */}
        <div className="md:col-span-7 bg-white p-8 md:p-12 border border-zinc-100 shadow-sm">
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="font-label-caps text-[9px] uppercase tracking-widest text-zinc-400 font-semibold">FIRST NAME</label>
                <Input placeholder="Enter your first name" className="rounded-none border-zinc-200" />
              </div>
              <div className="space-y-2">
                <label className="font-label-caps text-[9px] uppercase tracking-widest text-zinc-400 font-semibold">LAST NAME</label>
                <Input placeholder="Enter your last name" className="rounded-none border-zinc-200" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="font-label-caps text-[9px] uppercase tracking-widest text-zinc-400 font-semibold">EMAIL ADDRESS</label>
              <Input type="email" placeholder="Enter your email" className="rounded-none border-zinc-200" />
            </div>
            <div className="space-y-2">
              <label className="font-label-caps text-[9px] uppercase tracking-widest text-zinc-400 font-semibold">MESSAGE</label>
              <textarea 
                rows={5} 
                className="w-full bg-transparent border border-zinc-200 focus:border-[#ED4064] text-sm text-zinc-800 p-4 focus:outline-none transition-colors resize-none rounded-none"
                placeholder="How may we assist you?"
              ></textarea>
            </div>
            <div className="pt-4">
              <Button className="w-full bg-zinc-950 text-white rounded-none py-6 uppercase font-sans text-xs tracking-[0.2em] hover:bg-[#ED4064] transition-colors duration-300">SEND MESSAGE</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
