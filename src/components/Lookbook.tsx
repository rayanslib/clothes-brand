import React from 'react';
import { PRODUCTS, HERO_IMAGE_PATH } from '../data/products';

export const Lookbook: React.FC = () => {
  return (
    <section id="lookbook" className="py-24 sm:py-32 border-b border-zinc-800 bg-[#09090b]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-zinc-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-zinc-500 mb-2">
              <span>Editorial Series</span>
              <span aria-hidden="true">·</span>
              <span>Volume 01</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-white">
              Visual Lookbook
            </h2>
          </div>
          <p className="text-xs font-mono text-zinc-400 max-w-sm">
            Captured on 35mm film across the concrete monoliths of Tokyo and Milan. Styled with Drop 01 artifacts.
          </p>
        </div>

        {/* Lookbook Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10">
          <div className="space-y-4">
            <div className="relative aspect-[3/4] bg-zinc-900 overflow-hidden border border-zinc-800 group">
              <img
                src={PRODUCTS[0].image}
                onError={(e) => {
                  if (PRODUCTS[0].fallbackImage) e.currentTarget.src = PRODUCTS[0].fallbackImage;
                }}
                alt="Tactical Shell Styling"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-6 flex flex-col justify-end">
                <span className="font-mono text-[11px] text-zinc-300 uppercase tracking-widest">Look 01</span>
                <span className="font-display text-base font-bold text-white uppercase">Modular Shell + Heavy Cargo</span>
              </div>
            </div>
            <div className="text-xs font-mono text-zinc-400 flex items-center justify-between">
              <span>PLATE 01.1 // RAIN STATE</span>
              <span className="text-zinc-600">35°39'N 139°41'E</span>
            </div>
          </div>

          <div className="space-y-4 md:mt-12">
            <div className="relative aspect-[3/4] bg-zinc-900 overflow-hidden border border-zinc-800 group">
              <img
                src={PRODUCTS[1].image}
                onError={(e) => {
                  if (PRODUCTS[1].fallbackImage) e.currentTarget.src = PRODUCTS[1].fallbackImage;
                }}
                alt="Articulated Cargo Styling"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-6 flex flex-col justify-end">
                <span className="font-mono text-[11px] text-zinc-300 uppercase tracking-widest">Look 02</span>
                <span className="font-display text-base font-bold text-white uppercase">Articulated Knee Pleat Study</span>
              </div>
            </div>
            <div className="text-xs font-mono text-zinc-400 flex items-center justify-between">
              <span>PLATE 02.4 // KINETIC TENSION</span>
              <span className="text-zinc-600">45°27'N 9°11'E</span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="relative aspect-[3/4] bg-zinc-900 overflow-hidden border border-zinc-800 group">
              <img
                src={HERO_IMAGE_PATH}
                onError={(e) => {
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80';
                }}
                alt="Full Ensemble Styling"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-6 flex flex-col justify-end">
                <span className="font-mono text-[11px] text-zinc-300 uppercase tracking-widest">Look 03</span>
                <span className="font-display text-base font-bold text-white uppercase">Complete Drop 01 Uniform</span>
              </div>
            </div>
            <div className="text-xs font-mono text-zinc-400 flex items-center justify-between">
              <span>PLATE 03.2 // BRUTALIST PAVILION</span>
              <span className="text-zinc-600">TOKYO ATELIER</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
