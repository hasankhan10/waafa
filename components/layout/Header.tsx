"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 w-full flex justify-between items-center px-[5vw] py-6 max-w-[1920px] mx-auto bg-white/80 dark:bg-zinc-950/80 backdrop-blur-[20px] z-50 shadow-none border-b border-zinc-100 dark:border-zinc-800">
        {/* Logo */}
        <Link
          href="/"
          className="hover:opacity-70 transition-opacity duration-300 z-50"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <Image src="/waafa-logo.jpeg" alt="WAAFA Logo" width={100} height={100} className="object-contain w-auto h-12 rounded-full" />
        </Link>
        
        {/* Navigation Links (Web) */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/collections"
            className="font-serif uppercase text-xs tracking-[0.15em] text-zinc-600 dark:text-zinc-400 hover:text-[#ED4064] dark:hover:text-[#ED4064] transition-colors duration-300"
          >
            Collections
          </Link>
          <Link
            href="/products"
            className="font-serif uppercase text-xs tracking-[0.15em] text-zinc-600 dark:text-zinc-400 hover:text-[#ED4064] dark:hover:text-[#ED4064] transition-colors duration-300"
          >
            Products
          </Link>
          <Link
            href="/about"
            className="font-serif uppercase text-xs tracking-[0.15em] text-zinc-600 dark:text-zinc-400 hover:text-[#ED4064] dark:hover:text-[#ED4064] transition-colors duration-300"
          >
            About Us
          </Link>
          <Link
            href="/contact"
            className="font-serif uppercase text-xs tracking-[0.15em] text-zinc-600 dark:text-zinc-400 hover:text-[#ED4064] dark:hover:text-[#ED4064] transition-colors duration-300"
          >
            Contact Us
          </Link>
        </nav>
        
        {/* Trailing Actions */}
        <div className="flex items-center gap-6 z-50">
          <Link
            href="/profile"
            className="text-[#ED4064] hover:opacity-70 transition-opacity duration-300"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <span className="material-symbols-outlined">person</span>
          </Link>
          <Link
            href="/cart"
            className="text-[#ED4064] hover:opacity-70 transition-opacity duration-300"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <span className="material-symbols-outlined">shopping_bag</span>
          </Link>
          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-[#ED4064] hover:opacity-70 transition-opacity duration-300"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span className="material-symbols-outlined">
              {isMobileMenuOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-white dark:bg-zinc-950 z-40 transition-transform duration-500 ease-in-out flex flex-col justify-center items-center ${
          isMobileMenuOpen ? "translate-y-0" : "-translate-y-full"
        } md:hidden`}
      >
        <nav className="flex flex-col items-center gap-8 text-center">
          <Link
            href="/collections"
            className="font-serif uppercase text-lg tracking-[0.2em] text-zinc-900 dark:text-white hover:text-[#ED4064] dark:hover:text-[#ED4064] transition-colors duration-300"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Collections
          </Link>
          <Link
            href="/products"
            className="font-serif uppercase text-lg tracking-[0.2em] text-zinc-900 dark:text-white hover:text-[#ED4064] dark:hover:text-[#ED4064] transition-colors duration-300"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Products
          </Link>
          <Link
            href="/about"
            className="font-serif uppercase text-lg tracking-[0.2em] text-zinc-900 dark:text-white hover:text-[#ED4064] dark:hover:text-[#ED4064] transition-colors duration-300"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            About Us
          </Link>
          <Link
            href="/contact"
            className="font-serif uppercase text-lg tracking-[0.2em] text-zinc-900 dark:text-white hover:text-[#ED4064] dark:hover:text-[#ED4064] transition-colors duration-300"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Contact Us
          </Link>
        </nav>
      </div>
    </>
  );
}
