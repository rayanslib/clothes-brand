import React, { useState } from 'react';
import { validateEmail } from '../utils/cart';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

interface NewsletterProps {
  onShowToast: (msg: string) => void;
}

export const Newsletter: React.FC<NewsletterProps> = ({ onShowToast }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [vipCode, setVipCode] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError('Please provide a valid email address.');
      return;
    }

    setError('');
    const generatedVip = `KA-VIP-${Math.floor(1000 + Math.random() * 9000)}`;
    setVipCode(generatedVip);
    setIsSubmitted(true);
    onShowToast(`VIP Access reserved. Use code VIPPASS at checkout for 15% off.`);
  };

  return (
    <section className="py-20 sm:py-28 border-b border-zinc-800 bg-[#0e0e12]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <div className="flex items-center justify-center gap-2 text-xs font-mono uppercase tracking-widest text-zinc-500">
          <span>Private Dispatch</span>
          <span aria-hidden="true">·</span>
          <span>Drop 02 Priority Roster</span>
        </div>

        <h2 className="font-display text-3xl sm:text-4xl font-extrabold uppercase text-white tracking-tight">
          Access the Archive First
        </h2>

        <p className="text-sm sm:text-base text-zinc-400 font-light max-w-xl mx-auto leading-relaxed">
          Subscribers receive 24-hour private window access prior to public catalog release.
          Strictly limited production runs. Zero marketing spam.
        </p>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="pt-4 max-w-md mx-auto space-y-3">
            <div className="flex flex-col sm:flex-row gap-2">
              <label htmlFor="newsletter-email" className="sr-only">
                Email Address
              </label>
              <input
                id="newsletter-email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError('');
                }}
                placeholder="name@domain.com"
                className="flex-1 bg-black/60 border border-zinc-700 focus:border-white px-4 py-3 text-sm text-white placeholder-zinc-500 font-mono rounded-none focus:outline-none transition-colors"
                required
              />
              <button
                type="submit"
                className="py-3 px-6 bg-white hover:bg-zinc-200 text-black font-mono text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer whitespace-nowrap active:scale-95"
              >
                <span>Request Access</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
            {error && (
              <p className="text-xs text-rose-400 font-mono text-left">{error}</p>
            )}
            <p className="text-[11px] font-mono text-zinc-600">
              By joining, you agree to receive encrypted release dispatches. Unsubscribe anytime.
            </p>
          </form>
        ) : (
          <div className="pt-6 pb-2 max-w-md mx-auto p-6 bg-black/80 border border-zinc-800 space-y-3 text-left">
            <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs uppercase tracking-wider">
              <CheckCircle2 className="w-4 h-4" />
              <span>Priority Credentials Confirmed</span>
            </div>
            <p className="text-sm text-zinc-300 font-light">
              Your transmission token has been cataloged for <span className="font-mono text-white">{email}</span>.
            </p>
            <div className="p-3 bg-zinc-950 border border-zinc-800 flex items-center justify-between font-mono text-xs">
              <span className="text-zinc-500 uppercase">VIP Pass ID:</span>
              <span className="text-white font-bold">{vipCode}</span>
            </div>
            <p className="text-[11px] font-mono text-zinc-500">
              Special perk: Use code <span className="text-zinc-300 font-bold">VIPPASS</span> at checkout for 15% off Drop 01.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
