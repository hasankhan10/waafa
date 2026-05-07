import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default async function ProductDetailsPage({ params }: { params: { id: string } }) {
  // In a real app, you would fetch the product details using the id.
  // For now, using mock data.
  const { id } = await params;
  
  return (
    <div className="max-w-[1440px] mx-auto px-[5vw] pt-12">
      {/* Product Detail Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 mb-32">
        {/* Left: High Impact Gallery */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <div className="w-full aspect-[3/4] overflow-hidden bg-surface-container-low group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCbBQQB7YDNwT7p1M6wbAQgKLzlTcwMfsz-tPn8kiGvmh3pL2PPx_R1esBLpqJCHE3kzkv6gepKlAU6910UeisJvuuNVTBs8hvd8TXYY5dDfRihWwU1qm0CyRI1vtKBN1FaxfiEevZ1so5g0RnlvjKU-0y9kXSrJh_FPhBWr6YZTzCYtcLgKNsCXyfI2um7ent5XPVVZyiJTIzO_2MpyFrAoipHI0cFRAJ61z9BrhpJc_SW7QRHwEEY1bySxZzugOfRd1xbsOD1y4w"
              alt="The Crimson Siren"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="aspect-[3/4] overflow-hidden bg-surface-container-low">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDnUm7fMBUNIOceADglEGJ79a1ChnhLvajvLLlJN8Q54EV5e48E29qRyiGJ9qQUb5QvWXtZt3HVTZXIOeSXrrtThd5zD4LpGtLqCLqHZkI7Mv2Mf3rbxlXPkoty39mzE7LwfGAY1bW79HYtEYIVBXblgRceEm2nLMk63BIOPdWYd9SCZE2TcRDQiM5cgRMQUhHSlOwvbz2IdSTnwhjy6VL6cH22xOPDyw4EGIcpmhKUfmqgYu3wdjRjWRLb25Q2HB4SAg9Eg7b3vxs"
                alt="Detail shot lace"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="aspect-[3/4] overflow-hidden bg-surface-container-low">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAueX3jk-3MgAAOpvtTO72ue91dMN4FbHiJEYJWJ78wU58g0DqQcpPvCl4nuUxX87lGXQVehlH5b1FZbUd_JF9x9lcnUKsZYVkZfpCTHT3WxOdK5NZYvvWwDnATZvn3YQrCvl5mrk7F78JO9-JkrnefEOPBJfKFhoc3dgzlRKi-_peZW6uLI0tQOq884TRbBVERNUrIrmrJa8RSItHA263vR1GtjB6O02Uud3q4aNU5tbbBV8wLj6DLmVCy2-K_t_n0wLtgcVmQ7ig"
                alt="Detail shot drape"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Right: Product Info */}
        <div className="lg:col-span-5 lg:sticky lg:top-32 self-start space-y-8">
          <div>
            <span className="font-label-caps text-label-caps text-secondary mb-2 block">Premium Couture Collection</span>
            <h1 className="font-headline-lg text-headline-lg text-on-surface mb-4">The Crimson Siren</h1>
            <p className="font-body-lg text-body-lg text-[#ED4064] font-semibold">₹3,400.00</p>
          </div>
          
          <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
            A masterpiece of digital couture, this gown is crafted from the finest silk organza and features hand-applied lace details that catch the light with every movement.
          </p>
          
          {/* Color Selection */}
          <div className="space-y-3">
            <p className="font-label-caps text-label-caps uppercase tracking-widest text-secondary">
              Color: <span className="text-on-surface">Crimson</span>
            </p>
            <div className="flex gap-4">
              <button aria-label="Crimson" className="w-8 h-8 rounded-full bg-[#ED4064] border-2 border-[#ED4064] ring-2 ring-offset-2 ring-[#ED4064]/20"></button>
              <button aria-label="Midnight" className="w-8 h-8 rounded-full bg-slate-900 border border-slate-200"></button>
              <button aria-label="Blush" className="w-8 h-8 rounded-full bg-[#F5E1E1] border border-slate-200"></button>
            </div>
          </div>
          
          {/* Size Selection */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <p className="font-label-caps text-label-caps uppercase tracking-widest text-secondary">Select Size</p>
              <button className="text-xs underline text-secondary hover:text-[#ED4064] transition-colors">Size Guide</button>
            </div>
            <div className="grid grid-cols-4 gap-2">
              <button className="py-3 border border-slate-200 text-sm hover:border-on-surface transition-all">US 0</button>
              <button className="py-3 border border-on-surface text-sm bg-on-surface text-white">US 2</button>
              <button className="py-3 border border-slate-200 text-sm hover:border-on-surface transition-all">US 4</button>
              <button className="py-3 border border-slate-200 text-sm hover:border-on-surface transition-all">US 6</button>
              <button className="py-3 border border-slate-200 text-sm hover:border-on-surface transition-all">US 8</button>
              <button className="py-3 border border-slate-200 text-sm hover:border-on-surface transition-all">US 10</button>
              <button className="py-3 border border-slate-200 text-sm hover:border-on-surface transition-all">US 12</button>
            </div>
          </div>
          
          {/* CTA Button */}
          <div className="pt-4">
            <Link href="/cart">
              <button className="w-full bg-[#ED4064] text-white font-label-caps text-label-caps py-5 tracking-[0.2em] uppercase hover:bg-[#D63056] active:scale-[0.98] transition-all">
                Add to Bag
              </button>
            </Link>
          </div>
          
          {/* Trust Badges */}
          <div className="pt-8 border-t border-slate-100 grid grid-cols-2 gap-4">
            <div className="flex items-center gap-3 text-xs text-secondary">
              <span className="material-symbols-outlined text-lg">local_shipping</span>
              Complimentary Shipping
            </div>
            <div className="flex items-center gap-3 text-xs text-secondary">
              <span className="material-symbols-outlined text-lg">verified</span>
              Authenticity Guaranteed
            </div>
          </div>
        </div>
      </div>

      {/* You May Also Like Section */}
      <section className="mb-32">
        <div className="flex justify-between items-end mb-12">
          <h3 className="font-label-caps text-label-caps tracking-[0.3em] uppercase">You May Also Like</h3>
          <div className="flex gap-4">
            <button className="w-10 h-10 border border-slate-200 rounded-full flex items-center justify-center hover:border-[#ED4064] hover:text-[#ED4064] transition-all">
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <button className="w-10 h-10 border border-slate-200 rounded-full flex items-center justify-center hover:border-[#ED4064] hover:text-[#ED4064] transition-all">
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        </div>
        <div className="flex overflow-x-auto gap-8 pb-8 no-scrollbar">
          {/* Related Product 1 */}
          <div className="min-w-[300px] group cursor-pointer">
            <div className="aspect-[3/4] bg-surface-container-low overflow-hidden mb-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA742sAQhnclmltfyqbG6JhFR23oRx89jCleAIcHOTLBHVOZr2Vz31-uFvpzR6juVLj2a9iDS_M0bjWmHYvci9p1CtxfaF_Wf6Yyu3ok22vHgjc8JqyiMbc8sc0BJxL_gE6PY6DvJXouljvLNrE4SnQOB8bjH5JadFLp8OYHBm2QKVxfX2EHUxq_7YGVyyrqE40oVInXMHkmQCXdM7OJQsmAQJHE5yMH0s4tfU8MieOSTjpgp5ptUeosm5iNz7N0c9WzMXxH90ygo0"
                alt="The Midnight Serenade"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <p className="font-headline-md text-base">The Midnight Serenade</p>
            <p className="font-body-md text-slate-500">₹2,900.00</p>
          </div>
          {/* Related Product 2 */}
          <div className="min-w-[300px] group cursor-pointer">
            <div className="aspect-[3/4] bg-surface-container-low overflow-hidden mb-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC7E3kpSfEwhjU9DdjDr83qSopxzz9kn7xVRoIO5T6XgaqkftEjonq9UQmiR4UwQ8l7rTWLymhyKpTckEOkg0xGbZ8gNRY6q8hpknbLGFImcaLoyLqZcyQSqJQBdhWO58GowOsMBGTlJ5Hk04qq3-UgA-WGR-UQzIJGn0aqDcb_fZSh1-aZp3J1rxyF9Zy2JHEY8_cB5g5j25PQ8aeTzn6f1eZEm-riGH66-tyS7lqnD28HqllNnWKJpJ8YZWho-FoD_eeEWuwUdLs"
                alt="The Blush Blossom"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <p className="font-headline-md text-base">The Blush Blossom</p>
            <p className="font-body-md text-slate-500">₹4,100.00</p>
          </div>
          {/* Related Product 3 */}
          <div className="min-w-[300px] group cursor-pointer">
            <div className="aspect-[3/4] bg-surface-container-low overflow-hidden mb-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB8eip5ZCtfoQJ95mcTvHa-Rr-oP7SDPkz_fiSSApzYSwqlxXPC97gVQfAkm7YWpFsmkZH2XzlahLKSh-ULDSrZH_ItRovp2TxFPVML_1BX3KOST41XgIWd1_dUUG3fDBCFFYalEakJOTePUW1roqHcZ7peS3b4MHo8ILyG98NMIx595li1vXLPcP7BPM6gfoWSoiEfApo1v4lpNNkHAAAldkCR5m-PIZdz_-mjZqVIhnshhmbUZR3ErX1mxACNJSJ4lZJYEx4Yr6Y"
                alt="The Ivory Monolith"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <p className="font-headline-md text-base">The Ivory Monolith</p>
            <p className="font-body-md text-slate-500">₹3,750.00</p>
          </div>
        </div>
      </section>
    </div>
  );
}
