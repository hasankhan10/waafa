"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { 
  FolderPlus, 
  Trash2, 
  Layers, 
  FileText, 
  Sparkles, 
  TrendingUp, 
  Search, 
  X,
  Eye
} from "lucide-react";
import { Input } from "@/components/ui/Input";

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  created_at?: string;
  productCount?: number;
}

interface Product {
  id: string;
  category_id: string;
}

const MOCK_CATEGORIES: Category[] = [
  {
    id: "cat-mock-1",
    name: "Saris",
    slug: "saris",
    description: "Heritage weaves, royal borders, and elegant drapes representing ancient craftsmanship.",
    productCount: 12
  },
  {
    id: "cat-mock-2",
    name: "Lehengas",
    slug: "lehengas",
    description: "Heavy handcrafted ethnic silhouettes for weddings, gala occasions, and royal assemblies.",
    productCount: 8
  },
  {
    id: "cat-mock-3",
    name: "Anarkalis",
    slug: "anarkalis",
    description: "Flowing panelled dresses that capture royal romance and grace in premium georgettes and silks.",
    productCount: 5
  },
  {
    id: "cat-mock-4",
    name: "Sherwanis",
    slug: "sherwanis",
    description: "Regal men's outerwear tailored with precision velvet and premium gold embroideries.",
    productCount: 6
  }
];

