'use client';

import { useState, useEffect } from 'react';
import { MessageCircle, X, ChevronUp, ExternalLink, Globe } from 'lucide-react';

export function FloatingContactBar() {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 150);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-2.5 animate-in fade-in slide-in-from-bottom-4 duration-300">
      {/* Expanded Quick Options Menu */}
      {isExpanded && (
        <div className="bg-white/95 backdrop-blur-2xl border border-slate-200 p-4 rounded-2xl shadow-2xl w-72 space-y-3 mb-1">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="relative w-8 h-8 rounded-full overflow-hidden border border-blue-400">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/profile.jpg" alt="Md. Mohsin" className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900">Md. Mohsin</p>
                <p className="text-[10px] text-emerald-600 font-mono font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Available for Inquiries
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsExpanded(false)}
              className="text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-100"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-2 text-xs">
            {/* WhatsApp */}
            <a
              href="https://wa.me/8801958113265"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-300 transition-all font-bold"
            >
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp: +880 1958-113265</span>
              </div>
              <ExternalLink className="w-3.5 h-3.5 opacity-70" />
            </a>

            {/* Facebook */}
            <a
              href="https://www.facebook.com/muhammad.mohsin.0033/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-300 transition-all font-bold"
            >
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                <span>Facebook Profile</span>
              </div>
              <ExternalLink className="w-3.5 h-3.5 opacity-70" />
            </a>

            {/* Portfolio */}
            <a
              href="https://md-mohsin.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 transition-all font-semibold"
            >
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4" />
                <span>md-mohsin.vercel.app</span>
              </div>
              <ExternalLink className="w-3.5 h-3.5 opacity-70" />
            </a>
          </div>
        </div>
      )}

      {/* Main Floating Trigger Button */}
      <div className="flex items-center gap-2">
        <a
          href="https://wa.me/8801958113265"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-lg shadow-emerald-600/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0 whitespace-nowrap shrink-0"
        >
          <MessageCircle className="w-4 h-4 fill-current shrink-0" />
          <span className="whitespace-nowrap">WhatsApp: +880 1958-113265</span>
        </a>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="relative group p-1.5 pl-2 pr-3.5 rounded-full bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 shadow-xl backdrop-blur-xl flex items-center gap-2.5 transition-all transform hover:-translate-y-0.5 whitespace-nowrap shrink-0"
          aria-label="Contact options"
        >
          <div className="relative w-8 h-8 rounded-full overflow-hidden border border-blue-500 shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/profile.jpg" alt="Md. Mohsin" className="w-full h-full object-cover" />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
          </div>

          <div className="text-left hidden xs:block whitespace-nowrap">
            <span className="block text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors whitespace-nowrap">
              Contact Mohsin
            </span>
            <span className="block text-[10px] text-emerald-600 font-mono font-bold leading-none whitespace-nowrap">
              Online Now
            </span>
          </div>

          <div className="p-1 rounded-full bg-slate-100 text-slate-500 group-hover:text-slate-800 transition-colors shrink-0">
            <ChevronUp className={`w-3.5 h-3.5 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
          </div>
        </button>
      </div>
    </div>
  );
}
