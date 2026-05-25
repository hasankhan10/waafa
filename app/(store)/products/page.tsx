"use client";

import React, { Suspense, useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { ProductCard } from "@/components/ui/ProductCard";
import { Button } from "@/components/ui/Button";
import { toast } from "sonner";
import { Sparkles, ArrowUpDown, X, ChevronDown, Check, SlidersHorizontal, ShoppingBag } from "lucide-react";

interface Product {
  id: string;
  title: string;
  price: number;
  market_price: number;
  image_url: string;
  slug: string;
  colors?: string[];
  sizes?: string[];
  category_id: string;
  created_at: string;
}

interface Category {
  id: string;
  name: string;
}

function ProductsContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category");

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  // Active filters
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [selectedColor, setSelectedColor] = useState<string>("ALL");
  const [selectedSize, setSelectedSize] = useState<string>("ALL");
  const [sortBy, setSortBy] = useState<string>("newest");

  // Dropdown states
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  // Sync initial URL query param
  useEffect(() => {
    if (initialCategory) {
      setSelectedCategory(initialCategory);
    }
  }, [initialCategory]);

  useEffect(() => {
    async function fetchData() {
      // 1. Fetch all products
      const { data: productsData, error: productsError } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

      if (productsError) {
        console.error("Error fetching products:", productsError);
      }

      // 2. Fetch all categories
      const { data: categoriesData, error: categoriesError } = await supabase
        .from("categories")
        .select("*")
        .order("name");

      if (categoriesError) {
        console.error("Error fetching categories:", categoriesError);
      }

      if (productsData) setProducts(productsData);
      if (categoriesData) setCategories(categoriesData);
      setLoading(false);
    }
    fetchData();
  }, []);

  // Gather unique colors dynamically from all active products
  const availableColors = useMemo(() => {
    const colorsSet = new Set<string>();
    products.forEach((p) => {
      if (p.colors && Array.isArray(p.colors)) {
        p.colors.forEach((c) => colorsSet.add(c));
      }
    });
    return Array.from(colorsSet);
  }, [products]);

  // Standard couture size options
  const availableSizes = ["XS", "S", "M", "L", "XL", "XXL", "FREE SIZE"];

  // Filter & sort products on the client
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // 1. Category Filter
    if (selectedCategory !== "ALL") {
      result = result.filter((p) => p.category_id === selectedCategory);
    }

    // 2. Color Filter
    if (selectedColor !== "ALL") {
      result = result.filter((p) => p.colors && p.colors.includes(selectedColor));
    }

    // 3. Size Filter
    if (selectedSize !== "ALL") {
      result = result.filter((p) => p.sizes && p.sizes.includes(selectedSize));
    }

    // 4. Sorting
    if (sortBy === "price-low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      result.sort((a, b) => b.price - a.price);
    } else {
      // "newest"
      result.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    }

    return result;
  }, [products, selectedCategory, selectedColor, selectedSize, sortBy]);

  // Category name finder
  const currentCategoryName = useMemo(() => {
    if (selectedCategory === "ALL") return "All Collections";
    const found = categories.find((c) => c.id === selectedCategory);
    return found ? found.name : "Collections";
  }, [selectedCategory, categories]);

  const hasActiveFilters = selectedCategory !== "ALL" || selectedColor !== "ALL" || selectedSize !== "ALL";

  const clearAllFilters = () => {
    setSelectedCategory("ALL");
    setSelectedColor("ALL");
    setSelectedSize("ALL");
    setSortBy("newest");
  };

  const toggleDropdown = (name: string) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  const handleQuickAdd = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    e.stopPropagation();

    const defaultSize = product.sizes && product.sizes.length > 0 ? product.sizes[0] : "Universal";
    const defaultColor = product.colors && product.colors.length > 0 ? product.colors[0] : "Universal";

    const existing = localStorage.getItem("waafa-cart");
    let cart = [];
    if (existing) {
      try {
        cart = JSON.parse(existing);
      } catch (err) {
        cart = [];
      }
    }

    const existingIdx = cart.findIndex(
      (item: any) =>
        item.id === product.id &&
        item.size === defaultSize &&
        item.color === defaultColor
    );

    if (existingIdx > -1) {
      cart[existingIdx].quantity = (parseInt(cart[existingIdx].quantity) + 1).toString().padStart(2, "0");
    } else {
      cart.push({
        id: product.id,
        title: product.title,
        price: `₹${product.price.toLocaleString("en-IN")}`,
        category: "WAAFA COUTURE COLLECTION",
        size: defaultSize,
        color: defaultColor,
        quantity: "01",
        imageUrl: product.image_url,
      });
    }

    localStorage.setItem("waafa-cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("storage"));
    toast.success(`${product.title} (${defaultSize}) added to collection bag!`);
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-zinc-900 pb-32 pt-12">

      {/* Refined Filter & Sort Bar */}
      <section className="px-[5vw] mb-12 sticky top-[80px] z-40">
        <div className="bg-white/90 backdrop-blur-md border-y border-zinc-200/60 flex flex-wrap items-center justify-between py-4 px-6 relative">
          
          <div className="flex flex-wrap items-center gap-6 lg:gap-10">
            
            {/* Category Filter Dropdown */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown("category")}
                className="flex items-center gap-1.5 font-sans text-xs uppercase tracking-[0.2em] font-semibold text-zinc-800 hover:text-[#ED4064] transition-colors"
              >
                Category {selectedCategory !== "ALL" && "•"} <ChevronDown className="h-3.5 w-3.5" />
              </button>
              {openDropdown === "category" && (
                <div className="absolute top-8 left-0 min-w-[220px] bg-white border border-zinc-200 shadow-xl p-4 space-y-3 z-50 animate-in fade-in slide-in-from-top-1">
                  <button
                    onClick={() => {
                      setSelectedCategory("ALL");
                      setOpenDropdown(null);
                    }}
                    className={`flex items-center justify-between w-full text-left font-sans text-xs uppercase tracking-wider ${
                      selectedCategory === "ALL" ? "text-[#ED4064] font-bold" : "text-zinc-600 hover:text-zinc-900"
                    }`}
                  >
                    <span>All Collections</span>
                    {selectedCategory === "ALL" && <Check className="h-3.5 w-3.5" />}
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setSelectedCategory(cat.id);
                        setOpenDropdown(null);
                      }}
                      className={`flex items-center justify-between w-full text-left font-sans text-xs uppercase tracking-wider ${
                        selectedCategory === cat.id ? "text-[#ED4064] font-bold" : "text-zinc-600 hover:text-zinc-900"
                      }`}
                    >
                      <span>{cat.name}</span>
                      {selectedCategory === cat.id && <Check className="h-3.5 w-3.5" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Color Filter Dropdown */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown("color")}
                className="flex items-center gap-1.5 font-sans text-xs uppercase tracking-[0.2em] font-semibold text-zinc-800 hover:text-[#ED4064] transition-colors"
              >
                Color {selectedColor !== "ALL" && "•"} <ChevronDown className="h-3.5 w-3.5" />
              </button>
              {openDropdown === "color" && (
                <div className="absolute top-8 left-0 min-w-[200px] bg-white border border-zinc-200 shadow-xl p-4 space-y-4 z-50 animate-in fade-in slide-in-from-top-1">
                  <button
                    onClick={() => {
                      setSelectedColor("ALL");
                      setOpenDropdown(null);
                    }}
                    className={`flex items-center justify-between w-full text-left font-sans text-xs uppercase tracking-wider ${
                      selectedColor === "ALL" ? "text-[#ED4064] font-bold" : "text-zinc-600 hover:text-zinc-900"
                    }`}
                  >
                    <span>All Colors</span>
                    {selectedColor === "ALL" && <Check className="h-3.5 w-3.5" />}
                  </button>
                  {availableColors.length === 0 ? (
                    <p className="text-[10px] text-zinc-400 italic">No colors available</p>
                  ) : (
                    <div className="grid grid-cols-5 gap-2.5 pt-1">
                      {availableColors.map((color) => (
                        <button
                          key={color}
                          onClick={() => {
                            setSelectedColor(color);
                            setOpenDropdown(null);
                          }}
                          className={`w-6 h-6 rounded-full border border-zinc-200 relative block transition-transform hover:scale-110 shadow-sm ${
                            selectedColor === color ? "ring-2 ring-[#ED4064] ring-offset-2" : ""
                          }`}
                          style={{ backgroundColor: color }}
                          title={color}
                        />
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Size Filter Dropdown */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown("size")}
                className="flex items-center gap-1.5 font-sans text-xs uppercase tracking-[0.2em] font-semibold text-zinc-800 hover:text-[#ED4064] transition-colors"
              >
                Size {selectedSize !== "ALL" && "•"} <ChevronDown className="h-3.5 w-3.5" />
              </button>
              {openDropdown === "size" && (
                <div className="absolute top-8 left-0 min-w-[180px] bg-white border border-zinc-200 shadow-xl p-4 space-y-3 z-50 animate-in fade-in slide-in-from-top-1">
                  <button
                    onClick={() => {
                      setSelectedSize("ALL");
                      setOpenDropdown(null);
                    }}
                    className={`flex items-center justify-between w-full text-left font-sans text-xs uppercase tracking-wider ${
                      selectedSize === "ALL" ? "text-[#ED4064] font-bold" : "text-zinc-600 hover:text-zinc-900"
                    }`}
                  >
                    <span>All Sizes</span>
                    {selectedSize === "ALL" && <Check className="h-3.5 w-3.5" />}
                  </button>
                  {availableSizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => {
                        setSelectedSize(size);
                        setOpenDropdown(null);
                      }}
                      className={`flex items-center justify-between w-full text-left font-sans text-xs uppercase tracking-wider ${
                        selectedSize === size ? "text-[#ED4064] font-bold" : "text-zinc-600 hover:text-zinc-900"
                      }`}
                    >
                      <span>{size}</span>
                      {selectedSize === size && <Check className="h-3.5 w-3.5" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

          </div>

          <div className="flex items-center gap-6">
            <span className="font-sans text-[10px] uppercase tracking-wider text-zinc-400">
              {filteredProducts.length} Piece{filteredProducts.length !== 1 && "s"} Found
            </span>
            <div className="h-4 w-[1px] bg-zinc-200"></div>
            
            {/* Sort Dropdown */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown("sort")}
                className="flex items-center gap-1.5 font-sans text-xs uppercase tracking-[0.2em] font-semibold text-zinc-800 hover:text-[#ED4064] transition-colors"
              >
                Sort By <ArrowUpDown className="h-3.5 w-3.5" />
              </button>
              {openDropdown === "sort" && (
                <div className="absolute top-8 right-0 min-w-[200px] bg-white border border-zinc-200 shadow-xl p-4 space-y-3 z-50 animate-in fade-in slide-in-from-top-1">
                  <button
                    onClick={() => {
                      setSortBy("newest");
                      setOpenDropdown(null);
                    }}
                    className={`flex items-center justify-between w-full text-left font-sans text-xs uppercase tracking-wider ${
                      sortBy === "newest" ? "text-[#ED4064] font-bold" : "text-zinc-600 hover:text-zinc-900"
                    }`}
                  >
                    <span>Newest Pieces</span>
                    {sortBy === "newest" && <Check className="h-3.5 w-3.5" />}
                  </button>
                  <button
                    onClick={() => {
                      setSortBy("price-low");
                      setOpenDropdown(null);
                    }}
                    className={`flex items-center justify-between w-full text-left font-sans text-xs uppercase tracking-wider ${
                      sortBy === "price-low" ? "text-[#ED4064] font-bold" : "text-zinc-600 hover:text-zinc-900"
                    }`}
                  >
                    <span>Price: Low to High</span>
                    {sortBy === "price-low" && <Check className="h-3.5 w-3.5" />}
                  </button>
                  <button
                    onClick={() => {
                      setSortBy("price-high");
                      setOpenDropdown(null);
                    }}
                    className={`flex items-center justify-between w-full text-left font-sans text-xs uppercase tracking-wider ${
                      sortBy === "price-high" ? "text-[#ED4064] font-bold" : "text-zinc-600 hover:text-zinc-900"
                    }`}
                  >
                    <span>Price: High to Low</span>
                    {sortBy === "price-high" && <Check className="h-3.5 w-3.5" />}
                  </button>
                </div>
              )}
            </div>
          </div>

        </div>

        {/* Active Filter Badges */}
        {hasActiveFilters && (
          <div className="flex flex-wrap items-center gap-3 mt-4 animate-in fade-in duration-300">
            <span className="text-[10px] font-sans tracking-wider uppercase text-zinc-400 mr-1 flex items-center gap-1.5">
              <SlidersHorizontal className="h-3 w-3" /> Active Filters:
            </span>
            
            {selectedCategory !== "ALL" && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 border border-zinc-200 bg-white text-[10px] font-sans tracking-wider uppercase text-zinc-700 shadow-sm rounded-sm">
                Collection: {currentCategoryName}
                <button onClick={() => setSelectedCategory("ALL")} className="hover:text-[#ED4064] transition-colors">
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}

            {selectedColor !== "ALL" && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 border border-zinc-200 bg-white text-[10px] font-sans tracking-wider uppercase text-zinc-700 shadow-sm rounded-sm">
                Color: 
                <span className="w-2.5 h-2.5 rounded-full border border-zinc-200 block" style={{ backgroundColor: selectedColor }} />
                <button onClick={() => setSelectedColor("ALL")} className="hover:text-[#ED4064] transition-colors">
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}

            {selectedSize !== "ALL" && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 border border-zinc-200 bg-white text-[10px] font-sans tracking-wider uppercase text-zinc-700 shadow-sm rounded-sm">
                Size: {selectedSize}
                <button onClick={() => setSelectedSize("ALL")} className="hover:text-[#ED4064] transition-colors">
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}

            <button
              onClick={clearAllFilters}
              className="text-[10px] font-sans tracking-widest uppercase font-bold text-[#ED4064] hover:text-[#D63056] transition-colors ml-2"
            >
              Clear All
            </button>
          </div>
        )}
      </section>

      {/* Main Grid View */}
      <section className="px-[5vw]">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="space-y-6 animate-pulse">
                <div className="aspect-[3/4] bg-zinc-200"></div>
                <div className="h-4 bg-zinc-200 w-2/3 mx-auto"></div>
                <div className="h-3 bg-zinc-200 w-1/3 mx-auto"></div>
              </div>
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="py-32 text-center border border-dashed border-zinc-200 bg-white max-w-4xl mx-auto space-y-4">
            <span className="material-symbols-outlined text-4xl text-zinc-300">shopping_bag</span>
            <p className="font-serif italic text-zinc-400 text-2xl">No pieces matching your filters were discovered.</p>
            <button
              onClick={clearAllFilters}
              className="px-8 py-3 bg-zinc-900 hover:bg-[#ED4064] text-white font-sans text-[10px] uppercase tracking-widest font-semibold transition-colors"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {filteredProducts.map((product) => (
              <div key={product.id} className="relative group/card transition-transform duration-500 hover:-translate-y-1">
                <ProductCard
                  id={product.id}
                  title={product.title}
                  price={`₹${product.price.toLocaleString("en-IN")}`}
                  imageUrl={product.image_url}
                />

                {/* Absolute Quick Add Bag Icon */}
                <button
                  onClick={(e) => handleQuickAdd(e, product)}
                  className="absolute right-4 top-4 z-20 bg-white hover:bg-[#ED4064] text-zinc-800 hover:text-white w-10 h-10 rounded-full flex items-center justify-center shadow-md transition-all duration-300 opacity-100 lg:opacity-0 lg:group-hover/card:opacity-100 lg:translate-y-2 lg:group-hover/card:translate-y-0 hover:scale-110 border border-zinc-100"
                  title="Quick Add to Bag"
                >
                  <ShoppingBag className="h-4.5 w-4.5" strokeWidth={1.5} />
                </button>
                
                {/* Save Badges overlay (optional matching styling) */}
                {product.market_price > product.price && (
                  <div className="absolute top-4 left-4 bg-[#ED4064] text-white px-2.5 py-1 text-[9px] font-sans tracking-[0.2em] uppercase pointer-events-none shadow-sm">
                    {Math.round((1 - product.price / product.market_price) * 100)}% Off
                  </div>
                )}
                
                {/* Active Dynamic Dots Overlay */}
                <div className="flex justify-center gap-1 mt-1 pb-4">
                  {product.colors && product.colors.slice(0, 4).map((color, idx) => (
                    <span
                      key={idx}
                      className="w-2.5 h-2.5 rounded-full border border-zinc-200 block shadow-sm"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Footer Concierge Branding note */}
      {!loading && filteredProducts.length > 0 && (
        <section className="flex flex-col items-center justify-center pt-24">
          <p className="font-sans text-[10px] text-zinc-400 mb-6 tracking-[0.3em] uppercase">
            Showing {filteredProducts.length} of {products.length} Collections
          </p>
          <div className="w-64 h-[1px] bg-zinc-200 relative">
            <div 
              className="absolute left-0 top-0 h-full bg-[#ED4064] transition-all duration-700" 
              style={{ width: `${(filteredProducts.length / products.length) * 100}%` }}
            />
          </div>
        </section>
      )}

    </div>
  );
}

export default function ProductListPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA]">
        <p className="font-serif italic text-zinc-400 text-xl animate-pulse">Loading Collection...</p>
      </div>
    }>
      <ProductsContent />
    </Suspense>
  );
}
