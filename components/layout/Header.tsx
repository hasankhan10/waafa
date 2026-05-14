"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabase";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [profileHref, setProfileHref] = useState("/login");

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('is_admin')
          .eq('id', user.id)
          .single();
        
        setProfileHref(profile?.is_admin ? "/admin" : "/profile");
      } else {
        setProfileHref("/login");
      }
    };
    checkUser();
  }, []);

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 bg-[#111111] border-b border-white/5 py-4">
        <div className="max-w-[1920px] mx-auto px-[5vw] flex justify-between items-center">
          {/* Logo */}
          <Link
            href="/"
            className="hover:opacity-80 transition-all duration-300 z-50"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <Image 
              src="/waafa-logo.jpeg" 
              alt="WAAFA Logo" 
              width={100} 
              height={100} 
              className="object-contain w-auto h-11 rounded-sm" 
            />
          </Link>
          
          {/* Navigation Links (Web) - Centered */}
          <nav className="hidden md:flex items-center gap-10 absolute left-1/2 -translate-x-1/2">
            {[
              { label: "Categories", href: "/categories" },
              { label: "Products", href: "/products" },
              { label: "About Us", href: "/about" },
              { label: "Contact Us", href: "/contact" },
            ].map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="group font-sans uppercase text-[11px] tracking-[0.2em] text-white/70 hover:text-white transition-colors duration-300"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          
          {/* Trailing Actions */}
          <div className="flex items-center gap-6 z-50">
            <Link
              href={profileHref}
              className="text-white/70 hover:text-white transition-all duration-300"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span className="material-symbols-outlined text-[20px]">person</span>
            </Link>
            <Link
              href="/cart"
              className="text-white/70 hover:text-white transition-all duration-300"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
            </Link>
            
            {/* Mobile Menu Toggle */}
            <button 
              className="md:hidden text-white hover:opacity-70 transition-opacity duration-300"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <span className="material-symbols-outlined text-[24px]">
                {isMobileMenuOpen ? "close" : "menu"}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-[#111111] z-40 transition-all duration-500 ease-in-out flex flex-col justify-center items-center ${
          isMobileMenuOpen ? "translate-y-0" : "-translate-y-full"
        } md:hidden`}
      >
        <nav className="flex flex-col items-center gap-10 text-center">
          {[
            { label: "Categories", href: "/categories" },
            { label: "Products", href: "/products" },
            { label: "About Us", href: "/about" },
            { label: "Contact Us", href: "/contact" },
          ].map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="font-serif italic text-3xl tracking-tight text-white hover:text-[#ED4064] transition-colors duration-300"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}
