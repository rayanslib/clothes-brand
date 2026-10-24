import React, { useState } from 'react';
import { Search, ShoppingBag, Menu, X } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenSearch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  onOpenSearch,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#09090b]/90 backdrop-blur-md border-b border-zinc-800/80 transition-all">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 sm:h-18 flex items-center justify-between gap-2 sm:gap-8">
        {/* Zone 1: Brand wordmark & geometric logo mark */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2 text-left group focus:outline-none"
            aria-label="KINETIC ARCHIVE Home"
          >
            {/* Custom geometric monogram SVG */}
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6 text-white transition-transform duration-300 group-hover:rotate-90 shrink-0"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <rect x="2" y="2" width="9" height="9" stroke="currentColor" strokeWidth="1.5" />
              <rect x="13" y="13" width="9" height="9" stroke="currentColor" strokeWidth="1.5" />
              <line x1="2" y1="22" x2="22" y2="2" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
            </svg>
            <span className="font-display text-sm sm:text-lg tracking-wider font-extrabold text-white whitespace-nowrap uppercase">
              KINETIC ARCHIVE
            </span>
          </button>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav
          aria-label="Primary Navigation"
          className="hidden md:flex items-center gap-8 text-xs font-mono uppercase tracking-widest text-zinc-400"
        >
          <button
            onClick={() => scrollTo('drop01')}
            className="hover:text-white transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            Drop 01
          </button>
          <button
            onClick={() => scrollTo('collection')}
            className="hover:text-white transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            Collection
          </button>
          <button
            onClick={() => scrollTo('manifesto')}
            className="hover:text-white transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            Manifesto
          </button>
          <button
            onClick={() => scrollTo('lookbook')}
            className="hover:text-white transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            Lookbook
          </button>
        </nav>

        {/* Zone 3: Interactive Affordances (Search + Cart + Mobile menu) */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          <button
            onClick={onOpenSearch}
            className="p-1.5 sm:p-2 text-zinc-400 hover:text-white transition-colors focus:outline-none rounded"
            aria-label="Search Collection"
          >
            <Search className="w-4 h-4" />
          </button>

          <button
            onClick={onOpenCart}
            className="relative flex items-center gap-1.5 sm:gap-2 py-1.5 sm:py-2 px-2.5 sm:px-3 text-zinc-200 hover:text-white bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded transition-colors focus:outline-none cursor-pointer"
            aria-label={`Shopping Cart with ${cartCount} items`}
          >
            <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span className="font-mono text-xs font-semibold tabular-nums text-white">
              BAG ({cartCount})
            </span>
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 md:hidden text-zinc-400 hover:text-white focus:outline-none"
            aria-label="Toggle mobile menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-zinc-800 bg-[#09090b] px-6 py-6 transition-all animate-in fade-in slide-in-from-top-2">
          <nav className="flex flex-col gap-4 text-sm font-mono uppercase tracking-widest text-zinc-400">
            <button
              onClick={() => scrollTo('drop01')}
              className="text-left py-2 hover:text-white transition-colors border-b border-zinc-900"
            >
              01 // Featured Drop
            </button>
            <button
              onClick={() => scrollTo('collection')}
              className="text-left py-2 hover:text-white transition-colors border-b border-zinc-900"
            >
              02 // Full Collection
            </button>
            <button
              onClick={() => scrollTo('manifesto')}
              className="text-left py-2 hover:text-white transition-colors border-b border-zinc-900"
            >
              03 // Brand Manifesto
            </button>
            <button
              onClick={() => scrollTo('lookbook')}
              className="text-left py-2 hover:text-white transition-colors border-b border-zinc-900"
            >
              04 // Visual Lookbook
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};
