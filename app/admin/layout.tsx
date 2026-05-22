"use client";

import React from "react";
import Link from "next/link";
import "../globals.css";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

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
    { href: "/admin", label: "Dashboard", icon: "dashboard_customize" },
    { label: "Products", href: "/admin/products", icon: "inventory_2" },
    { label: "Orders", href: "/admin/orders", icon: "shopping_cart" },
    { label: "Settings", href: "/admin/settings", icon: "settings" },
  ];

  return (
    <div className="bg-[#fbf9f8] text-[#1b1c1b] font-body antialiased min-h-screen flex flex-col lg:flex-row selection:bg-[#ED4064] selection:text-white">
      {/* Shared Component: SideNavBar */}
      <nav className="bg-white dark:bg-stone-900 rounded-none w-full lg:w-64 lg:h-full lg:fixed left-0 top-0 flex flex-col border-b lg:border-b-0 lg:border-r border-zinc-100 dark:border-stone-800/20 pt-6 lg:pt-10 pb-6 z-50 shadow-sm">
        {/* Header */}
        <div className="px-8 mb-12">
          <Link href="/">
            <Image src="/waafa-logo.jpeg" alt="WAAFA Logo" width={120} height={48} className="object-contain w-auto h-10 mb-2" />
          </Link>
          <p className="font-sans text-[10px] tracking-[0.2em] text-zinc-400 uppercase mt-2">The Digital Studio</p>
        </div>

        {/* Navigation Links */}
        <ul className="flex lg:flex-col overflow-x-auto gap-1 font-sans text-[11px] tracking-widest uppercase">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.href}>
                <Link 
                  href={link.href} 
                  className={`flex items-center gap-4 px-8 py-4 transition-all duration-300 ${
                    isActive 
                      ? "text-[#ED4064] border-r-2 border-[#ED4064] bg-zinc-50 font-bold" 
                      : "text-zinc-400 hover:text-zinc-900 hover:bg-zinc-50"
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}>
                    {link.icon}
                  </span>
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Bottom Tab */}
        <div className="mt-4 lg:mt-auto hidden lg:block border-t border-zinc-50">
          <button 
            onClick={handleSignOut}
            className="w-full flex items-center gap-4 px-8 py-5 transition-all duration-300 font-sans text-[11px] tracking-widest uppercase text-zinc-400 hover:text-red-500 hover:bg-red-50"
          >
            <span className="material-symbols-outlined text-[18px]">logout</span>
            Sign Out
          </button>
        </div>
      </nav>

      {/* Main Content Canvas */}
      <main className="lg:ml-64 flex-1 p-6 lg:p-16 max-w-7xl w-full bg-[#FDFDFD]">
        {children}
      </main>
    </div>
  );
}
