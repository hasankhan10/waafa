"use client";

import React from "react";

export default function ProfileWishlistPage() {
  return (
    <div className="space-y-12">
      <div className="border-b border-zinc-100 pb-8">
        <h1 className="font-serif text-4xl text-zinc-900 italic tracking-tight">My Wishlist</h1>
        <p className="text-[10px] font-sans uppercase tracking-[0.3em] text-zinc-400 mt-2">Pieces you've admired for your collection</p>
      </div>

      <div className="bg-white p-20 text-center border border-zinc-100 shadow-sm">
        <span className="material-symbols-outlined text-4xl text-zinc-200 mb-4">favorite</span>
        <p className="font-serif text-lg text-zinc-500 italic">Your curated wishlist is currently empty.</p>
        <button className="mt-8 bg-zinc-900 text-white px-10 py-4 font-sans text-[11px] font-semibold tracking-[0.2em] uppercase hover:bg-zinc-800 transition-all">
          Explore Collection
        </button>
      </div>
    </div>
  );
}
