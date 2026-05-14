"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

export default function ProfilePage() {
  const [profile, setProfile] = useState<any>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUserData() {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        // 1. Fetch Profile
        const { data: profileData } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
        
        if (profileData) setProfile(profileData);

        // 2. Fetch Orders
        const { data: ordersData } = await supabase
          .from('orders')
          .select('*')
          .eq('customer_id', user.id)
          .order('created_at', { ascending: false });

        if (ordersData) setOrders(ordersData);
      }
      setLoading(false);
    }

    fetchUserData();
  }, []);

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Signed out successfully");
      window.location.href = "/login";
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="font-serif italic text-zinc-300 animate-pulse">Loading your profile...</div>
      </div>
    );
  }

  return (
    <div className="space-y-16 animate-in fade-in duration-700">
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 border-b border-zinc-100 pb-12">
        <div className="space-y-2">
          <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-[#ED4064]">Welcome back</p>
          <h2 className="font-serif text-5xl text-zinc-900 italic tracking-tight capitalize">
            {profile?.full_name || "Valued Customer"}
          </h2>
          <p className="font-sans text-sm text-zinc-400">{profile?.email || "No email provided"}</p>
        </div>
        <button 
          onClick={handleSignOut}
          className="px-8 py-3 border border-zinc-200 text-[10px] font-sans uppercase tracking-widest text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900 transition-all"
        >
          Sign Out
        </button>
      </div>

      {/* Recent Orders */}
      <section>
        <div className="flex justify-between items-end mb-10 border-b border-zinc-100 pb-6">
          <h3 className="font-serif text-2xl italic text-zinc-900">My Recent Orders</h3>
          <Link href="/profile/orders" className="text-[10px] font-sans uppercase tracking-widest text-zinc-400 hover:text-[#ED4064]">View All</Link>
        </div>
        
        <div className="space-y-6">
          {orders.length === 0 ? (
            <div className="py-20 text-center bg-zinc-50/50 border border-dashed border-zinc-100">
              <p className="font-serif italic text-zinc-400">You haven't placed any orders yet.</p>
              <Link href="/products" className="inline-block mt-4 text-[10px] font-sans uppercase tracking-widest text-[#ED4064] underline underline-offset-4">Start Shopping</Link>
            </div>
          ) : (
            orders.slice(0, 3).map((order, i) => (
              <div key={i} className="bg-white p-8 border border-zinc-100 shadow-sm hover:shadow-md transition-shadow group">
                <div className="flex flex-col md:flex-row justify-between gap-6">
                  <div className="space-y-2">
                    <p className="font-sans text-[9px] uppercase tracking-[0.3em] text-zinc-400">
                      #WF-{order.id.slice(0, 8).toUpperCase()} • {new Date(order.created_at).toLocaleDateString()}
                    </p>
                    <h4 className="font-serif text-xl text-zinc-900 group-hover:text-[#ED4064] transition-colors uppercase tracking-tight">
                      Order Processing
                    </h4>
                  </div>
                  <div className="flex flex-col md:items-end justify-center gap-2">
                    <p className="font-sans text-sm font-semibold text-zinc-900">₹{order.total_amount?.toLocaleString('en-IN')}</p>
                    <span className={`text-[9px] font-sans uppercase tracking-[0.2em] px-3 py-1.5 border ${
                      order.status === 'delivered' ? 'bg-green-50 text-green-600 border-green-100' :
                      order.status === 'stitching' ? 'bg-orange-50 text-orange-600 border-orange-100' :
                      'bg-zinc-50 text-zinc-500 border-zinc-100'
                    }`}>
                      {order.status || "Pending"}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
      
      {/* Profile Details Preview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="p-10 bg-zinc-50/50 border border-zinc-100 space-y-6">
          <h4 className="text-[10px] font-sans uppercase tracking-[0.3em] text-zinc-400">Primary Address</h4>
          {profile?.address ? (
            <p className="text-sm text-zinc-600 leading-relaxed font-sans">{profile.address}</p>
          ) : (
            <p className="text-sm text-zinc-400 italic font-sans">No address saved yet.</p>
          )}
          <Link href="/profile/settings" className="block text-[10px] font-sans uppercase tracking-widest text-[#ED4064] hover:underline">Edit Address</Link>
        </div>
        <div className="p-10 bg-[#ED4064]/5 border border-[#ED4064]/10 space-y-6">
          <h4 className="text-[10px] font-sans uppercase tracking-[0.3em] text-[#ED4064]">Member Status</h4>
          <p className="font-serif text-2xl text-zinc-900 italic">Established Since 2026</p>
          <p className="text-[10px] font-sans uppercase tracking-widest text-zinc-400">WAAFA COUTURE CIRCLE</p>
        </div>
      </div>
    </div>
  );
}
