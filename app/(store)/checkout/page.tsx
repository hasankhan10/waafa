"use client";

import React, { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { toast } from "sonner";
import { Lock, CreditCard, ArrowRight, ShoppingBag, Loader2, Sparkles, Check } from "lucide-react";

interface CartItem {
  id: string;
  title: string;
  price: string;
  category: string;
  size: string;
  color: string;
  quantity: string;
  imageUrl: string;
}

export default function CheckoutPage() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [user, setUser] = useState<any>(null);

  // Form states
  const [contact, setContact] = useState({
    email: "",
    phone: "",
    newsletter: true
  });

  const [address, setAddress] = useState({
    firstName: "",
    lastName: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    pincode: "",
    country: "in"
  });

  const [paymentMethod, setPaymentMethod] = useState<"card" | "upi" | "cod">("card");

  const [cardDetails, setCardDetails] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: ""
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Fetch current user and cart items
  useEffect(() => {
    async function initCheckout() {
      // Fetch user session
      const { data: { user: currentUser } } = await supabase.auth.getUser();
      if (!currentUser) {
        toast.error("Please log in to proceed to checkout.");
        router.push("/login");
        return;
      }

      setUser(currentUser);
      setContact(prev => ({
        ...prev,
        email: currentUser.email || ""
      }));

      // Fetch user profile to autofill details
      const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", currentUser.id)
        .single();

      if (profile) {
        const names = (profile.full_name || "").split(" ");
        setAddress(prev => ({
          ...prev,
          firstName: names[0] || "",
          lastName: names.slice(1).join(" ") || "",
          addressLine1: profile.address || ""
        }));
      }

      // Load cart items from localStorage
      const existingCart = localStorage.getItem("waafa-cart");
      if (existingCart) {
        try {
          setCartItems(JSON.parse(existingCart));
        } catch (e) {
          setCartItems([]);
        }
      }
      setLoading(false);
    }

    initCheckout();
  }, []);

  // Parsing helper: "₹4,200" -> 4200
  const parsePrice = (priceStr: string): number => {
    const cleanStr = priceStr.replace(/[^\d]/g, "");
    return parseInt(cleanStr, 10) || 0;
  };

  // Subtotal calculation
  const subtotal = useMemo(() => {
    return cartItems.reduce((acc, item) => {
      const priceVal = parsePrice(item.price);
      const qtyVal = parseInt(item.quantity, 10) || 1;
      return acc + priceVal * qtyVal;
    }, 0);
  }, [cartItems]);

  // GST (18% estimated)
  const gst = useMemo(() => {
    return Math.round(subtotal * 0.18);
  }, [subtotal]);

  // Grand Total
  const total = useMemo(() => {
    return subtotal + gst;
  }, [subtotal, gst]);

  // Validation
  const validateForm = () => {
    const tempErrors: Record<string, string> = {};

    if (!address.firstName) tempErrors.firstName = "First name is required";
    if (!address.lastName) tempErrors.lastName = "Last name is required";
    if (!address.addressLine1) tempErrors.addressLine1 = "Shipping address is required";
    if (!address.city) tempErrors.city = "City is required";
    if (!address.state) tempErrors.state = "State is required";
    if (!address.pincode) tempErrors.pincode = "Pincode is required";

    if (!contact.email) tempErrors.email = "Email address is required";
    else if (!/\S+@\S+\.\S+/.test(contact.email)) tempErrors.email = "Invalid email address";

    if (!contact.phone) tempErrors.phone = "Mobile number is required";
    else if (contact.phone.replace(/[^\d]/g, "").length < 10) tempErrors.phone = "Invalid mobile number";

    if (paymentMethod === "card") {
      if (!cardDetails.number) tempErrors.cardNumber = "Card number is required";
      if (!cardDetails.name) tempErrors.cardName = "Name on card is required";
      if (!cardDetails.expiry) tempErrors.cardExpiry = "Expiry is required";
      if (!cardDetails.cvv) tempErrors.cardCvv = "CVV is required";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  // Submit Order handler
  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Please resolve validation errors before placing order.");
      return;
    }

    setIsSubmitting(true);

    const shippingAddrStr = `${address.addressLine1}${address.addressLine2 ? ", " + address.addressLine2 : ""}, ${address.city}, ${address.state} - ${address.pincode}, ${address.country.toUpperCase()}`;
    const clientName = `${address.firstName} ${address.lastName}`;

    const orderInsertData = {
      user_id: user?.id || null,
      total_amount: total,
      status: "pending",
      payment_method: paymentMethod,
      shipping_address: {
        firstName: address.firstName,
        lastName: address.lastName,
        full_name: clientName,
        addressLine1: address.addressLine1,
        addressLine2: address.addressLine2,
        city: address.city,
        state: address.state,
        pincode: address.pincode,
        country: address.country,
        email: contact.email || "",
        phone: contact.phone || "",
        items: cartItems,
        // Prepared structures for payment (Razorpay) and logistics (Delhivery)
        razorpay: {
          order_id: `rzp_live_${Math.random().toString(36).substring(2, 10)}`,
          payment_id: null,
          signature: null,
          status: "pending" // pending, captured, failed
        },
        delhivery: {
          waybill: null,
          shipment_id: null,
          status: "pending", // pending, manifest, dispatched, in_transit, delivered
          weight_grams: 650, // standard garment weight estimate
          dimensions: "32x24x6" // standard box package dimensions
        }
      }
    };

    let finalOrderId = `WF-${Math.floor(100000 + Math.random() * 900000)}`;
    let success = false;

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(orderInsertData)
      });

      const result = await response.json();
      if (response.ok && result.data && result.data[0]) {
        success = true;
        finalOrderId = result.data[0].id;
      } else {
        console.error("Order server-side database insertion failed:", result.error);
        toast.error(`Order Placement Failed: ${result.error || "Unable to save record."}`);
        success = false;
      }
    } catch (err: any) {
      console.error("Order insertion caught error:", err);
      toast.error(`Network Error: ${err.message || "Failed to communicate with server."}`);
      success = false;
    }

    if (success) {
      // Save last order info locally for the /order-confirm page to render dynamically
      const lastOrderInfo = {
        orderId: finalOrderId.toString().startsWith("WF-") ? finalOrderId : `#WF-${finalOrderId.slice(0, 8).toUpperCase()}`,
        fullName: clientName,
        email: contact.email,
        phone: contact.phone,
        address: shippingAddrStr,
        paymentMethod: paymentMethod === "card" ? "Visa ending in 4242" : paymentMethod === "upi" ? "UPI/NetBanking" : "Cash on Delivery",
        items: cartItems,
        subtotal,
        gst,
        total
      };

      localStorage.setItem("waafa-last-order", JSON.stringify(lastOrderInfo));

      // Clear cart
      localStorage.removeItem("waafa-cart");
      window.dispatchEvent(new Event("storage"));

      toast.success("Couture order placed successfully!");
      router.push("/order-confirm");
    } else {
      toast.error("Unable to place your order. Please try again.");
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#FAFAFA]">
        <Loader2 className="h-8 w-8 text-zinc-300 animate-spin mb-4" />
        <p className="font-serif italic text-zinc-400 text-xl animate-pulse">Preparing Secure Checkout...</p>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="max-w-[1440px] mx-auto px-[5vw] pt-24 pb-32 text-center">
        <div className="max-w-md mx-auto space-y-6 py-16 border border-zinc-100 bg-white shadow-sm p-8">
          <ShoppingBag className="h-12 w-12 text-zinc-300 mx-auto" />
          <h2 className="font-serif text-3xl italic text-zinc-900">Your bag is empty</h2>
          <p className="font-sans text-sm text-zinc-500">
            Please add items to your collection before proceeding to the checkout.
          </p>
          <div className="pt-4">
            <Link href="/products">
              <Button className="w-full bg-zinc-950 text-white rounded-none py-4 font-sans text-xs tracking-widest uppercase font-semibold hover:bg-[#ED4064] transition-colors duration-300">
                Browse The Collections
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1440px] mx-auto px-[5vw] pt-16 pb-32 bg-[#FAFAFA]">
      {/* Checkout Title */}
      <div className="mb-16 border-b border-zinc-200/50 pb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="font-serif text-5xl italic tracking-tight text-zinc-900 mb-2">Secure Checkout</h1>
          <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-zinc-400 font-bold">
            Complete your bespoke couture purchase
          </p>
        </div>
        <div className="flex items-center gap-2 text-[10px] font-sans text-zinc-500 uppercase tracking-widest bg-white border border-zinc-100 px-4 py-2">
          <Lock className="h-3.5 w-3.5 text-zinc-400" /> SSL ENCRYPTED CONNECTION
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Left Column: Forms */}
        <form onSubmit={handlePlaceOrder} className="lg:col-span-8 space-y-16">

          {/* Section 1: Delivery Address */}
          <section className="bg-white p-8 border border-zinc-200/50 shadow-[0_4px_20px_rgba(0,0,0,0.01)] space-y-6">
            <div className="flex justify-between items-center border-b border-zinc-100 pb-4">
              <h2 className="font-serif text-2xl text-zinc-900 italic">1. Delivery Address</h2>
              <span className="font-sans text-[9px] bg-zinc-100 px-2 py-1 tracking-wider uppercase text-zinc-500 font-bold">SHIPPING INFO</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase tracking-widest text-zinc-400 font-semibold block">First Name</label>
                <Input
                  placeholder="First Name"
                  value={address.firstName}
                  onChange={(e) => setAddress(prev => ({ ...prev, firstName: e.target.value }))}
                  className={`rounded-none bg-zinc-50 border-zinc-200 px-4 py-3 h-12 text-sm focus:border-zinc-900 focus:bg-white transition-all duration-300 ${errors.firstName ? "border-red-500 animate-shake" : ""}`}
                />
                {errors.firstName && <p className="text-red-500 text-[10px] tracking-wide font-sans">{errors.firstName}</p>}
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] uppercase tracking-widest text-zinc-400 font-semibold block">Last Name</label>
                <Input
                  placeholder="Last Name"
                  value={address.lastName}
                  onChange={(e) => setAddress(prev => ({ ...prev, lastName: e.target.value }))}
                  className={`rounded-none bg-zinc-50 border-zinc-200 px-4 py-3 h-12 text-sm focus:border-zinc-900 focus:bg-white transition-all duration-300 ${errors.lastName ? "border-red-500 animate-shake" : ""}`}
                />
                {errors.lastName && <p className="text-red-500 text-[10px] tracking-wide font-sans">{errors.lastName}</p>}
              </div>

              <div className="md:col-span-2 space-y-1.5">
                <label className="text-[10px] uppercase tracking-widest text-zinc-400 font-semibold block">Address Line 1</label>
                <Input
                  placeholder="Street address, suite, floor, etc."
                  value={address.addressLine1}
                  onChange={(e) => setAddress(prev => ({ ...prev, addressLine1: e.target.value }))}
                  className={`rounded-none bg-zinc-50 border-zinc-200 px-4 py-3 h-12 text-sm focus:border-zinc-900 focus:bg-white transition-all duration-300 ${errors.addressLine1 ? "border-red-500 animate-shake" : ""}`}
                />
                {errors.addressLine1 && <p className="text-red-500 text-[10px] tracking-wide font-sans">{errors.addressLine1}</p>}
              </div>

              <div className="md:col-span-2 space-y-1.5">
                <label className="text-[10px] uppercase tracking-widest text-zinc-400 font-semibold block">Apartment, suite, etc. (optional)</label>
                <Input
                  placeholder="Apartment, suite, unit, etc."
                  value={address.addressLine2}
                  onChange={(e) => setAddress(prev => ({ ...prev, addressLine2: e.target.value }))}
                  className="rounded-none bg-zinc-50 border-zinc-200 px-4 py-3 h-12 text-sm focus:border-zinc-900 focus:bg-white transition-all duration-300"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] uppercase tracking-widest text-zinc-400 font-semibold block">City</label>
                <Input
                  placeholder="City"
                  value={address.city}
                  onChange={(e) => setAddress(prev => ({ ...prev, city: e.target.value }))}
                  className={`rounded-none bg-zinc-50 border-zinc-200 px-4 py-3 h-12 text-sm focus:border-zinc-900 focus:bg-white transition-all duration-300 ${errors.city ? "border-red-500 animate-shake" : ""}`}
                />
                {errors.city && <p className="text-red-500 text-[10px] tracking-wide font-sans">{errors.city}</p>}
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] uppercase tracking-widest text-zinc-400 font-semibold block">State</label>
                <Input
                  placeholder="State"
                  value={address.state}
                  onChange={(e) => setAddress(prev => ({ ...prev, state: e.target.value }))}
                  className={`rounded-none bg-zinc-50 border-zinc-200 px-4 py-3 h-12 text-sm focus:border-zinc-900 focus:bg-white transition-all duration-300 ${errors.state ? "border-red-500" : ""}`}
                />
                {errors.state && <p className="text-red-500 text-[10px] tracking-wide font-sans">{errors.state}</p>}
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] uppercase tracking-widest text-zinc-400 font-semibold block">Pincode</label>
                <Input
                  placeholder="Pincode"
                  value={address.pincode}
                  onChange={(e) => setAddress(prev => ({ ...prev, pincode: e.target.value }))}
                  className={`rounded-none bg-zinc-50 border-zinc-200 px-4 py-3 h-12 text-sm focus:border-zinc-900 focus:bg-white transition-all duration-300 ${errors.pincode ? "border-red-500" : ""}`}
                />
                {errors.pincode && <p className="text-red-500 text-[10px] tracking-wide font-sans">{errors.pincode}</p>}
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] uppercase tracking-widest text-zinc-400 font-semibold block">Country</label>
                <div className="relative">
                  <select
                    value={address.country}
                    onChange={(e) => setAddress(prev => ({ ...prev, country: e.target.value }))}
                    className="w-full h-12 bg-zinc-50 border border-zinc-200 text-zinc-800 focus:outline-none focus:border-zinc-900 font-sans text-sm transition-colors px-4 rounded-none cursor-pointer appearance-none animate-in fade-in"
                  >
                    <option value="in">India</option>
                    <option value="us">United States</option>
                    <option value="uk">United Kingdom</option>
                    <option value="ae">United Arab Emirates</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-zinc-400">
                    <span className="material-symbols-outlined text-sm">expand_more</span>
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] uppercase tracking-widest text-zinc-400 font-semibold block">Email Address (for order updates)</label>
                <Input
                  type="email"
                  placeholder="e.g. name@example.com"
                  value={contact.email}
                  onChange={(e) => setContact(prev => ({ ...prev, email: e.target.value }))}
                  className={`rounded-none bg-zinc-50 border-zinc-200 px-4 py-3 h-12 text-sm focus:border-zinc-900 focus:bg-white transition-all duration-300 ${errors.email ? "border-red-500 animate-shake" : ""}`}
                />
                {errors.email && <p className="text-red-500 text-[10px] tracking-wide font-sans">{errors.email}</p>}
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] uppercase tracking-widest text-zinc-400 font-semibold block">Mobile Number (for delivery coordination)</label>
                <Input
                  type="tel"
                  placeholder="e.g. +91 98765 43210"
                  value={contact.phone}
                  onChange={(e) => setContact(prev => ({ ...prev, phone: e.target.value }))}
                  className={`rounded-none bg-zinc-50 border-zinc-200 px-4 py-3 h-12 text-sm focus:border-zinc-900 focus:bg-white transition-all duration-300 ${errors.phone ? "border-red-500 animate-shake" : ""}`}
                />
                {errors.phone && <p className="text-red-500 text-[10px] tracking-wide font-sans">{errors.phone}</p>}
              </div>
            </div>
          </section>

          {/* Section 2: Payment */}
          <section className="bg-white p-8 border border-zinc-200/50 shadow-[0_4px_20px_rgba(0,0,0,0.01)] space-y-6">
            <div className="flex justify-between items-center border-b border-zinc-100 pb-4">
              <h2 className="font-serif text-2xl text-zinc-900 italic">2. Payment Method</h2>
              <span className="font-sans text-[9px] bg-zinc-100 px-2 py-1 tracking-wider uppercase text-zinc-500 font-bold">SECURE GATEWAY</span>
            </div>

            <p className="font-sans text-xs text-zinc-400 tracking-wide">All transactions are fully encrypted, secure, and authenticated.</p>

            <div className="border border-zinc-200/60 rounded-none overflow-hidden bg-zinc-50/50">

              {/* Credit Card Option */}
              <div className="border-b border-zinc-200/60">
                <label className={`flex items-center gap-4 cursor-pointer p-5 transition-all select-none ${paymentMethod === "card" ? "bg-white border-l-2 border-[#ED4064]" : "hover:bg-zinc-50"}`}>
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === "card"}
                    onChange={() => setPaymentMethod("card")}
                    className="w-4 h-4 accent-[#ED4064] cursor-pointer"
                  />
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-zinc-500">credit_card</span>
                    <span className="font-sans text-xs font-semibold text-zinc-800 uppercase tracking-widest">Credit / Debit Card</span>
                  </div>
                </label>

                {/* Card Fields (Accordion-like reveal) */}
                <div className={`overflow-hidden transition-all duration-500 ease-in-out ${paymentMethod === "card" ? "max-h-[350px] p-6 bg-white border-t border-zinc-100 border-l-2 border-[#ED4064]" : "max-h-0"}`}>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2 space-y-1">
                      <label className="text-[9px] uppercase tracking-widest text-zinc-400 font-semibold">Card Number</label>
                      <Input
                        placeholder="4242 4242 4242 4242"
                        maxLength={19}
                        value={cardDetails.number}
                        onChange={(e) => setCardDetails(prev => ({ ...prev, number: e.target.value.replace(/[^\d]/g, "").replace(/(.{4})/g, "$1 ").trim() }))}
                        className={`rounded-none bg-zinc-50 border-zinc-100 text-sm focus:border-zinc-900 ${errors.cardNumber ? "border-red-500 animate-shake" : ""}`}
                      />
                      {errors.cardNumber && <p className="text-red-500 text-[10px] font-sans mt-0.5">{errors.cardNumber}</p>}
                    </div>

                    <div className="col-span-2 space-y-1">
                      <label className="text-[9px] uppercase tracking-widest text-zinc-400 font-semibold">Name on Card</label>
                      <Input
                        placeholder="Aria Montgomery"
                        value={cardDetails.name}
                        onChange={(e) => setCardDetails(prev => ({ ...prev, name: e.target.value }))}
                        className={`rounded-none bg-zinc-50 border-zinc-100 text-sm focus:border-zinc-900 ${errors.cardName ? "border-red-500 animate-shake" : ""}`}
                      />
                      {errors.cardName && <p className="text-red-500 text-[10px] font-sans mt-0.5">{errors.cardName}</p>}
                    </div>

                    <div className="space-y-1">
                      <label className="text-[9px] uppercase tracking-widest text-zinc-400 font-semibold">Expiry (MM/YY)</label>
                      <Input
                        placeholder="MM/YY"
                        maxLength={5}
                        value={cardDetails.expiry}
                        onChange={(e) => {
                          let val = e.target.value.replace(/[^\d]/g, "");
                          if (val.length > 2) val = val.substring(0, 2) + "/" + val.substring(2);
                          setCardDetails(prev => ({ ...prev, expiry: val }));
                        }}
                        className={`rounded-none bg-zinc-50 border-zinc-100 text-sm focus:border-zinc-900 ${errors.cardExpiry ? "border-red-500 animate-shake" : ""}`}
                      />
                      {errors.cardExpiry && <p className="text-red-500 text-[10px] font-sans mt-0.5">{errors.cardExpiry}</p>}
                    </div>

                    <div className="space-y-1">
                      <label className="text-[9px] uppercase tracking-widest text-zinc-400 font-semibold">CVV</label>
                      <Input
                        placeholder="123"
                        type="password"
                        maxLength={4}
                        value={cardDetails.cvv}
                        onChange={(e) => setCardDetails(prev => ({ ...prev, cvv: e.target.value.replace(/[^\d]/g, "") }))}
                        className={`rounded-none bg-zinc-50 border-zinc-100 text-sm focus:border-zinc-900 ${errors.cardCvv ? "border-red-500 animate-shake" : ""}`}
                      />
                      {errors.cardCvv && <p className="text-red-500 text-[10px] font-sans mt-0.5">{errors.cardCvv}</p>}
                    </div>
                  </div>
                </div>
              </div>

              {/* UPI Option */}
              <div className="border-b border-zinc-200/60">
                <label className={`flex items-center gap-4 cursor-pointer p-5 transition-all select-none ${paymentMethod === "upi" ? "bg-white border-l-2 border-[#ED4064]" : "hover:bg-zinc-50"}`}>
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === "upi"}
                    onChange={() => setPaymentMethod("upi")}
                    className="w-4 h-4 accent-[#ED4064] cursor-pointer"
                  />
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-zinc-500">qr_code</span>
                    <span className="font-sans text-xs font-semibold text-zinc-800 uppercase tracking-widest">UPI / NetBanking</span>
                  </div>
                </label>

                <div className={`overflow-hidden transition-all duration-500 ease-in-out ${paymentMethod === "upi" ? "max-h-[150px] p-6 bg-white border-t border-zinc-100 border-l-2 border-[#ED4064]" : "max-h-0"}`}>
                  <p className="font-sans text-xs text-zinc-500 leading-relaxed">
                    You will be presented with a dynamic UPI QR Code or bank login interface at the next page to complete your payment instantly and securely.
                  </p>
                </div>
              </div>

              {/* Cash on Delivery Option */}
              <div>
                <label className={`flex items-center gap-4 cursor-pointer p-5 transition-all select-none ${paymentMethod === "cod" ? "bg-white border-l-2 border-[#ED4064]" : "hover:bg-zinc-50"}`}>
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === "cod"}
                    onChange={() => setPaymentMethod("cod")}
                    className="w-4 h-4 accent-[#ED4064] cursor-pointer"
                  />
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-zinc-500">local_shipping</span>
                    <span className="font-sans text-xs font-semibold text-zinc-800 uppercase tracking-widest">Cash on Delivery (COD)</span>
                  </div>
                </label>

                <div className={`overflow-hidden transition-all duration-500 ease-in-out ${paymentMethod === "cod" ? "max-h-[150px] p-6 bg-white border-t border-zinc-100 border-l-2 border-[#ED4064]" : "max-h-0"}`}>
                  <p className="font-sans text-xs text-zinc-500 leading-relaxed">
                    Please prepare the exact sum of <span className="font-bold text-zinc-950">₹{total.toLocaleString("en-IN")}</span> in cash upon delivery of your luxury custom garment.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Checkout Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-zinc-900 text-white font-sans text-xs font-semibold tracking-[0.25em] py-5 uppercase hover:bg-[#ED4064] active:scale-[0.99] disabled:bg-zinc-400 disabled:cursor-not-allowed transition-all duration-500 shadow-md flex items-center justify-center gap-3"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>PROCESSING YOUR ORDER...</span>
              </>
            ) : (
              <>
                <span>PLACE SECURE ORDER • ₹{total.toLocaleString("en-IN")}</span>
                <ArrowRight className="h-4 w-4 text-white" />
              </>
            )}
          </button>
        </form>

        {/* Right Column: Order Summary (Glassmorphism Sidebar) */}
        <div className="lg:col-span-4">
          <div className="sticky top-28 bg-white p-8 border border-zinc-200/50 shadow-[0_10px_40px_rgba(0,0,0,0.02)] space-y-8 rounded-none">
            <div className="border-b border-zinc-100 pb-4 flex items-center justify-between">
              <h3 className="font-serif text-2xl italic tracking-tight text-zinc-900">
                Your Selection
              </h3>
              <span className="font-sans text-[10px] bg-[#ED4064]/10 text-[#ED4064] font-bold px-2 py-0.5 tracking-wider">
                {cartItems.length} PIECE{cartItems.length > 1 ? "S" : ""}
              </span>
            </div>

            {/* Real Items Grid list */}
            <div className="space-y-6 max-h-[400px] overflow-y-auto pr-2 scrollbar-thin">
              {cartItems.map((item, index) => {
                const itemPriceNum = parsePrice(item.price);
                const itemQtyNum = parseInt(item.quantity, 10) || 1;
                const totalItemPriceStr = `₹${(itemPriceNum * itemQtyNum).toLocaleString("en-IN")}`;

                return (
                  <div key={`${item.id}-${item.size}-${item.color}`} className="flex gap-4 items-start border-b border-zinc-50 pb-4 last:border-b-0 last:pb-0">
                    <div className="w-16 h-20 bg-zinc-50 border border-zinc-100 overflow-hidden flex-shrink-0 relative">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-grow space-y-1">
                      <p className="font-serif italic text-sm text-zinc-800 leading-tight truncate capitalize">{item.title}</p>
                      <p className="font-sans text-[9px] uppercase tracking-widest text-[#ED4064] font-bold">{item.category}</p>
                      <div className="flex items-center gap-4 text-[9px] text-zinc-400 font-bold uppercase tracking-wider">
                        <span>SIZE: {item.size}</span>
                        <span>•</span>
                        <span>QTY: {item.quantity}</span>
                      </div>
                      <p className="font-sans text-xs font-semibold text-zinc-800 pt-0.5">{totalItemPriceStr}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Calculation Subtotals */}
            <div className="space-y-4 pt-6 border-t border-zinc-100 font-sans text-xs text-zinc-500 uppercase tracking-wider">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-zinc-800 font-semibold">₹{subtotal.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between">
                <span>Couture Shipping</span>
                <span className="text-[#ED4064] font-bold tracking-[0.1em] lowercase first-letter:uppercase">Complimentary</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated GST (18%)</span>
                <span className="text-zinc-800 font-semibold">₹{gst.toLocaleString("en-IN")}</span>
              </div>
            </div>

            {/* Grand Total display */}
            <div className="flex justify-between items-baseline pt-6 border-t border-zinc-100">
              <span className="font-sans text-[10px] font-bold tracking-[0.2em] text-zinc-800 uppercase">
                ESTIMATED TOTAL
              </span>
              <span className="font-sans text-2xl font-bold text-zinc-900">
                ₹{total.toLocaleString("en-IN")}
              </span>
            </div>

            <div className="pt-4 flex items-center justify-center gap-2 opacity-50 text-zinc-400 font-sans text-[9px] uppercase tracking-widest">
              <Sparkles className="h-3 w-3 text-[#ED4064]" /> Complimentary Returns on All Orders
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
