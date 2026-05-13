"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Signed out successfully");
      window.location.href = "/login";
    }
  };

  const navLinks = [
    { label: "My Profile", href: "/profile" },
    { label: "My Orders", href: "/profile/orders" },
    { label: "My Wishlist", href: "/profile/wishlist" },
    { label: "Account Settings", href: "/profile/settings" },
  ];

  return (
    <div className="max-w-[1440px] mx-auto px-[5vw] pt-20 pb-32 min-h-screen bg-[#FDFDFD]">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-20">
        {/* Navigation Sidebar */}
        <div className="lg:col-span-1 space-y-2 border-r border-zinc-50 pr-10">
          {navLinks.map((item, i) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={i}
                href={item.href} 
                className={`block py-4 px-2 font-sans text-[11px] uppercase tracking-[0.2em] transition-all border-b border-transparent hover:border-zinc-200 ${
                  isActive ? "text-[#ED4064] font-bold border-zinc-900" : "text-zinc-400"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <button 
            onClick={handleSignOut}
            className="w-full text-left py-4 px-2 font-sans text-[11px] uppercase tracking-[0.2em] text-zinc-300 hover:text-red-500 transition-colors mt-12"
          >
            Sign Out
          </button>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3">
          {children}
        </div>
      </div>
    </div>
  );
}
