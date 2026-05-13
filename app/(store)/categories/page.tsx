import React from "react";
import { Button } from "@/components/ui/Button";

export default function CollectionsPage() {
  return (
    <div className="max-w-[1440px] mx-auto px-[5vw] pt-32 pb-32 min-h-[70vh] flex flex-col items-center justify-center text-center">
      <span className="material-symbols-outlined text-4xl text-primary mb-4">auto_awesome</span>
      <h1 className="font-headline-lg text-headline-lg text-on-surface mb-4">Collections</h1>
      <p className="font-body-lg text-secondary max-w-lg mx-auto mb-8">This experience is currently being curated by our digital artisans. Check back soon for the full unveiling.</p>
      <Button href="/" variant="secondary">Return Home</Button>
    </div>
  );
}
