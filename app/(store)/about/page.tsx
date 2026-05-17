import React from "react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="max-w-[1440px] mx-auto px-[5vw] pt-24 pb-32">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Text Section */}
        <div>
          <span className="font-label-caps text-label-caps text-primary tracking-[0.2em] uppercase mb-4 block">The Vision</span>
          <h1 className="font-headline-lg text-headline-lg text-on-surface mb-6">Redefining Digital Couture</h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed mb-8">
            At WAAFA, we believe that elegance transcends the physical realm. Founded on the principles of impeccable craftsmanship and modern aesthetics, our digital atelier brings haute couture to the digital frontier. Every gown, every stitch, and every silhouette is designed with absolute precision.
          </p>
          <Button asChild className="bg-[#ED4064] text-white hover:bg-[#D63056] rounded-none px-8 py-6 uppercase font-sans text-xs tracking-[0.2em]">
            <Link href="/products">Explore Collections</Link>
          </Button>
        </div>
        {/* Image Section */}
        <div className="aspect-[4/5] bg-surface-container-low overflow-hidden relative">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCWvqWeFtU2cmqOOx1DXnUaP-RNNKygrfQAS3h_9NbtzsSjMBDYfk10XCvIFnGNXmHZ06OsbxFKcihGgiyOcKrA2g8WQlI7EG6GZqLckkkmYa0cAgKdBts_ju6j6awJwfnKnMcbgW2Aon7CLdOpeyJr27gXn2zGPzNkz1SGewl6IAnWmJEjctfEx6pRIp57QHbUTKaVt1YOg-DHbCFxoDwvARESVyl97jik2w8uN6-kX8zxx7afTXO3cy_QGAcNi9SD_YmqXno38T4" 
            alt="About WAAFA" 
            className="w-full h-full object-cover grayscale-[30%] hover:grayscale-0 transition-all duration-700" 
          />
        </div>
      </div>
    </div>
  );
}
