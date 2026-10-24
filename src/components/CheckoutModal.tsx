import React, { useState } from 'react';
import { Currency } from '../types';
import { formatPrice } from '../utils/cart';
import { X, CheckCircle2, ShieldCheck, Lock, PackageCheck } from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  currency: Currency;
  subtotalUSD: number;
  discountUSD: number;
  shippingUSD: number;
  totalUSD: number;
  promoCode: string;
  onOrderComplete: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  currency,
  subtotalUSD,
  discountUSD,
  shippingUSD,
  totalUSD,
  promoCode,
  onOrderComplete,
}) => {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [formData, setFormData] = useState({
    name: 'Alexander Ward',
    email: 'alexander@archive.studio',
    address: '104 Omotesando Avenue, Shibuya',
    city: 'Tokyo',
    postalCode: '150-0001',
    country: 'Japan',
  });
  const [orderNumber, setOrderNumber] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedOrder = `KA-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    setOrderNumber(generatedOrder);
    setStep('success');
  };

  const handleFinish = () => {
    onOrderComplete();
    setStep('form');
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="checkout-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div
        className="relative w-full max-w-xl bg-[#0f0f13] border border-zinc-800 shadow-2xl p-6 sm:p-8 overflow-y-auto max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-zinc-400 hover:text-white transition-colors"
          aria-label="Close Checkout"
        >
          <X className="w-5 h-5" />
        </button>

        {step === 'form' ? (
          <div className="space-y-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-zinc-500">
                <Lock className="w-3.5 h-3.5 text-emerald-400" />
                <span>Encrypted Atelier Checkout</span>
              </div>
              <h2 id="checkout-modal-title" className="font-display text-2xl font-bold uppercase text-white">
                Dispatch Summary
              </h2>
            </div>

            {/* Price breakdown box */}
            <div className="p-4 bg-zinc-950 border border-zinc-800 space-y-2 text-xs font-mono">
              <div className="flex justify-between text-zinc-400">
                <span>Subtotal</span>
                <span className="text-white tabular-nums">{formatPrice(subtotalUSD, currency)}</span>
              </div>
              {discountUSD > 0 && (
                <div className="flex justify-between text-emerald-400">
                  <span>Discount ({promoCode})</span>
                  <span className="tabular-nums">-{formatPrice(discountUSD, currency)}</span>
                </div>
              )}
              <div className="flex justify-between text-zinc-400">
                <span>Worldwide Express Shipping</span>
                <span className="text-white tabular-nums">
                  {shippingUSD === 0 ? 'COMPLIMENTARY' : formatPrice(shippingUSD, currency)}
                </span>
              </div>
              <div className="flex justify-between text-sm font-semibold text-white pt-2 border-t border-zinc-800">
                <span>Total Amount</span>
                <span className="tabular-nums">{formatPrice(totalUSD, currency)}</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider block">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-black/60 border border-zinc-700 focus:border-white px-3 py-2 text-xs font-mono text-white focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider block">
                  Transmission Email
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-black/60 border border-zinc-700 focus:border-white px-3 py-2 text-xs font-mono text-white focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider block">
                  Delivery Destination
                </label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full bg-black/60 border border-zinc-700 focus:border-white px-3 py-2 text-xs font-mono text-white focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider block">
                    City
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full bg-black/60 border border-zinc-700 focus:border-white px-3 py-2 text-xs font-mono text-white focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider block">
                    Postal Code
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.postalCode}
                    onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                    className="w-full bg-black/60 border border-zinc-700 focus:border-white px-3 py-2 text-xs font-mono text-white focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider block">
                    Country
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className="w-full bg-black/60 border border-zinc-700 focus:border-white px-3 py-2 text-xs font-mono text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="p-3 bg-zinc-900/60 border border-zinc-800 text-[11px] font-mono text-zinc-400 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-zinc-300 shrink-0" />
                <span>Simulated Portfolio Checkout · No actual charge will be made</span>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-6 bg-white hover:bg-zinc-200 text-black font-mono text-xs uppercase tracking-widest font-semibold transition-all cursor-pointer shadow-lg active:scale-98"
              >
                Place Order · {formatPrice(totalUSD, currency)}
              </button>
            </form>
          </div>
        ) : (
          <div className="space-y-6 py-4 text-center">
            <div className="w-16 h-16 mx-auto bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <span className="font-mono text-xs uppercase tracking-widest text-emerald-400">
                Order Confirmed
              </span>
              <h2 className="font-display text-2xl font-bold uppercase text-white">
                Archival Package Preparing
              </h2>
              <p className="text-xs font-mono text-zinc-400">
                Reference Code: <span className="text-white font-bold">{orderNumber}</span>
              </p>
            </div>

            <div className="p-4 bg-zinc-950 border border-zinc-800 text-left text-xs font-mono space-y-2 text-zinc-300">
              <div className="flex items-center gap-2 text-white">
                <PackageCheck className="w-4 h-4 text-emerald-400" />
                <span>Tracking dispatched to {formData.email}</span>
              </div>
              <p className="text-zinc-500 text-[11px]">
                Shipment scheduled for dispatch via DHL Express from Milan Atelier within 24 hours.
              </p>
            </div>

            <button
              onClick={handleFinish}
              className="w-full py-3 px-6 bg-white hover:bg-zinc-200 text-black font-mono text-xs uppercase tracking-widest font-semibold transition-colors cursor-pointer"
            >
              Return to Catalog
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
