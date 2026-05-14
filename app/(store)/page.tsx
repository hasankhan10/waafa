"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

interface Product {
  id: string;
  title: string;
  price: number;
  market_price: number;
  image_url: string;
  slug: string;
}

export default function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFeatured() {
      const { data } = await supabase
        .from('products')
        .select('id, title, price, market_price, image_url, slug')
        .limit(8)
        .order('created_at', { ascending: false });
      
      if (data) setFeaturedProducts(data);
      setLoading(false);
    }
    fetchFeatured();
  }, []);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBaB6Zz8sH_GQdtePqmNj-9gdDvuiC2IMDid2iJcCLizkxR5edp0BZhOyeU5PkwpGJSNdxsXpKj8ysqb5aHHgWc50gPrum72KjJ7ivSDrt0KPZG7-HR0Tk-vzwUH3Qjmb5qmzL5goucqoSaDOHSYNFXLKd422kwqf9swwxlZK_yHPdwuTFWd-Rbz0i0J1yePFc-t6m0zF3RboSyygp9EBHaLNZARKnwgI07RXtepDOfy63RNfzJyrEhX1-Bc1zRzrWPfyz7BCj3020"
            alt="WAAFA Haute Couture"
            className="w-full h-full object-cover object-center scale-105 animate-slow-zoom"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40"></div>
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto space-y-8">
          <div className="space-y-2">
            <p className="font-sans text-[11px] uppercase tracking-[0.5em] text-white/90 animate-fade-in-up">WAAFA Haute Couture</p>
            <h1 className="font-serif text-6xl md:text-8xl text-white italic tracking-tighter leading-none animate-fade-in-up delay-100">
              Elegance in <br /> each fabric.
            </h1>
          </div>
          <div className="flex flex-col md:flex-row gap-6 justify-center animate-fade-in-up delay-300">
            <Link 
              href="/categories" 
              className="px-12 py-5 bg-white text-zinc-900 font-sans text-[11px] font-semibold uppercase tracking-[0.3em] hover:bg-[#ED4064] hover:text-white transition-all duration-500"
            >
              Explore Categories
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Collection */}
      <section className="py-32 px-[5vw] bg-white">
        <div className="max-w-[1920px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="space-y-4">
              <p className="font-sans text-[10px] uppercase tracking-[0.4em] text-[#ED4064] font-bold">New Arrivals</p>
              <h2 className="font-serif text-5xl text-zinc-900 italic tracking-tight">The Digital Couture</h2>
            </div>
            <Link href="/products" className="font-sans text-[11px] uppercase tracking-[0.3em] text-zinc-400 hover:text-zinc-900 border-b border-zinc-100 pb-2 transition-all">
              View All Pieces
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="space-y-6 animate-pulse">
                  <div className="aspect-[3/4] bg-zinc-100"></div>
                  <div className="h-4 bg-zinc-100 w-2/3"></div>
                  <div className="h-3 bg-zinc-100 w-1/3"></div>
                </div>
              ))}
            </div>
          ) : featuredProducts.length === 0 ? (
            <div className="py-40 text-center border border-dashed border-zinc-100">
              <p className="font-serif italic text-zinc-300 text-2xl">Our studio is preparing the next collection.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
              {featuredProducts.map((product) => (
                <Link 
                  key={product.id} 
                  href={`/products/${product.id}`}
                  className="group block space-y-6"
                >
                  <div className="relative aspect-[3/4] overflow-hidden bg-zinc-50">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={product.image_url}
                      alt={product.title}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                    {product.market_price > product.price && (
                      <div className="absolute top-6 left-6 bg-[#ED4064] text-white px-3 py-1.5 text-[9px] font-sans tracking-[0.2em] uppercase">
                        {Math.round((1 - product.price / product.market_price) * 100)}% Off
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-serif text-xl text-zinc-900 tracking-tight group-hover:text-[#ED4064] transition-colors">
                      {product.title}
                    </h3>
                    <div className="flex items-center gap-4">
                      <span className="font-sans text-sm font-semibold text-zinc-900">₹{product.price.toLocaleString('en-IN')}</span>
                      {product.market_price > product.price && (
                        <span className="font-sans text-[11px] text-zinc-300 line-through">₹{product.market_price.toLocaleString('en-IN')}</span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Brand Philosophy */}
      <section className="py-40 bg-zinc-50 px-[5vw]">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <p className="font-sans text-[10px] uppercase tracking-[0.5em] text-[#ED4064]">Our Philosophy</p>
          <h3 className="font-serif text-4xl md:text-6xl text-zinc-900 italic leading-tight tracking-tighter">
            "We don't just create clothes; we curate emotions stitched in silk and stories woven in thread."
          </h3>
          <div className="w-20 h-[1px] bg-zinc-200 mx-auto"></div>
          <p className="font-sans text-[11px] uppercase tracking-[0.3em] text-zinc-400">Handcrafted in India • WAAFA Digital Studio</p>
        </div>
      </section>
    </div>
  );
}
