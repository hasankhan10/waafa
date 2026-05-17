"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/Button";
import { toast } from "sonner";
import { Sparkles, ArrowRight, Truck, ShieldCheck, Heart } from "lucide-react";

interface Product {
  id: string;
  title: string;
  price: number;
  market_price: number;
  image_url: string;
  side_images?: string[];
  sizes?: string[];
  colors?: string[];
  description: string;
  category_id: string;
}

export default function ProductDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Selections
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [activeImage, setActiveImage] = useState<string>("");

  useEffect(() => {
    if (!id) return;

    async function fetchProductDetails() {
      // 1. Fetch main product
      const { data: productData, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single();

      if (error || !productData) {
        console.error("Error fetching product:", error);
        setLoading(false);
        return;
      }

      setProduct(productData);
      setActiveImage(productData.image_url);

      // Auto-select first color/size if available
      if (productData.sizes && productData.sizes.length > 0) {
        setSelectedSize(productData.sizes[0]);
      }
      if (productData.colors && productData.colors.length > 0) {
        setSelectedColor(productData.colors[0]);
      }

      // 2. Fetch related products
      const { data: relatedData } = await supabase
        .from("products")
        .select("id, title, price, image_url, category_id")
        .eq("category_id", productData.category_id)
        .neq("id", productData.id)
        .limit(4);

      if (relatedData) {
        setRelatedProducts(relatedData);
      }
      setLoading(false);
    }

    fetchProductDetails();
  }, [id]);

  const handleAddToCollection = () => {
    if (!product) return;

    if (product.sizes && product.sizes.length > 0 && !selectedSize) {
      toast.error("Please select a size");
      return;
    }
    if (product.colors && product.colors.length > 0 && !selectedColor) {
      toast.error("Please select a color option");
      return;
    }

    // Retrieve active cart
    const existing = localStorage.getItem("waafa-cart");
    let cart = [];
    if (existing) {
      try {
        cart = JSON.parse(existing);
      } catch (e) {
        cart = [];
      }
    }

    // Check duplicate (match product, size, and color)
    const existingIdx = cart.findIndex(
      (item: any) =>
        item.id === product.id &&
        item.size === selectedSize &&
        item.color === selectedColor
    );

    if (existingIdx > -1) {
      cart[existingIdx].quantity = (parseInt(cart[existingIdx].quantity) + 1).toString().padStart(2, "0");
    } else {
      cart.push({
        id: product.id,
        title: product.title,
        price: `₹${product.price.toLocaleString("en-IN")}`,
        category: "WAAFA COUTURE COLLECTION",
        size: selectedSize || "Universal",
        color: selectedColor || "Universal",
        quantity: "01",
        imageUrl: product.image_url,
      });
    }

    localStorage.setItem("waafa-cart", JSON.stringify(cart));
    
    // Dispatch standard event to notify other layout layers (e.g. Header bag counters) if needed
    window.dispatchEvent(new Event("storage"));

    toast.success(`${product.title} has been added to your collection!`);
    router.push("/cart");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA]">
        <p className="font-serif italic text-zinc-400 text-xl animate-pulse">Loading Piece Details...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#FAFAFA] space-y-4">
        <p className="font-serif italic text-zinc-400 text-xl">The requested piece was not discovered.</p>
        <Link href="/products">
          <Button variant="secondary" className="font-sans text-[10px] tracking-widest uppercase">
            Return to Collection
          </Button>
        </Link>
      </div>
    );
  }

  const hasDiscount = product.market_price > product.price;
  const discountPercent = hasDiscount ? Math.round((1 - product.price / product.market_price) * 100) : 0;

  return (
    <div className="max-w-[1440px] mx-auto px-[5vw] pt-12 pb-32 animate-in fade-in duration-1000">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 mb-32">
        
        {/* Visual Showcase (Images Grid) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div className="w-full aspect-[3/4] overflow-hidden bg-zinc-50 border border-zinc-100 relative shadow-sm group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={activeImage}
              alt={product.title}
              className="w-full h-full object-cover transition-transform duration-[2000ms]"
            />
            {hasDiscount && (
              <div className="absolute top-8 left-8 bg-[#ED4064] text-white px-4 py-2 text-[10px] font-sans tracking-[0.3em] uppercase shadow-lg">
                {discountPercent}% Off
              </div>
            )}
          </div>

          {/* Additional Side Images & Thumbnail Grid */}
          <div className="grid grid-cols-3 gap-4">
            {/* Original Main Thumbnail */}
            <button
              onClick={() => setActiveImage(product.image_url)}
              className={`aspect-[3/4] overflow-hidden bg-zinc-50 border transition-all ${
                activeImage === product.image_url ? "border-[#ED4064] ring-1 ring-[#ED4064]" : "border-zinc-200/60"
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={product.image_url} alt={product.title} className="w-full h-full object-cover" />
            </button>

            {/* Side Images */}
            {product.side_images && product.side_images.map((img: string, idx: number) => (
              <button
                key={idx}
                onClick={() => setActiveImage(img)}
                className={`aspect-[3/4] overflow-hidden bg-zinc-50 border transition-all ${
                  activeImage === img ? "border-[#ED4064] ring-1 ring-[#ED4064]" : "border-zinc-200/60"
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img} alt={`${product.title} detail ${idx + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Context Column */}
        <div className="lg:col-span-5 lg:sticky lg:top-32 self-start space-y-12">
          
          <div className="space-y-4">
            <span className="font-sans text-[10px] uppercase tracking-[0.4em] text-[#ED4064] font-bold block">
              WAAFA Digital Studio
            </span>
            <h1 className="font-serif text-5xl text-zinc-900 italic tracking-tight leading-tight capitalize">
              {product.title}
            </h1>
            
            <div className="flex items-center gap-6 pt-2">
              <p className="font-sans text-2xl text-zinc-900 font-semibold">
                ₹{product.price.toLocaleString("en-IN")}
              </p>
              {hasDiscount && (
                <div className="flex items-center gap-3">
                  <p className="font-sans text-sm text-zinc-300 line-through">
                    ₹{product.market_price.toLocaleString("en-IN")}
                  </p>
                  <span className="text-[10px] font-sans text-[#ED4064] uppercase tracking-widest font-bold">
                    Save ₹{(product.market_price - product.price).toLocaleString("en-IN")}
                  </span>
                </div>
              )}
            </div>
          </div>
          
          <div className="space-y-4 pt-4 border-t border-zinc-100">
            <p className="text-[10px] font-sans uppercase tracking-[0.3em] text-zinc-400">Description</p>
            <p className="font-sans text-sm text-zinc-600 leading-relaxed font-light font-sans">
              {product.description}
            </p>
          </div>
          
          {/* Dynamic Interactive Color Swatches */}
          {product.colors && product.colors.length > 0 && (
            <div className="space-y-4">
              <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-zinc-400">
                Select Color: <span className="text-zinc-900 font-semibold">{selectedColor}</span>
              </p>
              <div className="flex flex-wrap gap-4">
                {product.colors.map((hex: string, i: number) => (
                  <button
                    key={i}
                    onClick={() => setSelectedColor(hex)}
                    className={`w-10 h-10 rounded-full border border-zinc-200 transition-all shadow-sm ${
                      selectedColor === hex ? "ring-2 ring-[#ED4064] ring-offset-2 scale-110" : "hover:scale-105"
                    }`}
                    style={{ backgroundColor: hex }}
                    title={hex}
                  />
                ))}
              </div>
            </div>
          )}
          
          {/* Dynamic Interactive Size Selection */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-zinc-400">
                  Select Size: <span className="text-zinc-900 font-semibold">{selectedSize}</span>
                </p>
                <button className="text-[9px] uppercase tracking-widest text-zinc-400 hover:text-[#ED4064] transition-colors">
                  Size Guide
                </button>
              </div>
              <div className="grid grid-cols-4 gap-3">
                {product.sizes.map((size: string) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-4 border text-[10px] font-sans uppercase tracking-widest transition-all ${
                      selectedSize === size
                        ? "border-zinc-900 bg-zinc-900 text-white font-bold"
                        : "border-zinc-100 bg-white hover:border-zinc-900 hover:bg-zinc-50"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {/* Add to Collection Trigger */}
          <div className="pt-8 space-y-6">
            <button
              onClick={handleAddToCollection}
              className="w-full bg-zinc-900 text-white font-sans text-[11px] font-semibold py-6 tracking-[0.4em] uppercase hover:bg-[#ED4064] active:scale-[0.98] transition-all shadow-md"
            >
              Add to Collection
            </button>

            <div className="grid grid-cols-2 gap-8 pt-8 border-t border-zinc-50">
              <div className="flex items-start gap-3">
                <Truck className="h-5 w-5 text-zinc-300 mt-0.5" strokeWidth={1.5} />
                <p className="text-[9px] uppercase tracking-widest text-zinc-400 leading-relaxed">
                  Complimentary <br />
                  Global Shipping
                </p>
              </div>
              <div className="flex items-start gap-3">
                <ShieldCheck className="h-5 w-5 text-zinc-300 mt-0.5" strokeWidth={1.5} />
                <p className="text-[9px] uppercase tracking-widest text-zinc-400 leading-relaxed">
                  Authenticity <br />
                  Guaranteed
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Recommended Collections */}
      {relatedProducts && relatedProducts.length > 0 && (
        <section className="pt-32 border-t border-zinc-200/60">
          <div className="flex justify-between items-end mb-16">
            <div className="space-y-4">
              <p className="font-sans text-[10px] uppercase tracking-[0.4em] text-[#ED4064] font-bold">
                Recommendations
              </p>
              <h3 className="font-serif text-4xl text-zinc-900 italic tracking-tight">
                You May Also Like
              </h3>
            </div>
            <Link
              href="/products"
              className="text-[10px] font-sans uppercase tracking-[0.3em] text-zinc-400 hover:text-zinc-900 border-b border-zinc-100 pb-1"
            >
              View All
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {relatedProducts.map((p) => (
              <Link key={p.id} href={`/products/${p.id}`} className="group space-y-4">
                <div className="aspect-[3/4] overflow-hidden bg-zinc-50 border border-zinc-100 relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={p.image_url}
                    alt={p.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="space-y-1">
                  <h4 className="font-serif text-lg text-zinc-900 capitalize italic tracking-tight">
                    {p.title}
                  </h4>
                  <p className="font-sans text-xs text-zinc-400">
                    ₹{p.price.toLocaleString("en-IN")}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
