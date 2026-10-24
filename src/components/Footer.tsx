import React from 'react';
import { Currency } from '../types';
import { CURRENCIES } from '../utils/cart';
import { ArrowUpRight, Download, Globe } from 'lucide-react';

interface FooterProps {
  currentCurrency: Currency;
  onCurrencyChange: (c: Currency) => void;
  onDownloadSingleHtml: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  currentCurrency,
  onCurrencyChange,
  onDownloadSingleHtml,
}) => {
  return (
    <footer className="bg-[#070709] border-t border-zinc-800 text-zinc-400 py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Main 4-column Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5 text-white"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <rect x="2" y="2" width="9" height="9" stroke="currentColor" strokeWidth="1.5" />
                <rect x="13" y="13" width="9" height="9" stroke="currentColor" strokeWidth="1.5" />
                <line x1="2" y1="22" x2="22" y2="2" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
              </svg>
              <span className="font-display text-base font-bold text-white uppercase tracking-wider">
                KINETIC ARCHIVE
              </span>
            </div>

            <p className="text-xs font-mono text-zinc-400 max-w-sm leading-relaxed">
              Technical luxury streetwear engineered in Tokyo & Milan. Dedicated to monolithic silhouettes,
              high-performance bonded textiles, and zero overproduction.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={onDownloadSingleHtml}
                className="inline-flex items-center gap-2 py-2 px-3.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-xs font-mono text-zinc-200 hover:text-white transition-colors cursor-pointer"
                title="Download Standalone Single-File HTML"
              >
                <Download className="w-3.5 h-3.5 text-zinc-400" />
                <span>Export Standalone HTML</span>
              </button>
            </div>
          </div>

          {/* Links: Catalog */}
          <div className="space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-zinc-200 block">
              Catalog
            </span>
            <ul className="space-y-2 text-xs font-mono text-zinc-400">
              <li>
                <a href="#drop01" className="hover:text-white transition-colors">Drop 01 // Equilibrium</a>
              </li>
              <li>
                <a href="#drop01" className="hover:text-white transition-colors">Technical Outerwear</a>
              </li>
              <li>
                <a href="#drop01" className="hover:text-white transition-colors">Articulated Bottoms</a>
              </li>
              <li>
                <a href="#drop01" className="hover:text-white transition-colors">Heavy Loopback Sweats</a>
              </li>
              <li>
                <a href="#drop01" className="hover:text-white transition-colors">Ballistic Hardware</a>
              </li>
            </ul>
          </div>

          {/* Links: Atelier & Manifesto */}
          <div className="space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-zinc-200 block">
              Atelier
            </span>
            <ul className="space-y-2 text-xs font-mono text-zinc-400">
              <li>
                <a href="#manifesto" className="hover:text-white transition-colors">Brand Manifesto</a>
              </li>
              <li>
                <a href="#lookbook" className="hover:text-white transition-colors">Lookbook Vol. 01</a>
              </li>
              <li>
                <span className="text-zinc-600">Material Provenance (Q3 2026)</span>
              </li>
              <li>
                <span className="text-zinc-600">Tokyo Design Lab</span>
              </li>
              <li>
                <span className="text-zinc-600">Milan Technical Atelier</span>
              </li>
            </ul>
          </div>

          {/* Links: Care & Currency */}
          <div className="space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-zinc-200 block">
              Global Regional
            </span>
            <div className="space-y-3">
              <label htmlFor="currency-select-footer" className="text-xs font-mono text-zinc-500 block">
                Billing Currency
              </label>
              <div className="relative">
                <Globe className="w-3.5 h-3.5 absolute left-3 top-3 text-zinc-500" />
                <select
                  id="currency-select-footer"
                  value={currentCurrency}
                  onChange={(e) => onCurrencyChange(e.target.value as Currency)}
                  className="w-full bg-zinc-950 border border-zinc-800 text-zinc-300 pl-8 pr-3 py-2 text-xs font-mono cursor-pointer focus:outline-none focus:border-zinc-500"
                >
                  {Object.keys(CURRENCIES).map((code) => (
                    <option key={code} value={code} className="bg-zinc-900 text-zinc-200">
                      {code} — {CURRENCIES[code as Currency].symbol} ({CURRENCIES[code as Currency].code})
                    </option>
                  ))}
                </select>
              </div>

              <div className="pt-2 flex items-center gap-3 text-xs font-mono">
                <span className="text-zinc-500">Dispatch:</span>
                <span className="text-zinc-300">Worldwide (DHL)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-500">
          <div className="flex items-center gap-4">
            <span>© 2026 KINETIC ARCHIVE ATELIER.</span>
            <span>ALL RIGHTS RESERVED.</span>
          </div>

          <div className="flex items-center gap-6 text-zinc-400">
            <span className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer">
              Instagram <ArrowUpRight className="w-3 h-3" />
            </span>
            <span className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer">
              Discord <ArrowUpRight className="w-3 h-3" />
            </span>
            <span className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer">
              Spotify <ArrowUpRight className="w-3 h-3" />
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
