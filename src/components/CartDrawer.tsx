import React, { useState } from 'react';
import { CartItem, Currency } from '../types';
import {
  formatPrice,
  calculateSubtotalUSD,
  calculateDiscountUSD,
  calculateShippingUSD,
  calculateTotalUSD,
  FREE_SHIPPING_THRESHOLD_USD,
} from '../utils/cart';
import { X, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Tag } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  currency: Currency;
  onUpdateQuantity: (productId: string, size: string, delta: number) => void;
  onRemoveItem: (productId: string, size: string) => void;
  onCheckout: (subtotal: number, discount: number, shipping: number, total: number, promo: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  currency,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
}) => {
  const [promoInput, setPromoInput] = useState('');
  const [appliedPromo, setAppliedPromo] = useState('');
  const [promoMessage, setPromoMessage] = useState('');

  if (!isOpen) return null;

  const subtotalUSD = calculateSubtotalUSD(items);
  const discountResult = calculateDiscountUSD(subtotalUSD, appliedPromo);
  const shippingUSD = calculateShippingUSD(subtotalUSD);
  const totalUSD = calculateTotalUSD(subtotalUSD, discountResult.discountAmount, shippingUSD);

  const amountNeededForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD_USD - subtotalUSD);
  const progressPercent = Math.min(100, (subtotalUSD / FREE_SHIPPING_THRESHOLD_USD) * 100);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const res = calculateDiscountUSD(subtotalUSD, promoInput);
    if (res.isValid) {
      setAppliedPromo(promoInput.trim().toUpperCase());
      setPromoMessage(res.message);
    } else {
      setPromoMessage(res.message);
    }
  };

  const handleCheckoutClick = () => {
    onCheckout(subtotalUSD, discountResult.discountAmount, shippingUSD, totalUSD, appliedPromo);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Shopping Bag"
      className="fixed inset-0 z-50 overflow-hidden bg-black/75 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#0d0d10] border-l border-zinc-800 flex flex-col shadow-2xl animate-in slide-in-from-right duration-300">
          {/* Drawer Header */}
          <div className="p-6 border-b border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-display text-lg font-bold uppercase text-white tracking-wider">
                Shopping Bag
              </span>
              <span className="font-mono text-xs text-zinc-400">
                ({items.reduce((acc, i) => acc + i.quantity, 0)})
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-zinc-400 hover:text-white transition-colors"
              aria-label="Close Shopping Bag"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="px-6 py-3.5 bg-zinc-950 border-b border-zinc-800/80 text-xs font-mono">
            {amountNeededForFreeShipping > 0 ? (
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-zinc-400">
                  <span>Add {formatPrice(amountNeededForFreeShipping, currency)} for Free Express Shipping</span>
                  <span className="text-zinc-500 tabular-nums">{Math.round(progressPercent)}%</span>
                </div>
                <div className="w-full h-1 bg-zinc-800 overflow-hidden">
                  <div
                    className="h-full bg-white transition-all duration-300"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            ) : (
              <div className="text-emerald-400 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Complimentary Express Worldwide Shipping Unlocked</span>
              </div>
            )}
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-16">
                <div className="w-12 h-12 border border-zinc-800 flex items-center justify-center text-zinc-600 font-mono">
                  00
                </div>
                <div className="space-y-1">
                  <p className="font-display text-base font-bold uppercase text-zinc-300">
                    Your bag is empty
                  </p>
                  <p className="font-mono text-xs text-zinc-500">
                    Pieces from Drop 01 are reserved upon add.
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="py-2.5 px-6 bg-white hover:bg-zinc-200 text-black font-mono text-xs uppercase tracking-widest font-semibold transition-colors cursor-pointer"
                >
                  Explore Drop 01
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={`${item.productId}-${item.size}`}
                  className="flex gap-4 pb-6 border-b border-zinc-800/80 last:border-0"
                >
                  {/* Thumbnail */}
                  <div className="w-20 aspect-[3/4] bg-zinc-900 border border-zinc-800 overflow-hidden shrink-0">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Info & Quantity */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div className="space-y-1">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-sm font-semibold text-white line-clamp-1">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(item.productId, item.size)}
                          className="text-zinc-500 hover:text-rose-400 transition-colors p-1"
                          aria-label={`Remove ${item.product.name}`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
                        <span>SIZE: {item.size}</span>
                        <span aria-hidden="true">·</span>
                        <span>{item.product.sku}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-zinc-800 bg-zinc-950">
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.productId, item.size, -1)}
                          className="p-1.5 text-zinc-400 hover:text-white transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2.5 text-xs font-mono text-white tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.productId, item.size, 1)}
                          className="p-1.5 text-zinc-400 hover:text-white transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="font-mono text-xs font-semibold tabular-nums text-white">
                        {formatPrice(item.product.priceUSD * item.quantity, currency)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer with Calculations */}
          {items.length > 0 && (
            <div className="p-6 border-t border-zinc-800 bg-[#0a0a0d] space-y-4">
              {/* Promo code form */}
              <form onSubmit={handleApplyPromo} className="space-y-1.5">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 absolute left-3 top-3 text-zinc-500" />
                    <input
                      type="text"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      placeholder="Promo Code (DROP01)"
                      className="w-full bg-black/60 border border-zinc-800 focus:border-zinc-500 pl-9 pr-3 py-2 text-xs text-white placeholder-zinc-500 font-mono uppercase focus:outline-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="py-2 px-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-mono uppercase tracking-wider cursor-pointer"
                  >
                    Apply
                  </button>
                </div>
                {promoMessage && (
                  <p
                    className={`text-[11px] font-mono ${
                      discountResult.isValid ? 'text-emerald-400' : 'text-rose-400'
                    }`}
                  >
                    {promoMessage}
                  </p>
                )}
              </form>

              {/* Subtotals Breakdown */}
              <div className="space-y-1.5 pt-2 text-xs font-mono">
                <div className="flex justify-between text-zinc-400">
                  <span>Subtotal</span>
                  <span className="text-white tabular-nums">{formatPrice(subtotalUSD, currency)}</span>
                </div>

                {discountResult.discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Discount ({discountResult.percentage}%)</span>
                    <span className="tabular-nums">-{formatPrice(discountResult.discountAmount, currency)}</span>
                  </div>
                )}

                <div className="flex justify-between text-zinc-400">
                  <span>Shipping</span>
                  <span className="text-white tabular-nums">
                    {shippingUSD === 0 ? 'FREE' : formatPrice(shippingUSD, currency)}
                  </span>
                </div>

                <div className="flex justify-between text-sm font-semibold text-white pt-2 border-t border-zinc-800/80">
                  <span>Total</span>
                  <span className="font-mono tabular-nums">{formatPrice(totalUSD, currency)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                type="button"
                onClick={handleCheckoutClick}
                className="w-full py-3.5 px-6 bg-white hover:bg-zinc-200 text-black font-mono text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg active:scale-98"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-[10px] font-mono text-center text-zinc-500">
                Taxes and import duties calculated at dispatch.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
