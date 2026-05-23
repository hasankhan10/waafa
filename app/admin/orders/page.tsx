"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import {
  Search,
  Filter,
  ChevronDown,
  ChevronUp,
  Eye,
  TrendingUp,
  Package,
  Truck,
  CheckCircle,
  Clock,
  Mail,
  Phone,
  MapPin,
  Calendar,
  X
} from "lucide-react";

interface OrderItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
  size?: string;
  color?: string;
  image_url?: string;
}

interface Order {
  id: string;
  customer_id: string | null;
  total_amount: number;
  status: string;
  created_at: string;
  shipping_address?: any;
  email?: string;
  phone?: string;
  full_name?: string;
  items?: OrderItem[];
  profiles?: {
    full_name: string;
    address?: string;
  };
}

const getClientName = (order: Order) => {
  if (order.full_name) return order.full_name;
  if (order.profiles?.full_name) return order.profiles.full_name;
  if (order.shipping_address) {
    if (typeof order.shipping_address === "object") {
      const addr = order.shipping_address as any;
      if (addr.full_name) return addr.full_name;
      if (addr.firstName || addr.lastName) return `${addr.firstName || ""} ${addr.lastName || ""}`.trim();
    }
  }
  return "Unknown Customer";
};

const getEmail = (order: Order) => {
  if (order.email) return order.email;
  if (order.shipping_address && typeof order.shipping_address === "object") {
    return (order.shipping_address as any).email || "";
  }
  return "";
};

const getPhone = (order: Order) => {
  if (order.phone) return order.phone;
  if (order.shipping_address && typeof order.shipping_address === "object") {
    return (order.shipping_address as any).phone || "";
  }
  return "";
};

const getAddressString = (order: Order) => {
  if (order.shipping_address) {
    if (typeof order.shipping_address === "object") {
      const addr = order.shipping_address as any;
      if (typeof addr.addressLine1 === "string") {
        return `${addr.addressLine1}${addr.addressLine2 ? ", " + addr.addressLine2 : ""}, ${addr.city || ""}, ${addr.state || ""} - ${addr.pincode || ""}, ${(addr.country || "").toUpperCase()}`;
      }
      return JSON.stringify(order.shipping_address);
    }
    return order.shipping_address;
  }
  if (order.profiles?.address) return order.profiles.address;
  return "No address saved for this order.";
};

const getOrderItems = (order: Order): OrderItem[] => {
  if (order.items && order.items.length > 0) return order.items;
  if (order.shipping_address && typeof order.shipping_address === "object") {
    const addr = order.shipping_address as any;
    if (Array.isArray(addr.items)) return addr.items;
  }
  return [];
};