export default function AdminCollectionsPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [isSandboxMode, setIsSandboxMode] = useState(false);

  // Form State
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [formLoading, setFormLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchCollections();
  }, []);

  const fetchCollections = async () => {
    setLoading(true);
    try {
      // 1. Fetch categories
      const { data: categoriesData, error: catError } = await supabase
        .from("categories")
        .select("*")
        .order("name", { ascending: true });

      if (catError) throw catError;

      // 2. Fetch products to aggregate counts in-memory safely
      const { data: productsData } = await supabase
        .from("products")
        .select("id, category_id");

      if (categoriesData && categoriesData.length > 0) {
        // Map product counts
        const mappedCategories = categoriesData.map((cat: Category) => {
          const count = productsData 
            ? productsData.filter((p: Product) => p.category_id === cat.id).length 
            : 0;
          return {
            ...cat,
            productCount: count
          };
        });
        setCategories(mappedCategories);
        setIsSandboxMode(false);
      } else {
        setCategories(MOCK_CATEGORIES);
        setIsSandboxMode(true);
      }
    } catch (error: any) {
      console.warn("Failed to load categories from database, using sandbox content:", error.message);
      setCategories(MOCK_CATEGORIES);
      setIsSandboxMode(true);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveCollection = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setFormLoading(true);
    const slug = name.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");

    try {
      const newCategoryData = {
        name,
        slug,
        description: description || `Handcrafted collection of ${name}`
      };

      if (isSandboxMode) {
        const mockNew: Category = {
          id: `cat-mock-${Math.random().toString(36).substr(2, 9)}`,
          ...newCategoryData,
          productCount: 0
        };
        setCategories(prev => [...prev, mockNew].sort((a, b) => a.name.localeCompare(b.name)));
        toast.success(`Collection "${name}" launched in Sandbox Mode`);
      } else {
        const { data, error } = await supabase
          .from("categories")
          .insert([newCategoryData])
          .select()
          .single();

        if (error) throw error;

        setCategories(prev => [...prev, { ...data, productCount: 0 }].sort((a, b) => a.name.localeCompare(b.name)));
        toast.success(`Collection "${name}" created successfully`);
      }

      // Reset
      setName("");
      setDescription("");
      setIsAdding(false);
    } catch (error: any) {
      toast.error(`Error saving collection: ${error.message}`);
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeleteCollection = async (id: string, catName: string) => {
    const isConfirmed = confirm(
      `Are you sure you want to delete the "${catName}" collection? Products under this collection will be uncategorized.`
    );
    if (!isConfirmed) return;

    try {
      if (isSandboxMode) {
        setCategories(prev => prev.filter(c => c.id !== id));
        toast.success(`Collection "${catName}" removed (Sandbox)`);
      } else {
        const { error } = await supabase
          .from("categories")
          .delete()
          .eq("id", id);

        if (error) throw error;

        setCategories(prev => prev.filter(c => c.id !== id));
        toast.success(`Collection "${catName}" removed successfully`);
      }
    } catch (error: any) {
      toast.error(`Failed to delete: ${error.message}`);
    }
  };

  const filteredCategories = categories.filter(cat => 
    cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cat.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cat.slug.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-12 pb-20">
      {/* Header */}
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6">
        <div>
          <h1 className="font-serif text-5xl text-zinc-900 italic tracking-tight">Collections</h1>
          <p className="font-sans text-xs tracking-widest text-zinc-400 uppercase mt-2">
            Curate and classify your haute couture inventory
          </p>
        </div>
        <div className="flex gap-3">
          {isSandboxMode && (
            <div className="px-5 py-2.5 bg-amber-50 border border-amber-100 text-[10px] font-sans tracking-widest uppercase text-amber-700 rounded-none flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
              Sandbox Database Fallback
            </div>
          )}
          <button
            onClick={() => {
              if (isAdding) {
                setIsAdding(false);
              } else {
                setIsAdding(true);
                setName("");
                setDescription("");
              }
            }}
            className="bg-[#ED4064] text-white px-8 py-3 font-sans text-[11px] font-semibold tracking-widest uppercase hover:bg-[#D63056] transition-all flex items-center gap-2"
          >
            {isAdding ? (
              <>
                <X className="h-3.5 w-3.5" /> Cancel
              </>
            ) : (
              <>
                <FolderPlus className="h-3.5 w-3.5" /> Create Collection
              </>
            )}
          </button>
        </div>
      </header>

      {/* Add Form Block */}
      {isAdding && (
        <form 
          onSubmit={handleSaveCollection}
          className="bg-white border border-zinc-100 p-8 shadow-sm space-y-6 animate-in fade-in slide-in-from-top-4 duration-500 max-w-2xl"
        >
          <h3 className="text-xs font-sans uppercase tracking-[0.3em] text-[#ED4064] font-bold">Launch New Collection</h3>
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[9px] uppercase tracking-widest text-zinc-400 font-semibold">Collection Name</label>
              <Input
                placeholder="e.g. Royal Banaras"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="px-0 border-x-0 border-t-0 rounded-none bg-transparent focus:ring-0 text-sm font-sans"
              />
            </div>
            <div className="space-y-1.5 pt-2">
              <label className="text-[9px] uppercase tracking-widest text-zinc-400 font-semibold">Description</label>
              <textarea
                placeholder="Describe the styling guidelines, heritage, and fabrics of this collection..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                className="w-full bg-zinc-50 border-0 px-4 py-4 text-xs outline-none focus:bg-zinc-100/50 transition-all min-h-[100px] font-sans"
              />
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t border-zinc-50">
            <button
              type="submit"
              disabled={formLoading}
              className="bg-zinc-900 text-white px-8 py-3.5 font-sans text-[10px] font-semibold tracking-widest uppercase hover:bg-zinc-800 transition-all disabled:opacity-50"
            >
              {formLoading ? "Launching..." : "Publish Collection"}
            </button>
          </div>
        </form>
      )}

      {/* Search & Grid */}
      <div className="space-y-8">
        <div className="flex items-center justify-between gap-6 border-b border-zinc-100 pb-4">
          <h3 className="text-xs font-sans uppercase tracking-[0.2em] text-zinc-900 font-semibold">Active Categories</h3>
          <div className="relative w-full sm:w-[280px]">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-400" />
            <input
              type="text"
              placeholder="Search collections..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-zinc-50 border border-zinc-100 pl-9 pr-4 py-2 text-[11px] font-sans tracking-wide rounded-none focus:outline-none focus:bg-white focus:border-zinc-300 transition-all"
            />
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-48 text-zinc-300 font-serif italic">Loading categories...</div>
        ) : filteredCategories.length === 0 ? (
          <div className="py-16 text-center bg-zinc-50/50 border border-dashed border-zinc-100">
            <p className="font-serif italic text-zinc-400 text-sm">No collections found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredCategories.map((cat) => (
              <div 
                key={cat.id} 
                className="bg-white border border-zinc-100 p-8 shadow-sm flex flex-col justify-between hover:border-[#ED4064]/20 hover:shadow-md transition-all group"
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div className="space-y-1">
                      <span className="text-[9px] font-sans uppercase tracking-[0.3em] text-[#ED4064]">
                        slug: /{cat.slug}
                      </span>
                      <h4 className="font-serif text-2xl text-zinc-900 italic font-medium">{cat.name}</h4>
                    </div>
                    <span className="bg-zinc-100 text-zinc-600 px-3 py-1.5 text-[9px] font-sans uppercase tracking-widest font-semibold">
                      {cat.productCount} {cat.productCount === 1 ? "Piece" : "Pieces"}
                    </span>
                  </div>
                  <p className="text-zinc-500 text-xs leading-relaxed font-sans mt-4 border-t border-zinc-50 pt-4">
                    {cat.description || "No description provided."}
                  </p>
                </div>
                <div className="mt-8 flex justify-end gap-3 border-t border-zinc-50 pt-4 opacity-70 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={() => handleDeleteCollection(cat.id, cat.name)}
                    className="p-2 border border-transparent text-zinc-400 hover:text-red-500 hover:border-red-100 hover:bg-red-50 transition-all"
                    title="Remove Collection"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
