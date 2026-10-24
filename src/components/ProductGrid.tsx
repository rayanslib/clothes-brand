import React, { useState } from 'react';
import { Product, Currency } from '../types';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  products: Product[];
  currency: Currency;
  onQuickAdd: (product: Product, size: string) => void;
  onQuickView: (product: Product) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  currency,
  onQuickAdd,
  onQuickView,
}) => {
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const filteredProducts = products.filter((p) => {
    if (activeFilter === 'all') return true;
    return p.category === activeFilter;
  });

  const categories = [
    { id: 'all', label: 'All Archive' },
    { id: 'outerwear', label: 'Outerwear' },
    { id: 'bottoms', label: 'Bottoms' },
    { id: 'sweats', label: 'Sweats' },
    { id: 'accessories', label: 'Accessories' },
  ];

  return (
    <section id="drop01" className="py-20 sm:py-28 border-b border-zinc-800 bg-[#09090b]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-zinc-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-zinc-500 mb-2">
              <span>Catalog</span>
              <span aria-hidden="true">·</span>
              <span>Drop 01 Equilibrium</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-white">
              Featured Drop
            </h2>
          </div>

          {/* Interactive Filter Tabs */}
          <div className="flex items-center flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveFilter(cat.id)}
                className={`py-1.5 px-3.5 text-xs font-mono uppercase tracking-wider transition-all cursor-pointer border ${
                  activeFilter === cat.id
                    ? 'bg-white text-black border-white font-semibold'
                    : 'bg-zinc-950 text-zinc-400 border-zinc-800 hover:text-white hover:border-zinc-700'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* 4-Item Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 pt-10">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              currency={currency}
              onQuickAdd={onQuickAdd}
              onQuickView={onQuickView}
            />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="py-16 text-center text-zinc-500 font-mono text-xs">
            No items in this category for Drop 01.
          </div>
        )}
      </div>
    </section>
  );
};
