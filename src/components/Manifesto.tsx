import React from 'react';
import { HERO_IMAGE_PATH, HERO_FALLBACK_IMAGE } from '../data/products';

export const Manifesto: React.FC = () => {
  return (
    <section id="manifesto" className="py-24 sm:py-32 border-b border-zinc-800 bg-[#0c0c0e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Editorial Visual Column (5 cols) */}
          <div className="lg:col-span-5 relative aspect-[4/5] bg-zinc-900 overflow-hidden border border-zinc-800">
            <img
              src={HERO_IMAGE_PATH}
              onError={(e) => {
                e.currentTarget.src = HERO_FALLBACK_IMAGE;
              }}
              alt="EXOSYNTAX Atelier Editorial"
              className="w-full h-full object-cover filter grayscale contrast-125"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <span className="font-mono text-xs uppercase tracking-widest text-zinc-400">
                Atelier Document // 2026
              </span>
              <p className="font-display text-lg font-bold uppercase text-white mt-1">
                Monolithic Forms. Zero Noise.
              </p>
            </div>
          </div>

          {/* Storytelling Text Column (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-zinc-500">
                <span>The Architecture of Utility</span>
                <span aria-hidden="true">·</span>
                <span>Foundational Manifesto</span>
              </div>
              <h2 className="font-display text-3xl sm:text-5xl font-extrabold uppercase text-white tracking-tight leading-[1.05]">
                We Do Not Follow Trends. <br />
                We Build Invariants.
              </h2>
            </div>

            <p className="text-base sm:text-lg text-zinc-300 font-light leading-relaxed">
              EXOSYNTAX was conceived as a structural resistance against the disposable velocity of seasonal fashion.
              We operate as a technical design lab in Tokyo and Milan, constructing modular garments at the nexus of brutalist
              architecture and high-performance textile engineering.
            </p>

            <p className="text-sm text-zinc-400 font-light leading-relaxed">
              Every garment in our catalog is pattern-cut to enable uninhibited anatomical freedom. We reject superfluous branding,
              decorative tabs, and fragile fasteners in favor of bonded membranes, waterproof magnetic hardware, and heavyweight organic
              fibers that develop a richer patina over decades of urban wear.
            </p>

            {/* 3 Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-zinc-800/80">
              <div className="space-y-2">
                <span className="font-mono text-xs text-white uppercase tracking-wider block">
                  01. Material Rigor
                </span>
                <p className="text-xs text-zinc-400 font-light leading-normal">
                  Custom-milled Japanese twills, 3-layer bonded membranes, and aerospace aluminium alloy fixtures.
                </p>
              </div>

              <div className="space-y-2">
                <span className="font-mono text-xs text-white uppercase tracking-wider block">
                  02. Form Purity
                </span>
                <p className="text-xs text-zinc-400 font-light leading-normal">
                  Monolithic silhouettes informed by brutalist concrete geometry and minimalist ergonomics.
                </p>
              </div>

              <div className="space-y-2">
                <span className="font-mono text-xs text-white uppercase tracking-wider block">
                  03. Finite Runs
                </span>
                <p className="text-xs text-zinc-400 font-light leading-normal">
                  Every release is strictly limited to 300 pieces per silhouette to eliminate overproduction waste.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
