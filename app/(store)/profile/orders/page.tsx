"use client";

import React from "react";

export default function ProfileOrdersPage() {
  const mockOrders = [
    { id: "#WF-88291", date: "Oct 20, 2026", total: "₹85,000", status: "IN PRODUCTION", item: "The Crimson Cascade" },
    { id: "#WF-88285", date: "Aug 12, 2026", total: "₹42,000", status: "DELIVERED", item: "Midnight Velvet Slip" },
    { id: "#WF-88210", date: "Jan 15, 2026", total: "₹55,000", status: "DELIVERED", item: "Emerald Silk Gown" }
  ];

  return (
    <div className="space-y-12">
      <div className="border-b border-zinc-100 pb-8">
        <h1 className="font-serif text-4xl text-zinc-900 italic tracking-tight">My Orders</h1>
        <p className="text-[10px] font-sans uppercase tracking-[0.3em] text-zinc-400 mt-2">Track and manage your studio purchases</p>
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
                <span className={`text-[9px] font-sans uppercase tracking-[0.2em] px-3 py-1.5 border ${
                  order.status === 'DELIVERED' ? 'bg-green-50 text-green-600 border-green-100' : 'bg-zinc-50 text-zinc-500 border-zinc-100'
                }`}>
                  {order.status}
                </span>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t border-zinc-50 flex gap-6">
              <button className="text-[10px] font-sans uppercase tracking-widest text-[#ED4064] hover:underline underline-offset-8">Track Package</button>
              <button className="text-[10px] font-sans uppercase tracking-widest text-zinc-400 hover:text-zinc-600">Download Invoice</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
