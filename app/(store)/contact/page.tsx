import React from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function ContactPage() {
  return (
    <div className="max-w-[1440px] mx-auto px-[5vw] pt-24 pb-32">
      <div className="max-w-2xl mx-auto text-center mb-16">
        <h1 className="font-headline-lg text-headline-lg text-on-surface mb-4">Contact The Atelier</h1>
        <p className="font-body-lg text-body-lg text-secondary">
          For private appointments, bespoke inquiries, or assistance with your order, our concierge is at your service.
        </p>
      </div>

      <div className="max-w-3xl mx-auto bg-surface-container-low p-8 md:p-12 border border-surface-variant/50">
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="font-label-caps text-xs text-on-surface-variant tracking-wider">FIRST NAME</label>
              <Input placeholder="Enter your first name" />
            </div>
            <div className="space-y-2">
              <label className="font-label-caps text-xs text-on-surface-variant tracking-wider">LAST NAME</label>
              <Input placeholder="Enter your last name" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="font-label-caps text-xs text-on-surface-variant tracking-wider">EMAIL ADDRESS</label>
            <Input type="email" placeholder="Enter your email" />
          </div>
          <div className="space-y-2">
            <label className="font-label-caps text-xs text-on-surface-variant tracking-wider">MESSAGE</label>
            <textarea 
              rows={5} 
              className="w-full bg-transparent border-b border-outline/30 focus:border-primary text-on-surface py-2 focus:outline-none transition-colors resize-none"
              placeholder="How may we assist you?"
            ></textarea>
          </div>
          <div className="pt-4">
            <Button className="w-full bg-[#ED4064] hover:bg-[#D63056] text-white rounded-none py-6 uppercase font-sans text-xs tracking-[0.2em]">SEND MESSAGE</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
