'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowRight, 
  MessageCircle, 
  Zap, 
  Server, 
  Activity, 
  Cpu, 
  CheckCircle2, 
  Globe
} from 'lucide-react';

export function LandingHero() {
  const [activeTab, setActiveTab] = useState<'topology' | 'telemetry'>('topology');

  return (
    <section id="overview" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-gradient-to-b from-sky-50/70 via-white to-slate-50/60 text-slate-900">
      {/* Background Ambient Glows & Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-10%,rgba(59,130,246,0.12),rgba(255,255,255,0))] pointer-events-none" />
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-cyan-400/10 rounded-full blur-[128px] pointer-events-none" />
      <div className="absolute top-1/3 -right-48 w-96 h-96 bg-blue-500/10 rounded-full blur-[128px] pointer-events-none" />
      
      {/* Subtle Grid Lines */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a0a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a0a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" 
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-blue-200 text-xs font-medium shadow-sm shadow-blue-500/10">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
            </span>
            <span className="text-blue-700 font-bold tracking-wide">BD CacheX v2.4</span>
            <span className="text-slate-300">|</span>
            <span className="text-slate-600 font-medium">Enterprise CDN & Edge Cache Orchestration</span>
          </div>
        </div>

        {/* Hero Title & Pitch */}
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-slate-900 leading-[1.12]">
            Cut Upstream Transit by{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-cyan-600 to-indigo-600">
              Up to 80%
            </span>{' '}
            with Intelligent Edge Caching
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            The all-in-one bandwidth distribution platform built for Bangladesh’s ISPs, IIGs, and Data Centers. 
            Centrally manage, monitor, and partition <span className="text-slate-900 font-semibold">Google GGC</span>,{' '}
            <span className="text-slate-900 font-semibold">Meta FNA</span>,{' '}
            <span className="text-slate-900 font-semibold">Netflix OCA</span>,{' '}
            <span className="text-slate-900 font-semibold">Cloudflare</span>, and <span className="text-slate-900 font-semibold">Akamai</span> edge nodes with microsecond precision.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white shadow-lg shadow-blue-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0 whitespace-nowrap shrink-0"
            >
              <Zap className="w-4 h-4 fill-current shrink-0" />
              <span className="whitespace-nowrap">Request Deployment</span>
            </a>

            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 shadow-sm hover:border-blue-400 transition-all transform hover:-translate-y-0.5 whitespace-nowrap shrink-0"
            >
              <Server className="w-4 h-4 text-blue-600 shrink-0" />
              <span className="whitespace-nowrap">Explore Live Platform</span>
              <ArrowRight className="w-4 h-4 text-slate-500 shrink-0" />
            </Link>

            <a
              href="https://wa.me/8801958113265"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl text-sm font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-600/25 transition-all transform hover:-translate-y-0.5 whitespace-nowrap shrink-0"
            >
              <MessageCircle className="w-4 h-4 fill-current shrink-0" />
              <span className="whitespace-nowrap">WhatsApp: +880 1958-113265</span>
            </a>
          </div>

          {/* Direct Architect Contact Showcase Strip */}
          <div className="pt-4 max-w-2xl mx-auto">
            <div className="p-3.5 sm:p-4 rounded-2xl bg-white border border-slate-200/90 shadow-lg shadow-slate-200/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-left">
              <div className="flex items-center gap-3">
                <div className="relative w-12 h-12 rounded-xl overflow-hidden border-2 border-blue-500 shadow-sm shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/profile.jpg" alt="Md. Mohsin" className="w-full h-full object-cover" />
                  <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 ring-2 ring-white" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900 whitespace-nowrap">Md. Mohsin</span>
                    <span className="text-[10px] font-bold text-blue-700 bg-blue-50 border border-blue-200 px-1.5 py-0.2 rounded font-mono whitespace-nowrap">
                      Lead Architect
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 whitespace-nowrap">
                    Direct consultation & hardware sizing for your ISP network
                  </p>
                </div>
              </div>

              {/* Direct Quick Badges */}
              <div className="flex items-center gap-2 shrink-0">
                <a
                  href="https://wa.me/8801958113265"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-300 text-[11px] font-semibold flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0"
                >
                  <MessageCircle className="w-3.5 h-3.5 shrink-0" />
                  <span className="whitespace-nowrap">WhatsApp</span>
                </a>

                <a
                  href="https://www.facebook.com/muhammad.mohsin.0033/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-300 text-[11px] font-semibold flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0"
                >
                  <svg className="w-3 h-3 fill-current shrink-0" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  <span className="whitespace-nowrap">Facebook</span>
                </a>

                <a
                  href="https://md-mohsin.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 text-[11px] font-semibold flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0"
                >
                  <Globe className="w-3.5 h-3.5 shrink-0" />
                  <span className="whitespace-nowrap">Portfolio</span>
                </a>
              </div>
            </div>
          </div>

          {/* Quick Assurance Badges */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 pt-2 text-xs text-slate-500">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Zero Transit Congestion</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Sub-4ms Local Latency</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Turnkey Hardware & BGP Integration</span>
            </div>
          </div>
        </div>

        {/* 3D Datacenter Visual Showcase Box with Light Frame */}
        <div className="mt-14 relative max-w-5xl mx-auto">
          {/* Subtle ambient shadow */}
          <div className="absolute -inset-1.5 bg-gradient-to-r from-blue-500/10 via-cyan-500/10 to-indigo-500/10 rounded-3xl blur-xl opacity-70"></div>

          <div className="relative rounded-2xl bg-white border border-slate-200 shadow-2xl overflow-hidden">
            {/* Visual Top Bar / Window Frame */}
            <div className="px-4 py-3 bg-slate-100/90 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-rose-400" />
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <div className="w-3 h-3 rounded-full bg-emerald-400" />
                </div>
                <span className="text-xs font-mono text-slate-600 ml-2 hidden sm:inline">
                  node-dhaka-core.bdcachex.net :: BGP AS-Peering Active
                </span>
              </div>

              {/* View Switcher */}
              <div className="flex items-center gap-1 bg-white p-0.5 rounded-lg border border-slate-200 text-xs shadow-xs">
                <button
                  onClick={() => setActiveTab('topology')}
                  className={`px-3 py-1 rounded-md font-medium transition-all ${
                    activeTab === 'topology'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Edge Topology 3D
                </button>
                <button
                  onClick={() => setActiveTab('telemetry')}
                  className={`px-3 py-1 rounded-md font-medium transition-all ${
                    activeTab === 'telemetry'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Live NOC Telemetry
                </button>
              </div>
            </div>

            {/* Visual Container */}
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-950">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={
                  activeTab === 'topology'
                    ? '/images/bd-cachex-network.jpg'
                    : '/images/bd-cachex-dashboard-telemetry.jpg'
                }
                alt="BD CacheX Edge Network Architecture"
                className="w-full h-full object-cover transition-opacity duration-500"
              />

              {/* Overlay Holographic Telemetry Cards */}
              <div className="absolute top-4 left-4 sm:top-6 sm:left-6 max-w-[240px] sm:max-w-xs bg-slate-950/85 backdrop-blur-md p-3 sm:p-4 rounded-xl border border-cyan-500/30 shadow-xl shadow-cyan-950/50 text-white">
                <div className="flex items-center justify-between text-[11px] text-cyan-400 font-mono mb-1">
                  <span className="flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                    LIVE EDGE INGEST
                  </span>
                  <span className="text-emerald-400 font-bold">ACTIVE</span>
                </div>
                <div className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  482.6 <span className="text-xs font-normal text-slate-400">Gbps</span>
                </div>
                <div className="text-[11px] text-slate-400 mt-1 flex items-center justify-between">
                  <span>Upstream Offloaded</span>
                  <span className="text-emerald-400 font-semibold font-mono">85.4%</span>
                </div>
              </div>

              <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 max-w-[260px] sm:max-w-sm bg-slate-950/85 backdrop-blur-md p-3 sm:p-4 rounded-xl border border-blue-500/30 shadow-xl shadow-blue-950/50 text-white">
                <div className="flex items-center justify-between text-[11px] text-blue-400 font-mono mb-1">
                  <span className="flex items-center gap-1.5">
                    <Server className="w-3.5 h-3.5 text-blue-400" />
                    RACK SERVER HEALTH
                  </span>
                  <span className="text-emerald-400 font-bold">OPTIMAL</span>
                </div>
                <div className="text-xs sm:text-sm text-slate-200 font-medium">
                  Dell PowerEdge & HP Enterprise Nodes
                </div>
                <div className="grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-slate-800 text-[11px] font-mono">
                  <div>
                    <span className="text-slate-400 block text-[10px]">LOCAL LATENCY</span>
                    <span className="text-cyan-300 font-bold">3.2 ms Avg</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">SERVERS ONLINE</span>
                    <span className="text-emerald-400 font-bold">100% Operational</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Status Ticker Bar */}
            <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between text-xs text-slate-600 gap-2">
              <div className="flex items-center gap-4">
                <span className="inline-flex items-center gap-1.5 text-slate-700 font-medium">
                  <Globe className="w-3.5 h-3.5 text-blue-600" />
                  Dhaka & Regional Datacenter Fabrics
                </span>
                <span className="hidden sm:inline text-slate-300">|</span>
                <span className="hidden sm:inline-flex items-center gap-1.5 text-slate-700 font-medium">
                  <Cpu className="w-3.5 h-3.5 text-cyan-600" />
                  NVMe Flash Edge Slices
                </span>
              </div>
              <div className="flex items-center gap-2 font-mono text-[11px] text-blue-600 font-semibold">
                <span>Direct BGP Routing</span>
                <span>•</span>
                <span>Automated SLA Failover</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