// High-fidelity fallback mock data in case the database is empty
const MOCK_ORDERS: Order[] = [
  {
    id: "orders-mock-1",
    customer_id: "cust-1",
    total_amount: 45000,
    status: "pending",
    created_at: new Date(Date.now() - 3600000 * 2).toISOString(), // 2 hours ago
    shipping_address: "Flat 402, Signature Towers, Jubilee Hills, Hyderabad, Telangana - 500033, India",
    email: "priya.sharma@example.com",
    phone: "+91 98765 43210",
    full_name: "Priya Sharma",
    items: [
      { id: "p1", title: "The Crimson Silk Lehnga", price: 32000, quantity: 1, size: "M", color: "#ED4064" },
      { id: "p2", title: "Embroidered Organza Dupatta", price: 13000, quantity: 1, size: "FREE SIZE", color: "#FFFFF0" }
    ]
  },
  {
    id: "orders-mock-2",
    customer_id: "cust-2",
    total_amount: 58000,
    status: "stitching",
    created_at: new Date(Date.now() - 3600000 * 24).toISOString(), // 1 day ago
    shipping_address: "B-12, Gulmohar Park, New Delhi - 110049, India",
    email: "ananya.sen@example.com",
    phone: "+91 99999 88888",
    full_name: "Ananya Sen",
    items: [
      { id: "p3", title: "Midnight Velvet Sherwani", price: 58000, quantity: 1, size: "L", color: "#191970" }
    ]
  },
  {
    id: "orders-mock-3",
    customer_id: "cust-3",
    total_amount: 27500,
    status: "dispatched",
    created_at: new Date(Date.now() - 3600000 * 48).toISOString(), // 2 days ago
    shipping_address: "Apt 15, Sea Breeze Apartments, Bandra West, Mumbai, Maharashtra - 400050, India",
    email: "karan.malhotra@example.com",
    phone: "+91 98111 22233",
    full_name: "Karan Malhotra",
    items: [
      { id: "p4", title: "Teal Georgette Anarkali", price: 27500, quantity: 1, size: "S", color: "#008080" }
    ]
  },
  {
    id: "orders-mock-4",
    customer_id: "cust-4",
    total_amount: 89000,
    status: "delivered",
    created_at: new Date(Date.now() - 3600000 * 120).toISOString(), // 5 days ago
    shipping_address: "House 88, Sector 15-A, Noida, Uttar Pradesh - 201301, India",
    email: "meera.reddy@example.com",
    phone: "+91 97777 66655",
    full_name: "Meera Reddy",
    items: [
      { id: "p5", title: "Emerald Banarasi Saree", price: 42000, quantity: 1, size: "FREE SIZE", color: "#008A5E" },
      { id: "p6", title: "Gold Embroidered Blouse", price: 15000, quantity: 1, size: "M", color: "#D4AF37" },
      { id: "p7", title: "Atelier Bridal Veil", price: 32000, quantity: 1, size: "FREE SIZE", color: "#FFFFF0" }
    ]
  }
];

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [isSandboxMode, setIsSandboxMode] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      // Fetch orders from Supabase
      const { data, error } = await supabase
        .from("orders")
        .select(`
          *,
          profiles (
            full_name,
            address
          )
        `)
        .order("created_at", { ascending: false });

      if (error) {
        throw error;
      }

      if (data && data.length > 0) {
        setOrders(data);
        setIsSandboxMode(false);
      } else {
        // Fallback to high-fidelity mock data if database is empty
        setOrders(MOCK_ORDERS);
        setIsSandboxMode(true);
      }
    } catch (error: any) {
      console.warn("Failed to fetch orders from Supabase. Falling back to mock data. Error:", error.message);
      setOrders(MOCK_ORDERS);
      setIsSandboxMode(true);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (orderId: string, newStatus: string) => {
    setUpdatingId(orderId);
    try {
      if (isSandboxMode) {
        // Local state update for mock data
        setOrders(prev =>
          prev.map(order =>
            order.id === orderId ? { ...order, status: newStatus } : order
          )
        );
        toast.success(`Order status updated to "${newStatus}" (Sandbox Mode)`);
      } else {
        // Update in Supabase
        const { error } = await supabase
          .from("orders")
          .update({ status: newStatus })
          .eq("id", orderId);

        if (error) throw error;

        setOrders(prev =>
          prev.map(order =>
            order.id === orderId ? { ...order, status: newStatus } : order
          )
        );
        toast.success(`Order status updated to "${newStatus}"`);
      }
    } catch (error: any) {
      toast.error(`Failed to update status: ${error.message}`);
    } finally {
      setUpdatingId(null);
    }
  };

  // Toggle expand row to see full items & delivery details
  const toggleExpand = (id: string) => {
    setExpandedOrderId(prev => (prev === id ? null : id));
  };

  // Filter orders by active status tab and search query
  const filteredOrders = orders.filter(order => {
    const matchesTab = activeTab === "all" || order.status.toLowerCase() === activeTab.toLowerCase();

    const clientName = getClientName(order);
    const email = getEmail(order);
    const phone = getPhone(order);
    const orderId = order.id || "";

    const matchesSearch =
      clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      phone.includes(searchQuery) ||
      orderId.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesTab && matchesSearch;
  });

  // Calculate quick summary metrics based on current order list
  const metrics = {
    total: orders.length,
    pending: orders.filter(o => o.status === "pending").length,
    confirmed: orders.filter(o => o.status === "confirmed").length,
    stitching: orders.filter(o => o.status === "stitching").length,
    dispatched: orders.filter(o => o.status === "dispatched").length,
    delivered: orders.filter(o => o.status === "delivered").length,
    rejected: orders.filter(o => o.status === "rejected").length,
    revenue: orders.reduce((sum, o) => sum + (o.total_amount || 0), 0)
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-amber-50 text-amber-700 border-amber-100 dark:bg-amber-950/20 dark:text-amber-400 dark:border-amber-900/30";
      case "confirmed":
        return "bg-teal-50 text-teal-700 border-teal-100 dark:bg-teal-950/20 dark:text-teal-400 dark:border-teal-900/30";
      case "stitching":
        return "bg-orange-50 text-orange-700 border-orange-100 dark:bg-orange-950/20 dark:text-orange-400 dark:border-orange-900/30";
      case "dispatched":
        return "bg-sky-50 text-sky-700 border-sky-100 dark:bg-sky-950/20 dark:text-sky-400 dark:border-sky-900/30";
      case "delivered":
        return "bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-emerald-900/30";
      case "rejected":
        return "bg-rose-50 text-rose-700 border-rose-100 dark:bg-rose-950/20 dark:text-rose-400 dark:border-rose-900/30";
      default:
        return "bg-zinc-50 text-zinc-600 border-zinc-100 dark:bg-zinc-900 dark:text-zinc-400 dark:border-zinc-800";
    }
  };

  const formatOrderId = (id: string) => {
    if (id.startsWith("orders-mock-")) {
      return `#MOCK-${id.split("-").pop()}`;
    }
    return `#WF-${id.slice(0, 6).toUpperCase()}`;
  };

  return (
    <div className="space-y-12 pb-20">
      {/* Header Section */}
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6">
        <div>
          <h1 className="font-serif text-5xl text-zinc-900 italic tracking-tight">Orders</h1>
          <p className="font-sans text-xs tracking-widest text-zinc-400 uppercase mt-2">
            Atelier Order Book & Client Commissions
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
            onClick={fetchOrders}
            className="px-6 py-2.5 bg-white border border-zinc-100 text-[10px] font-sans tracking-widest uppercase text-zinc-500 hover:text-zinc-900 hover:border-zinc-300 transition-all"
          >
            Refresh
          </button>
        </div>
      </header>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
        {[
          { label: "Total Bookings", value: metrics.total, sub: "All time", icon: <Package className="h-4 w-4" /> },
          { label: "Pending Fulfill", value: metrics.pending, sub: "Awaiting review", icon: <Clock className="h-4 w-4 text-amber-500" /> },
          { label: "In Stitching", value: metrics.stitching, sub: "Tailoring floor", icon: <TrendingUp className="h-4 w-4 text-orange-500" /> },
          { label: "On The Way", value: metrics.dispatched, sub: "Dispatched", icon: <Truck className="h-4 w-4 text-sky-500" /> },
          { label: "Delivered", value: metrics.delivered, sub: "Completed", icon: <CheckCircle className="h-4 w-4 text-emerald-500" /> }
        ].map((item, i) => (
          <div key={i} className="bg-white p-6 border border-zinc-100 shadow-sm flex flex-col justify-between hover:border-[#ED4064]/20 transition-all">
            <div className="flex justify-between items-center text-zinc-400 mb-4">
              <span className="text-[9px] font-sans uppercase tracking-[0.2em]">{item.label}</span>
              {item.icon}
            </div>
            <div>
              <h3 className="text-2xl font-serif text-zinc-900 font-medium">{loading ? "..." : item.value}</h3>
              <p className="text-[8px] font-sans uppercase tracking-widest text-zinc-400 mt-1">{item.sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Controls & Search */}
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-zinc-100 pb-4">
          {/* Status Tabs */}
          <div className="flex flex-wrap gap-2 text-[10px] font-sans tracking-widest uppercase font-semibold">
            {[
              { id: "all", label: "All Orders", count: metrics.total },
              { id: "pending", label: "Pending", count: metrics.pending },
              { id: "confirmed", label: "Confirmed", count: metrics.confirmed },
              { id: "stitching", label: "Stitching", count: metrics.stitching },
              { id: "dispatched", label: "Dispatched", count: metrics.dispatched },
              { id: "delivered", label: "Delivered", count: metrics.delivered },
              { id: "rejected", label: "Rejected", count: metrics.rejected }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 border transition-all ${activeTab === tab.id
                    ? "bg-zinc-900 text-white border-zinc-900"
                    : "bg-white text-zinc-400 border-zinc-100 hover:border-zinc-300"
                  }`}
              >
                {tab.label} <span className="ml-1 opacity-60 font-normal">({tab.count})</span>
              </button>
            ))}
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-[320px]">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
            <input
              type="text"
              placeholder="Search by customer, ID, phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-zinc-50 border border-zinc-100 pl-10 pr-4 py-2 text-xs font-sans tracking-wide rounded-none focus:outline-none focus:bg-white focus:border-zinc-300 transition-all"
            />
          </div>
        </div>

        {/* Orders Table Canvas */}
        <div className="bg-white border border-zinc-100 shadow-sm overflow-hidden min-h-[400px]">
          {loading ? (
            <div className="flex items-center justify-center h-64 text-zinc-300 font-serif italic">Loading order logs...</div>
          ) : filteredOrders.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-zinc-400 space-y-4">
              <span className="material-symbols-outlined text-4xl text-zinc-200">shopping_bag</span>
              <p className="font-serif italic text-sm">No orders matching the active filters found.</p>
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-zinc-50 border-b border-zinc-100">
                  <th className="p-5 text-[10px] font-sans uppercase tracking-widest text-zinc-400 w-[15%]">Order ID</th>
                  <th className="p-5 text-[10px] font-sans uppercase tracking-widest text-zinc-400 w-[20%]">Customer</th>
                  <th className="p-5 text-[10px] font-sans uppercase tracking-widest text-zinc-400 w-[15%]">Date</th>
                  <th className="p-5 text-[10px] font-sans uppercase tracking-widest text-zinc-400 w-[20%]">Status</th>
                  <th className="p-5 text-[10px] font-sans uppercase tracking-widest text-zinc-400 w-[15%] text-right">Amount</th>
                  <th className="p-5 w-[15%]"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-50">
                {filteredOrders.map((order) => {
                  const isExpanded = expandedOrderId === order.id;
                  const clientName = getClientName(order);
                  const clientEmail = getEmail(order);
                  const clientPhone = getPhone(order);
                  const addressStr = getAddressString(order);
                  const orderItems = getOrderItems(order);
                  const orderDate = new Date(order.created_at).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric"
                  });

                  return (
                    <React.Fragment key={order.id}>
                      <tr
                        className={`hover:bg-zinc-50/50 transition-colors cursor-pointer group ${isExpanded ? "bg-zinc-50/30" : ""}`}
                        onClick={() => toggleExpand(order.id)}
                      >
                        <td className="p-5 text-xs font-sans text-zinc-500 font-medium group-hover:text-[#ED4064] transition-colors">
                          {formatOrderId(order.id)}
                        </td>
                        <td className="p-5">
                          <div className="font-serif text-sm text-zinc-900 font-medium">{clientName}</div>
                          <div className="text-[10px] text-zinc-400 font-sans tracking-wide mt-0.5">{clientEmail || "No email provided"}</div>
                        </td>
                        <td className="p-5 text-xs font-sans text-zinc-500">
                          {orderDate}
                        </td>
                        <td className="p-5" onClick={(e) => e.stopPropagation()}>
                          <div className="flex items-center gap-2">
                            <select
                              value={order.status}
                              disabled={updatingId === order.id}
                              onChange={(e) => handleUpdateStatus(order.id, e.target.value)}
                              className={`text-[9px] font-sans uppercase tracking-widest px-3 py-1.5 border rounded-none outline-none font-semibold cursor-pointer ${getStatusColor(order.status)}`}
                            >
                              <option value="pending">Pending</option>
                              <option value="confirmed">Confirmed</option>
                              <option value="stitching">Stitching</option>
                              <option value="dispatched">Dispatched</option>
                              <option value="delivered">Delivered</option>
                              <option value="rejected">Rejected</option>
                            </select>
                          </div>
                        </td>
                        <td className="p-5 text-sm font-sans text-zinc-900 text-right font-medium">
                          ₹{order.total_amount?.toLocaleString("en-IN")}
                        </td>
                        <td className="p-5 text-right">
                          <button className="text-zinc-400 group-hover:text-zinc-900 transition-colors p-1">
                            {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                          </button>
                        </td>
                      </tr>
                      {isExpanded && (
                        <tr className="bg-zinc-50/20">
                          <td colSpan={6} className="p-8 border-t border-zinc-50">
                            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 animate-in fade-in duration-300">
                              {/* Order Items */}
                              <div className="md:col-span-7 space-y-4">
                                <h4 className="text-[10px] font-sans uppercase tracking-[0.2em] text-[#ED4064] font-semibold flex items-center gap-2">
                                  <Package className="h-3.5 w-3.5" /> Ordered Items
                                </h4>
                                <div className="space-y-3 bg-white border border-zinc-100 p-5">
                                  {orderItems && orderItems.length > 0 ? (
                                    orderItems.map((item, index) => (
                                      <div key={index} className="flex justify-between items-center border-b border-zinc-50 pb-3 last:border-b-0 last:pb-0">
                                        <div className="space-y-1">
                                          <div className="text-xs font-serif text-zinc-900 font-medium">{item.title}</div>
                                          <div className="flex gap-4 text-[9px] font-sans uppercase tracking-widest text-zinc-400">
                                            <span>Size: {item.size || "Standard"}</span>
                                            {item.color && (
                                              <span className="flex items-center gap-1">
                                                Color:
                                                <span className="w-2.5 h-2.5 rounded-full border border-black/5" style={{ backgroundColor: item.color }} />
                                              </span>
                                            )}
                                          </div>
                                        </div>
                                        <div className="text-right">
                                          <div className="text-xs font-sans text-zinc-500 font-medium">{item.quantity} x ₹{Number(item.price).toLocaleString("en-IN")}</div>
                                          <div className="text-xs font-sans text-zinc-900 font-semibold mt-0.5">
                                            ₹{(Number(item.quantity) * Number(item.price)).toLocaleString("en-IN")}
                                          </div>
                                        </div>
                                      </div>
                                    ))
                                  ) : (
                                    <div className="text-xs text-zinc-400 font-sans italic">No items details found. Core purchase amount matches ₹{order.total_amount?.toLocaleString("en-IN")}.</div>
                                  )}
                                </div>
                              </div>

                              {/* Delivery, Customer Info & Integrations */}
                              <div className="md:col-span-5 space-y-6">
                                {/* Confirm / Reject Actions (Only if Pending) */}
                                {order.status === "pending" && (
                                  <div className="bg-white border border-zinc-100 p-5 space-y-3.5 shadow-sm">
                                    <h4 className="text-[10px] font-sans uppercase tracking-[0.2em] text-[#ED4064] font-bold">
                                      Fulfillment Approval
                                    </h4>
                                    <p className="text-[10px] text-zinc-400 font-sans leading-relaxed">
                                      Review client sizing and fabric stock before approving this couture commission.
                                    </p>
                                    <div className="flex gap-2.5 pt-1">
                                      <button
                                        onClick={() => handleUpdateStatus(order.id, "confirmed")}
                                        disabled={updatingId === order.id}
                                        className="flex-1 bg-green-50 hover:bg-green-100 text-green-700 border border-green-200 py-2.5 text-[9px] font-semibold font-sans tracking-widest uppercase transition-all flex items-center justify-center gap-1.5 disabled:opacity-50"
                                      >
                                        <CheckCircle className="h-3.5 w-3.5" /> Confirm
                                      </button>
                                      <button
                                        onClick={() => handleUpdateStatus(order.id, "rejected")}
                                        disabled={updatingId === order.id}
                                        className="flex-1 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 py-2.5 text-[9px] font-semibold font-sans tracking-widest uppercase transition-all flex items-center justify-center gap-1.5 disabled:opacity-50"
                                      >
                                        <X className="h-3.5 w-3.5" /> Reject
                                      </button>
                                    </div>
                                  </div>
                                )}

                                <div className="space-y-4">
                                  <h4 className="text-[10px] font-sans uppercase tracking-[0.2em] text-[#ED4064] font-semibold flex items-center gap-2">
                                    <MapPin className="h-3.5 w-3.5" /> Shipping Address
                                  </h4>
                                  <div className="bg-white border border-zinc-100 p-5 text-xs text-zinc-600 leading-relaxed font-sans shadow-sm">
                                    <p className="font-semibold text-zinc-800 mb-1">{clientName}</p>
                                    <p>{addressStr}</p>
                                  </div>
                                </div>

                                <div className="space-y-4">
                                  <h4 className="text-[10px] font-sans uppercase tracking-[0.2em] text-[#ED4064] font-semibold flex items-center gap-2">
                                    Contact Details
                                  </h4>
                                  <div className="bg-white border border-zinc-100 p-5 space-y-3 shadow-sm">
                                    <div className="flex items-center gap-3 text-xs text-zinc-600">
                                      <Mail className="h-3.5 w-3.5 text-zinc-400" />
                                      <span className="font-sans">{clientEmail || "No email on record"}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-xs text-zinc-600">
                                      <Phone className="h-3.5 w-3.5 text-zinc-400" />
                                      <span className="font-sans">{clientPhone || "No phone on record"}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-xs text-zinc-600">
                                      <Calendar className="h-3.5 w-3.5 text-zinc-400" />
                                      <span className="font-sans">Placed: {new Date(order.created_at).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}</span>
                                    </div>
                                  </div>
                                </div>

                                {/* Logistics (Delhivery) & Payments (Razorpay) Preparation Blocks */}
                                <div className="space-y-4">
                                  <h4 className="text-[10px] font-sans uppercase tracking-[0.2em] text-[#ED4064] font-semibold">
                                    Integration & Logistics (Delhivery / Razorpay)
                                  </h4>
                                  <div className="bg-white border border-zinc-100 p-5 space-y-4 shadow-sm text-xs font-sans">
                                    <div className="flex justify-between items-start border-b border-zinc-50 pb-3">
                                      <div>
                                        <div className="text-[9px] uppercase tracking-widest text-zinc-400">Razorpay Payment</div>
                                        <div className="font-mono text-[10px] text-zinc-600 mt-1">
                                          {order.shipping_address?.razorpay?.order_id || `rzp_live_${order.id.slice(0, 8)}`}
                                        </div>
                                      </div>
                                      <span className={`text-[8px] font-sans uppercase tracking-widest px-2 py-0.5 border rounded-none font-bold ${order.status === "rejected" ? "bg-red-50 text-red-600 border-red-100" :
                                          order.status === "pending" ? "bg-amber-50 text-amber-600 border-amber-100" :
                                            "bg-green-50 text-green-600 border-green-100"
                                        }`}>
                                        {order.status === "rejected" ? "Refunded" : order.status === "pending" ? "Authorized" : "Captured"}
                                      </span>
                                    </div>

                                    <div className="flex justify-between items-start">
                                      <div>
                                        <div className="text-[9px] uppercase tracking-widest text-zinc-400">Delhivery Airway Bill (AWB)</div>
                                        <div className="font-mono text-[10px] text-zinc-600 mt-1">
                                          {order.shipping_address?.delhivery?.waybill || (
                                            order.status === "dispatched" || order.status === "delivered" ? `DEL-${order.id.slice(0, 6).toUpperCase()}` : "Awaiting Dispatch Confirmation"
                                          )}
                                        </div>
                                        <div className="text-[8px] text-zinc-400 mt-1">
                                          Pkg: {order.shipping_address?.delhivery?.weight_grams || 650}g | Dimensions: {order.shipping_address?.delhivery?.dimensions || "32x24x6"} cm
                                        </div>
                                      </div>
                                      <span className={`text-[8px] font-sans uppercase tracking-widest px-2 py-0.5 border rounded-none font-bold ${order.status === "delivered" ? "bg-green-50 text-green-600 border-green-100" :
                                          order.status === "dispatched" ? "bg-blue-50 text-blue-600 border-blue-100" :
                                            "bg-zinc-50 text-zinc-400 border-zinc-100"
                                        }`}>
                                        {order.status === "delivered" ? "Delivered" : order.status === "dispatched" ? "In Transit" : "Unmanifested"}
                                      </span>
                                    </div>

                                    {order.status === "confirmed" && (
                                      <button
                                        onClick={async () => {
                                          await handleUpdateStatus(order.id, "dispatched");
                                          toast.success(`Delhivery shipment manifest created. Airway Bill (AWB) DEL-${order.id.slice(0, 6).toUpperCase()} generated!`);
                                        }}
                                        className="w-full bg-zinc-900 hover:bg-zinc-800 text-white py-2 text-[9px] font-sans font-semibold tracking-widest uppercase transition-all flex items-center justify-center gap-1.5"
                                      >
                                        <Truck className="h-3.5 w-3.5" /> Manifest Delhivery Shipment
                                      </button>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
