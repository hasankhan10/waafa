import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function CheckoutPage() {
  return (
    <div className="max-w-[1440px] mx-auto px-[5vw] pt-12 pb-32">
      <div className="mb-12">
        <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight mb-2">Secure Checkout</h1>
        <p className="font-label-caps text-label-caps text-secondary opacity-60">PLEASE ENTER YOUR DETAILS</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Left Column: Forms */}
        <div className="lg:col-span-8 space-y-16">
          
          {/* Contact Details */}
          <section>
            <h2 className="font-headline-md text-2xl text-on-surface mb-6 pb-2 border-b border-surface-variant">1. Contact Details</h2>
            <div className="space-y-4">
              <Input type="email" placeholder="Email Address" />
              <Input type="tel" placeholder="Phone Number" />
              <label className="flex items-center gap-3 mt-4 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 accent-primary" defaultChecked />
                <span className="font-body-md text-sm text-secondary">Keep me updated with news and exclusive offers</span>
              </label>
            </div>
          </section>

          {/* Shipping Address */}
          <section>
            <h2 className="font-headline-md text-2xl text-on-surface mb-6 pb-2 border-b border-surface-variant">2. Shipping Address</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input placeholder="First Name" />
              <Input placeholder="Last Name" />
              <div className="md:col-span-2">
                <Input placeholder="Address Line 1" />
              </div>
              <div className="md:col-span-2">
                <Input placeholder="Apartment, suite, etc. (optional)" />
              </div>
              <Input placeholder="City" />
              <Input placeholder="State / Province" />
              <Input placeholder="Postal Code" />
              <select className="w-full h-12 bg-transparent border-b border-outline/30 text-on-surface focus:outline-none focus:border-primary font-body-md transition-colors appearance-none rounded-none cursor-pointer">
                <option value="in">India</option>
                <option value="us">United States</option>
                <option value="uk">United Kingdom</option>
                <option value="ae">United Arab Emirates</option>
              </select>
            </div>
          </section>

          {/* Payment Method */}
          <section>
            <h2 className="font-headline-md text-2xl text-on-surface mb-6 pb-2 border-b border-surface-variant">3. Payment</h2>
            <p className="font-body-md text-sm text-secondary mb-6">All transactions are secure and encrypted.</p>
            
            <div className="border border-surface-variant rounded-sm overflow-hidden bg-surface-container-low">
              {/* Credit Card Option */}
              <div className="p-4 border-b border-surface-variant bg-white/50">
                <label className="flex items-center gap-3 cursor-pointer mb-4">
                  <input type="radio" name="payment" defaultChecked className="w-4 h-4 accent-primary" />
                  <span className="font-body-md font-medium text-on-surface">Credit / Debit Card</span>
                </label>
                <div className="pl-7 grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <Input placeholder="Card Number" />
                  </div>
                  <div className="col-span-2">
                    <Input placeholder="Name on Card" />
                  </div>
                  <Input placeholder="Expiration Date (MM/YY)" />
                  <Input placeholder="Security Code (CVV)" />
                </div>
              </div>
              
              {/* UPI Option */}
              <div className="p-4 border-b border-surface-variant">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="radio" name="payment" className="w-4 h-4 accent-primary" />
                  <span className="font-body-md font-medium text-on-surface">UPI / NetBanking</span>
                </label>
              </div>

              {/* Cash on Delivery Option */}
              <div className="p-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="radio" name="payment" className="w-4 h-4 accent-primary" />
                  <span className="font-body-md font-medium text-on-surface">Cash on Delivery</span>
                </label>
              </div>
            </div>
          </section>

          <Link href="/order-confirm" className="block w-full">
            <button className="w-full bg-primary text-white font-label-caps text-label-caps py-5 tracking-[0.2em] uppercase hover:bg-primary-container transition-all">
              Complete Order
            </button>
          </Link>

        </div>

        {/* Right Column: Order Summary */}
        <div className="lg:col-span-4">
          <div className="sticky top-32 bg-surface-container-lowest p-8 border border-surface-variant/50 rounded-sm">
            <h3 className="font-headline-md text-xl mb-6 pb-4 border-b border-surface-variant">Order Summary</h3>
            
            <div className="space-y-6 mb-8">
              {/* Item 1 */}
              <div className="flex gap-4">
                <div className="w-16 h-20 bg-surface-variant flex-shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuA7GOlehyNNSv-tVGJiLY_O14dTNeWP-0c4m5i9DySBixAM15KlcUeeg_XuAIwoerAJfxE5G2AbDUHCpOkK1IuN5xofKghmERCY_QPGGXiDipzJ6pRJZhcKg-gBc5YQJL44-QYD1ptaa_Nj86kv02OdB5x_EfnFH-7IzZR1P6pT8CY3_BH2DLwcMcyZAjuY-OBA-ikOFBwny7ASryT8_jcg7-x8UnMEjDHUNtvb3oy4vgw5hkHW57BPRJlAQI9Io8G2XZoO4-r4DE8" alt="Dress" className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="font-headline-md text-sm mb-1">The Crimson Siren</p>
                  <p className="font-label-caps text-[10px] text-secondary mb-2">QTY: 1</p>
                  <p className="font-body-md text-sm">₹4,200.00</p>
                </div>
              </div>

              {/* Item 2 */}
              <div className="flex gap-4">
                <div className="w-16 h-20 bg-surface-variant flex-shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCTyFhAhm4Ezqxukf6H9L9yt5jmWyeOkeBXSaoD6CWh1Wh6QZX3NgdyIKs6vgnYMvkENPCCuQwH6vFgGryQYgbjrCREaOY_DHrtr4f2DYbuw8l1wzZ7DOHznZ5gsF-LB9N6lL6cijKPRzaqFPTUoeUw6igzGlK0j3m8LyZyCWC5cRd2dlQkEC-T9LGm2SfGiJ6vtYiIH1dgDIcatVdgAB9rbJYgJiseGx56FNZNg1KxSPYtif4B3FR7n0t_X7vGkiNlpy-zYBTIjGQ" alt="Blouse" className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="font-headline-md text-sm mb-1">Ethereal Lace Blouse</p>
                  <p className="font-label-caps text-[10px] text-secondary mb-2">QTY: 1</p>
                  <p className="font-body-md text-sm">₹1,850.00</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-3 mb-6 pt-6 border-t border-surface-variant">
              <div className="flex justify-between font-body-md text-sm text-secondary">
                <span>Subtotal</span>
                <span>₹6,050.00</span>
              </div>
              <div className="flex justify-between font-body-md text-sm text-secondary">
                <span>Shipping</span>
                <span>Calculated at next step</span>
              </div>
              <div className="flex justify-between font-body-md text-sm text-secondary">
                <span>Estimated Taxes</span>
                <span>₹450.00</span>
              </div>
            </div>
            
            <div className="flex justify-between items-end pt-6 border-t border-surface-variant">
              <span className="font-label-caps text-xs">TOTAL</span>
              <span className="font-headline-md text-2xl text-primary">₹6,500.00</span>
            </div>

            <div className="mt-8 flex items-center justify-center gap-2 opacity-50">
              <span className="material-symbols-outlined text-sm">lock</span>
              <span className="font-label-caps text-[10px]">ENCRYPTED SECURE PAYMENT</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
