import React from 'react';
import { Currency } from '../types';
import { CURRENCIES } from '../utils/cart';

interface AnnouncementBarProps {
  currentCurrency: Currency;
  onCurrencyChange: (c: Currency) => void;
}

export const AnnouncementBar: React.FC<AnnouncementBarProps> = ({
  currentCurrency,
  onCurrencyChange,
}) => {
  return (
    <aside
      aria-label="Store Announcement"
      className="bg-[#121215] border-b border-zinc-800/80 text-[11px] font-mono tracking-wider text-zinc-400 py-2 px-4 transition-colors"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3 overflow-hidden text-ellipsis whitespace-nowrap">
          <span className="text-zinc-200 uppercase font-medium">DROP 01 'EQUILIBRIUM'</span>
          <span className="text-zinc-600 hidden sm:inline" aria-hidden="true">/</span>
          <span className="hidden sm:inline text-zinc-400">WORLDWIDE EXPRESS SHIPPING</span>
          <span className="text-zinc-600 hidden md:inline" aria-hidden="true">/</span>
          <span className="hidden md:inline text-zinc-500">COMPLIMENTARY OVER $250</span>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <label htmlFor="currency-select-top" className="sr-only">
            Select Currency
          </label>
          <select
            id="currency-select-top"
            value={currentCurrency}
            onChange={(e) => onCurrencyChange(e.target.value as Currency)}
            className="bg-transparent text-zinc-300 hover:text-white border border-zinc-800 rounded px-2 py-0.5 text-[11px] cursor-pointer focus:outline-none focus:border-zinc-500 transition-colors"
          >
            {Object.keys(CURRENCIES).map((code) => (
              <option key={code} value={code} className="bg-zinc-900 text-zinc-200">
                {code} ({CURRENCIES[code as Currency].symbol})
              </option>
            ))}
          </select>
        </div>
      </div>
    </aside>
  );
};
