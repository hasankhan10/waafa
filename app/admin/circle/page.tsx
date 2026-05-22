"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { 
  Search, 
  Crown, 
  Sparkles, 
  User, 
  Ruler, 
  Phone, 
  Mail, 
  MapPin, 
  ShoppingBag, 
  DollarSign, 
  Save, 
  Edit3,
  TrendingUp,
  Award
} from "lucide-react";

interface ClientMeasurements {
  bust?: string;
  waist?: string;
  hips?: string;
  shoulder?: string;
  sleeve_length?: string;
  full_length?: string;
  neck?: string;
  notes?: string;
}

interface Client {
  id: string;
  full_name: string;
  address?: string;
  email?: string;
  phone?: string;
  totalSpent: number;
  orderCount: number;
  tier: "Platinum Patron" | "Gold Circle" | "Silver Atelier" | "Member";
  measurements?: ClientMeasurements;
}

const DEFAULT_MEASUREMENTS: ClientMeasurements = {
  bust: "34",
  waist: "28",
  hips: "38",
  shoulder: "14",
  sleeve_length: "22",
  full_length: "55",
  neck: "13.5",
  notes: "Prefers soft lining and 2-inch margins for future alterations."
};

const MOCK_CLIENTS: Client[] = [
  {
    id: "client-mock-1",
    full_name: "Maharani Gayatri Sen",
    address: "Signature Penthouse, Jubilee Hills, Hyderabad - 500033",
    email: "gayatri.sen@example.com",
    phone: "+91 98888 77777",
    totalSpent: 450000,
    orderCount: 8,
    tier: "Platinum Patron",
    measurements: {
      bust: "36",
      waist: "30",
      hips: "40",
      shoulder: "14.5",
      sleeve_length: "23",
      full_length: "58",
      neck: "14",
      notes: "Bespoke bridal order. Double lining on embroidery required."
    }
  },
  {
    id: "client-mock-2",
    full_name: "Kavita Krishnamurthy",
    address: "B-12, Gulmohar Park, New Delhi - 110049",
    email: "kavita.k@example.com",
    phone: "+91 99999 88888",
    totalSpent: 210000,
    orderCount: 4,
    tier: "Gold Circle",
    measurements: {
      bust: "38",
      waist: "32",
      hips: "42",
      shoulder: "15",
      sleeve_length: "22.5",
      full_length: "56",
      neck: "14.5",
      notes: "Prefers silk blends. Enjoys royal navy and deep maroon shades."
    }
  },
  {
    id: "client-mock-3",
    full_name: "Aishwarya Reddy",
    address: "Apt 15, Sea Breeze Apartments, Bandra West, Mumbai - 400050",
    email: "aishwarya.r@example.com",
    phone: "+91 98111 22233",
    totalSpent: 135000,
    orderCount: 3,
    tier: "Silver Atelier",
    measurements: {
      bust: "34",
      waist: "28",
      hips: "38",
      shoulder: "14",
      sleeve_length: "21",
      full_length: "54",
      neck: "13.5",
      notes: "Needs extra margin at shoulders. Prefers pastel tints."
    }
  },
  {
    id: "client-mock-4",
    full_name: "Priya Sharma",
    address: "Flat 402, Signature Towers, Jubilee Hills, Hyderabad - 500033",
    email: "priya.sharma@example.com",
    phone: "+91 98765 43210",
    totalSpent: 45000,
    orderCount: 1,
    tier: "Member",
    measurements: DEFAULT_MEASUREMENTS
  }
];

