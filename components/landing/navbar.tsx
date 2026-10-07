'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ArrowRight, MessageCircle } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Overview', href: '#overview' },
  { label: 'CDNs', href: '#providers' },
  { label: 'ROI Calculator', href: '#roi-calculator' },
  { label: 'Features', href: '#features' },
  { label: 'Contact', href: '#contact' },
] as const;

export function LandingNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-xl border-b border-slate-200/90 shadow-sm shadow-slate-200/40 py-2.5'
          : 'bg-white/65 backdrop-blur-lg border-b border-blue-100/50 py-3.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-cyan-500 to-indigo-600 p-[1.5px] shadow-md shadow-blue-500/15 group-hover:shadow-blue-500/30 transition-all shrink-0">
              <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center overflow-hidden p-1">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/logo.png" alt="BD CacheX" className="w-full h-full object-contain" />
              </div>
            </div>
            <div className="flex flex-col whitespace-nowrap">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors whitespace-nowrap">
                  BD Cache<span className="text-blue-600">X</span>
                </span>
                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200 whitespace-nowrap">
                  CDN EDGE
                </span>
              </div>
              <span className="text-[11px] text-slate-500 font-mono tracking-wider whitespace-nowrap">
                Bandwidth & Cache Allocator
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav 
            suppressHydrationWarning
            className="hidden lg:flex items-center gap-0.5 bg-slate-100/90 border border-slate-200/90 rounded-full px-3 py-1.5 backdrop-blur-md shrink-0"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-3 py-1 text-xs font-medium text-slate-600 hover:text-blue-600 hover:bg-white rounded-full transition-all whitespace-nowrap"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center gap-2 shrink-0">
            <a
              href="https://wa.me/+8801881169880"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-300 hover:bg-emerald-100 transition-all shadow-xs whitespace-nowrap shrink-0"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
              <MessageCircle className="w-3.5 h-3.5 shrink-0" />
              <span className="whitespace-nowrap">WhatsApp: +880 1881-169880</span>
            </a>

            <a
              href="#contact"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-700 bg-white border border-slate-200 hover:border-blue-400 hover:text-blue-600 transition-all shadow-xs whitespace-nowrap shrink-0"
            >
              <div className="w-5 h-5 rounded-full overflow-hidden border border-blue-400 shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/profile.jpg" alt="Mohsin" className="w-full h-full object-cover" />
              </div>
              <span className="whitespace-nowrap">Contact Mohsin</span>
            </a>

            <Link
              href="/dashboard"
              className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20 transition-all whitespace-nowrap shrink-0"
            >
              <span className="whitespace-nowrap">Dashboard</span>
              <ArrowRight className="w-3.5 h-3.5 shrink-0" />
            </Link>

            <Link
              href="/login"
              className="px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all whitespace-nowrap shrink-0"
            >
              <span className="whitespace-nowrap">Sign In</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2 shrink-0">
            <a
              href="https://wa.me/+8801881169880"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-300"
              title="WhatsApp"
            >
              <MessageCircle className="w-4 h-4" />
            </a>
            <Link
              href="/dashboard"
              className="px-2.5 py-1 text-xs font-semibold bg-blue-600 text-white rounded-md whitespace-nowrap"
            >
              Demo
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 border border-slate-200"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-2xl border-b border-slate-200 px-4 py-5 mt-3 space-y-3 shadow-xl animate-in slide-in-from-top-2">
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-slate-200">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-xs font-medium text-slate-700 hover:text-blue-600 hover:bg-slate-50 rounded-md whitespace-nowrap"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex flex-col gap-2 pt-2">
            <a
              href="https://wa.me/+8801881169880"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-300 whitespace-nowrap"
            >
              <MessageCircle className="w-4 h-4 shrink-0" />
              <span>Chat on WhatsApp (+880 1881-169880)</span>
            </a>
            <div className="grid grid-cols-2 gap-2">
              <Link
                href="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-1 px-4 py-2.5 rounded-lg text-xs font-semibold bg-blue-600 text-white whitespace-nowrap"
              >
                <span>Dashboard</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center px-4 py-2.5 rounded-lg text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200 whitespace-nowrap"
              >
                <span>Sign In</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
