"use client";

import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { 
  Save, 
  Settings, 
  Store, 
  ShieldCheck, 
  Truck, 
  Percent, 
  Building, 
  Globe,
  Sliders,
  DollarSign
} from "lucide-react";
import { FaInstagram, FaFacebook } from "react-icons/fa";

interface AtelierConfig {
  shopMode: "active" | "preview" | "maintenance";
  gstRate: number;
  taxIncluded: boolean;
  freeShippingThreshold: number;
  flatShippingCharge: number;
  atelierName: string;
  atelierEmail: string;
  atelierPhone: string;
  atelierAddress: string;
  instagramUrl: string;
  facebookUrl: string;
  vipPlatinumThreshold: number;
  vipGoldThreshold: number;
}

const DEFAULT_CONFIG: AtelierConfig = {
  shopMode: "active",
  gstRate: 12, // 12% standard GST on garments in India
  taxIncluded: true,
  freeShippingThreshold: 5000,
  flatShippingCharge: 350,
  atelierName: "WAAFA Atelier",
  atelierEmail: "studio@waafa.in",
  atelierPhone: "+91 99999 88888",
  atelierAddress: "Kolkata, 700104",
  instagramUrl: "https://instagram.com/Waafaindia",
  facebookUrl: "https://facebook.com/Waafaindia",
  vipPlatinumThreshold: 300000,
  vipGoldThreshold: 150000
};

