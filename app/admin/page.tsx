"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalSales: 0,
    newOrders: 0,
  });
  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      setLoading(true);
      
      // 1. Fetch Total Sales & Order Count
      const { data: ordersData, error: ordersError } = await supabase
        .from('orders')
        .select('total_amount, status, id, created_at, profiles(full_name)');

      if (ordersData) {
        const total = ordersData.reduce((sum, order) => sum + (order.total_amount || 0), 0);
        setStats({
          totalSales: total,
          newOrders: ordersData.length,
        });
        
        // Map recent orders for the table
        const formattedOrders = ordersData.slice(0, 5).map(order => ({
          id: `#WF-${order.id.slice(0, 4).toUpperCase()}`,
          client: (order.profiles as any)?.full_name || "Unknown Customer",
          status: order.status === 'delivered' ? 'Delivered' : 
                  order.status === 'dispatched' ? 'Dispatched' : 
                  order.status === 'stitching' ? 'In Stitching' : 'Pending',
          amount: `₹${order.total_amount?.toLocaleString('en-IN')}`
        }));
        setRecentOrders(formattedOrders);
      }

      setLoading(false);
    }

    fetchStats();
  }, []);

  return (
    <div className="space-y-12 pb-20">
      {/* Header Section */}
      <header className="flex justify-between items-end">
        <div>
          <h1 className="font-serif text-5xl text-zinc-900 italic tracking-tight">Dashboard</h1>
        </div>
        <div className="flex gap-4">
          <div className="px-6 py-3 bg-white border border-zinc-100 text-[10px] font-sans tracking-widest uppercase text-zinc-500">
            Last 30 Days
          </div>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { label: "Total Sales", value: `₹${stats.totalSales.toLocaleString('en-IN')}`, trend: "Real-time", color: "text-[#ED4064]" },
          { label: "Total Orders", value: stats.newOrders.toString(), trend: "Total", color: "text-zinc-900" },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-8 border border-zinc-100 shadow-sm group hover:border-[#ED4064]/20 transition-all">
            <p className="text-[10px] font-sans uppercase tracking-[0.2em] text-zinc-400 mb-4">{stat.label}</p>
            <div className="flex justify-between items-end">
              <h3 className={`text-3xl font-serif ${stat.color}`}>
                {loading ? "..." : stat.value}
              </h3>
              <span className="text-[9px] font-sans text-zinc-400 uppercase tracking-widest">{stat.trend}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-6">
        {/* Recent Orders Table */}
        <div className="space-y-6">
          <h3 className="text-sm font-sans uppercase tracking-[0.2em] text-zinc-900">Latest Sales</h3>
          <div className="bg-white border border-zinc-100 overflow-hidden shadow-sm min-h-[400px]">
            {loading ? (
              <div className="flex items-center justify-center h-64 text-zinc-300 font-serif italic">Loading studio data...</div>
            ) : recentOrders.length === 0 ? (
              <div className="flex items-center justify-center h-64 text-zinc-300 font-serif italic">No orders received yet.</div>
            ) : (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-zinc-50 border-b border-zinc-100">
                    <th className="p-5 text-[10px] font-sans uppercase tracking-widest text-zinc-400">Order ID</th>
                    <th className="p-5 text-[10px] font-sans uppercase tracking-widest text-zinc-400">Customer Name</th>
                    <th className="p-5 text-[10px] font-sans uppercase tracking-widest text-zinc-400">Status</th>
                    <th className="p-5 text-[10px] font-sans uppercase tracking-widest text-zinc-400 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-50">
                  {recentOrders.map((order, i) => (
                    <tr key={i} className="hover:bg-zinc-50/50 transition-colors cursor-pointer group">
                      <td className="p-5 text-xs font-sans text-zinc-500 group-hover:text-[#ED4064]">{order.id}</td>
                      <td className="p-5 text-sm font-serif text-zinc-900">{order.client}</td>
                      <td className="p-5">
                        <span className={`text-[9px] font-sans uppercase tracking-widest px-2 py-1 rounded-sm ${
                          order.status === 'In Stitching' ? 'bg-orange-50 text-orange-600' : 
                          order.status === 'Dispatched' ? 'bg-blue-50 text-blue-600' :
                          order.status === 'Delivered' ? 'bg-green-50 text-green-600' : 'bg-zinc-100 text-zinc-500'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="p-5 text-sm font-sans text-zinc-900 text-right font-medium">{order.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
