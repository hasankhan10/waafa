"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Loader2, Check, CreditCard, ShoppingBag, ArrowRight } from "lucide-react";

interface OrderItem {
  id: string;
  title: string;
  price: string;
  category: string;
  size: string;
  color: string;
  quantity: string;
  imageUrl: string;
}

interface LastOrderInfo {
  orderId: string;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  paymentMethod: string;
  items: OrderItem[];
  subtotal: number;
  gst: number;
  total: number;
}

export default function OrderConfirmationPage() {
  const [orderInfo, setOrderInfo] = useState<LastOrderInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const raw = localStorage.getItem("waafa-last-order");
    if (raw) {
      try {
        setOrderInfo(JSON.parse(raw));
      } catch (e) {
        setOrderInfo(null);
      }
    }
    setLoading(false);
  }, []);

  // Parsing helper: "₹4,200" -> 4200
  const parsePrice = (priceStr: string): number => {
    const cleanStr = priceStr.replace(/[^\d]/g, "");
    return parseInt(cleanStr, 10) || 0;
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-[#FAFAFA]">
        <Loader2 className="h-8 w-8 text-zinc-300 animate-spin mb-4" />
        <p className="font-serif italic text-zinc-400 text-lg animate-pulse">Retrieving your order status...</p>
      </div>
    );
  }

  // Fallback mock details if orderInfo is not found
  const orderId = orderInfo?.orderId || "#WF-88291";
  const fullName = orderInfo?.fullName || "Julianne V. Sterling";
  const address = orderInfo?.address || "1104 Fifth Avenue, Apt 4C, New York, NY 10028, United States";
  const paymentMethod = orderInfo?.paymentMethod || "Visa ending in 4242";
  const items = orderInfo?.items || [
    {
      id: "1",
      title: "The Crimson Siren",
      price: "₹2,450.00",
      category: "EVENING GOWNS",
      size: "IT 40",
      color: "Red",
      quantity: "1",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBArNiJH2P-MBG8VVjHCkirLOHytxAPFHezysVopEZzCykNBQIUKf2yYYaD1yjisn8j1l0QHWiGKI-cKaaCUZ7inMmr1K4BdSuyx2qnR3togrv96cKcq65tQzqb0AIrZONvNmPz71oZe-wQ_VNrUeO7t7EPEIvTEz653L3VwCjLblm-G_C2_jlGvU1DZ17CZlTPBLsF52VBwYTF5vtYdxqdIfV3AqTYBPUt2q6gGTOfowcEw4GXeiwYOA1mbFF3htHidYv_XYzULFA"
    }
  ];
  const subtotal = orderInfo?.subtotal || 2450;
  const gst = orderInfo?.gst || 441;
  const total = orderInfo?.total || 2891;

  return (
    <div className="relative min-h-screen pt-12 pb-20 px-[5vw] overflow-hidden max-w-[1440px] mx-auto bg-[#FAFAFA]">
      {/* Background Atmospheric Element */}
      <div className="absolute top-0 right-0 w-[60vw] h-[60vw] bg-[radial-gradient(circle_at_center,rgba(237,64,100,0.05)_0%,transparent_70%)] -z-10 translate-x-1/4 -translate-y-1/4"></div>
      
      <div className="flex flex-col items-center text-center mb-12">
        <div className="w-16 h-16 rounded-full border border-[#ED4064]/20 bg-white shadow-sm flex items-center justify-center mb-6">
          <Check className="h-6 w-6 text-[#ED4064]" />
        </div>
        <h1 className="font-serif text-5xl italic tracking-tight text-zinc-950 mb-2">Thank You</h1>
        <p className="font-sans text-sm text-zinc-600 mb-1">
          Your order <span className="font-bold text-[#ED4064]">{orderId}</span> has been successfully placed.
        </p>
        <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-zinc-400 font-bold">
          A confirmation email has been sent to your inbox.
        </p>
      </div>

      {/* Bento Grid Layout for Order Info */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Details */}
        <div className="lg:col-span-7 space-y-8">
          <div className="bg-white p-10 border border-zinc-200/50 shadow-[0_10px_40px_rgba(0,0,0,0.01)]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h3 className="font-sans text-[10px] uppercase tracking-widest text-zinc-400 font-bold mb-6">SHIPPING DETAILS</h3>
                <div className="font-serif text-zinc-800 text-sm leading-relaxed capitalize">
                  <span className="font-semibold block text-zinc-950 font-sans text-xs uppercase tracking-wide mb-1">{fullName}</span>
                  {address}
                </div>
              </div>
              <div>
                <h3 className="font-sans text-[10px] uppercase tracking-widest text-zinc-400 font-bold mb-6">DELIVERY METHOD</h3>
                <div className="font-serif text-zinc-800 text-sm leading-relaxed">
                  Express White Glove Delivery<br />
                  <span className="text-[#ED4064] font-sans text-[10px] font-bold tracking-wider uppercase bg-[#ED4064]/5 px-2 py-0.5 rounded-sm inline-block mt-2">
                    Complimentary Premium Shipping
                  </span>
                </div>
              </div>
              <div>
                <h3 className="font-sans text-[10px] uppercase tracking-widest text-zinc-400 font-bold mb-6">PAYMENT METHOD</h3>
                <div className="flex items-center gap-2.5 font-sans text-xs font-semibold text-zinc-800 uppercase tracking-widest">
                  <CreditCard className="h-4 w-4 text-zinc-400" />
                  {paymentMethod}
                </div>
              </div>
              <div className="flex flex-col justify-end">
                <Link href="/profile" className="group inline-flex items-center gap-2 text-[#ED4064] font-sans text-[10px] uppercase tracking-[0.2em] font-bold">
                  TRACK YOUR ORDER 
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>

          {/* Asymmetric Graphic Section */}
          <div className="relative h-96 overflow-hidden group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1200&auto=format&fit=crop" 
              alt="Experience Couture" 
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/70 via-zinc-900/30 to-transparent flex flex-col justify-end p-10">
              <span className="font-sans text-[10px] uppercase tracking-widest text-zinc-200 mb-2 font-bold">EXPERIENCE COUTURE</span>
              <h2 className="font-serif text-3xl text-white italic leading-tight">The art of digital luxury tailoring.</h2>
            </div>
          </div>
        </div>

        {/* Right Column: Itemized Summary */}
        <div className="lg:col-span-5">
          <div className="bg-white border border-zinc-200/50 p-10 shadow-[0_10px_40px_rgba(0,0,0,0.01)] sticky top-28">
            <h3 className="font-sans text-[10px] uppercase tracking-widest text-zinc-400 font-bold mb-10 pb-4 border-b border-zinc-100">
              ORDER SUMMARY
            </h3>
            <div className="space-y-8 mb-12 max-h-[350px] overflow-y-auto pr-2 scrollbar-thin">
              {items.map((item, idx) => {
                const itemPriceNum = parsePrice(item.price);
                const itemQtyNum = parseInt(item.quantity, 10) || 1;
                const totalItemPriceStr = `₹${(itemPriceNum * itemQtyNum).toLocaleString("en-IN")}`;

                return (
                  <div key={`${item.id}-${item.size}-${idx}`} className="flex gap-6 border-b border-zinc-50 pb-6 last:border-b-0 last:pb-0">
                    <div className="w-20 h-26 bg-zinc-50 border border-zinc-100 overflow-hidden flex-shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex flex-col justify-between py-1 flex-grow">
                      <div>
                        <h4 className="font-serif italic text-base text-zinc-900 capitalize leading-tight mb-1">{item.title}</h4>
                        <p className="font-sans text-[9px] uppercase tracking-widest text-[#ED4064] font-bold">{item.category}</p>
                        <div className="flex items-center gap-4 text-[9px] text-zinc-400 font-bold uppercase tracking-wider mt-1">
                          <span>SIZE: {item.size}</span>
                          <span>QTY: {item.quantity}</span>
                        </div>
                      </div>
                      <span className="font-sans text-xs font-semibold text-zinc-800 pt-2">{totalItemPriceStr}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Calculations */}
            <div className="space-y-4 pt-8 border-t border-zinc-100 font-sans text-xs text-zinc-500 uppercase tracking-wider">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-zinc-800 font-semibold">₹{subtotal.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="text-[#ED4064] font-bold tracking-[0.1em] lowercase first-letter:uppercase">Complimentary</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Taxes (18% GST)</span>
                <span className="text-zinc-800 font-semibold">₹{gst.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between items-baseline pt-6 border-t border-zinc-100">
                <span className="font-sans text-[10px] font-bold tracking-[0.2em] text-zinc-800">TOTAL PAID</span>
                <span className="font-sans text-2xl font-bold text-zinc-950">
                  ₹{total.toLocaleString("en-IN")}
                </span>
              </div>
            </div>

            <div className="mt-12 space-y-4">
              <Link href="/">
                <button className="w-full py-5 bg-zinc-900 text-white font-sans text-xs font-semibold tracking-[0.25em] hover:bg-[#ED4064] transition-all duration-500 shadow-md">
                  CONTINUE SHOPPING
                </button>
              </Link>
              <p className="text-center text-[9px] font-sans uppercase tracking-widest text-zinc-400 pt-4 leading-relaxed">
                NEED ASSISTANCE? CONTACT CLIENT CONCIERGE AT<br />
                <span className="text-zinc-800 font-bold hover:text-[#ED4064] cursor-pointer transition-colors underline decoration-zinc-200">
                  CONCIERGE@DIGITALCOUTURE.COM
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
