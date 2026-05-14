"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

interface Product {
  id: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  market_price: number;
  stock: number;
  image_url: string;
  side_images: string[];
  sizes: string[];
  colors: string[];
  category_id: string;
}

interface Category {
  id: string;
  name: string;
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);

  // Form State
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [marketPrice, setMarketPrice] = useState("");
  const [stock, setStock] = useState("");
  const [categoryId, setCategoryId] = useState("");
  
  // Quick Category State
  const [showNewCategoryInput, setShowNewCategoryInput] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [isCreatingCategory, setIsCreatingCategory] = useState(false);

  // Media State
  const [mainImage, setMainImage] = useState<File | null>(null);
  const [mainPreview, setMainPreview] = useState<string | null>(null);
  const [sideImages, setSideImages] = useState<File[]>([]);
  const [sidePreviews, setSidePreviews] = useState<string[]>([]);
  
  // Variant State
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [customColor, setCustomColor] = useState("#000000");

  const sizes = ["XS", "S", "M", "L", "XL", "XXL", "FREE SIZE"];
  const colorPallete = [
    { name: "Crimson", hex: "#ED4064" },
    { name: "Emerald", hex: "#008A5E" },
    { name: "Ivory", hex: "#FFFFF0" },
    { name: "Midnight", hex: "#191970" },
    { name: "Gold", hex: "#D4AF37" },
    { name: "Charcoal", hex: "#36454F" },
    { name: "Terracotta", hex: "#E2725B" },
    { name: "Teal", hex: "#008080" }
  ];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const { data: productsData } = await supabase.from("products").select("*").order("created_at", { ascending: false });
    const { data: categoriesData } = await supabase.from("categories").select("*").order("name");
    
    if (productsData) setProducts(productsData);
    if (categoriesData) setCategories(categoriesData);
  };

  const handleCreateCategory = async () => {
    if (!newCategoryName.trim()) return;
    setIsCreatingCategory(true);
    const slug = newCategoryName.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
    try {
      const { data, error } = await supabase.from("categories").insert([{ name: newCategoryName, slug, description: `Handcrafted collection of ${newCategoryName}` }]).select().single();
      if (error) throw error;
      setCategories(prev => [...prev, data].sort((a, b) => a.name.localeCompare(b.name)));
      setCategoryId(data.id);
      setShowNewCategoryInput(false);
      setNewCategoryName("");
      toast.success(`Category "${data.name}" created`);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsCreatingCategory(false);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm("Are you sure you want to remove this piece from the collection?")) return;
    
    try {
      const { error } = await supabase.from("products").delete().eq("id", id);
      if (error) throw error;
      toast.success("Product removed from inventory");
      fetchData();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const startEdit = (product: Product) => {
    setEditingProduct(product);
    setTitle(product.title);
    setDescription(product.description || "");
    setPrice(product.price.toString());
    setMarketPrice(product.market_price?.toString() || "");
    setStock(product.stock.toString());
    setCategoryId(product.category_id || "");
    setMainPreview(product.image_url);
    setSidePreviews(product.side_images || []);
    setSelectedSizes(product.sizes || []);
    setSelectedColors(product.colors || []);
    setIsAdding(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleMainImageChange = (file: File | null) => {
    if (file) {
      setMainImage(file);
      setMainPreview(URL.createObjectURL(file));
    }
  };

  const handleSideImagesChange = (files: FileList | null) => {
    if (files) {
      const newFiles = Array.from(files);
      setSideImages(prev => [...prev, ...newFiles]);
      const newPreviews = newFiles.map(f => URL.createObjectURL(f));
      setSidePreviews(prev => [...prev, ...newPreviews]);
    }
  };

  const handleColorToggle = (hex: string) => {
    setSelectedColors(prev => 
      prev.includes(hex) ? prev.filter(c => c !== hex) : [...prev, hex]
    );
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let finalMainImageUrl = editingProduct?.image_url || "";
      let finalSideImageUrls = editingProduct?.side_images || [];

      // 1. Upload New Main Image if selected
      if (mainImage) {
        const ext = mainImage.name.split('.').pop();
        const name = `${Math.random()}.${ext}`;
        const { error: uploadError } = await supabase.storage.from('product-images').upload(name, mainImage);
        if (uploadError) throw uploadError;
        const { data } = supabase.storage.from('product-images').getPublicUrl(name);
        finalMainImageUrl = data.publicUrl;
      }

      // 2. Upload New Side Images if selected
      if (sideImages.length > 0) {
        const newSideUrls = [];
        for (const file of sideImages) {
          const ext = file.name.split('.').pop();
          const name = `${Math.random()}.${ext}`;
          const { error } = await supabase.storage.from('product-images').upload(name, file);
          if (!error) {
            const { data } = supabase.storage.from('product-images').getPublicUrl(name);
            newSideUrls.push(data.publicUrl);
          }
        }
        finalSideImageUrls = [...finalSideImageUrls, ...newSideUrls];
      }

      const productSlug = title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
      const productData = {
        title,
        slug: productSlug,
        description,
        price: parseFloat(price),
        market_price: parseFloat(marketPrice),
        stock: parseInt(stock),
        category_id: categoryId,
        image_url: finalMainImageUrl,
        side_images: finalSideImageUrls,
        sizes: selectedSizes,
        colors: selectedColors,
      };

      if (editingProduct) {
        // UPDATE existing
        const { error } = await supabase.from("products").update(productData).eq("id", editingProduct.id);
        if (error) throw error;
        toast.success("Product updated successfully");
      } else {
        // INSERT new
        const { error } = await supabase.from("products").insert([productData]);
        if (error) throw error;
        toast.success("Product launched successfully");
      }

      setIsAdding(false);
      setEditingProduct(null);
      resetForm();
      fetchData();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setPrice("");
    setMarketPrice("");
    setStock("");
    setCategoryId("");
    setMainImage(null);
    setMainPreview(null);
    setSideImages([]);
    setSidePreviews([]);
    setSelectedSizes([]);
    setSelectedColors([]);
    setEditingProduct(null);
  };

  return (
    <div className="space-y-10 pb-20">
      <div className="flex justify-between items-center">
        <h1 className="font-serif text-4xl text-zinc-900 italic">Inventory</h1>
        <button 
          onClick={() => {
            if (isAdding) resetForm();
            setIsAdding(!isAdding);
          }}
          className="bg-[#ED4064] text-white px-8 py-3 font-sans text-[11px] font-semibold tracking-widest uppercase hover:bg-[#D63056] transition-all"
        >
          {isAdding ? "Cancel" : "Add New Product"}
        </button>
      </div>

      {isAdding && (
        <form onSubmit={handleSaveProduct} className="bg-white border border-zinc-100 p-10 shadow-sm space-y-12 animate-in fade-in slide-in-from-top-4 duration-500">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="space-y-10">
              <div className="space-y-6">
                <h3 className="text-[10px] font-sans uppercase tracking-[0.3em] text-[#ED4064]">Product Media</h3>
                <div className="space-y-4">
                  <p className="text-[9px] uppercase tracking-widest text-zinc-400">Main Cover Image</p>
                  <div className="relative aspect-[3/4] border-2 border-dashed border-zinc-100 bg-zinc-50 flex items-center justify-center cursor-pointer hover:bg-zinc-100/50 transition-all group overflow-hidden" onClick={() => document.getElementById('main-upload')?.click()}>
                    {mainPreview ? (
                      <img src={mainPreview} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <div className="text-center p-6"><span className="material-symbols-outlined text-zinc-300 text-3xl mb-2">add_photo_alternate</span><p className="text-[10px] font-sans text-zinc-400 uppercase tracking-widest">Select Main Image</p></div>
                    )}
                    <input id="main-upload" type="file" className="hidden" accept="image/*" onChange={(e) => handleMainImageChange(e.target.files?.[0] || null)} />
                  </div>
                </div>
                <div className="space-y-4">
                  <p className="text-[9px] uppercase tracking-widest text-zinc-400">Gallery Details</p>
                  <div className="grid grid-cols-4 gap-4">
                    {sidePreviews.map((src, i) => (
                      <div key={i} className="aspect-square bg-zinc-100 overflow-hidden relative border border-zinc-100">
                        <img src={src} alt="Side" className="w-full h-full object-cover" />
                      </div>
                    ))}
                    <button type="button" onClick={() => document.getElementById('side-upload')?.click()} className="aspect-square border border-dashed border-zinc-200 flex items-center justify-center hover:bg-zinc-50 transition-all"><span className="material-symbols-outlined text-zinc-300">add</span></button>
                    <input id="side-upload" type="file" multiple className="hidden" accept="image/*" onChange={(e) => handleSideImagesChange(e.target.files)} />
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-10">
              <div className="space-y-8">
                <h3 className="text-[10px] font-sans uppercase tracking-[0.3em] text-[#ED4064]">{editingProduct ? "Edit Product Details" : "Basic Details"}</h3>
                <div className="space-y-6">
                  <div className="space-y-1"><label className="text-[9px] uppercase tracking-widest text-zinc-400">Product Title</label><Input placeholder="e.g. The Midnight Sari" value={title} onChange={(e) => setTitle(e.target.value)} required className="px-0 border-x-0 border-t-0 rounded-none bg-transparent focus:ring-0" /></div>
                  <div className="space-y-1"><label className="text-[9px] uppercase tracking-widest text-zinc-400">Description</label><textarea placeholder="Enter detailed description..." value={description} onChange={(e) => setDescription(e.target.value)} className="w-full bg-zinc-50 border-0 px-4 py-4 text-sm outline-none focus:bg-zinc-100/50 transition-all min-h-[120px] font-sans" required /></div>
                  <div className="grid grid-cols-2 gap-10">
                    <div className="space-y-1"><label className="text-[9px] uppercase tracking-widest text-zinc-400">Selling Price (₹)</label><Input type="number" placeholder="0.00" value={price} onChange={(e) => setPrice(e.target.value)} required className="px-0 border-x-0 border-t-0 rounded-none bg-transparent focus:ring-0 text-[#ED4064] font-semibold" /></div>
                    <div className="space-y-1"><label className="text-[9px] uppercase tracking-widest text-zinc-400">Market Price (MRP)</label><Input type="number" placeholder="0.00" value={marketPrice} onChange={(e) => setMarketPrice(e.target.value)} required className="px-0 border-x-0 border-t-0 rounded-none bg-transparent focus:ring-0 opacity-60" /></div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] uppercase tracking-widest text-zinc-400">Category</label>
                    {!showNewCategoryInput ? (
                      <select value={categoryId} onChange={(e) => e.target.value === "NEW" ? setShowNewCategoryInput(true) : setCategoryId(e.target.value)} className="w-full bg-transparent border-b border-zinc-200 py-3 text-sm outline-none font-sans appearance-none">
                        <option value="">Select Category</option>
                        {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                        <option value="NEW" className="text-[#ED4064] font-bold">+ Add New Category</option>
                      </select>
                    ) : (
                      <div className="flex gap-2 items-end animate-in slide-in-from-left-2"><Input placeholder="New Category Name" value={newCategoryName} onChange={(e) => setNewCategoryName(e.target.value)} className="px-0 border-x-0 border-t-0 rounded-none bg-transparent focus:ring-0" autoFocus /><button type="button" onClick={handleCreateCategory} disabled={isCreatingCategory} className="text-[10px] uppercase tracking-widest text-[#ED4064] mb-3 font-bold">Save</button><button type="button" onClick={() => setShowNewCategoryInput(false)} className="text-[10px] uppercase tracking-widest text-zinc-400 mb-3">Cancel</button></div>
                    )}
                  </div>
                  <div className="space-y-1"><label className="text-[9px] uppercase tracking-widest text-zinc-400">Stock</label><Input type="number" placeholder="0" value={stock} onChange={(e) => setStock(e.target.value)} required className="px-0 border-x-0 border-t-0 rounded-none bg-transparent focus:ring-0" /></div>
                </div>
              </div>

              <div className="space-y-8 pt-6 border-t border-zinc-50">
                <h3 className="text-[10px] font-sans uppercase tracking-[0.3em] text-[#ED4064]">Size & Color Options</h3>
                <div className="space-y-8">
                  <div className="space-y-4">
                    <p className="text-[10px] font-sans uppercase tracking-widest text-zinc-400">Select Sizes</p>
                    <div className="flex flex-wrap gap-2">{sizes.map(size => <button key={size} type="button" onClick={() => setSelectedSizes(prev => prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size])} className={`px-4 py-2 text-[9px] border transition-all ${selectedSizes.includes(size) ? "bg-zinc-900 text-white border-zinc-900" : "bg-white text-zinc-400 border-zinc-100 hover:border-zinc-300"}`}>{size}</button>)}</div>
                  </div>
                  <div className="space-y-4">
                    <p className="text-[10px] font-sans uppercase tracking-widest text-zinc-400">Available Colors</p>
                    <div className="flex flex-wrap gap-3">{colorPallete.map(color => <button key={color.name} type="button" onClick={() => handleColorToggle(color.hex)} className={`group flex items-center gap-2 pr-4 pl-1 py-1 rounded-full border transition-all ${selectedColors.includes(color.hex) ? "border-zinc-900 bg-zinc-900 text-white" : "border-zinc-100 bg-white text-zinc-400 hover:border-zinc-300"}`}><span className="w-6 h-6 rounded-full border border-black/5" style={{ backgroundColor: color.hex }} /><span className="text-[9px] uppercase tracking-widest">{color.name}</span></button>)}
                    <div className="flex items-center gap-3 pl-1 py-1 rounded-full border border-zinc-100 bg-zinc-50/50"><input type="color" value={customColor} onChange={(e) => setCustomColor(e.target.value)} className="w-6 h-6 rounded-full border-0 p-0 cursor-pointer overflow-hidden" /><button type="button" onClick={() => handleColorToggle(customColor)} className="text-[9px] uppercase tracking-widest text-zinc-400 pr-3 hover:text-zinc-900">Add Color</button></div></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="pt-10 border-t border-zinc-50 flex justify-end">
            <button type="submit" disabled={loading} className="bg-zinc-900 text-white px-20 py-5 font-sans text-[11px] font-semibold tracking-[0.4em] uppercase hover:bg-zinc-800 transition-all disabled:opacity-50">{loading ? "Processing..." : editingProduct ? "Save Changes" : "Confirm & Launch Product"}</button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <div key={product.id} className="bg-white border border-zinc-100 shadow-sm hover:shadow-md transition-all group overflow-hidden flex flex-col">
            <div className="aspect-[3/4] bg-zinc-100 overflow-hidden relative">
              {product.image_url && <img src={product.image_url} alt={product.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />}
              {product.market_price > product.price && <div className="absolute top-4 left-4 bg-[#ED4064] text-white px-2 py-1 text-[9px] font-sans tracking-widest uppercase">{Math.round((1 - product.price / product.market_price) * 100)}% OFF</div>}
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-2 py-1 text-[10px] font-sans tracking-widest uppercase">Stock: {product.stock}</div>
            </div>
            <div className="p-6 flex-grow flex flex-col justify-between">
              <div>
                <h4 className="font-serif text-lg text-zinc-900 mb-2 truncate">{product.title}</h4>
                <div className="flex items-center gap-3">
                  <p className="text-[#ED4064] font-sans font-semibold text-sm">₹{product.price.toLocaleString('en-IN')}</p>
                  {product.market_price > product.price && <p className="text-zinc-400 font-sans line-through text-[11px]">₹{product.market_price.toLocaleString('en-IN')}</p>}
                </div>
              </div>
              <div className="mt-6 flex gap-2">
                <button 
                  onClick={() => startEdit(product)}
                  className="flex-grow py-3 border border-zinc-100 text-[9px] font-sans uppercase tracking-[0.2em] text-zinc-400 hover:border-[#ED4064] hover:text-[#ED4064] transition-all"
                >
                  Edit
                </button>
                <button 
                  onClick={() => handleDeleteProduct(product.id)}
                  className="px-4 py-3 border border-zinc-100 text-zinc-400 hover:text-red-500 hover:border-red-100 transition-all"
                  title="Delete Product"
                >
                  <span className="material-symbols-outlined text-[18px]">delete</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
