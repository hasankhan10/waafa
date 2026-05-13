"use client";

import React from "react";
import Link from "next/link";

export default function ProfilePage() {
  // MOCK DATA FOR UI DEVELOPMENT
  const mockUser = {
    name: "Aria Montgomery",
    email: "aria@example.com",
    memberSince: "2024"
  };

  const mockOrders = [
    { id: "#WF-88291", date: "Oct 20, 2026", total: "₹85,000", status: "IN PRODUCTION", item: "The Crimson Cascade" },
    { id: "#WF-88285", date: "Aug 12, 2026", total: "₹42,000", status: "DELIVERED", item: "Midnight Velvet Slip" }
  ];

  return (
    <div className="space-y-20">
      {/* Profile Header */}
      <div className="mb-20 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="font-serif text-6xl text-zinc-900 italic tracking-tight leading-tight">
            Welcome, {mockUser.name.split(' ')[0]}.
          </h1>
          <p className="font-sans text-[11px] uppercase tracking-[0.2em] text-zinc-400 mt-4">
            {mockUser.email}
          </p>
        </div>
      </div>

      {/* Recent Orders */}
      <section>
        <div className="flex justify-between items-end mb-10 border-b border-zinc-100 pb-6">
          <h3 className="font-serif text-2xl italic text-zinc-900">My Recent Orders</h3>
          <Link href="/profile/orders" className="text-[10px] font-sans uppercase tracking-widest text-zinc-400 hover:text-[#ED4064]">View All</Link>
        </div>
        
        <div className="space-y-6">
          {mockOrders.map((order, i) => (
            <div key={i} className="bg-white p-8 border border-zinc-100 shadow-sm hover:shadow-md transition-shadow group">
              <div className="flex flex-col md:flex-row justify-between gap-6">
                <div className="space-y-2">
                  <p className="font-sans text-[9px] uppercase tracking-[0.3em] text-zinc-400">{order.id} • {order.date}</p>
                  <h4 className="font-serif text-xl text-zinc-900 group-hover:text-[#ED4064] transition-colors">{order.item}</h4>
                </div>
                <div className="flex flex-col md:items-end justify-center gap-2">
                  <p className="font-sans text-sm font-semibold text-zinc-900">{order.total}</p>
                  <span className="text-[9px] font-sans uppercase tracking-[0.2em] px-3 py-1.5 bg-zinc-50 text-zinc-500 border border-zinc-100">
                    {order.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      {/* Profile Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <section className="bg-white p-10 border border-zinc-100 shadow-sm">
          <h3 className="text-[10px] font-sans uppercase tracking-[0.3em] text-zinc-400 mb-6">Delivery Address</h3>
          <div className="font-serif text-lg text-zinc-700 leading-relaxed italic">
            Aria Montgomery<br />
            1104 Fifth Avenue, Apt 4C<br />
            New York, NY 10028<br />
            United States
          </div>
          <button className="mt-8 text-[10px] font-sans uppercase tracking-widest text-[#ED4064] hover:underline decoration-[#ED4064] underline-offset-8">
            Edit Details
          </button>
        </section>

        <section className="bg-white p-10 border border-zinc-100 shadow-sm">
          <h3 className="text-[10px] font-sans uppercase tracking-[0.3em] text-zinc-400 mb-6">Studio Credit</h3>
          <div className="font-serif text-3xl text-zinc-900 italic">
            ₹12,500.00
          </div>
          <p className="text-[9px] font-sans uppercase tracking-widest text-zinc-400 mt-2">Available for next order</p>
          <button className="mt-8 text-[10px] font-sans uppercase tracking-widest text-[#ED4064] hover:underline decoration-[#ED4064] underline-offset-8">
            Apply to Order
          </button>
        </section>
      </div>
    </div>
  );
}
