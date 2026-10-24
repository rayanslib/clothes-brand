import React from 'react';
import { ArrowDown, ChevronRight } from 'lucide-react';
import { HERO_IMAGE_PATH, HERO_FALLBACK_IMAGE } from '../data/products';

interface HeroProps {
  onShopDrop: () => void;
  onViewManifesto: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onShopDrop, onViewManifesto }) => {
  return (
    <section className="relative min-h-[85vh] lg:min-h-[90vh] flex items-end justify-start overflow-hidden border-b border-zinc-800">
      {/* Background Image Container with Measured Editorial Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src={HERO_IMAGE_PATH}
          onError={(e) => {
            e.currentTarget.src = HERO_FALLBACK_IMAGE;
          }}
          alt="KINETIC ARCHIVE Drop 01 Brutalist Architectural Campaign"
          className="w-full h-full object-cover object-center filter brightness-[0.75] contrast-[1.08] scale-100 transition-transform duration-1000 ease-out hover:scale-105"
        />
        {/* Gradients ensuring 4.5:1 text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-[#09090b]/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#09090b]/80 via-transparent to-transparent" />
      </div>

      {/* Hero Content Overlay */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 w-full">
        <div className="max-w-3xl space-y-6">
          {/* Unboxed Metadata Kicker */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] sm:text-xs font-mono uppercase tracking-widest text-zinc-400">
            <span>Drop 01 // Equilibrium</span>
            <span aria-hidden="true" className="hidden sm:inline">·</span>
            <span className="hidden sm:inline">Edition of 300</span>
            <span aria-hidden="true">·</span>
            <span className="text-zinc-300">Tokyo & Milan</span>
          </div>

          {/* Primary Balanced Headline */}
          <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold uppercase tracking-tight text-white leading-[0.95] text-balance">
            Form Follows <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-zinc-500">
              Silence.
            </span>
          </h1>

          {/* Editorial Subtitle */}
          <p className="text-base sm:text-lg text-zinc-300 max-w-xl font-light leading-relaxed">
            Architectural technical outerwear and heavy gauge textiles crafted for the relentless urban nomad.
            Engineered with zero compromises.
          </p>

          {/* Actions */}
          <div className="pt-4 flex flex-wrap items-center gap-4">
            <button
              onClick={onShopDrop}
              className="py-3.5 px-7 bg-white hover:bg-zinc-200 text-black font-mono text-xs uppercase tracking-widest font-semibold rounded-none transition-all flex items-center gap-2 cursor-pointer shadow-lg hover:shadow-white/10 active:scale-95"
            >
              <span>Shop Drop 01</span>
              <ChevronRight className="w-4 h-4" />
            </button>

            <button
              onClick={onViewManifesto}
              className="py-3.5 px-6 border border-zinc-700 hover:border-zinc-400 text-zinc-300 hover:text-white font-mono text-xs uppercase tracking-widest font-medium transition-colors cursor-pointer bg-zinc-950/40 backdrop-blur-sm"
            >
              Read Manifesto
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="mt-16 sm:mt-20 flex items-center justify-between border-t border-zinc-800/80 pt-6 text-xs font-mono text-zinc-500">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-white rounded-none" />
            <span className="tracking-widest uppercase">3-Layer Bonded Nylon · 520GSM French Terry</span>
          </div>

          <button
            onClick={onShopDrop}
            className="flex items-center gap-2 hover:text-zinc-300 transition-colors cursor-pointer"
            aria-label="Scroll to featured drop products"
          >
            <span className="hidden sm:inline uppercase tracking-widest">Scroll to Catalog</span>
            <ArrowDown className="w-4 h-4 animate-bounce" />
          </button>
        </div>
      </div>
    </section>
  );
};