export default function AdminCirclePage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [isEditingMeasurements, setIsEditingMeasurements] = useState(false);
  const [isSandboxMode, setIsSandboxMode] = useState(false);

  // Edit measurement fields state
  const [editBust, setEditBust] = useState("");
  const [editWaist, setEditWaist] = useState("");
  const [editHips, setEditHips] = useState("");
  const [editShoulder, setEditShoulder] = useState("");
  const [editSleeveLength, setEditSleeveLength] = useState("");
  const [editFullLength, setEditFullLength] = useState("");
  const [editNeck, setEditNeck] = useState("");
  const [editNotes, setEditNotes] = useState("");
  const [saveLoading, setSaveLoading] = useState(false);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    setLoading(true);
    try {
      // 1. Fetch profiles
      const { data: profilesData, error: profilesError } = await supabase
        .from("profiles")
        .select("*");

      if (profilesError) throw profilesError;

      // 2. Fetch orders to calculate totals
      const { data: ordersData } = await supabase
        .from("orders")
        .select("customer_id, total_amount, email, phone");

      if (profilesData && profilesData.length > 0) {
        // Map spending and order statistics
        const mappedClients = profilesData.map((profile: any) => {
          const clientOrders = ordersData 
            ? ordersData.filter((o: any) => o.customer_id === profile.id) 
            : [];
          const totalSpent = clientOrders.reduce((sum: number, o: any) => sum + (o.total_amount || 0), 0);
          const orderCount = clientOrders.length;
          
          // Determine Tier
          let tier: Client["tier"] = "Member";
          if (totalSpent >= 300000) tier = "Platinum Patron";
          else if (totalSpent >= 150000) tier = "Gold Circle";
          else if (totalSpent >= 75000) tier = "Silver Atelier";

          // Pull contact details from orders if missing on profile
          const contactEmail = profile.email || clientOrders[0]?.email || "no-email@waafa.in";
          const contactPhone = profile.phone || clientOrders[0]?.phone || "N/A";

          // Try to decode measurements if stored in the profile (fallback to default)
          let measurements = DEFAULT_MEASUREMENTS;
          if (profile.measurements) {
            try {
              measurements = typeof profile.measurements === "string" 
                ? JSON.parse(profile.measurements) 
                : profile.measurements;
            } catch {
              // ignore
            }
          }

          return {
            id: profile.id,
            full_name: profile.full_name || "Valued Patron",
            address: profile.address || "Address not provided",
            email: contactEmail,
            phone: contactPhone,
            totalSpent,
            orderCount,
            tier,
            measurements
          };
        });

        setClients(mappedClients);
        setIsSandboxMode(false);
      } else {
        setClients(MOCK_CLIENTS);
        setIsSandboxMode(true);
      }
    } catch (error: any) {
      console.warn("Failed to load profiles, utilizing Sandbox VIP Circle CRM context:", error.message);
      setClients(MOCK_CLIENTS);
      setIsSandboxMode(true);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectClient = (client: Client) => {
    setSelectedClient(client);
    setIsEditingMeasurements(false);
    
    // Set edit inputs
    setEditBust(client.measurements?.bust || "");
    setEditWaist(client.measurements?.waist || "");
    setEditHips(client.measurements?.hips || "");
    setEditShoulder(client.measurements?.shoulder || "");
    setEditSleeveLength(client.measurements?.sleeve_length || "");
    setEditFullLength(client.measurements?.full_length || "");
    setEditNeck(client.measurements?.neck || "");
    setEditNotes(client.measurements?.notes || "");
  };

  const handleSaveMeasurements = async () => {
    if (!selectedClient) return;
    setSaveLoading(true);

    const updatedMeasurements: ClientMeasurements = {
      bust: editBust,
      waist: editWaist,
      hips: editHips,
      shoulder: editShoulder,
      sleeve_length: editSleeveLength,
      full_length: editFullLength,
      neck: editNeck,
      notes: editNotes
    };

    try {
      if (isSandboxMode) {
        // Update local state
        setClients(prev => 
          prev.map(c => 
            c.id === selectedClient.id 
              ? { ...c, measurements: updatedMeasurements } 
              : c
          )
        );
        setSelectedClient(prev => prev ? { ...prev, measurements: updatedMeasurements } : null);
        toast.success("Measurements updated successfully (Sandbox Mode)");
      } else {
        // Update measurements inside profiles table (try to write to measurements JSON column or profile)
        const { error } = await supabase
          .from("profiles")
          .update({ measurements: updatedMeasurements })
          .eq("id", selectedClient.id);

        if (error) {
          // If the measurements column doesn't exist, we fall back to saving in local state and notify
          console.warn("DB update failed, possibly missing measurements column. Falling back to memory. Error:", error.message);
          setClients(prev => 
            prev.map(c => 
              c.id === selectedClient.id 
                ? { ...c, measurements: updatedMeasurements } 
                : c
            )
          );
          setSelectedClient(prev => prev ? { ...prev, measurements: updatedMeasurements } : null);
          toast.success("Measurements saved in-memory (column measurements not added in database)");
        } else {
          setClients(prev => 
            prev.map(c => 
              c.id === selectedClient.id 
                ? { ...c, measurements: updatedMeasurements } 
                : c
            )
          );
          setSelectedClient(prev => prev ? { ...prev, measurements: updatedMeasurements } : null);
          toast.success("Client bespoke measurements saved successfully");
        }
      }
      setIsEditingMeasurements(false);
    } catch (error: any) {
      toast.error(`Error saving measurements: ${error.message}`);
    } finally {
      setSaveLoading(false);
    }
  };

  const filteredClients = clients.filter(client => 
    client.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.phone?.includes(searchQuery) ||
    client.tier.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getTierBadgeColor = (tier: Client["tier"]) => {
    switch (tier) {
      case "Platinum Patron":
        return "bg-purple-50 text-purple-700 border-purple-100 dark:bg-purple-950/20 dark:text-purple-400 dark:border-purple-900/30";
      case "Gold Circle":
        return "bg-amber-50 text-amber-700 border-amber-100 dark:bg-amber-950/20 dark:text-amber-400 dark:border-amber-900/30";
      case "Silver Atelier":
        return "bg-zinc-100 text-zinc-800 border-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:border-zinc-700";
      default:
        return "bg-zinc-50 text-zinc-400 border-zinc-100 dark:bg-zinc-900 dark:text-zinc-400 dark:border-zinc-800";
    }
  };

  return (
    <div className="space-y-12 pb-20">
      {/* Header */}
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6">
        <div>
          <h1 className="font-serif text-5xl text-zinc-900 italic tracking-tight">WAAFA Circle</h1>
          <p className="font-sans text-xs tracking-widest text-zinc-400 uppercase mt-2">
            VIP CRM, Patron Tier Management & Bespoke Measurements
          </p>
        </div>
        <div className="flex gap-3">
          {isSandboxMode && (
            <div className="px-5 py-2.5 bg-amber-50 border border-amber-100 text-[10px] font-sans tracking-widest uppercase text-amber-700 rounded-none flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
              Sandbox Database Fallback
            </div>
          )}
          <button 
            onClick={fetchClients}
            className="px-6 py-2.5 bg-white border border-zinc-100 text-[10px] font-sans tracking-widest uppercase text-zinc-500 hover:text-zinc-900 hover:border-zinc-300 transition-all"
          >
            Refresh List
          </button>
        </div>
      </header>

      {/* Main CRM Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Side: Client List (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex justify-between items-center border-b border-zinc-100 pb-4">
            <h3 className="text-xs font-sans uppercase tracking-[0.2em] text-zinc-900 font-semibold">Patron Register</h3>
            <div className="relative w-full sm:w-[240px]">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-400" />
              <input
                type="text"
                placeholder="Search by name, tier, email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-zinc-50 border border-zinc-100 pl-9 pr-4 py-2 text-[11px] font-sans tracking-wide rounded-none focus:outline-none focus:bg-white focus:border-zinc-300 transition-all"
              />
            </div>
          </div>

          <div className="bg-white border border-zinc-100 shadow-sm divide-y divide-zinc-50 max-h-[600px] overflow-y-auto">
            {loading ? (
              <div className="flex items-center justify-center h-48 text-zinc-300 font-serif italic">Loading client records...</div>
            ) : filteredClients.length === 0 ? (
              <div className="py-16 text-center text-zinc-400 font-serif italic text-sm">
                No patrons found.
              </div>
            ) : (
              filteredClients.map((client) => {
                const isSelected = selectedClient?.id === client.id;
                return (
                  <div
                    key={client.id}
                    onClick={() => handleSelectClient(client)}
                    className={`p-6 cursor-pointer transition-all flex justify-between items-center group ${
                      isSelected 
                        ? "bg-zinc-50/80 border-l-2 border-[#ED4064]" 
                        : "hover:bg-zinc-50/30"
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-serif text-base text-zinc-900 group-hover:text-[#ED4064] transition-colors">
                          {client.full_name}
                        </h4>
                        {client.tier === "Platinum Patron" && <Crown className="h-3.5 w-3.5 text-purple-600" />}
                      </div>
                      <p className="text-[10px] font-sans text-zinc-400">{client.email}</p>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <div className="text-xs font-sans text-zinc-950 font-semibold">
                          ₹{client.totalSpent.toLocaleString("en-IN")}
                        </div>
                        <div className="text-[9px] font-sans uppercase tracking-widest text-zinc-400 mt-0.5">
                          {client.orderCount} {client.orderCount === 1 ? "Order" : "Orders"}
                        </div>
                      </div>
                      <span className={`text-[8px] font-sans uppercase tracking-widest px-2 py-1 border rounded-none ${getTierBadgeColor(client.tier)}`}>
                        {client.tier}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Side: Bespoke Measurements & Details (5 cols) */}
        <div className="lg:col-span-5">
          {selectedClient ? (
            <div className="bg-white border border-zinc-100 p-8 shadow-sm space-y-8 animate-in fade-in duration-300">
              {/* Profile Card Header */}
              <div className="flex justify-between items-start border-b border-zinc-50 pb-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className={`text-[8px] font-sans uppercase tracking-widest px-2.5 py-1 border rounded-none ${getTierBadgeColor(selectedClient.tier)}`}>
                      {selectedClient.tier}
                    </span>
                    <Sparkles className="h-3 w-3 text-[#ED4064] animate-pulse" />
                  </div>
                  <h3 className="font-serif text-2xl text-zinc-900 italic font-semibold">{selectedClient.full_name}</h3>
                </div>
                {!isEditingMeasurements && (
                  <button
                    onClick={() => setIsEditingMeasurements(true)}
                    className="p-2 border border-zinc-100 hover:border-zinc-300 text-zinc-500 hover:text-zinc-900 transition-all flex items-center gap-1.5 text-[9px] uppercase tracking-widest font-sans font-semibold"
                  >
                    <Edit3 className="h-3.5 w-3.5" /> Edit Size
                  </button>
                )}
              </div>

              {/* Personal Details */}
              <div className="space-y-3.5 text-xs text-zinc-600 font-sans border-b border-zinc-50 pb-6">
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-zinc-400" />
                  <span>{selectedClient.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-zinc-400" />
                  <span>{selectedClient.phone}</span>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="h-4 w-4 text-zinc-400 mt-0.5" />
                  <span className="leading-relaxed">{selectedClient.address}</span>
                </div>
              </div>

              {/* Atelier Measurements Section */}
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h4 className="text-[10px] font-sans uppercase tracking-[0.2em] text-[#ED4064] font-bold flex items-center gap-2">
                    <Ruler className="h-4 w-4" /> Bespoke Measurements (Inches)
                  </h4>
                </div>

                {isEditingMeasurements ? (
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { label: "Bust", value: editBust, setter: setEditBust },
                        { label: "Waist", value: editWaist, setter: setEditWaist },
                        { label: "Hips", value: editHips, setter: setEditHips },
                        { label: "Shoulder", value: editShoulder, setter: setEditShoulder },
                        { label: "Sleeve Length", value: editSleeveLength, setter: setEditSleeveLength },
                        { label: "Full Length", value: editFullLength, setter: setEditFullLength },
                        { label: "Neck", value: editNeck, setter: setEditNeck }
                      ].map((field, idx) => (
                        <div key={idx} className="space-y-1">
                          <label className="text-[8px] uppercase tracking-widest text-zinc-400 font-semibold">{field.label}</label>
                          <input
                            type="text"
                            value={field.value}
                            onChange={(e) => field.setter(e.target.value)}
                            placeholder="e.g. 34"
                            className="w-full bg-zinc-50 border border-zinc-100 text-xs px-3 py-2 outline-none font-sans focus:bg-white focus:border-zinc-300"
                          />
                        </div>
                      ))}
                    </div>
                    <div className="space-y-1">
                      <label className="text-[8px] uppercase tracking-widest text-zinc-400 font-semibold">Special Directives & Fitting Notes</label>
                      <textarea
                        value={editNotes}
                        onChange={(e) => setEditNotes(e.target.value)}
                        placeholder="Alteration styles, linings, margin preferences..."
                        className="w-full bg-zinc-50 border border-zinc-100 text-xs px-3 py-3 outline-none font-sans min-h-[80px] focus:bg-white focus:border-zinc-300"
                      />
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={handleSaveMeasurements}
                        disabled={saveLoading}
                        className="flex-1 bg-zinc-900 hover:bg-zinc-800 text-white py-3 text-[10px] font-sans font-semibold tracking-widest uppercase flex items-center justify-center gap-2"
                      >
                        <Save className="h-3.5 w-3.5" /> {saveLoading ? "Saving..." : "Save Fittings"}
                      </button>
                      <button
                        onClick={() => setIsEditingMeasurements(false)}
                        className="px-6 border border-zinc-100 text-zinc-400 hover:text-zinc-800 hover:border-zinc-300 py-3 text-[10px] font-sans font-semibold tracking-widest uppercase"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4 bg-zinc-50 p-5 border border-zinc-50">
                      {[
                        { label: "Bust", value: selectedClient.measurements?.bust || "—" },
                        { label: "Waist", value: selectedClient.measurements?.waist || "—" },
                        { label: "Hips", value: selectedClient.measurements?.hips || "—" },
                        { label: "Shoulder", value: selectedClient.measurements?.shoulder || "—" },
                        { label: "Sleeve Length", value: selectedClient.measurements?.sleeve_length || "—" },
                        { label: "Full Length", value: selectedClient.measurements?.full_length || "—" },
                        { label: "Neck", value: selectedClient.measurements?.neck || "—" }
                      ].map((field, idx) => (
                        <div key={idx} className="flex justify-between items-center border-b border-zinc-100/50 pb-2 last:border-b-0 last:pb-0">
                          <span className="text-[9px] uppercase tracking-widest text-zinc-400">{field.label}</span>
                          <span className="text-xs font-sans text-zinc-900 font-semibold">{field.value}</span>
                        </div>
                      ))}
                    </div>
                    <div className="space-y-2">
                      <span className="text-[9px] uppercase tracking-widest text-zinc-400 font-bold block">Fittings Notes</span>
                      <p className="bg-amber-50/30 border border-amber-100/30 p-4 text-xs font-sans text-zinc-600 leading-relaxed italic">
                        &ldquo;{selectedClient.measurements?.notes || "No special tailoring notes added yet."}&rdquo;
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="h-full min-h-[400px] border-2 border-dashed border-zinc-100 bg-zinc-50/30 flex flex-col items-center justify-center text-zinc-400 p-6 text-center">
              <User className="h-8 w-8 text-zinc-200 mb-3" />
              <p className="font-serif italic text-sm">Select a patron from the register to inspect CRM files and tailoring sizing measurements.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
