import React from "react";

export default function AdminDashboardPage() {
  return (
    <>
      {/* Welcome Header */}
      <header className="mb-16">
        <p className="font-label text-sm uppercase tracking-widest text-[#5f5e5e] mb-3">April 24, 2024</p>
        <h2 className="font-headline text-5xl text-[#1b1c1b]">Good morning, Manager.</h2>
      </header>

      {/* Key Metrics (The Ledger) */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {/* Metric Card 1 */}
        <div className="bg-[#ffffff] p-8 border border-[#e4e2e1] rounded-sm shadow-[0_20px_40px_rgba(27,28,27,0.04)] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#f5f3f2] to-transparent opacity-50 pointer-events-none"></div>
          <h3 className="font-label text-xs uppercase tracking-widest text-[#5f5e5e] mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-[16px]">account_balance_wallet</span>
            Total Revenue
          </h3>
          <p className="font-headline text-4xl text-[#1b1c1b] tracking-tight">€142,500</p>
          <p className="font-label text-xs text-[#006a3b] mt-3 flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">arrow_upward</span>
            +12.5% vs last month
          </p>
        </div>

        {/* Metric Card 2 */}
        <div className="bg-[#ffffff] p-8 border border-[#e4e2e1] rounded-sm shadow-[0_20px_40px_rgba(27,28,27,0.04)] relative overflow-hidden">
          <h3 className="font-label text-xs uppercase tracking-widest text-[#5f5e5e] mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-[16px]">inventory_2</span>
            Active Orders
          </h3>
          <p className="font-headline text-4xl text-[#1b1c1b] tracking-tight">84</p>
          <p className="font-label text-xs text-[#5f5e5e] mt-3 flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">schedule</span>
            12 awaiting fulfillment
          </p>
        </div>

        {/* Metric Card 3 */}
        <div className="bg-[#ffffff] p-8 border border-[#e4e2e1] rounded-sm shadow-[0_20px_40px_rgba(27,28,27,0.04)] relative overflow-hidden">
          <h3 className="font-label text-xs uppercase tracking-widest text-[#5f5e5e] mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-[16px]">shelves</span>
            Inventory Value
          </h3>
          <p className="font-headline text-4xl text-[#1b1c1b] tracking-tight">€418,200</p>
          <p className="font-label text-xs text-[#b60f40] mt-3 flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">warning</span>
            3 items low stock
          </p>
        </div>

        {/* Metric Card 4 */}
        <div className="bg-[#ffffff] p-8 border border-[#e4e2e1] rounded-sm shadow-[0_20px_40px_rgba(27,28,27,0.04)] relative overflow-hidden">
          <h3 className="font-label text-xs uppercase tracking-widest text-[#5f5e5e] mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-[16px]">group_add</span>
            New Circle Members
          </h3>
          <p className="font-headline text-4xl text-[#1b1c1b] tracking-tight">27</p>
          <p className="font-label text-xs text-[#006a3b] mt-3 flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">trending_up</span>
            Steady growth
          </p>
        </div>
      </section>

      {/* Two Column Layout for Lists */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Top Selling Pieces */}
        <div>
          <h3 className="font-headline text-2xl text-[#1b1c1b] mb-8">Top Performing Assets</h3>
          <div className="flex flex-col gap-4">
            {/* Row 1 */}
            <div className="flex items-center gap-6 p-4 rounded-sm hover:bg-[#e9e8e7] transition-colors duration-300 cursor-pointer">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAVn2TtjP4hgJHAI2jbNJheduqbrmGzIs9298Qf7uqS8UqKuVrHRVUbmBX6jsQfwlyvX8Qd3JgD--AqYv_M7T598Nz_7nq5kTukDQq4A5x5IrfKITrowHTN6dXy8gcFRwUD9lsdWtBrjw0-TtMvG0y88iYAr71FpPaIrTfjEHvnMGNs97ajR3FHD6NgezdznFlzDkS41Ebnn_d3gQMISFBFRbiX2sct99sIWtefrLZW5b8uUam26GyaxFNaBzNU3N4MvkEAEZ5UmNo" alt="Gown" className="w-16 h-20 object-cover object-center grayscale hover:grayscale-0 transition-all duration-500 rounded-sm" />
              <div className="flex-1">
                <h4 className="font-label font-semibold text-sm text-[#1b1c1b]">The Crimson Drape Gown</h4>
                <p className="font-label text-xs text-[#5f5e5e] mt-1 tracking-widest">SKU: HC-992A</p>
              </div>
              <div className="text-right">
                <p className="font-body text-sm text-[#1b1c1b]">€12,400</p>
                <p className="font-label text-xs text-[#006a3b] mt-1">4 Sold</p>
              </div>
            </div>
            
            {/* Row 2 */}
            <div className="flex items-center gap-6 p-4 rounded-sm hover:bg-[#e9e8e7] transition-colors duration-300 cursor-pointer">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAnIrYgLiHPp3RiGfEv-XgjQd3JOWX_uXT9l9HrjUhKQmZpzaRnlu4fg5KdGtCRf0BbGQajDOUAKrCEh3Etonxn_bmJwNFYZokPIms3VHHlHt3EVbdQ6AmwZrY1HP60SRac5bS8DbDtPmkWISRkIUwUthlBLApQDT92kIQ90qsSsYRxk06jP8eh0cX-9tHLD3ta6uaC2utWWYoWV-5t8Y3Ec4QiqaRVpR2XbI4DosaJDzqOqGpFEcS6HkGW366GsjKeiTMN1WvTj3g" alt="Blazer" className="w-16 h-20 object-cover object-center grayscale hover:grayscale-0 transition-all duration-500 rounded-sm" />
              <div className="flex-1">
                <h4 className="font-label font-semibold text-sm text-[#1b1c1b]">Structured Noir Blazer</h4>
                <p className="font-label text-xs text-[#5f5e5e] mt-1 tracking-widest">SKU: PP-104B</p>
              </div>
              <div className="text-right">
                <p className="font-body text-sm text-[#1b1c1b]">€2,850</p>
                <p className="font-label text-xs text-[#006a3b] mt-1">12 Sold</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity (The Ledger List) */}
        <div>
          <h3 className="font-headline text-2xl text-[#1b1c1b] mb-8">Atelier Ledger</h3>
          <div className="flex flex-col">
            {/* Event 1 */}
            <div className="flex gap-6 py-5 border-b border-[#e4e2e1] last:border-0 hover:bg-[#f5f3f2] px-4 -mx-4 transition-colors">
              <div className="w-12 text-center mt-1">
                <span className="material-symbols-outlined text-[#b60f40]">check_circle</span>
              </div>
              <div>
                <p className="font-label text-sm text-[#1b1c1b]">Order <span className="font-mono bg-[#dbdad9] px-1 py-0.5 rounded-sm">#8820</span> fulfilled and dispatched.</p>
                <p className="font-label text-xs text-[#5f5e5e] mt-2">Client: E. Rothschild • 10 mins ago</p>
              </div>
            </div>
            
            {/* Event 2 */}
            <div className="flex gap-6 py-5 border-b border-[#e4e2e1] last:border-0 hover:bg-[#f5f3f2] px-4 -mx-4 transition-colors">
              <div className="w-12 text-center mt-1">
                <span className="material-symbols-outlined text-[#5f5e5e]">person_add</span>
              </div>
              <div>
                <p className="font-label text-sm text-[#1b1c1b]">New WAAFA Circle member application received.</p>
                <p className="font-label text-xs text-[#5f5e5e] mt-2">Tier: Platinum • 1 hour ago</p>
              </div>
            </div>
            
            {/* Event 3 */}
            <div className="flex gap-6 py-5 border-b border-[#e4e2e1] last:border-0 hover:bg-[#f5f3f2] px-4 -mx-4 transition-colors">
              <div className="w-12 text-center mt-1">
                <span className="material-symbols-outlined text-[#b60f40]">error</span>
              </div>
              <div>
                <p className="font-label text-sm text-[#1b1c1b]">Inventory alert: <span className="font-semibold">Structured Noir Blazer</span> low stock.</p>
                <p className="font-label text-xs text-[#5f5e5e] mt-2">Only 2 remaining in size 38 • 3 hours ago</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
