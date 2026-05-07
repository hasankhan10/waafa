import React from "react";
import Link from "next/link";

interface ProductCardProps {
  id: string;
  title: string;
  price: string;
  imageUrl: string;
  imageAlt?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  id,
  title,
  price,
  imageUrl,
  imageAlt = title,
}) => {
  return (
    <Link href={`/products/${id}`} className="group flex flex-col cursor-pointer">
      <div className="relative aspect-[3/4] overflow-hidden mb-4 bg-surface-container-low">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageUrl}
          alt={imageAlt}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {/* Subtle primary color glow on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-10 bg-primary transition-opacity duration-500 mix-blend-color"></div>
      </div>
      <div className="text-center transition-transform duration-500 group-hover:-translate-y-1">
        <h3 className="font-headline-md text-headline-md text-base text-on-surface mb-1">
          {title}
        </h3>
        <p className="font-body-md text-body-md text-on-surface-variant">{price}</p>
      </div>
    </Link>
  );
};
