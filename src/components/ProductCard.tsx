import React, { useState } from 'react';
import { Product, Currency } from '../types';
import { formatPrice } from '../utils/cart';
import { Plus, Check, Eye } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  currency: Currency;
  onQuickAdd: (product: Product, size: string) => void;
  onQuickView: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  currency,
  onQuickAdd,
  onQuickView,
}) => {
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0]);
  const [added, setAdded] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onQuickAdd(product, selectedSize);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <article
      className="group relative flex flex-col bg-[#0e0e11] border border-zinc-800/80 hover:border-zinc-700 transition-all duration-300"
    >
      {/* Product Image Slot with 3:4 Aspect Ratio and Hover Zoom */}
      <div
        onClick={() => onQuickView(product)}
        className="relative aspect-[3/4] w-full overflow-hidden bg-zinc-900 cursor-pointer"
      >
        <img
          src={product.image}
          onError={(e) => {
            if (product.fallbackImage) {
              e.currentTarget.src = product.fallbackImage;
            }
          }}
          alt={product.name}
          className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Edition / Status Tag (Quiet Unboxed Tag) */}
        {product.badge && (
          <div className="absolute top-3 left-3 bg-[#09090b]/80 backdrop-blur-sm border border-zinc-800 text-[10px] font-mono text-zinc-300 px-2 py-1 uppercase tracking-widest">
            {product.badge}
          </div>
        )}

        {/* Quick View Hover Trigger */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onQuickView(product);
          }}
          className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-2 bg-[#09090b]/80 hover:bg-white text-zinc-300 hover:text-black border border-zinc-800 rounded-none cursor-pointer"
          aria-label={`Quick View ${product.name}`}
        >
          <Eye className="w-3.5 h-3.5" />
        </button>

        {/* Quick Size Selector Strip on Hover */}
        <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black/90 via-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
            {product.sizes.map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => setSelectedSize(size)}
                className={`px-2 py-1 text-[11px] font-mono transition-colors border ${
                  selectedSize === size
                    ? 'bg-white text-black border-white font-semibold'
                    : 'bg-black/60 text-zinc-400 border-zinc-700 hover:text-white hover:border-zinc-400'
                }`}
              >
                {size}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={handleAdd}
            className="p-1.5 bg-white text-black hover:bg-zinc-200 transition-colors cursor-pointer shrink-0"
            aria-label={`Quick Add ${product.name} size ${selectedSize}`}
          >
            {added ? <Check className="w-4 h-4 text-emerald-600" /> : <Plus className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Card Info Section */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between gap-4">
        <div>
          {/* Category & SKU metadata */}
          <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500 uppercase tracking-wider mb-1">
            <span>{product.categoryLabel}</span>
            <span>{product.sku}</span>
          </div>

          {/* Product Title */}
          <h3
            onClick={() => onQuickView(product)}
            className="text-base font-semibold text-zinc-100 group-hover:text-white transition-colors cursor-pointer line-clamp-1"
          >
            {product.name}
          </h3>

          {/* Minimal 1-line Fabric Note */}
          <p className="text-xs text-zinc-400 mt-1 line-clamp-1 font-light">
            {product.composition}
          </p>
        </div>

        {/* Price & Action Row */}
        <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between">
          <span className="font-mono text-sm font-semibold tabular-nums text-white">
            {formatPrice(product.priceUSD, currency)}
          </span>

          <button
            type="button"
            onClick={handleAdd}
            className="py-1.5 px-3 text-xs font-mono uppercase tracking-wider text-zinc-300 hover:text-white hover:bg-zinc-800 border border-zinc-800 transition-colors flex items-center gap-1.5 cursor-pointer active:scale-95"
          >
            {added ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Added</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" />
                <span>Quick Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
};
