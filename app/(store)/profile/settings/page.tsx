import React from "react";
import Link from "next/link";

export default function ProfileSettingsPage() {
  return (
    <div className="max-w-[1440px] mx-auto px-[5vw] pt-12 pb-32 min-h-[70vh]">
      <div className="mb-16">
        <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight mb-2">Account Settings</h1>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
        <div className="lg:col-span-1 space-y-2">
          <Link href="/profile" className="block py-3 px-4 border-l-2 border-transparent text-secondary hover:text-on-surface hover:bg-surface-variant/20 font-label-caps text-label-caps transition-all">OVERVIEW</Link>
          <Link href="/profile/orders" className="block py-3 px-4 border-l-2 border-transparent text-secondary hover:text-on-surface hover:bg-surface-variant/20 font-label-caps text-label-caps transition-all">ORDER HISTORY</Link>
          <Link href="/profile/wishlist" className="block py-3 px-4 border-l-2 border-transparent text-secondary hover:text-on-surface hover:bg-surface-variant/20 font-label-caps text-label-caps transition-all">WISHLIST</Link>
          <Link href="/profile/settings" className="block py-3 px-4 border-l-2 border-primary text-primary font-label-caps text-label-caps bg-surface-variant/30">SETTINGS</Link>
        </div>
        <div className="lg:col-span-3">
          <div className="bg-surface-container-low p-12 text-center border border-surface-variant/50">
            <span className="material-symbols-outlined text-4xl text-secondary mb-4">manage_accounts</span>
            <p className="font-body-md text-secondary">Account settings portal is under construction.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
