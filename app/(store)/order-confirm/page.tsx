import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function OrderConfirmationPage() {
  return (
    <div className="relative min-h-screen pt-12 pb-20 px-[5vw] overflow-hidden max-w-[1440px] mx-auto">
      {/* Background Atmospheric Element */}
      <div className="absolute top-0 right-0 w-[60vw] h-[60vw] bg-[radial-gradient(circle_at_center,rgba(237,64,100,0.08)_0%,transparent_70%)] -z-10 translate-x-1/4 -translate-y-1/4"></div>
      
      <div className="flex flex-col items-center text-center mb-12">
        <div className="w-16 h-16 rounded-full border border-primary/20 flex items-center justify-center mb-6">
          <span className="material-symbols-outlined text-primary text-3xl font-[200]">check</span>
        </div>
        <h1 className="font-display-xl text-display-xl text-[#ED4064] mb-2">Thank You</h1>
        <p className="font-body-lg text-body-lg text-zinc-600 dark:text-zinc-400 mb-1">Your order #WF-88291 has been successfully placed.</p>
        <p className="font-label-caps text-label-caps text-zinc-400">A CONFIRMATION EMAIL HAS BEEN SENT TO YOUR INBOX.</p>
      </div>

      {/* Bento Grid Layout for Order Info */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Details */}
        <div className="lg:col-span-7 space-y-8">
          <div className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-[40px] p-10 border border-white/40 dark:border-zinc-800 rounded-DEFAULT">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h3 className="font-label-caps text-label-caps mb-6 text-zinc-400">SHIPPING ADDRESS</h3>
                <div className="font-body-md text-zinc-900 dark:text-zinc-100 leading-relaxed">
                  Julianne V. Sterling<br />
                  1104 Fifth Avenue, Apt 4C<br />
                  New York, NY 10028<br />
                  United States
                </div>
              </div>
              <div>
                <h3 className="font-label-caps text-label-caps mb-6 text-zinc-400">DELIVERY METHOD</h3>
                <div className="font-body-md text-zinc-900 dark:text-zinc-100">
                  Express White Glove<br />
                  <span className="text-zinc-600 dark:text-zinc-400 italic">Scheduled for Tuesday, Oct 24th</span>
                </div>
              </div>
              <div>
                <h3 className="font-label-caps text-label-caps mb-6 text-zinc-400">PAYMENT</h3>
                <div className="flex items-center gap-3 font-body-md text-zinc-900 dark:text-zinc-100">
                  <span className="material-symbols-outlined text-zinc-400">credit_card</span>
                  Visa ending in 4242
                </div>
              </div>
              <div className="flex flex-col justify-end">
                <Link href="/profile" className="group flex items-center gap-2 text-primary font-label-caps text-label-caps">
                  TRACK YOUR ORDER 
                  <span className="material-symbols-outlined text-[16px] transition-transform group-hover:translate-x-1">arrow_forward</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Asymmetric Graphic Section */}
          <div className="relative h-96 overflow-hidden rounded-DEFAULT group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuD1jcW4zCWS3L4PvSv39EqEQyPxR_sug6qoCptvv46oW1prNKyZUZ-u7JE_VTGIMotz7-pOiPFT64A9NpGwcKNx2iZyoKpVVIt1viawuh55XEmdqhbe1j1a1XLYbPQR04SiSU3DrUWmb2KdUryvJbjDmGctrg26XUWn8uZkw_4iyxCkwqpIzGK4m3bqr9KjF89vXyq8jvOID4uEGpUJYS1oTs5y2K6o-j1pFOGXxOdqp6tsQDDdjUetCquFXhA0yJXFhuPURAmms_I" 
              alt="Experience Couture" 
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/60 to-transparent flex flex-col justify-end p-10">
              <span className="font-label-caps text-white mb-2">EXPERIENCE COUTURE</span>
              <h2 className="font-headline-lg text-white text-headline-lg italic">The art of fine tailoring.</h2>
            </div>
          </div>
        </div>

        {/* Right Column: Itemized Summary */}
        <div className="lg:col-span-5">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 p-10 rounded-DEFAULT sticky top-32">
            <h3 className="font-label-caps text-label-caps mb-10 text-zinc-400 pb-4 border-b border-zinc-50 dark:border-zinc-800">ORDER SUMMARY</h3>
            <div className="space-y-10 mb-12">
              {/* Item 1 */}
              <div className="flex gap-6">
                <div className="w-24 h-32 bg-zinc-50 overflow-hidden flex-shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBArNiJH2P-MBG8VVjHCkirLOHytxAPFHezysVopEZzCykNBQIUKf2yYYaD1yjisn8j1l0QHWiGKI-cKaaCUZ7inMmr1K4BdSuyx2qnR3togrv96cKcq65tQzqb0AIrZONvNmPz71oZe-wQ_VNrUeO7t7EPEIvTEz653L3VwCjLblm-G_C2_jlGvU1DZ17CZlTPBLsF52VBwYTF5vtYdxqdIfV3AqTYBPUt2q6gGTOfowcEw4GXeiwYOA1mbFF3htHidYv_XYzULFA" alt="The Crimson Siren" className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col justify-between py-1">
                  <div>
                    <h4 className="font-headline-md text-body-lg mb-1 italic">The Crimson Siren</h4>
                    <p className="font-label-caps text-[10px] text-zinc-600 dark:text-zinc-400">SIZE: IT 40 | QTY: 1</p>
                  </div>
                  <span className="font-body-md text-zinc-900 dark:text-zinc-100">₹2,450.00</span>
                </div>
              </div>
              {/* Item 2 */}
              <div className="flex gap-6">
                <div className="w-24 h-32 bg-zinc-50 overflow-hidden flex-shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuD0XQreZkSEj9ejcTml1rWjTBGnfNnf5PkgJD7SyoJwStExW4r3uSt7nDPfLq2JuYsRktAyMINp0FqK5rWApGqtsxx0mRQG1mE8YixijbC62UWqtVNdshV6fZL5AlOwEiNyWXqQyVod_4CX2kubHa2sIO_OytYlGntekScPrHBeP06VfTyMZInAdJ57NqhtEYLhR2JmknuW8WovXJZ2RIChREw4kr5zNiTtRNxI-mKrCj4BPV9b0WWUJNfIKN1Kp2bsgZbJ85rbQZc" alt="Gilded Petal Brooch" className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col justify-between py-1">
                  <div>
                    <h4 className="font-headline-md text-body-lg mb-1 italic">Gilded Petal Brooch</h4>
                    <p className="font-label-caps text-[10px] text-zinc-600 dark:text-zinc-400">COLLECTION: ATELIER | QTY: 1</p>
                  </div>
                  <span className="font-body-md text-zinc-900 dark:text-zinc-100">₹890.00</span>
                </div>
              </div>
            </div>

            {/* Calculations */}
            <div className="space-y-4 pt-8 border-t border-zinc-50 dark:border-zinc-800">
              <div className="flex justify-between font-body-md text-zinc-600 dark:text-zinc-400">
                <span>Subtotal</span>
                <span>₹3,340.00</span>
              </div>
              <div className="flex justify-between font-body-md text-zinc-600 dark:text-zinc-400">
                <span>Shipping</span>
                <span className="uppercase tracking-widest text-[11px]">Complimentary</span>
              </div>
              <div className="flex justify-between font-body-md text-zinc-600 dark:text-zinc-400">
                <span>Taxes</span>
                <span>₹25.00</span>
              </div>
              <div className="flex justify-between items-end pt-6">
                <span className="font-label-caps text-label-caps">TOTAL</span>
                <span className="font-headline-lg text-primary text-3xl">₹3,365.00</span>
              </div>
            </div>

            <div className="mt-12 space-y-4">
              <Link href="/">
                <button className="w-full py-5 bg-[#ED4064] text-white font-label-caps text-label-caps tracking-[0.2em] hover:brightness-110 active:scale-[0.98] transition-all">
                  CONTINUE SHOPPING
                </button>
              </Link>
              <p className="text-center text-[10px] font-label-caps text-zinc-400 pt-4 leading-relaxed">
                NEED ASSISTANCE? CONTACT OUR CONCIERGE AT<br />
                <span className="text-zinc-900 dark:text-zinc-100 underline decoration-zinc-200">CONCIERGE@DIGITALCOUTURE.COM</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
