import React from 'react';
import { Check, X } from 'lucide-react';

interface ToastProps {
  message: string | null;
  onDismiss: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, onDismiss }) => {
  if (!message) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-[#111115] border border-zinc-700 text-white py-3 px-4 shadow-2xl animate-in slide-in-from-bottom-4 duration-200"
    >
      <div className="w-5 h-5 bg-white text-black flex items-center justify-center shrink-0">
        <Check className="w-3.5 h-3.5" />
      </div>
      <span className="text-xs font-mono text-zinc-200">{message}</span>
      <button
        onClick={onDismiss}
        className="ml-2 text-zinc-500 hover:text-white p-1"
        aria-label="Dismiss message"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