export default function AdminSettingsPage() {
  const [config, setConfig] = useState<AtelierConfig>(DEFAULT_CONFIG);
  const [loading, setLoading] = useState(true);
  const [saveLoading, setSaveLoading] = useState(false);

  useEffect(() => {
    // Load config from localStorage if exists
    const savedConfig = localStorage.getItem("waafa-atelier-config");
    if (savedConfig) {
      try {
        setConfig(JSON.parse(savedConfig));
      } catch {
        // ignore
      }
    }
    setLoading(false);
  }, []);

  const handleInputChange = (field: keyof AtelierConfig, value: any) => {
    setConfig(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveConfig = (e: React.FormEvent) => {
    e.preventDefault();
    setSaveLoading(true);

    try {
      localStorage.setItem("waafa-atelier-config", JSON.stringify(config));
      // Trigger event for other components if necessary
      window.dispatchEvent(new Event("waafa-config-changed"));
      
      setTimeout(() => {
        toast.success("Atelier configuration updated successfully");
        setSaveLoading(false);
      }, 500);
    } catch {
      toast.error("Failed to persist atelier settings");
      setSaveLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="font-serif italic text-zinc-300 animate-pulse">Loading Atelier specifications...</div>
      </div>
    );
  }

  return (
    <div className="space-y-12 pb-20">
      {/* Header */}
      <header className="flex justify-between items-end border-b border-zinc-100 pb-6">
        <div>
          <h1 className="font-serif text-5xl text-zinc-900 italic tracking-tight">Settings</h1>
          <p className="font-sans text-xs tracking-widest text-zinc-400 uppercase mt-2">
            Configure your digital atelier, checkout parameters, and brand profile
          </p>
        </div>
      </header>

      <form onSubmit={handleSaveConfig} className="space-y-10 max-w-4xl">
        
        {/* Section 1: Shop Mode */}
        <div className="bg-white border border-zinc-100 p-8 shadow-sm space-y-6">
          <h3 className="text-xs font-sans uppercase tracking-[0.2em] text-[#ED4064] font-bold flex items-center gap-2">
            <Store className="h-4 w-4" /> Shop Status & Visibility
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { 
                id: "active", 
                title: "Live & Online", 
                desc: "Full e-commerce enabled. Clients can view, commission, and purchase garments.",
                color: "border-green-100 hover:border-green-200 bg-green-50/5 text-green-700" 
              },
              { 
                id: "preview", 
                title: "Exhibition Mode", 
                desc: "Catalog is viewable, but checkout is disabled. Display digital couture only.",
                color: "border-amber-100 hover:border-amber-200 bg-amber-50/5 text-amber-700" 
              },
              { 
                id: "maintenance", 
                title: "Atelier Closed", 
                desc: "Temporary under maintenance. Catalog and checkout disabled.",
                color: "border-red-100 hover:border-red-200 bg-red-50/5 text-red-700" 
              }
            ].map(mode => {
              const isSelected = config.shopMode === mode.id;
              return (
                <div
                  key={mode.id}
                  onClick={() => handleInputChange("shopMode", mode.id)}
                  className={`p-5 border cursor-pointer transition-all flex flex-col justify-between h-36 ${
                    isSelected 
                      ? "border-zinc-900 bg-zinc-900/5 ring-1 ring-zinc-900" 
                      : "border-zinc-100 hover:border-zinc-300 bg-white"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-sans uppercase tracking-widest font-bold text-zinc-900">
                        {mode.title}
                      </h4>
                      {isSelected && (
                        <span className="w-2 h-2 rounded-full bg-[#ED4064] animate-ping" />
                      )}
                    </div>
                    <p className="text-[10px] text-zinc-400 font-sans leading-relaxed mt-2.5">
                      {mode.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section 2: Pricing, Tax, Shipping */}
        <div className="bg-white border border-zinc-100 p-8 shadow-sm space-y-8">
          <h3 className="text-xs font-sans uppercase tracking-[0.2em] text-[#ED4064] font-bold flex items-center gap-2">
            <Sliders className="h-4 w-4" /> Checkout & Tax Logic
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Taxes */}
            <div className="space-y-6">
              <h4 className="text-[10px] font-sans uppercase tracking-widest text-zinc-400 font-bold flex items-center gap-2">
                <Percent className="h-3.5 w-3.5" /> Taxation Configuration
              </h4>
              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[9px] uppercase tracking-widest text-zinc-400">GST Rate (%)</label>
                  <input
                    type="number"
                    value={config.gstRate}
                    onChange={(e) => handleInputChange("gstRate", parseFloat(e.target.value) || 0)}
                    className="w-full bg-zinc-50 border border-zinc-100 text-xs px-3 py-2.5 outline-none font-sans focus:bg-white focus:border-zinc-300"
                  />
                </div>
                <div className="flex items-center justify-between py-2 border-b border-zinc-50">
                  <div>
                    <span className="text-xs font-sans text-zinc-700 font-medium">Prices Include GST</span>
                    <p className="text-[9px] text-zinc-400 font-sans">Toggle if prices displayed are gross of tax.</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={config.taxIncluded}
                    onChange={(e) => handleInputChange("taxIncluded", e.target.checked)}
                    className="h-4 w-4 rounded border-zinc-300 text-[#ED4064] focus:ring-[#ED4064]"
                  />
                </div>
              </div>
            </div>

            {/* Shipping */}
            <div className="space-y-6">
              <h4 className="text-[10px] font-sans uppercase tracking-widest text-zinc-400 font-bold flex items-center gap-2">
                <Truck className="h-3.5 w-3.5" /> Delivery Logistics
              </h4>
              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[9px] uppercase tracking-widest text-zinc-400">Flat Shipping Charge (₹)</label>
                  <input
                    type="number"
                    value={config.flatShippingCharge}
                    onChange={(e) => handleInputChange("flatShippingCharge", parseFloat(e.target.value) || 0)}
                    className="w-full bg-zinc-50 border border-zinc-100 text-xs px-3 py-2.5 outline-none font-sans focus:bg-white focus:border-zinc-300"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] uppercase tracking-widest text-zinc-400">Free Shipping Threshold (₹)</label>
                  <input
                    type="number"
                    value={config.freeShippingThreshold}
                    onChange={(e) => handleInputChange("freeShippingThreshold", parseFloat(e.target.value) || 0)}
                    className="w-full bg-zinc-50 border border-zinc-100 text-xs px-3 py-2.5 outline-none font-sans focus:bg-white focus:border-zinc-300"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: CRM Loyalty thresholds */}
        <div className="bg-white border border-zinc-100 p-8 shadow-sm space-y-6">
          <h3 className="text-xs font-sans uppercase tracking-[0.2em] text-[#ED4064] font-bold flex items-center gap-2">
            <ShieldCheck className="h-4 w-4" /> VIP Loyalty Circle Thresholds
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-1">
              <label className="text-[9px] uppercase tracking-widest text-zinc-400">Gold Circle Threshold (₹)</label>
              <input
                type="number"
                value={config.vipGoldThreshold}
                onChange={(e) => handleInputChange("vipGoldThreshold", parseFloat(e.target.value) || 0)}
                className="w-full bg-zinc-50 border border-zinc-100 text-xs px-3 py-2.5 outline-none font-sans focus:bg-white focus:border-zinc-300"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[9px] uppercase tracking-widest text-zinc-400">Platinum Patron Threshold (₹)</label>
              <input
                type="number"
                value={config.vipPlatinumThreshold}
                onChange={(e) => handleInputChange("vipPlatinumThreshold", parseFloat(e.target.value) || 0)}
                className="w-full bg-zinc-50 border border-zinc-100 text-xs px-3 py-2.5 outline-none font-sans focus:bg-white focus:border-zinc-300"
              />
            </div>
          </div>
        </div>

        {/* Section 4: Atelier Details */}
        <div className="bg-white border border-zinc-100 p-8 shadow-sm space-y-6">
          <h3 className="text-xs font-sans uppercase tracking-[0.2em] text-[#ED4064] font-bold flex items-center gap-2">
            <Building className="h-4 w-4" /> Brand & Studio Profile
          </h3>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-1">
                <label className="text-[9px] uppercase tracking-widest text-zinc-400">Atelier Name</label>
                <input
                  type="text"
                  value={config.atelierName}
                  onChange={(e) => handleInputChange("atelierName", e.target.value)}
                  className="w-full bg-zinc-50 border border-zinc-100 text-xs px-3 py-2.5 outline-none font-sans focus:bg-white focus:border-zinc-300"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[9px] uppercase tracking-widest text-zinc-400">Support Email</label>
                <input
                  type="email"
                  value={config.atelierEmail}
                  onChange={(e) => handleInputChange("atelierEmail", e.target.value)}
                  className="w-full bg-zinc-50 border border-zinc-100 text-xs px-3 py-2.5 outline-none font-sans focus:bg-white focus:border-zinc-300"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[9px] uppercase tracking-widest text-zinc-400">Support Phone</label>
                <input
                  type="text"
                  value={config.atelierPhone}
                  onChange={(e) => handleInputChange("atelierPhone", e.target.value)}
                  className="w-full bg-zinc-50 border border-zinc-100 text-xs px-3 py-2.5 outline-none font-sans focus:bg-white focus:border-zinc-300"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[9px] uppercase tracking-widest text-zinc-400">Physical Studio / Atelier Address</label>
              <textarea
                value={config.atelierAddress}
                onChange={(e) => handleInputChange("atelierAddress", e.target.value)}
                className="w-full bg-zinc-50 border border-zinc-100 text-xs px-3 py-3 outline-none font-sans min-h-[80px] focus:bg-white focus:border-zinc-300"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-zinc-50">
              <div className="space-y-1">
                <label className="text-[9px] uppercase tracking-widest text-zinc-400 flex items-center gap-1.5">
                  <FaInstagram className="h-3 w-3" /> Instagram Profile Link
                </label>
                <input
                  type="text"
                  value={config.instagramUrl}
                  onChange={(e) => handleInputChange("instagramUrl", e.target.value)}
                  className="w-full bg-zinc-50 border border-zinc-100 text-xs px-3 py-2.5 outline-none font-sans focus:bg-white focus:border-zinc-300"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[9px] uppercase tracking-widest text-zinc-400 flex items-center gap-1.5">
                  <FaFacebook className="h-3 w-3" /> Facebook Profile Link
                </label>
                <input
                  type="text"
                  value={config.facebookUrl}
                  onChange={(e) => handleInputChange("facebookUrl", e.target.value)}
                  className="w-full bg-zinc-50 border border-zinc-100 text-xs px-3 py-2.5 outline-none font-sans focus:bg-white focus:border-zinc-300"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={saveLoading}
            className="bg-zinc-900 text-white px-16 py-4.5 font-sans text-[11px] font-semibold tracking-[0.3em] uppercase hover:bg-zinc-800 transition-all disabled:opacity-50 flex items-center gap-2"
          >
            <Save className="h-4 w-4" /> {saveLoading ? "Saving..." : "Save Settings"}
          </button>
        </div>

      </form>
    </div>
  );
}
