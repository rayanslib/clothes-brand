import React, { useState, useEffect, useRef } from 'react';
import { Product, Currency } from '../types';
import { formatPrice } from '../utils/cart';
import { X, Search, ArrowRight } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  currency: Currency;
  onSelectProduct: (p: Product) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  products,
  currency,
  onSelectProduct,
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const filtered = products.filter((p) => {
    const q = query.toLowerCase().trim();
    if (!q) return true;
    return (
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.sku.toLowerCase().includes(q) ||
      p.composition.toLowerCase().includes(q)
    );
  });

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Search Catalog"
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div
        className="w-full max-w-2xl bg-[#0f0f13] border border-zinc-800 shadow-2xl p-6 space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
          <div className="relative flex-1 flex items-center">
            <Search className="w-4 h-4 text-zinc-500 absolute left-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by silhouette, material, or SKU..."
              className="w-full bg-transparent pl-8 pr-4 py-2 text-sm text-white placeholder-zinc-500 font-mono focus:outline-none"
            />
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-white transition-colors"
            aria-label="Close search"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results */}
        <div className="space-y-3 max-h-96 overflow-y-auto">
          <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-500 block">
            {filtered.length} Archive Results Found
          </span>

          <div className="divide-y divide-zinc-800/80">
            {filtered.map((product) => (
              <button
                key={product.id}
                onClick={() => {
                  onSelectProduct(product);
                  onClose();
                }}
                className="w-full py-3 flex items-center justify-between group hover:bg-zinc-900/50 px-2 transition-colors text-left cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-14 bg-zinc-900 overflow-hidden border border-zinc-800 shrink-0">
                    <img
                      src={product.image}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-white group-hover:text-zinc-200">
                      {product.name}
                    </h4>
                    <p className="text-[11px] font-mono text-zinc-500">
                      {product.sku} · {product.categoryLabel}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-semibold text-white tabular-nums">
                    {formatPrice(product.priceUSD, currency)}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-zinc-600 group-hover:text-white transition-colors" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
