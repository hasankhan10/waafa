"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/Button";
import { Sparkles, Calendar, ArrowRight, Eye, Tag } from "lucide-react";

interface Product {
  id: string;
  title: string;
  price: number;
  market_price: number;
  image_url: string;
  slug: string;
  colors?: string[];
  sizes?: string[];
}

interface Category {
  id: string;
  name: string;
}

export default function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      // 1. Fetch featured products
      const { data: productsData, error: productsError } = await supabase
        .from("products")
        .select("id, title, price, market_price, image_url, slug, colors, sizes")
        .limit(8)
        .order("created_at", { ascending: false });

      if (productsError) {
        console.error("Error fetching featured products:", productsError);
      }
      if (productsData) {
        setFeaturedProducts(productsData);
      }

      // 2. Fetch real categories
      const { data: categoriesData, error: categoriesError } = await supabase
        .from("categories")
        .select("id, name")
        .order("name");

      if (categoriesError) {
        console.error("Error fetching categories:", categoriesError);
      }
      if (categoriesData) {
        setCategories(categoriesData);
      }

      setLoading(false);
    }
    fetchData();
  }, []);

  const getCategoryImage = (name: string): string => {
    const lower = name.toLowerCase();
    if (lower.includes("bridal") || lower.includes("wedding") || lower.includes("lehenga")) {
      return "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=600&auto=format&fit=crop";
    }
    if (lower.includes("sherwani") || lower.includes("men") || lower.includes("groom") || lower.includes("boys")) {
      return "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?q=80&w=600&auto=format&fit=crop";
    }
    if (lower.includes("sari") || lower.includes("saree") || lower.includes("silk") || lower.includes("anarkali")) {
      return "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=600&auto=format&fit=crop";
    }
    if (lower.includes("gown") || lower.includes("evening") || lower.includes("dress") || lower.includes("couture")) {
      return "https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=600&auto=format&fit=crop";
    }
    return "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=600&auto=format&fit=crop";
  };

  const getCategorySubtitle = (name: string): string => {
    const lower = name.toLowerCase();
    if (lower.includes("bridal") || lower.includes("wedding")) return "Timeless Silhouettes";
    if (lower.includes("sherwani") || lower.includes("men")) return "Royal Heritage";
    if (lower.includes("sari") || lower.includes("saree")) return "Ethereal Drapes";
    if (lower.includes("gown") || lower.includes("dress") || lower.includes("evening")) return "Modern Grandeur";
    return "Curated Couture";
  };

  const behindTheScenes = [
    "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?q=80&w=400&auto=format&fit=crop",
  ];

  return (
    <div className="flex flex-col bg-[#FAFAFA] text-zinc-900 min-h-screen">
      
      {/* 1. The Runway Hero Section */}
      <section className="relative w-full h-[95vh] flex items-center justify-center overflow-hidden bg-black">
        <div className="absolute inset-0 w-full h-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBaB6Zz8sH_GQdtePqmNj-9gdDvuiC2IMDid2iJcCLizkxR5edp0BZhOyeU5PkwpGJSNdxsXpKj8ysqb5aHHgWc50gPrum72KjJ7ivSDrt0KPZG7-HR0Tk-vzwUH3Qjmb5qmzL5goucqoSaDOHSYNFXLKd422kwqf9swwxlZK_yHPdwuTFWd-Rbz0i0J1yePFc-t6m0zF3RboSyygp9EBHaLNZARKnwgI07RXtepDOfy63RNfzJyrEhX1-Bc1zRzrWPfyz7BCj3020"
            alt="WAAFA Haute Couture"
            className="w-full h-full object-cover object-center opacity-85 scale-100 transition-all duration-[8000ms] hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-[#FAFAFA]/10"></div>
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto space-y-8 mt-16">
          <div className="space-y-4">
            <span className="inline-flex items-center gap-2 px-4 py-1 border border-white/20 bg-white/5 backdrop-blur-md rounded-full text-white text-[9px] uppercase tracking-[0.3em] font-sans font-medium">
              <Sparkles className="h-3 w-3 text-[#ED4064]" /> WAAFA Couture
            </span>
            <h1 className="font-serif text-5xl md:text-8xl text-white italic tracking-tighter leading-[0.95] drop-shadow-sm">
              Elegance in <br />
              <span className="font-sans font-extralight not-italic tracking-[0.05em] uppercase text-4xl md:text-7xl block mt-2 text-white/95">each fabric</span>
            </h1>
          </div>
          <div className="pt-6 animate-fade-in-up delay-300">
            <Button asChild className="bg-white hover:bg-[#ED4064] text-zinc-900 hover:text-white rounded-none px-12 py-7 uppercase font-sans text-xs tracking-[0.3em] font-medium border-0 transition-all duration-500 shadow-xl">
              <Link href="/products">Explore the Collections</Link>
            </Button>
          </div>
        </div>
        
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50 text-[9px] uppercase tracking-[0.25em]">
          <span>Scroll to Discover</span>
          <div className="w-px h-12 bg-white/20 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1/2 bg-[#ED4064] animate-bounce"></div>
          </div>
        </div>
      </section>

      {/* 2. The Brand Manifesto Section */}
      <section className="py-24 px-[5vw] max-w-[1920px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-[#FAFAFA]">
        <div className="lg:col-span-7 space-y-6">
          <span className="text-[10px] uppercase tracking-[0.4em] text-[#ED4064] font-bold block">Our Ethos</span>
          <h2 className="font-serif text-4xl md:text-6xl text-zinc-900 italic leading-tight tracking-tight">
            "A seamless bridge between timeless heritage & modern digital fluidity."
          </h2>
        </div>
        <div className="lg:col-span-5 space-y-6 lg:pl-8 border-l border-zinc-100">
          <p className="font-sans text-sm text-zinc-500 leading-relaxed font-light">
            Founded with the ambition to craft perfect silhouettes for the discerning modern client, WAAFA brings unparalleled craftsmanship to life. Every garment, thread direction, and selected shade is dynamic, universal, and fully customized to express your individual personality.
          </p>
          <div className="pt-2">
            <Link href="/about" className="group inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] font-sans font-bold text-zinc-800 hover:text-[#ED4064] transition-colors">
              Our Story <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* 3. The Curated Collections Grid */}
      <section className="py-16 px-[5vw] bg-white border-y border-zinc-100">
        <div className="max-w-[1920px] mx-auto">
          <div className="text-center mb-16 space-y-3">
            <span className="text-[10px] uppercase tracking-[0.4em] text-[#ED4064] font-bold">Curated Edits</span>
            <h2 className="font-serif text-3xl md:text-5xl text-zinc-900 italic tracking-tight">Browse by Category</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {loading ? (
              [1, 2, 3].map((i) => (
                <div key={i} className="aspect-[3/4] bg-zinc-200 animate-pulse border border-zinc-100"></div>
              ))
            ) : categories.length === 0 ? (
              <div className="col-span-3 py-16 text-center border border-dashed border-zinc-200 bg-white">
                <p className="font-serif italic text-zinc-400 text-lg">No categories discovered yet.</p>
              </div>
            ) : (
              categories.slice(0, 3).map((cat) => (
                <Link key={cat.id} href={`/products?category=${cat.id}`} className="group relative block aspect-[3/4] overflow-hidden bg-zinc-100 border border-zinc-100 shadow-sm">
                  <Image
                    src={getCategoryImage(cat.name)}
                    alt={cat.name}
                    fill
                    sizes="(max-w-768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-8 left-8 right-8 text-white space-y-2">
                    <span className="text-[9px] uppercase tracking-[0.25em] text-white/70 block">{getCategorySubtitle(cat.name)}</span>
                    <h3 className="font-serif text-2xl italic tracking-tight">{cat.name}</h3>
                    <div className="h-0.5 bg-[#ED4064] w-0 group-hover:w-16 transition-all duration-500"></div>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </section>

      {/* 4. The Signature Edit (Dynamic Products Grid) */}
      <section className="py-24 px-[5vw] bg-[#FAFAFA]">
        <div className="max-w-[1920px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="space-y-4">
              <span className="text-[10px] uppercase tracking-[0.4em] text-[#ED4064] font-bold block">New Arrivals</span>
              <h2 className="font-serif text-4xl md:text-5xl text-zinc-900 italic tracking-tight">The Signature Collection</h2>
            </div>
            <Link href="/products" className="group inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] font-sans text-zinc-400 hover:text-zinc-900 pb-2 border-b border-zinc-200 transition-colors">
              View Full Gallery <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="space-y-6 animate-pulse">
                  <div className="aspect-[3/4] bg-zinc-200"></div>
                  <div className="h-4 bg-zinc-200 w-2/3"></div>
                  <div className="h-3 bg-zinc-200 w-1/3"></div>
                </div>
              ))}
            </div>
          ) : featuredProducts.length === 0 ? (
            <div className="py-40 text-center border border-dashed border-zinc-200 bg-white">
              <p className="font-serif italic text-zinc-300 text-2xl">Our studio is curating the next grand collections.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
              {featuredProducts.map((product) => (
                <div key={product.id} className="group relative flex flex-col bg-white border border-zinc-100/50 shadow-sm transition-all hover:shadow-md p-4">
                  <Link href={`/products/${product.id}`} className="block relative aspect-[3/4] overflow-hidden bg-zinc-50 mb-6">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={product.image_url}
                      alt={product.title}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                    
                    {product.market_price > product.price && (
                      <div className="absolute top-4 left-4 bg-[#ED4064] text-white px-2.5 py-1 text-[9px] font-sans tracking-[0.2em] uppercase shadow-sm">
                        {Math.round((1 - product.price / product.market_price) * 100)}% Off
                      </div>
                    )}
                    
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                      <span className="inline-flex items-center gap-2 bg-white text-zinc-900 px-6 py-3 font-sans text-[10px] uppercase tracking-[0.2em] font-semibold shadow-xl">
                        <Eye className="h-3.5 w-3.5" /> View Details
                      </span>
                    </div>
                  </Link>

                  <div className="space-y-3">
                    <div className="space-y-1">
                      <Link href={`/products/${product.id}`} className="block font-serif text-lg text-zinc-900 hover:text-[#ED4064] transition-colors leading-snug tracking-tight">
                        {product.title}
                      </Link>
                    </div>

                    {/* Colors & Sizes display */}
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-1.5">
                        {product.colors && product.colors.length > 0 ? (
                          product.colors.map((color, cIdx) => (
                            <span
                              key={cIdx}
                              className="w-3.5 h-3.5 rounded-full border border-zinc-200 block shadow-sm"
                              style={{ backgroundColor: color }}
                              title={color}
                            ></span>
                          ))
                        ) : (
                          <span className="text-[10px] text-zinc-400 font-sans italic">Universal Color</span>
                        )}
                      </div>

                      <div className="flex items-center gap-1 text-[9px] text-zinc-400 font-sans tracking-wider uppercase">
                        {product.sizes && product.sizes.length > 0 ? (
                          product.sizes.slice(0, 3).map((size, sIdx) => (
                            <span key={sIdx} className="px-1.5 py-0.5 border border-zinc-100 bg-zinc-50 rounded-sm">
                              {size}
                            </span>
                          ))
                        ) : (
                          <span>Bespoke Sizes</span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-baseline gap-3 pt-1 border-t border-zinc-50">
                      <span className="font-sans text-sm font-semibold text-zinc-900">₹{product.price.toLocaleString("en-IN")}</span>
                      {product.market_price > product.price && (
                        <span className="font-sans text-[11px] text-zinc-400 line-through font-light">
                          ₹{product.market_price.toLocaleString("en-IN")}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 5. Behind The Scenes (Visual Grid) */}
      <section className="py-24 px-[5vw] bg-white">
        <div className="max-w-[1920px] mx-auto">
          <div className="text-center mb-16 space-y-3">
            <span className="text-[10px] uppercase tracking-[0.4em] text-[#ED4064] font-bold block">In the Making</span>
            <h2 className="font-serif text-3xl md:text-5xl text-zinc-900 italic tracking-tight">Behind The Scenes</h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {behindTheScenes.map((url, idx) => (
              <div key={idx} className="relative aspect-square overflow-hidden bg-zinc-50 border border-zinc-100 shadow-sm group">
                <Image
                  src={url}
                  alt={`Behind the scenes craft ${idx + 1}`}
                  fill
                  sizes="(max-w-768px) 50vw, 25vw"
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center p-4">
                  <span className="inline-flex items-center gap-1.5 text-white text-[9px] uppercase tracking-widest font-sans font-bold">
                    <Tag className="h-3 w-3" /> WAAFA Journal
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
