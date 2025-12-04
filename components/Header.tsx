"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useState } from "react";
import CartDrawer from "./CartDrawer";
import { useCart } from "@/contexts/CartContext";

export default function Header() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { items } = useCart();

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-forest-green rounded-full flex items-center justify-center text-white font-bold text-xl">
              SF
            </div>
            <h1 className="text-2xl font-bold text-forest-green">ScandinavianFirs</h1>
          </Link>
          <button 
            onClick={() => setIsCartOpen(true)}
            className="relative"
            aria-label="Open cart"
          >
            <ShoppingBag className="w-7 h-7 text-forest-green" />
            {items.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {items.length}
              </span>
            )}
          </button>
        </div>
      </header>
      
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
