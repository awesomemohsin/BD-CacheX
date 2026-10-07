'use client';

import Link from 'next/link';
import { 
  ArrowUp, 
  MessageCircle, 
  Globe, 
  ExternalLink 
} from 'lucide-react';

export function LandingFooter() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-50 border-t border-slate-200 text-slate-600 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-cyan-500 p-[1px] shadow-xs">
                <div className="w-full h-full bg-white rounded-[7px] flex items-center justify-center p-1">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/logo.png" alt="BD CacheX" className="w-full h-full object-contain" />
                </div>
              </div>
              <span className="font-extrabold text-lg text-slate-900 tracking-tight">
                BD Cache<span className="text-blue-600">X</span>
              </span>
            </div>

            <p className="text-xs text-slate-600 max-w-sm leading-relaxed">
              Bangladesh’s dedicated CDN cache allocation, bandwidth optimization, and multi-tenant edge server management suite for ISPs, IIGs, and Datacenters.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://wa.me/8801958113265"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-emerald-700 hover:border-emerald-300 transition-colors shadow-xs"
                title="WhatsApp Direct"
              >
                <MessageCircle className="w-4 h-4" />
              </a>

              <a
                href="https://www.facebook.com/muhammad.mohsin.0033/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-blue-700 hover:border-blue-300 transition-colors shadow-xs"
                title="Facebook Profile"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>

              <a
                href="https://md-mohsin.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-cyan-700 hover:border-cyan-300 transition-colors shadow-xs"
                title="Mohsin's Portfolio"
              >
                <Globe className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5">
              <li><a href="#overview" className="hover:text-blue-600 transition-colors">Overview</a></li>
              <li><a href="#providers" className="hover:text-blue-600 transition-colors">Supported CDNs</a></li>
              <li><a href="#roi-calculator" className="hover:text-blue-600 transition-colors">ROI Calculator</a></li>
              <li><a href="#features" className="hover:text-blue-600 transition-colors">Core Features</a></li>
              <li><a href="#contact" className="hover:text-blue-600 transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Platform & Live Demo */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4">
              Platform Demo
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link href="/dashboard" className="text-blue-600 hover:underline flex items-center gap-1 font-semibold">
                  <span>Dashboard Overview</span>
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </li>
              <li><Link href="/dashboard/servers" className="hover:text-slate-900 transition-colors">Server Telemetry</Link></li>
              <li><Link href="/dashboard/distributions" className="hover:text-slate-900 transition-colors">Distributions Manager</Link></li>
              <li><Link href="/dashboard/companies" className="hover:text-slate-900 transition-colors">ISP & IIG Directory</Link></li>
              <li><Link href="/dashboard/reports" className="hover:text-slate-900 transition-colors">Capacity Reports</Link></li>
              <li><Link href="/login" className="hover:text-slate-900 transition-colors">Operator Sign In</Link></li>
            </ul>
          </div>

          {/* Contact Direct */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4">
              Direct Contact
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a 
                  href="https://wa.me/8801958113265" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-emerald-700 transition-colors flex items-center gap-1 font-mono font-bold text-emerald-700"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                  WhatsApp: +880 1958-113265
                </a>
              </li>
              <li>
                <a 
                  href="https://www.facebook.com/muhammad.mohsin.0033/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-blue-700 transition-colors flex items-center gap-1 font-medium"
                >
                  <svg className="w-3.5 h-3.5 fill-current text-blue-600" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  Facebook: Muhammad Mohsin
                </a>
              </li>
              <li>
                <a 
                  href="https://md-mohsin.vercel.app/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-cyan-700 transition-colors flex items-center gap-1 font-medium"
                >
                  <Globe className="w-3.5 h-3.5 text-cyan-600" />
                  Website: md-mohsin.vercel.app
                </a>
              </li>
              <li className="pt-2 text-slate-500">
                Location: Dhaka, Bangladesh
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="pt-12 mt-12 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-[11px] text-center sm:text-left">
            © 2026 BD CacheX. Architected with high-performance edge technologies. All rights reserved.
          </p>

          <div className="flex items-center gap-4 text-[11px] text-slate-600">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full overflow-hidden border border-blue-400">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/profile.jpg" alt="Md. Mohsin" className="w-full h-full object-cover" />
              </div>
              <span>
                Engineered by{' '}
                <a 
                  href="https://md-mohsin.vercel.app/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-blue-600 font-bold hover:underline"
                >
                  Md. Mohsin
                </a>
              </span>
            </div>

            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-white hover:bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200 transition-colors shadow-xs"
              title="Back to Top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
