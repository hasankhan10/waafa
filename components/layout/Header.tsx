"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Search, ShoppingBag, User, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

export default function Header() {
  const [profileHref, setProfileHref] = useState("/login");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState<number>(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('is_admin')
          .eq('id', user.id)
          .single();
        
        setProfileHref(profile?.is_admin ? "/admin" : "/profile");
      } else {
        setProfileHref("/login");
      }
    };
    checkUser();

    // Cart sync
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);

    const updateCartCount = () => {
      const existing = localStorage.getItem("waafa-cart");
      if (existing) {
        try {
          const cart = JSON.parse(existing);
          if (Array.isArray(cart)) {
            const count = cart.reduce((sum, item) => sum + (parseInt(item.quantity, 10) || 0), 0);
            setCartCount(count);
            return;
          }
        } catch {
          // ignore
        }
      }
      setCartCount(0);
    };

    updateCartCount();
    window.addEventListener("storage", updateCartCount);
    return () => {
      window.removeEventListener("storage", updateCartCount);
      clearTimeout(timer);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-100 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto flex h-[80px] items-center justify-between px-4 sm:px-6 lg:px-8 max-w-[1920px]">
        
        {/* Mobile Nav */}
        <div className="flex md:hidden items-center">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="mr-2 hover:bg-transparent">
                <Menu className="h-6 w-6 text-zinc-900" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px] bg-white">
              <nav className="flex flex-col gap-4 mt-8">
                <Link href="/" className="flex items-center space-x-2 mb-8" onClick={() => setIsMobileMenuOpen(false)}>
                  <Image src="/waafa-logo.jpeg" alt="WAAFA Logo" width={100} height={40} className="object-contain h-10 w-auto rounded-sm" />
                </Link>
                <div className="flex flex-col space-y-6">
                  <Link href="/products" className="text-xl font-serif italic text-zinc-900 hover:text-[#ED4064] transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Latest Collection</Link>
                  <Link href="/categories" className="text-xl font-serif italic text-zinc-900 hover:text-[#ED4064] transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Categories</Link>
                  <Link href="/about" className="text-xl font-serif italic text-zinc-900 hover:text-[#ED4064] transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Our Story</Link>
                  <Link href="/contact" className="text-xl font-serif italic text-zinc-900 hover:text-[#ED4064] transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>

        {/* Logo */}
        <div className="flex items-center z-50">
          <Link href="/" className="flex items-center space-x-2">
            <Image src="/waafa-logo.jpeg" alt="WAAFA Logo" width={120} height={48} className="object-contain h-12 w-auto" />
          </Link>
        </div>
        
        {/* Desktop Nav (Centered) */}
        <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 z-50">
          <NavigationMenu>
            <NavigationMenuList className="gap-2">
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent hover:bg-transparent hover:text-[#ED4064] text-[11px] uppercase tracking-[0.2em] font-sans font-medium text-zinc-600 transition-colors">
                    Collection
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr] bg-white border border-zinc-100 shadow-xl rounded-none">
                      <li className="row-span-3">
                        <NavigationMenuLink asChild>
                          <Link
                            className="group flex h-full w-full select-none flex-col justify-end rounded-sm bg-zinc-50 p-6 no-underline outline-none focus:shadow-md border border-zinc-100 transition-all hover:border-[#ED4064]/20"
                            href="/products"
                          >
                            <div className="mb-2 mt-4 text-xl font-serif italic text-zinc-900 group-hover:text-[#ED4064] transition-colors">
                              Latest Arrivals
                            </div>
                            <p className="text-xs leading-relaxed text-zinc-500 font-sans">
                              Explore our newest digital couture pieces handcrafted for elegance.
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <ListItem href="/categories" title="All Categories">
                        Browse our curated collections
                      </ListItem>
                      <ListItem href="/products" title="View All Pieces">
                        Explore the full inventory
                      </ListItem>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild className={cn(navigationMenuTriggerStyle(), "bg-transparent hover:bg-transparent hover:text-[#ED4064] text-[11px] uppercase tracking-[0.2em] font-sans font-medium text-zinc-600 transition-colors")}>
                    <Link href="/about">
                      Our Story
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild className={cn(navigationMenuTriggerStyle(), "bg-transparent hover:bg-transparent hover:text-[#ED4064] text-[11px] uppercase tracking-[0.2em] font-sans font-medium text-zinc-600 transition-colors")}>
                    <Link href="/contact">
                      Contact
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

        {/* Actions */}
        <div className="flex items-center space-x-4 sm:space-x-6">
          <form className="relative hidden lg:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
            <Input 
              type="search" 
              placeholder="Search pieces..." 
              className="pl-10 w-[240px] h-10 bg-zinc-50 border-0 focus-visible:ring-1 focus-visible:ring-zinc-200 rounded-full font-sans text-xs tracking-wide" 
            />
          </form>
          
          <Link href={profileHref}>
            <Button variant="ghost" size="icon" className="hover:bg-zinc-50 rounded-full text-zinc-600 hover:text-[#ED4064] transition-colors">
              <User className="h-[22px] w-[22px] font-light" strokeWidth={1.5} />
            </Button>
          </Link>

          <Link href="/cart">
            <Button variant="ghost" size="icon" className="hover:bg-zinc-50 rounded-full text-zinc-600 hover:text-[#ED4064] transition-colors relative">
              <ShoppingBag className="h-[22px] w-[22px] font-light" strokeWidth={1.5} />
              {mounted && cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-[#ED4064] text-[9px] font-semibold text-white flex items-center justify-center animate-in zoom-in-50 duration-300">
                  {cartCount}
                </span>
              )}
            </Button>
          </Link>
        </div>

      </div>
    </header>
  );
}

const ListItem = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentPropsWithoutRef<typeof Link> & { title: string }
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          ref={ref}
          className={cn(
            "group block select-none space-y-1 rounded-sm p-4 leading-none no-underline outline-none transition-all hover:bg-zinc-50 hover:text-zinc-900 focus:bg-zinc-50 focus:text-zinc-900 border border-transparent hover:border-zinc-100",
            className
          )}
          {...props}
        >
          <div className="text-[11px] uppercase tracking-widest font-sans font-semibold text-zinc-900 mb-2 group-hover:text-[#ED4064] transition-colors">{title}</div>
          <p className="line-clamp-2 text-xs leading-relaxed text-zinc-500 font-sans">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
