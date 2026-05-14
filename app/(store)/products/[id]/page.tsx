import React from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";

export default async function ProductDetailsPage({ params }: { params: { id: string } }) {
  const { id } = await params;

  const { data: product } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();

  if (!product) {
    notFound();
  }

  const { data: relatedProducts } = await supabase
    .from('products')
    .select('id, title, price, image_url')
    .eq('category_id', product.category_id)
    .neq('id', product.id)
    .limit(4);

  const hasDiscount = product.market_price > product.price;
  const discountPercent = hasDiscount ? Math.round((1 - product.price / product.market_price) * 100) : 0;

  return (
    <div className="max-w-[1440px] mx-auto px-[5vw] pt-12 pb-32 animate-in fade-in duration-1000">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 mb-32">
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div className="w-full aspect-[3/4] overflow-hidden bg-zinc-50 group border border-zinc-100 relative">
            <img src={product.image_url} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
            {hasDiscount && <div className="absolute top-8 left-8 bg-[#ED4064] text-white px-4 py-2 text-[10px] font-sans tracking-[0.3em] uppercase shadow-lg">{discountPercent}% Off</div>}
          </div>
          {product.side_images && product.side_images.length > 0 && (
            <div className="grid grid-cols-2 gap-6">
              {product.side_images.map((img: string, index: number) => (
                <div key={index} className="aspect-[3/4] overflow-hidden bg-zinc-50 border border-zinc-100">
                  <img src={img} alt={`${product.title} detail ${index + 1}`} className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="lg:col-span-5 lg:sticky lg:top-32 self-start space-y-12">
          <div className="space-y-4">
            <span className="font-sans text-[10px] uppercase tracking-[0.4em] text-[#ED4064] font-bold">WAAFA Digital Studio</span>
            <h1 className="font-serif text-5xl text-zinc-900 italic tracking-tight leading-tight">{product.title}</h1>
            <div className="flex items-center gap-6 pt-2">
              <p className="font-sans text-2xl text-zinc-900 font-semibold">₹{product.price.toLocaleString('en-IN')}</p>
              {hasDiscount && (
                <div className="flex items-center gap-3">
                  <p className="font-sans text-sm text-zinc-300 line-through">₹{product.market_price.toLocaleString('en-IN')}</p>
                  <span className="text-[10px] font-sans text-[#ED4064] uppercase tracking-widest font-bold">Save ₹{(product.market_price - product.price).toLocaleString('en-IN')}</span>
                </div>
              )}
            </div>
          </div>
          
          <div className="space-y-4">
            <p className="text-[10px] font-sans uppercase tracking-[0.3em] text-zinc-400">Description</p>
            <p className="font-sans text-sm text-zinc-600 leading-relaxed font-light">{product.description}</p>
          </div>
          
          {/* Universal Color Swatches */}
          {product.colors && product.colors.length > 0 && (
            <div className="space-y-4">
              <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-zinc-400">Available Colors</p>
              <div className="flex flex-wrap gap-4">
                {product.colors.map((hex: string, i: number) => (
                  <button key={i} className="w-10 h-10 rounded-full border border-zinc-100 transition-all hover:scale-110 shadow-sm" style={{ backgroundColor: hex }} title={hex}></button>
                ))}
              </div>
            </div>
          )}
          
          {product.sizes && product.sizes.length > 0 && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-zinc-400">Select Size</p>
                <button className="text-[9px] uppercase tracking-widest text-zinc-300 hover:text-[#ED4064] transition-colors">Size Guide</button>
              </div>
              <div className="grid grid-cols-4 gap-3">
                {product.sizes.map((size: string) => (
                  <button key={size} className="py-4 border border-zinc-100 text-[10px] font-sans uppercase tracking-widest hover:border-zinc-900 hover:bg-zinc-900 hover:text-white transition-all">{size}</button>
                ))}
              </div>
            </div>
          )}
          
          <div className="pt-8 space-y-6">
            <Link href="/cart"><button className="w-full bg-zinc-900 text-white font-sans text-[11px] font-semibold py-6 tracking-[0.4em] uppercase hover:bg-[#ED4064] active:scale-[0.98] transition-all">Add to Collection</button></Link>
            <div className="grid grid-cols-2 gap-8 pt-8 border-t border-zinc-50">
              <div className="flex flex-col gap-2"><span className="material-symbols-outlined text-zinc-300 text-xl">local_shipping</span><p className="text-[9px] uppercase tracking-widest text-zinc-400 leading-relaxed">Complimentary <br/>Global Shipping</p></div>
              <div className="flex flex-col gap-2"><span className="material-symbols-outlined text-zinc-300 text-xl">verified</span><p className="text-[9px] uppercase tracking-widest text-zinc-400 leading-relaxed">Authenticity <br/>Guaranteed</p></div>
            </div>
          </div>
        </div>
      </div>

      {relatedProducts && relatedProducts.length > 0 && (
        <section className="pt-32 border-t border-zinc-50">
          <div className="flex justify-between items-end mb-16">
            <div className="space-y-4"><p className="font-sans text-[10px] uppercase tracking-[0.4em] text-[#ED4064] font-bold">Recommendations</p><h3 className="font-serif text-4xl text-zinc-900 italic tracking-tight">You May Also Like</h3></div>
            <Link href="/products" className="text-[10px] font-sans uppercase tracking-[0.3em] text-zinc-400 hover:text-zinc-900 border-b border-zinc-100 pb-1">View All</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {relatedProducts.map((p) => (
              <Link key={p.id} href={`/products/${p.id}`} className="group space-y-4">
                <div className="aspect-[3/4] overflow-hidden bg-zinc-50 border border-zinc-100"><img src={p.image_url} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" /></div>
                <div className="space-y-1"><h4 className="font-serif text-lg text-zinc-900">{p.title}</h4><p className="font-sans text-xs text-zinc-400">₹{p.price.toLocaleString('en-IN')}</p></div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
