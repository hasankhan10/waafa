import React from "react";
import Link from "next/link";
import "../globals.css";

import Image from "next/image";

export const metadata = {
  title: "WAAFA - Atelier Overview",
  description: "The Digital Atelier for WAAFA",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-[#fbf9f8] text-[#1b1c1b] font-body antialiased min-h-screen flex flex-col lg:flex-row selection:bg-[#d93057] selection:text-[#fffbff]">
      {/* Shared Component: SideNavBar */}
      <nav className="bg-stone-100 dark:bg-stone-900 rounded-none w-full lg:w-64 lg:h-full lg:fixed left-0 top-0 flex flex-col border-b lg:border-b-0 lg:border-r border-stone-200/20 dark:border-stone-800/20 pt-6 lg:pt-10 pb-6 z-50">
        {/* Header */}
        <div className="px-8 mb-12">
          <Link href="/">
            <Image src="/waafa-logo.jpeg" alt="WAAFA Logo" width={120} height={48} className="object-contain w-auto h-10 mb-2" />
          </Link>
          <p className="font-['Inter'] text-sm tracking-wide text-rose-800 dark:text-rose-400 mt-2">The Digital Atelier</p>
        </div>

        {/* Navigation Links */}
        <ul className="flex lg:flex-col overflow-x-auto gap-2 font-['Inter'] text-sm tracking-wide">
          {/* Active Tab: Atelier Overview */}
          <li>
            <Link href="/admin" className="flex items-center gap-4 text-rose-800 dark:text-rose-400 border-l-[3px] border-rose-800 dark:border-rose-400 pl-6 py-3 bg-stone-200/50 dark:bg-stone-800/50 ease-in-out duration-200">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>dashboard_customize</span>
              Atelier Overview
            </Link>
          </li>
          {/* Inactive Tabs */}
          <li>
            <Link href="/admin/collections" className="flex items-center gap-4 text-stone-500 dark:text-stone-400 pl-[27px] py-3 hover:bg-stone-200/30 dark:hover:bg-stone-800/30 transition-colors ease-in-out duration-200">
              <span className="material-symbols-outlined">auto_awesome_motion</span>
              Collections
            </Link>
          </li>
          <li>
            <Link href="/admin/orders" className="flex items-center gap-4 text-stone-500 dark:text-stone-400 pl-[27px] py-3 hover:bg-stone-200/30 dark:hover:bg-stone-800/30 transition-colors ease-in-out duration-200">
              <span className="material-symbols-outlined">ink_highlighter</span>
              Orders
            </Link>
          </li>
          <li>
            <Link href="/admin/circle" className="flex items-center gap-4 text-stone-500 dark:text-stone-400 pl-[27px] py-3 hover:bg-stone-200/30 dark:hover:bg-stone-800/30 transition-colors ease-in-out duration-200">
              <span className="material-symbols-outlined">loyalty</span>
              WAAFA Circle
            </Link>
          </li>
        </ul>

        {/* Bottom Tab */}
        <div className="mt-4 lg:mt-auto hidden lg:block">
          <Link href="/admin/settings" className="flex items-center gap-4 text-stone-500 dark:text-stone-400 pl-[27px] py-3 hover:bg-stone-200/30 dark:hover:bg-stone-800/30 transition-colors ease-in-out duration-200 font-['Inter'] text-sm tracking-wide">
            <span className="material-symbols-outlined">tune</span>
            Settings
          </Link>
        </div>
      </nav>

      {/* Main Content Canvas */}
      <main className="lg:ml-64 flex-1 p-6 lg:p-16 max-w-7xl w-full">
        {children}
      </main>
    </div>
  );
}
