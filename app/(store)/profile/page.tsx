import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function ProfilePage() {
  return (
    <div className="max-w-[1440px] mx-auto px-[5vw] pt-12 pb-32 min-h-screen">
      <div className="mb-16">
        <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight mb-2">Welcome, Julianne.</h1>
        <p className="font-label-caps text-label-caps text-secondary opacity-60">WAAFA CIRCLE: PLATINUM MEMBER</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
        {/* Navigation Sidebar */}
        <div className="lg:col-span-1 space-y-2">
          <Link href="/profile" className="block py-3 px-4 border-l-2 border-primary text-primary font-label-caps text-label-caps bg-surface-variant/30">
            OVERVIEW
          </Link>
          <Link href="/profile/orders" className="block py-3 px-4 border-l-2 border-transparent text-secondary hover:text-on-surface hover:bg-surface-variant/20 font-label-caps text-label-caps transition-all">
            ORDER HISTORY
          </Link>
          <Link href="/profile/wishlist" className="block py-3 px-4 border-l-2 border-transparent text-secondary hover:text-on-surface hover:bg-surface-variant/20 font-label-caps text-label-caps transition-all">
            WISHLIST
          </Link>
          <Link href="/profile/settings" className="block py-3 px-4 border-l-2 border-transparent text-secondary hover:text-on-surface hover:bg-surface-variant/20 font-label-caps text-label-caps transition-all">
            SETTINGS
          </Link>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3 space-y-12">
          {/* Recent Orders */}
          <div>
            <h3 className="font-headline-md text-headline-md mb-6 border-b border-surface-variant pb-4">Recent Orders</h3>
            <div className="space-y-6">
              <div className="bg-surface-container-low p-6 rounded-sm border border-surface-variant/50">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <p className="font-label-caps text-[10px] text-secondary">ORDER #WF-88291</p>
                    <p className="font-body-md text-on-surface">Placed on Oct 20, 2026</p>
                  </div>
                  <div className="text-right">
                    <p className="font-body-md font-semibold text-primary">₹3,365.00</p>
                    <span className="font-label-caps text-[10px] bg-primary/10 text-primary px-2 py-1 rounded-sm">IN TRANSIT</span>
                  </div>
                </div>
                <Link href="/order-confirm" className="text-sm underline text-secondary hover:text-primary transition-colors">View Details</Link>
              </div>
            </div>
          </div>
          
          {/* Addresses */}
          <div>
            <h3 className="font-headline-md text-headline-md mb-6 border-b border-surface-variant pb-4">Default Address</h3>
            <div className="bg-surface-container-low p-6 rounded-sm border border-surface-variant/50">
              <div className="font-body-md text-on-surface leading-relaxed">
                Julianne V. Sterling<br />
                1104 Fifth Avenue, Apt 4C<br />
                New York, NY 10028<br />
                United States
              </div>
              <button className="mt-4 text-sm underline text-secondary hover:text-primary transition-colors">Edit Address</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
