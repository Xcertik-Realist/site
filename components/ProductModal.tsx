"use client";
import { X, Plus, Minus } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useState } from "react";

interface Product {
  id: number;
  name: string;
  price: number;
  height: string;
  image: string;
}

const sizes = ["5-6ft", "6-7ft", "7-8ft"];
const stands = ["No thanks", "Standard Stand (+£20)", "Premium Stand (+£35)"];

export default function ProductModal({ product, onClose }: { product: Product; onClose: () => void }) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(sizes[1]);
  const [selectedStand, setSelectedStand] = useState(stands[0]);

  const handleAdd = () => {
    addToCart({
      ...product,
      selectedSize,
      selectedStand,
      quantity,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white w-full max-w-4xl max-h-[95vh] rounded-xl shadow-2xl flex flex-col md:flex-row overflow-hidden">
        {/* Image */}
        <div className="md:w-1/2 relative min-h-[300px] md:min-h-0">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          <button 
            onClick={onClose} 
            className="absolute top-4 right-4 bg-white/80 hover:bg-white rounded-full p-2 transition"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Details */}
        <div className="md:w-1/2 p-8 overflow-y-auto">
          <h1 className="text-3xl font-bold text-forest-green">{product.name}</h1>
          <p className="text-3xl font-bold mt-2">£{product.price}</p>
          <p className="mt-4 text-gray-700">
            Famed for its beautiful shape, wonderful scent, and excellent needle retention.
          </p>

          <div className="my-6 space-y-4">
            <div>
              <label htmlFor="size-select" className="block font-medium mb-2">Choose your size</label>
              <select
                id="size-select"
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
                className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-forest-green focus:outline-none"
              >
                {sizes.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            <div>
              <label htmlFor="stand-select" className="block font-medium mb-2">Add a stand?</label>
              <select
                id="stand-select"
                value={selectedStand}
                onChange={(e) => setSelectedStand(e.target.value)}
                className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-forest-green focus:outline-none"
              >
                {stands.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>

          <div className="flex items-center gap-4 mt-8">
            <div className="flex items-center border rounded-lg">
              <button 
                onClick={() => setQuantity(q => Math.max(1, q-1))} 
                className="p-3 hover:bg-gray-100 transition"
                aria-label="Decrease quantity"
              >
                <Minus className="w-5 h-5" />
              </button>
              <input 
                type="text" 
                value={quantity} 
                readOnly 
                className="w-16 text-center font-semibold"
                aria-label="Quantity"
              />
              <button 
                onClick={() => setQuantity(q => q+1)} 
                className="p-3 hover:bg-gray-100 transition"
                aria-label="Increase quantity"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
            <button
              onClick={handleAdd}
              className="flex-1 bg-forest-green hover:bg-opacity-90 text-white font-bold py-4 rounded-lg transition"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
