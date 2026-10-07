'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ArrowRight, 
  MessageCircle, 
  Zap, 
  Server, 
  Activity, 
  Cpu, 
  CheckCircle2, 
  Globe,
  BarChart3,
  TrendingDown,
  ShieldCheck
} from 'lucide-react';

type TabType = 'servers' | 'savings' | 'speed-test';

export function LandingHero() {
  const [activeTab, setActiveTab] = useState<TabType>('servers');
  const [trafficProfile, setTrafficProfile] = useState<'peak' | 'normal'>('peak');
  const [liveThroughput, setLiveThroughput] = useState(482.6);

  // Micro-fluctuations so the live counter feels real and responsive
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveThroughput(prev => {
        const delta = (Math.random() - 0.5) * 1.6;
        return Number((Math.max(476, Math.min(494, prev + delta))).toFixed(1));
      });
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section 
      id="overview" 
      className="relative pt-20 pb-12 md:pt-24 md:pb-16 overflow-hidden bg-gradient-to-b from-sky-50/70 via-white to-slate-50 text-slate-900 selection:bg-blue-600 selection:text-white"
    >
      {/* Background Ambient Glows & Precision Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(59,130,246,0.18),rgba(255,255,255,0))] pointer-events-none" />
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-cyan-400/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 -right-48 w-96 h-96 bg-blue-500/15 rounded-full blur-[140px] pointer-events-none" />
      
      {/* Precision High-Tech Grid Lines */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a0a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a0a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_70%_50%_at_50%_15%,#000_65%,transparent_100%)] pointer-events-none" 
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Badge: Clear & Understandable by Everyone */}
        <div className="flex justify-center mb-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/95 border border-blue-200/90 text-xs font-medium shadow-xs shadow-blue-500/10 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
            </span>
            <span className="text-blue-700 font-bold tracking-wide">BD CacheX v2.4</span>
            <span className="text-slate-300">|</span>
            <span className="text-slate-700 font-medium">Smart Internet Speed & Bandwidth Saving Platform</span>
            <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Active in Bangladesh
            </span>
          </div>
        </div>

        {/* Hero Title & Pitch */}
        <div className="text-center max-w-4xl mx-auto space-y-2.5">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-black tracking-tight text-slate-900 leading-[1.15]">
            Save{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-cyan-600 to-indigo-600">
              80% on Internet Costs
            </span>{' '}
            & Make Websites{' '}
            <span className="text-slate-900">10x Faster</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Built for Bangladesh’s ISPs, Data Centers, and Networks. Store and serve <strong className="text-slate-800 font-semibold">YouTube</strong>,{' '}
            <strong className="text-slate-800 font-semibold">Facebook</strong>, and <strong className="text-slate-800 font-semibold">Netflix</strong> directly from local fast servers — with zero buffering.
          </p>

          {/* Action Buttons Row */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 pt-1.5">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-700 hover:from-blue-700 hover:to-cyan-700 text-white shadow-md shadow-blue-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0 whitespace-nowrap shrink-0 group"
            >
              <Zap className="w-4 h-4 fill-current text-cyan-200 group-hover:scale-110 transition-transform shrink-0" />
              <span>Get Setup & Save Costs</span>
            </a>

            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 hover:border-blue-500 shadow-2xs transition-all transform hover:-translate-y-0.5 whitespace-nowrap shrink-0"
            >
              <Server className="w-4 h-4 text-blue-600 shrink-0" />
              <span>Try Live Interactive Demo</span>
              <ArrowRight className="w-4 h-4 text-slate-400 shrink-0" />
            </Link>

            <a
              href="https://wa.me/+8801881169880"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-600/25 transition-all transform hover:-translate-y-0.5 whitespace-nowrap shrink-0"
            >
              <MessageCircle className="w-4 h-4 fill-current shrink-0" />
              <span>WhatsApp: +880 1881-169880</span>
            </a>
          </div>

          {/* Compact Architect Verification Pill */}
          <div className="pt-0.5 flex justify-center">
            <div className="inline-flex flex-wrap items-center justify-center gap-2.5 px-3 py-1 rounded-full bg-white border border-slate-200/90 shadow-2xs text-xs">
              <div className="flex items-center gap-2">
                <div className="relative w-5 h-5 rounded-full overflow-hidden border border-blue-500 shadow-2xs shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/profile.jpg" alt="Md. Mohsin" className="w-full h-full object-cover" />
                  <span className="absolute bottom-0 right-0 w-1.5 h-1.5 rounded-full bg-emerald-500 ring-1 ring-white" />
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-slate-900">Md. Mohsin</span>
                  <span className="text-[10px] font-bold text-blue-700 bg-blue-50 border border-blue-200 px-1.5 py-0.2 rounded font-mono">
                    Lead Systems Architect
                  </span>
                </div>
              </div>

              <span className="text-slate-300">|</span>

              <div className="flex items-center gap-1.5">
                <a
                  href="https://wa.me/+8801881169880"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2 py-0.5 rounded-md bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 text-[11px] font-semibold flex items-center gap-1 transition-colors"
                >
                  <MessageCircle className="w-3 h-3" />
                  <span>WhatsApp</span>
                </a>

                <a
                  href="https://www.facebook.com/muhammad.mohsin.0033/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2 py-0.5 rounded-md bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 text-[11px] font-semibold flex items-center gap-1 transition-colors"
                >
                  <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  <span>Facebook</span>
                </a>

                <a
                  href="https://md-mohsin.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2 py-0.5 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 text-[11px] font-semibold flex items-center gap-1 transition-colors"
                >
                  <Globe className="w-3 h-3 text-blue-600" />
                  <span>Portfolio</span>
                </a>
              </div>
            </div>
          </div>

          {/* Quick Highlight Points */}
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1 pt-0.5 text-[11px] sm:text-xs text-slate-600">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Zero Buffering on 4K Videos</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Instant 3ms Local Response</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Turnkey Hardware & Easy Setup</span>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* CENTERPIECE: STUNNING ENTERPRISE NOC & SERVER HARDWARE SHOWCASE */}
        {/* ========================================================================= */}
        <div className="mt-6 relative max-w-5xl mx-auto">
          {/* Luminous Glow Behind Console Window */}
          <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/20 via-cyan-500/20 to-indigo-500/20 rounded-3xl blur-2xl opacity-70 pointer-events-none" />

          {/* Floating Pill Badges around Showcase (Desktop Enhancements) */}
          <div className="hidden lg:block absolute -top-8 -left-4 xl:-left-8 z-20 animate-float-gentle">
            <div className="px-3.5 py-1.5 rounded-xl bg-white/95 border border-cyan-400/50 shadow-xl shadow-cyan-500/10 backdrop-blur-md flex items-center gap-2">
              <div className="p-1 rounded-lg bg-cyan-50 text-cyan-700 border border-cyan-200">
                <TrendingDown className="w-3.5 h-3.5" />
              </div>
              <div className="text-left">
                <div className="text-[9px] uppercase font-mono tracking-wider text-slate-500">Bandwidth Saved</div>
                <div className="text-[11px] font-bold text-slate-900">85.4% Served Locally</div>
              </div>
            </div>
          </div>

          <div className="hidden lg:block absolute -top-8 -right-4 xl:-right-8 z-20 animate-float-reverse">
            <div className="px-3.5 py-1.5 rounded-xl bg-white/95 border border-emerald-400/50 shadow-xl shadow-emerald-500/10 backdrop-blur-md flex items-center gap-2">
              <div className="p-1 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200">
                <Zap className="w-3.5 h-3.5 fill-current" />
              </div>
              <div className="text-left">
                <div className="text-[9px] uppercase font-mono tracking-wider text-slate-500">Superfast Response</div>
                <div className="text-[11px] font-bold text-slate-900">3.2 ms Average Delay</div>
              </div>
            </div>
          </div>

          {/* Main Showcase Window */}
          <div className="relative rounded-2xl bg-slate-950 border border-slate-800 shadow-2xl shadow-blue-900/20 overflow-hidden">
            {/* Window Top Title Bar */}
            <div className="px-4 py-2.5 bg-slate-900 border-b border-slate-800 flex flex-wrap items-center justify-between gap-2.5 text-white">
              {/* Window Controls & Server Status */}
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-rose-500" />
                  <div className="w-3 h-3 rounded-full bg-amber-500" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                </div>
                <div className="flex items-center gap-2 text-xs font-mono">
                  <span className="text-slate-300 font-semibold hidden sm:inline">
                    Dhaka Core Cache Center
                  </span>
                  <span className="text-slate-600 hidden sm:inline">::</span>
                  <span className="inline-flex items-center gap-1.5 text-[11px] text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/25">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    LIVE TRAFFIC STREAM
                  </span>
                </div>
              </div>

              {/* Intuitive Tab Switcher */}
              <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
                <button
                  onClick={() => setActiveTab('servers')}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-medium transition-all ${
                    activeTab === 'servers'
                      ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-sm font-semibold'
                      : 'text-slate-400 hover:text-white hover:bg-slate-900'
                  }`}
                >
                  <Server className="w-3.5 h-3.5" />
                  <span>3D Server Hardware</span>
                </button>

                <button
                  onClick={() => setActiveTab('savings')}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-medium transition-all ${
                    activeTab === 'savings'
                      ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-sm font-semibold'
                      : 'text-slate-400 hover:text-white hover:bg-slate-900'
                  }`}
                >
                  <Activity className="w-3.5 h-3.5" />
                  <span>Live Speed & Savings</span>
                </button>

                <button
                  onClick={() => setActiveTab('speed-test')}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-medium transition-all ${
                    activeTab === 'speed-test'
                      ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-sm font-semibold'
                      : 'text-slate-400 hover:text-white hover:bg-slate-900'
                  }`}
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>Speed Test Comparison</span>
                </button>
              </div>
            </div>

            {/* TAB 1: 3D SERVER HARDWARE VIEW */}
            {activeTab === 'servers' && (
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-950">
                {/* Datacenter Photo */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/bd-cachex-network.jpg"
                  alt="BD CacheX High-Speed Enterprise Edge Server"
                  className="w-full h-full object-cover brightness-95"
                />

                {/* Gradient shade for easy reading */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-slate-950/40 pointer-events-none" />

                {/* Overlaid Card 1: Live Speed & Traffic Saved */}
                <div className="absolute top-4 left-4 sm:top-5 sm:left-5 max-w-[200px] sm:max-w-xs bg-slate-950/90 backdrop-blur-md p-3 sm:p-3.5 rounded-xl border border-cyan-500/40 shadow-2xl text-white">
                  <div className="flex items-center justify-between text-[11px] text-cyan-400 font-mono mb-1">
                    <span className="flex items-center gap-1.5 font-bold">
                      <Activity className="w-3.5 h-3.5 animate-pulse" />
                      LIVE DATA SPEED
                    </span>
                    <span className="text-emerald-400 font-bold bg-emerald-500/10 px-1.5 py-0.2 rounded border border-emerald-500/20">
                      ACTIVE
                    </span>
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-white tracking-tight font-mono">
                    {liveThroughput} <span className="text-xs font-normal text-slate-400">Gbps</span>
                  </div>
                  <div className="text-[11px] text-slate-300 mt-1 flex items-center justify-between">
                    <span>Bandwidth Saved:</span>
                    <span className="text-emerald-400 font-bold font-mono">85.4%</span>
                  </div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-500 to-cyan-400 h-full w-[85.4%]" />
                  </div>
                </div>

                {/* Overlaid Card 2: Server Health */}
                <div className="absolute bottom-4 right-4 sm:bottom-5 sm:right-5 max-w-[240px] sm:max-w-sm bg-slate-950/90 backdrop-blur-md p-3 sm:p-3.5 rounded-xl border border-blue-500/40 shadow-2xl text-white">
                  <div className="flex items-center justify-between text-[11px] text-blue-400 font-mono mb-1">
                    <span className="flex items-center gap-1.5 font-bold">
                      <Server className="w-3.5 h-3.5" />
                      SERVER HEALTH
                    </span>
                    <span className="text-emerald-400 font-bold bg-emerald-500/10 px-1.5 py-0.2 rounded border border-emerald-500/20">
                      100% OK
                    </span>
                  </div>
                  <div className="text-xs text-slate-100 font-semibold">
                    Dell PowerEdge & Enterprise NVMe Storage
                  </div>
                  <div className="grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-slate-800 text-[11px] font-mono">
                    <div>
                      <span className="text-slate-400 block text-[10px]">RESPONSE TIME</span>
                      <span className="text-cyan-300 font-bold">3.2 ms (Instant)</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">TRAFFIC STATUS</span>
                      <span className="text-emerald-400 font-bold">Zero Buffering</span>
                    </div>
                  </div>
                </div>

                {/* Top-Right Platform Badges */}
                <div className="hidden sm:flex absolute top-5 right-5 items-center gap-1.5 bg-slate-950/85 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-700 text-xs text-white">
                  <span className="text-slate-400 text-[11px]">Instant Cache for:</span>
                  <span className="px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-300 text-[10px] font-bold">YouTube</span>
                  <span className="px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300 text-[10px] font-bold">Facebook</span>
                  <span className="px-1.5 py-0.5 rounded bg-red-500/20 text-red-300 text-[10px] font-bold">Netflix</span>
                  <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] font-bold">Cloudflare</span>
                </div>
              </div>
            )}

            {/* TAB 2: LIVE SPEED & SAVINGS */}
            {activeTab === 'savings' && (
              <div className="p-4 sm:p-5 bg-slate-950 text-white">
                {/* Control bar */}
                <div className="flex flex-wrap items-center justify-between gap-3 mb-3 pb-2.5 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-cyan-400 font-semibold flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                      LIVE INTERNET TRAFFIC & SAVINGS MONITOR
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-slate-400">View:</span>
                    <button
                      onClick={() => setTrafficProfile('peak')}
                      className={`px-2.5 py-0.5 rounded font-medium transition-colors ${
                        trafficProfile === 'peak'
                          ? 'bg-blue-600 text-white font-bold'
                          : 'bg-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      Evening Peak (8 PM)
                    </button>
                    <button
                      onClick={() => setTrafficProfile('normal')}
                      className={`px-2.5 py-0.5 rounded font-medium transition-colors ${
                        trafficProfile === 'normal'
                          ? 'bg-blue-600 text-white font-bold'
                          : 'bg-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      Day Time
                    </button>
                  </div>
                </div>

                {/* Visual Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  {/* Traffic Graph */}
                  <div className="lg:col-span-2 p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                    <div className="flex items-center justify-between mb-1.5">
                      <div>
                        <div className="text-xs font-bold text-slate-200">Total Internet Traffic Handled</div>
                        <div className="text-[10px] text-slate-400">
                          Notice how 85% is served free from local servers!
                        </div>
                      </div>
                      <div className="flex items-center gap-2.5 text-xs font-mono">
                        <span className="flex items-center gap-1 text-cyan-300 font-semibold text-[11px]">
                          <span className="w-2 h-2 rounded-full bg-cyan-400" />
                          Local Fast Cache (414 Gbps)
                        </span>
                        <span className="flex items-center gap-1 text-purple-400 font-semibold text-[11px]">
                          <span className="w-2 h-2 rounded-full bg-purple-500" />
                          Paid Internet (68 Gbps)
                        </span>
                      </div>
                    </div>

                    {/* High-Fidelity SVG Curve */}
                    <div className="relative h-40 w-full mt-2">
                      <svg viewBox="0 0 700 200" className="w-full h-full overflow-visible">
                        <defs>
                          <linearGradient id="cacheGradientLight" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.4" />
                            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                          </linearGradient>
                        </defs>

                        {/* Grid lines */}
                        <line x1="0" y1="50" x2="700" y2="50" stroke="#334155" strokeDasharray="3 3" strokeOpacity="0.3" />
                        <line x1="0" y1="100" x2="700" y2="100" stroke="#334155" strokeDasharray="3 3" strokeOpacity="0.3" />
                        <line x1="0" y1="150" x2="700" y2="150" stroke="#334155" strokeDasharray="3 3" strokeOpacity="0.3" />

                        {/* Local Cache Curve */}
                        <path
                          d="M 0 160 Q 70 140 140 90 T 280 40 T 420 70 T 560 30 T 700 80 L 700 190 L 0 190 Z"
                          fill="url(#cacheGradientLight)"
                        />
                        <path
                          d="M 0 160 Q 70 140 140 90 T 280 40 T 420 70 T 560 30 T 700 80"
                          fill="none"
                          stroke="#22d3ee"
                          strokeWidth="2.5"
                        />

                        {/* Paid Transit Curve */}
                        <path
                          d="M 0 180 Q 70 175 140 165 T 280 155 T 420 162 T 560 150 T 700 165"
                          fill="none"
                          stroke="#c084fc"
                          strokeWidth="2"
                        />

                        {/* Peak Point */}
                        <circle cx="560" cy="30" r="5" fill="#22d3ee" className="animate-ping" opacity="0.75" />
                        <circle cx="560" cy="30" r="4" fill="#ffffff" />
                        <text x="495" y="20" fill="#22d3ee" fontSize="11" fontFamily="monospace" fontWeight="bold">
                          PEAK 482.6 Gbps
                        </text>
                      </svg>
                    </div>

                    <div className="flex justify-between items-center text-[10px] text-slate-400 font-mono mt-1 pt-1.5 border-t border-slate-800">
                      <span>Morning</span>
                      <span>Noon</span>
                      <span>Afternoon</span>
                      <span className="text-cyan-400 font-bold">Evening 8 PM (Video Rush)</span>
                      <span>Midnight</span>
                    </div>
                  </div>

                  {/* Savings Circle */}
                  <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between">
                    <div>
                      <div className="text-xs font-bold text-slate-200">Bandwidth Cost Saved</div>
                      <div className="text-[10px] text-slate-400">Total monthly efficiency</div>
                    </div>

                    <div className="py-1 flex flex-col items-center justify-center">
                      <div className="relative w-24 h-24 flex items-center justify-center">
                        <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                          <circle cx="60" cy="60" r="48" stroke="#1e293b" strokeWidth="10" fill="none" />
                          <circle
                            cx="60"
                            cy="60"
                            r="48"
                            stroke="#06b6d4"
                            strokeWidth="10"
                            strokeDasharray="301"
                            strokeDashoffset={301 * (1 - 0.854)}
                            strokeLinecap="round"
                            fill="none"
                          />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                          <span className="text-xl font-black text-white font-mono">85.4%</span>
                          <span className="text-[8px] uppercase tracking-wider text-cyan-300 font-bold">SAVED</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1 pt-1.5 border-t border-slate-800 text-[11px]">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Served Free from Cache:</span>
                        <span className="font-mono text-cyan-300 font-bold">414.4 Gbps</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Paid Upstream Internet:</span>
                        <span className="font-mono text-slate-300">Only 68.2 Gbps</span>
                      </div>
                      <div className="flex justify-between pt-1 border-t border-slate-800/80">
                        <span className="text-slate-400">Money Saved / Month:</span>
                        <span className="font-mono text-emerald-400 font-bold">৳ 18,500,000+</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Popular Platform Breakdown */}
                <div className="mt-3 pt-3 border-t border-slate-800">
                  <div className="text-[11px] font-bold text-slate-300 mb-2">Popular Platform Performance</div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    <div className="p-2 rounded-xl bg-slate-900 border border-slate-800">
                      <div className="text-[11px] font-bold text-rose-400">YouTube 4K & Shorts</div>
                      <div className="text-xs font-mono font-bold text-white mt-0.5">124.5 Gbps</div>
                      <div className="text-[10px] text-emerald-400 font-medium">99.8% Cached (1.8ms)</div>
                    </div>

                    <div className="p-2 rounded-xl bg-slate-900 border border-slate-800">
                      <div className="text-[11px] font-bold text-blue-400">Facebook Reels & Video</div>
                      <div className="text-xs font-mono font-bold text-white mt-0.5">148.2 Gbps</div>
                      <div className="text-[10px] text-emerald-400 font-medium">98.6% Cached (2.1ms)</div>
                    </div>

                    <div className="p-2 rounded-xl bg-slate-900 border border-slate-800">
                      <div className="text-[11px] font-bold text-red-400">Netflix Movies & TV</div>
                      <div className="text-xs font-mono font-bold text-white mt-0.5">96.8 Gbps</div>
                      <div className="text-[10px] text-emerald-400 font-medium">99.2% Cached (2.4ms)</div>
                    </div>

                    <div className="p-2 rounded-xl bg-slate-900 border border-slate-800">
                      <div className="text-[11px] font-bold text-amber-400">Websites (Cloudflare)</div>
                      <div className="text-xs font-mono font-bold text-white mt-0.5">82.4 Gbps</div>
                      <div className="text-[10px] text-emerald-400 font-medium">97.9% Cached (1.9ms)</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: SPEED COMPARISON */}
            {activeTab === 'speed-test' && (
              <div className="p-4 sm:p-5 bg-slate-950 text-white">
                <div className="mb-3 pb-2.5 border-b border-slate-800">
                  <div className="text-xs font-mono text-cyan-400 font-semibold flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 fill-current" />
                    SPEED COMPARISON: LOCAL CACHE VS NORMAL OVERSEAS INTERNET
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    Lower milliseconds = instant loading. Higher milliseconds = spinning loading circle.
                  </div>
                </div>

                <div className="space-y-3 max-w-3xl mx-auto py-1">
                  {/* Option 1: BD CacheX */}
                  <div className="p-3 rounded-xl bg-slate-900/90 border border-emerald-500/40">
                    <div className="flex justify-between items-center text-xs mb-1">
                      <span className="font-bold text-emerald-400 flex items-center gap-2">
                        <Zap className="w-3.5 h-3.5 fill-current" />
                        BD CacheX Local Edge Cache
                      </span>
                      <span className="font-mono text-emerald-400 font-black">2.8 ms (Instant)</span>
                    </div>
                    <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
                      <div className="bg-gradient-to-r from-emerald-500 to-cyan-400 h-full w-[4%]" />
                    </div>
                    <div className="text-[10px] text-slate-300 mt-1">
                      Videos start instantly in under 0.1 seconds without any delay or buffering.
                    </div>
                  </div>

                  {/* Option 2: Local BDIX */}
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                    <div className="flex justify-between items-center text-xs mb-1">
                      <span className="font-medium text-cyan-300">Bangladesh Local Exchange (BDIX)</span>
                      <span className="font-mono text-cyan-300 font-bold">14.2 ms (Fast)</span>
                    </div>
                    <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
                      <div className="bg-cyan-500 h-full w-[15%]" />
                    </div>
                  </div>

                  {/* Option 3: Overseas Singapore */}
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                    <div className="flex justify-between items-center text-xs mb-1">
                      <span className="font-medium text-amber-400">International Submarine Cable (Singapore)</span>
                      <span className="font-mono text-amber-400 font-bold">48.5 ms (Noticeable delay)</span>
                    </div>
                    <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
                      <div className="bg-amber-500 h-full w-[45%]" />
                    </div>
                  </div>

                  {/* Option 4: Overseas US/Europe */}
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                    <div className="flex justify-between items-center text-xs mb-1">
                      <span className="font-medium text-rose-400">Overseas US/Europe Host (Standard Web)</span>
                      <span className="font-mono text-rose-400 font-bold">138.0 ms (Heavy buffering)</span>
                    </div>
                    <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
                      <div className="bg-rose-500 h-full w-[95%]" />
                    </div>
                  </div>

                  {/* Bottom Takeaway */}
                  <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-300 flex items-center justify-between">
                    <span>⚡ Result: Users get 96% faster streaming and never complain about buffering.</span>
                    <span className="font-bold text-white bg-emerald-600 px-2 py-0.5 rounded font-mono text-[11px]">96% FASTER</span>
                  </div>
                </div>
              </div>
            )}

            {/* Bottom Window Status Bar */}
            <div className="px-4 py-2 bg-slate-900 border-t border-slate-800 flex flex-wrap items-center justify-between text-xs text-slate-400 gap-2 font-mono">
              <div className="flex items-center gap-4">
                <span className="inline-flex items-center gap-1.5 text-slate-300 font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Dhaka BDIX 100G Port Ring: ONLINE
                </span>
                <span className="hidden sm:inline text-slate-700">|</span>
                <span className="hidden sm:inline-flex items-center gap-1.5 text-slate-300">
                  <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                  NVMe Flash Storage: 1.2M IOPS
                </span>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-cyan-400 font-semibold">
                <span>Auto Failover Safeguard</span>
                <span>•</span>
                <span>Sub-4ms Guaranteed</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
