import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function CartPage() {
  const cartItems = [
    {
      id: "1",
      title: "The Crimson Siren",
      price: "₹4,200",
      category: "EVENING WEAR / COUTURE",
      size: "FR 36",
      quantity: "01",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuA7GOlehyNNSv-tVGJiLY_O14dTNeWP-0c4m5i9DySBixAM15KlcUeeg_XuAIwoerAJfxE5G2AbDUHCpOkK1IuN5xofKghmERCY_QPGGXiDipzJ6pRJZhcKg-gBc5YQJL44-QYD1ptaa_Nj86kv02OdB5x_EfnFH-7IzZR1P6pT8CY3_BH2DLwcMcyZAjuY-OBA-ikOFBwny7ASryT8_jcg7-x8UnMEjDHUNtvb3oy4vgw5hkHW57BPRJlAQI9Io8G2XZoO4-r4DE8",
    },
    {
      id: "2",
      title: "Ethereal Lace Blouse",
      price: "₹1,850",
      category: "SPRING COLLECTION / READY-TO-WEAR",
      size: "Small",
      quantity: "01",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCTyFhAhm4Ezqxukf6H9L9yt5jmWyeOkeBXSaoD6CWh1Wh6QZX3NgdyIKs6vgnYMvkENPCCuQwH6vFgGryQYgbjrCREaOY_DHrtr4f2DYbuw8l1wzZ7DOHznZ5gsF-LB9N6lL6cijKPRzaqFPTUoeUw6igzGlK0j3m8LyZyCWC5cRd2dlQkEC-T9LGm2SfGiJ6vtYiIH1dgDIcatVdgAB9rbJYgJiseGx56FNZNg1KxSPYtif4B3FR7n0t_X7vGkiNlpy-zYBTIjGQ",
    }
  ];

  return (
    <div className="max-w-[1440px] mx-auto px-[5vw] pt-12 pb-32">
      {/* Elegant Heading */}
      <div className="mb-16">
        <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight mb-2">Your Shopping Bag</h1>
        <p className="font-label-caps text-label-caps text-secondary opacity-60">2 ITEMS IN YOUR SELECTION</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Product List */}
        <div className="lg:col-span-8 space-y-12">
          {cartItems.map((item) => (
            <div key={item.id} className="flex flex-col md:flex-row gap-8 items-start pb-12 border-b border-surface-variant">
              <div className="w-full md:w-48 aspect-[3/4] bg-surface-container-low overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-700"
                />
              </div>
              <div className="flex-grow space-y-4">
                <div className="flex justify-between items-start">
                  <h2 className="font-headline-md text-[24px] text-on-surface">{item.title}</h2>
                  <p className="font-body-lg text-on-surface">{item.price}</p>
                </div>
                <p className="font-label-caps text-[11px] text-secondary">{item.category}</p>
                
                <div className="flex gap-12 pt-4">
                  <div>
                    <span className="font-label-caps text-[10px] text-outline block mb-2">SIZE</span>
                    <span className="font-body-md text-on-surface">{item.size}</span>
                  </div>
                  <div>
                    <span className="font-label-caps text-[10px] text-outline block mb-2">QUANTITY</span>
                    <div className="flex items-center gap-4">
                      <button className="material-symbols-outlined text-sm text-outline hover:text-primary transition-colors">remove</button>
                      <span className="font-body-md">{item.quantity}</span>
                      <button className="material-symbols-outlined text-sm text-outline hover:text-primary transition-colors">add</button>
                    </div>
                  </div>
                </div>
                
                <div className="pt-6">
                  <button className="text-label-caps text-[10px] text-outline hover:text-primary border-b border-transparent hover:border-primary transition-all duration-300">
                    REMOVE ITEM
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary Sidebar */}
        <div className="lg:col-span-4">
          <div className="sticky top-32 bg-surface-container-lowest p-8 shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-surface-variant/30 rounded-xl">
            <h3 className="font-headline-md text-headline-md mb-8">Summary</h3>
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-between font-body-md">
                <span className="text-secondary">Subtotal</span>
                <span>₹6,050</span>
              </div>
              <div className="flex justify-between font-body-md">
                <span className="text-secondary">Shipping</span>
                <span className="text-primary font-semibold tracking-wide">Complimentary</span>
              </div>
              <div className="flex justify-between font-body-md">
                <span className="text-secondary">Estimated Tax</span>
                <span>Calculated at checkout</span>
              </div>
            </div>
            
            <div className="pt-6 border-t border-surface-variant mb-8">
              <div className="flex justify-between items-baseline">
                <span className="font-label-caps text-[14px]">TOTAL</span>
                <span className="font-headline-md text-[28px]">₹6,050</span>
              </div>
            </div>
            
            <Link href="/checkout">
              <button className="w-full bg-primary text-white py-5 font-label-caps tracking-[0.2em] text-[13px] hover:bg-primary-container transition-colors duration-500 shadow-lg shadow-primary/20">
                PROCEED TO CHECKOUT
              </button>
            </Link>
            
            <div className="mt-8 flex items-center justify-center gap-2 opacity-50">
              <span className="material-symbols-outlined text-[16px]">lock</span>
              <span className="font-label-caps text-[10px]">SECURE ENCRYPTED CHECKOUT</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
