import React from "react";

export default function AdminSettingsPage() {
  return (
    <div className="flex flex-col h-full min-h-[70vh]">
      <header className="flex justify-between items-end mb-12">
        <div>
          <h2 className="font-['Noto_Serif'] text-3xl text-stone-900 dark:text-stone-50 font-light tracking-wide">Atelier Settings</h2>
          <p className="font-['Inter'] text-stone-500 dark:text-stone-400 mt-2">Configure your digital atelier.</p>
        </div>
      </header>
      <div className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-stone-200 dark:border-stone-800 rounded-xl bg-stone-50/50 dark:bg-stone-900/50">
        <span className="material-symbols-outlined text-4xl text-stone-400 mb-4">tune</span>
        <p className="font-['Inter'] text-stone-500">Settings panel is coming soon.</p>
      </div>
    </div>
  );
}
