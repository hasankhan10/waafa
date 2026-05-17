"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

interface FooterProps {
  description?: string;
  copyright?: string;
}

export default function Footer({
  description = "Elegance in each fabric, perfection in every silhouette. Handcrafted digital couture collections designed to redefine modern Indian luxury.",
  copyright = "© 2026 WAAFA. All rights reserved.",
}: FooterProps) {
  const sections = [
    {
      title: "Collection",
      links: [
        { name: "All Products", href: "/products" },
        { name: "Categories", href: "/categories" },
        { name: "New Arrivals", href: "/" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About Us", href: "/about" },
        { name: "Philosophy", href: "/about" },
        { name: "Contact", href: "/contact" },
      ],
    },
    {
      title: "Info",
      links: [
        { name: "Delivery & Returns", href: "/delivery" },
        { name: "Terms of Service", href: "/terms" },
        { name: "Privacy Policy", href: "/privacy" },
      ],
    },
  ];

  const socialLinks = [
    { icon: <FaInstagram className="h-5 w-5" />, href: "https://instagram.com/Waafaindia", label: "Instagram" },
    { icon: <FaFacebook className="h-5 w-5" />, href: "https://facebook.com/Waafaindia", label: "Facebook" },
  ];

  return (
    <footer className="relative w-full py-12 px-[5vw] bg-zinc-50 dark:bg-zinc-950 border-t border-zinc-100 dark:border-zinc-900">
      <div className="max-w-[1920px] mx-auto">
        <div className="flex w-full flex-col justify-between gap-12 lg:flex-row lg:items-start lg:text-left">
          
          {/* Logo & Description */}
          <div className="flex w-full flex-col justify-between gap-6 lg:items-start lg:max-w-md">
            <div className="flex items-center gap-3">
              <Link href="/">
                <Image
                  src="/waafa-logo.jpeg"
                  alt="WAAFA Logo"
                  width={100}
                  height={100}
                  className="object-contain w-auto h-12 rounded-sm"
                />
              </Link>
            </div>
            <p className="font-serif italic text-lg text-zinc-500 leading-relaxed">
              "{description}"
            </p>
            <ul className="flex items-center space-x-6 text-zinc-400">
              {socialLinks.map((social, idx) => (
                <li key={idx} className="font-medium hover:text-[#ED4064] transition-colors">
                  <a href={social.href} aria-label={social.label} target="_blank" rel="noopener noreferrer">
                    {social.icon}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Links Sections */}
          <div className="grid w-full gap-8 grid-cols-2 md:grid-cols-3 lg:gap-20 lg:max-w-2xl">
            {sections.map((section, sectionIdx) => (
              <div key={sectionIdx} className="space-y-6">
                <h3 className="font-sans text-xs uppercase tracking-[0.3em] text-zinc-900 dark:text-white font-semibold">
                  {section.title}
                </h3>
                <ul className="space-y-4 text-sm font-medium text-zinc-400">
                  {section.links.map((link, linkIdx) => (
                    <li key={linkIdx} className="hover:text-[#ED4064] transition-colors">
                      <Link href={link.href} className="font-sans tracking-wider uppercase text-xs">
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col justify-between gap-6 border-t border-zinc-100 dark:border-zinc-900/50 pt-8 text-xs font-sans tracking-[0.2em] text-zinc-300 md:flex-row md:items-center">
          <p className="order-2 md:order-1 uppercase">
            {copyright}
          </p>
          <div className="order-1 flex flex-col md:flex-row gap-4 md:items-center">
            <span className="text-[10px] uppercase tracking-[0.3em] text-zinc-300">
              Developed and maintained by{" "}
              <a
                href="https://stovamedia.in"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 hover:text-[#ED4064] transition-colors font-semibold"
              >
                Stova Media
              </a>
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}
