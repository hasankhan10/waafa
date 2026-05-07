import Link from "next/link";

import Image from "next/image";

export default function Footer() {
  return (
    <footer className="relative w-full py-8 px-[5vw] bg-zinc-50 dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 max-w-[1920px] mx-auto">
        {/* Brand & Copyright */}
        <div className="md:col-span-4 flex flex-col justify-between">
          <Link href="/" className="mb-4 block">
            <Image src="/waafa-logo.jpeg" alt="WAAFA Logo" width={100} height={100} className="object-contain w-auto h-12 rounded-full grayscale hover:grayscale-0 transition-all duration-300" />
          </Link>
          <p className="font-serif text-zinc-800 dark:text-zinc-200 uppercase tracking-widest text-[10px] md:text-xs">
            © 2026 WAAFA. ELEGANCE IN EACH FABRIC.
          </p>
        </div>
        
        {/* Links Area (Span 8 columns to push right) */}
        <div className="md:col-span-8 flex flex-wrap justify-start md:justify-end gap-x-12 gap-y-6 items-end">
          <Link
            href="/privacy"
            className="font-serif text-zinc-500 dark:text-zinc-400 uppercase tracking-widest text-[10px] md:text-xs hover:text-[#ED4064] dark:hover:text-[#ED4064] transition-colors duration-300"
          >
            Privacy Policy
          </Link>
          <Link
            href="/terms"
            className="font-serif text-zinc-500 dark:text-zinc-400 uppercase tracking-widest text-[10px] md:text-xs hover:text-[#ED4064] dark:hover:text-[#ED4064] transition-colors duration-300"
          >
            Terms of Service
          </Link>
          <Link
            href="/shipping"
            className="font-serif text-zinc-500 dark:text-zinc-400 uppercase tracking-widest text-[10px] md:text-xs hover:text-[#ED4064] dark:hover:text-[#ED4064] transition-colors duration-300"
          >
            Shipping & Returns
          </Link>
          <Link
            href="/sustainability"
            className="font-serif text-zinc-500 dark:text-zinc-400 uppercase tracking-widest text-[10px] md:text-xs hover:text-[#ED4064] dark:hover:text-[#ED4064] transition-colors duration-300"
          >
            Sustainability
          </Link>
          <Link
            href="/contact"
            className="font-serif text-zinc-500 dark:text-zinc-400 uppercase tracking-widest text-[10px] md:text-xs hover:text-[#ED4064] dark:hover:text-[#ED4064] transition-colors duration-300"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </footer>
  );
}
