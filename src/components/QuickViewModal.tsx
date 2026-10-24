import React, { useState } from 'react';
import { Product, Currency } from '../types';
import { formatPrice } from '../utils/cart';
import { X, Check, ShoppingBag, ShieldCheck, Truck } from 'lucide-react';

interface QuickViewModalProps {
  product: Product | null;
  currency: Currency;
  onClose: () => void;
  onAddToCart: (product: Product, size: string) => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  currency,
  onClose,
  onAddToCart,
}) => {
  if (!product) return null;

  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0]);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    onAddToCart(product, selectedSize);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 1200);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="quick-view-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div
        className="relative w-full max-w-4xl bg-[#0f0f13] border border-zinc-800 shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 text-zinc-400 hover:text-white bg-black/60 hover:bg-black border border-zinc-800 transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Product Image Column */}
        <div className="w-full md:w-1/2 aspect-[3/4] md:aspect-auto bg-zinc-950 relative overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center"
          />
          {product.badge && (
            <div className="absolute top-4 left-4 bg-black/80 border border-zinc-800 text-[10px] font-mono text-zinc-300 px-2 py-1 uppercase tracking-widest">
              {product.badge}
            </div>
          )}
        </div>

        {/* Product Details Column */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs font-mono text-zinc-500 uppercase tracking-widest pr-10">
              <span>{product.drop}</span>
              <span>{product.sku}</span>
            </div>

            <h2 id="quick-view-title" className="font-display text-2xl font-bold uppercase text-white pr-8">
              {product.name}
            </h2>

            <div className="text-xl font-mono font-semibold tabular-nums text-white">
              {formatPrice(product.priceUSD, currency)}
            </div>

            <p className="text-sm text-zinc-300 leading-relaxed font-light">
              {product.description}
            </p>

            {/* Size Selector */}
            <div className="pt-2 space-y-2">
              <div className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
                Select Size
              </div>
              <div className="flex items-center gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={`py-2 px-4 text-xs font-mono transition-colors border ${
                      selectedSize === size
                        ? 'bg-white text-black border-white font-bold'
                        : 'bg-zinc-950 text-zinc-300 border-zinc-800 hover:border-zinc-500'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              <p className="text-[11px] font-mono text-zinc-500">
                Fit note: {product.fit}
              </p>
            </div>

            {/* Technical Specs List */}
            <div className="pt-4 border-t border-zinc-800/80 space-y-2">
              <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-500">
                Architectural Specifications
              </span>
              <ul className="space-y-1.5 text-xs text-zinc-400 font-mono">
                {product.specs.map((spec, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-1 h-1 bg-zinc-600 shrink-0" />
                    <span>{spec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Add to Bag and Trust markers */}
          <div className="pt-6 border-t border-zinc-800 space-y-3">
            <button
              onClick={handleAdd}
              className="w-full py-3.5 px-6 bg-white hover:bg-zinc-200 text-black font-mono text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg active:scale-98"
            >
              {added ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Added to Bag</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Bag · {formatPrice(product.priceUSD, currency)}</span>
                </>
              )}
            </button>

            <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500 pt-2">
              <span className="flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5" /> Worldwide Express
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" /> Authenticity Verified
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
