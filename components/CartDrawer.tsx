"use client";
import { X, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/contexts/CartContext";

export default function CartDrawer({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { items, updateQuantity, removeFromCart } = useCart();

  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-50" onClick={onClose} />
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col">
        <div className="p-6 border-b flex justify-between items-center">
          <h2 className="text-2xl font-bold flex items-center gap-3">
            <ShoppingBag /> Your Cart ({items.length})
          </h2>
          <button onClick={onClose} aria-label="Close cart">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <p className="text-center text-gray-500 mt-10">Your cart is empty</p>
          ) : (
            <div className="space-y-6">
              {items.map((item) => (
                <div key={`${item.id}-${item.selectedSize}-${item.selectedStand}`} className="flex gap-4">
                  <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded" />
                  <div className="flex-1">
                    <h4 className="font-semibold">{item.name}</h4>
                    <p className="text-sm text-gray-600">{item.selectedSize}</p>
                    <p className="text-sm text-gray-600">{item.selectedStand}</p>
                    <div className="flex items-center justify-between mt-2">
                      <p className="font-bold">£{(item.price * item.quantity).toFixed(2)}</p>
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center border rounded hover:bg-gray-100"
                          aria-label="Decrease quantity"
                        >
                          -
                        </button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center border rounded hover:bg-gray-100"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                        <button 
                          onClick={() => removeFromCart(item.id)} 
                          className="text-red-600 ml-4 text-sm hover:underline"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t p-6">
            <div className="flex justify-between text-xl font-bold mb-4">
              <span>Total</span>
              <span>£{total.toFixed(2)}</span>
            </div>
            <Link 
              href="/checkout" 
              onClick={onClose} 
              className="block w-full bg-forest-green text-white text-center py-4 rounded-lg font-bold hover:bg-opacity-90 transition"
            >
              Proceed to Checkout
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
