import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="relative w-full pt-12 pb-8 px-[5vw] bg-white dark:bg-zinc-950 border-t border-zinc-100 dark:border-zinc-900">
      <div className="max-w-[1920px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-10">
          
          {/* Brand Story */}
          <div className="md:col-span-5 space-y-8">
            <Link href="/" className="block">
              <Image 
                src="/waafa-logo.jpeg" 
                alt="WAAFA Logo" 
                width={120} 
                height={120} 
                className="object-contain w-auto h-16 rounded-full grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-500" 
              />
            </Link>
            <p className="font-serif italic text-xl text-zinc-400 max-w-sm leading-relaxed">
              "Elegance in each fabric, perfection in every silhouette."
            </p>
          </div>
          
          {/* Quick Links */}
          <div className="md:col-span-7 flex flex-wrap justify-start md:justify-end gap-x-16 gap-y-10">
            <div className="space-y-6">
              <h4 className="font-sans text-[10px] uppercase tracking-[0.3em] text-zinc-900 dark:text-white font-semibold">Information</h4>
              <nav className="flex flex-col gap-4">
                <Link href="/privacy" className="font-sans text-[11px] uppercase tracking-widest text-zinc-400 hover:text-[#ED4064] transition-colors">Privacy Policy</Link>
                <Link href="/terms" className="font-sans text-[11px] uppercase tracking-widest text-zinc-400 hover:text-[#ED4064] transition-colors">Terms of Service</Link>
              </nav>
            </div>

            <div className="space-y-6">
              <h4 className="font-sans text-[10px] uppercase tracking-[0.3em] text-zinc-900 dark:text-white font-semibold">Shopping</h4>
              <nav className="flex flex-col gap-4">
                <Link href="/delivery" className="font-sans text-[11px] uppercase tracking-widest text-zinc-400 hover:text-[#ED4064] transition-colors">Delivery & Returns</Link>
                <Link href="/contact" className="font-sans text-[11px] uppercase tracking-widest text-zinc-400 hover:text-[#ED4064] transition-colors">Contact Us</Link>
              </nav>
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="pt-10 border-t border-zinc-50 dark:border-zinc-900/50 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-zinc-300">
            © 2026 WAAFA. ALL RIGHTS RESERVED.
          </p>
          <p className="font-sans text-[9px] uppercase tracking-[0.3em] text-zinc-300">
            Developed and maintained by <a href="https://stovamedia.in" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-[#ED4064] transition-colors font-semibold">Stova Media</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
