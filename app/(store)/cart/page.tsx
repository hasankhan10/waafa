"use client";

import React, { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { toast } from "sonner";
import { Trash2, Plus, Minus, Lock, ShoppingBag, ArrowRight } from "lucide-react";

interface CartItem {
  id: string;
  title: string;
  price: string; // "₹4,200.00" or similar
  category: string;
  size: string;
  color: string;
  quantity: string; // e.g. "01"
  imageUrl: string;
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Load items from localStorage on mount
  useEffect(() => {
    const loadCart = () => {
      const existing = localStorage.getItem("waafa-cart");
      if (existing) {
        try {
          setCartItems(JSON.parse(existing));
        } catch (e) {
          setCartItems([]);
        }
      }
      setLoading(false);
    };
    loadCart();

    // Listen for storage changes in other windows/tabs
    window.addEventListener("storage", loadCart);
    return () => window.removeEventListener("storage", loadCart);
  }, []);

  const saveCart = (newItems: CartItem[]) => {
    setCartItems(newItems);
    localStorage.setItem("waafa-cart", JSON.stringify(newItems));
    window.dispatchEvent(new Event("storage"));
  };

  // Parsing helper: "₹4,200" -> 4200
  const parsePrice = (priceStr: string): number => {
    const cleanStr = priceStr.replace(/[^\d]/g, "");
    return parseInt(cleanStr, 10) || 0;
  };

  // Subtotal Calculation
  const subtotal = useMemo(() => {
    return cartItems.reduce((acc, item) => {
      const priceVal = parsePrice(item.price);
      const qtyVal = parseInt(item.quantity, 10) || 1;
      return acc + priceVal * qtyVal;
    }, 0);
  }, [cartItems]);

  const handleUpdateQuantity = (idx: number, type: "increment" | "decrement") => {
    const updated = [...cartItems];
    let qty = parseInt(updated[idx].quantity, 10) || 1;
    
    if (type === "increment") {
      qty += 1;
    } else {
      qty = Math.max(1, qty - 1);
    }
    
    updated[idx].quantity = qty.toString().padStart(2, "0");
    saveCart(updated);
  };

  const handleRemoveItem = (idx: number) => {
    const updated = cartItems.filter((_, i) => i !== idx);
    saveCart(updated);
    toast.success("Item removed from your collection");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA]">
        <p className="font-serif italic text-zinc-400 text-xl animate-pulse">Loading Your Bag...</p>
      </div>
    );
  }

  return (
    <div className="max-w-[1440px] mx-auto px-[5vw] pt-16 pb-32">
      {/* Elegant Heading */}
      <div className="mb-16">
        <h1 className="font-serif text-5xl italic tracking-tight text-zinc-900 mb-2">Your Shopping Bag</h1>
        <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-zinc-400 font-bold">
          {cartItems.length} ITEM{cartItems.length !== 1 && "S"} IN YOUR SELECTION
        </p>
      </div>

      {cartItems.length === 0 ? (
        <div className="py-24 text-center border border-dashed border-zinc-200 bg-white max-w-3xl mx-auto space-y-6">
          <ShoppingBag className="h-10 w-10 text-zinc-300 mx-auto" />
          <p className="font-serif italic text-zinc-400 text-2xl">Your collection bag is currently empty.</p>
          <div className="pt-2">
            <Link href="/products">
              <Button className="bg-zinc-900 hover:bg-[#ED4064] text-white rounded-none px-8 py-4 font-sans text-[10px] uppercase tracking-widest font-semibold transition-colors">
                Explore The Collections
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Cart Items List */}
          <div className="lg:col-span-8 space-y-10">
            {cartItems.map((item, idx) => {
              const itemPriceNum = parsePrice(item.price);
              const itemQtyNum = parseInt(item.quantity, 10) || 1;
              const totalPriceStr = `₹${(itemPriceNum * itemQtyNum).toLocaleString("en-IN")}`;

              return (
                <div
                  key={`${item.id}-${item.size}-${item.color}`}
                  className="flex flex-col md:flex-row gap-8 items-start pb-10 border-b border-zinc-200/60 last:border-0"
                >
                  <div className="w-full md:w-44 aspect-[3/4] bg-zinc-50 overflow-hidden border border-zinc-100 shadow-sm relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover transition-all duration-700"
                    />
                  </div>
                  
                  <div className="flex-grow space-y-4 w-full">
                    <div className="flex justify-between items-start gap-4">
                      <h2 className="font-serif text-2xl text-zinc-900 italic capitalize leading-none tracking-tight">
                        {item.title}
                      </h2>
                      <p className="font-sans text-base font-semibold text-zinc-900">{totalPriceStr}</p>
                    </div>
                    
                    <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#ED4064] font-bold">
                      {item.category}
                    </p>
                    
                    <div className="flex flex-wrap gap-12 pt-2">
                      <div>
                        <span className="font-sans text-[9px] uppercase tracking-widest text-zinc-400 block mb-1">
                          SIZE
                        </span>
                        <span className="font-sans text-xs font-semibold text-zinc-800 uppercase bg-zinc-50 border border-zinc-100 px-2.5 py-1 rounded-sm">
                          {item.size}
                        </span>
                      </div>
                      
                      {item.color !== "Universal" && (
                        <div>
                          <span className="font-sans text-[9px] uppercase tracking-widest text-zinc-400 block mb-1">
                            COLOR
                          </span>
                          <div className="flex items-center gap-2">
                            <span
                              className="w-3.5 h-3.5 rounded-full border border-zinc-200 block shadow-sm"
                              style={{ backgroundColor: item.color }}
                              title={item.color}
                            />
                            <span className="font-sans text-[10px] text-zinc-500 uppercase">{item.color}</span>
                          </div>
                        </div>
                      )}

                      <div>
                        <span className="font-sans text-[9px] uppercase tracking-widest text-zinc-400 block mb-1">
                          QUANTITY
                        </span>
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => handleUpdateQuantity(idx, "decrement")}
                            className="w-6 h-6 border border-zinc-200/60 rounded-full flex items-center justify-center text-zinc-400 hover:text-[#ED4064] hover:border-[#ED4064] transition-colors"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="font-sans text-xs font-semibold text-zinc-800">{item.quantity}</span>
                          <button
                            onClick={() => handleUpdateQuantity(idx, "increment")}
                            className="w-6 h-6 border border-zinc-200/60 rounded-full flex items-center justify-center text-zinc-400 hover:text-[#ED4064] hover:border-[#ED4064] transition-colors"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-4">
                      <button
                        onClick={() => handleRemoveItem(idx)}
                        className="inline-flex items-center gap-1.5 text-sans text-[10px] tracking-widest uppercase font-bold text-zinc-400 hover:text-[#ED4064] transition-colors"
                      >
                        <Trash2 className="h-3.5 w-3.5" /> Remove Piece
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Couture Summary Sidebar */}
          <div className="lg:col-span-4">
            <div className="sticky top-32 bg-white p-8 shadow-[0_10px_40px_rgba(0,0,0,0.02)] border border-zinc-200/60 rounded-none space-y-8">
              <h3 className="font-serif text-2xl italic tracking-tight text-zinc-900 border-b border-zinc-50 pb-4">
                Selection Summary
              </h3>
              
              <div className="space-y-4 font-sans text-xs tracking-wider uppercase text-zinc-600">
                <div className="flex justify-between">
                  <span>Bag Subtotal</span>
                  <span className="text-zinc-900 font-semibold">₹{subtotal.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between">
                  <span>Couture Shipping</span>
                  <span className="text-[#ED4064] font-bold tracking-[0.15em]">Complimentary</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Duty & Tax</span>
                  <span className="text-zinc-400 italic normal-case">Calculated at Checkout</span>
                </div>
              </div>
              
              <div className="pt-6 border-t border-zinc-100 mb-8">
                <div className="flex justify-between items-baseline">
                  <span className="font-sans text-[11px] font-bold tracking-widest uppercase text-zinc-900">
                    TOTAL ESTIMATE
                  </span>
                  <span className="font-sans text-2xl font-bold text-zinc-900">
                    ₹{subtotal.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>
              
              <Link href="/checkout">
                <button className="w-full bg-zinc-900 text-white py-5 font-sans font-semibold tracking-[0.3em] text-[11px] uppercase hover:bg-[#ED4064] transition-colors duration-500 shadow-md">
                  PROCEED TO CHECKOUT
                </button>
              </Link>
              
              <div className="flex items-center justify-center gap-2 text-zinc-400 text-[10px] tracking-wider uppercase font-sans">
                <Lock className="h-3 w-3" /> Secure Encrypted Checkout
              </div>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}
