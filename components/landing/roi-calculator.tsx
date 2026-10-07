'use client';

import { useState } from 'react';
import { 
  Calculator, 
  TrendingDown, 
  Zap, 
  ArrowRight, 
  Sliders, 
  CheckCircle2, 
  MessageCircle 
} from 'lucide-react';

export function LandingRoiCalculator() {
  const [bandwidthGbps, setBandwidthGbps] = useState<number>(20);
  const [hitRatioPercent, setHitRatioPercent] = useState<number>(75);
  const [costPerMbps, setCostPerMbps] = useState<number>(1.5); // USD
  const [currency, setCurrency] = useState<'USD' | 'BDT'>('USD');

  // Conversion rate: 1 USD = 120 BDT
  const conversionRate = 120;
  const effectiveCost = currency === 'USD' ? costPerMbps : costPerMbps * conversionRate;

  // Total Mbps
  const totalMbps = bandwidthGbps * 1000;
  // Offloaded Mbps
  const offloadedMbps = Math.round(totalMbps * (hitRatioPercent / 100));

  // Monthly savings
  const monthlySavings = Math.round(offloadedMbps * effectiveCost);
  // Annual savings
  const annualSavings = monthlySavings * 12;

  const formatMoney = (val: number) => {
    if (currency === 'USD') {
      return `$${val.toLocaleString()}`;
    }
    return `৳${val.toLocaleString()}`;
  };

  return (
    <section id="roi-calculator" className="relative py-24 bg-slate-50/70 border-b border-slate-200 text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider mb-3">
            <Calculator className="w-3.5 h-3.5" />
            Interactive Bandwidth ROI Engine
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
            Calculate Your Bandwidth Savings
          </h2>
          <p className="mt-4 text-base text-slate-600">
            See how much your ISP or enterprise network will save in monthly upstream IP transit costs by serving content from BD CacheX edge nodes.
          </p>
        </div>

        {/* Calculator Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Controls Column */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xl flex flex-col justify-between">
            <div className="space-y-8">
              {/* Currency Selector */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-bold text-slate-800">Network Parameters</span>
                </div>
                <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs">
                  <button
                    onClick={() => setCurrency('USD')}
                    className={`px-3 py-1 rounded-lg font-bold transition-all ${
                      currency === 'USD'
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    USD ($)
                  </button>
                  <button
                    onClick={() => setCurrency('BDT')}
                    className={`px-3 py-1 rounded-lg font-bold transition-all ${
                      currency === 'BDT'
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    BDT (৳)
                  </button>
                </div>
              </div>

              {/* Slider 1: Total Bandwidth */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-bold text-slate-800">
                    Total Network Peak Bandwidth
                  </label>
                  <span className="px-3 py-1 rounded-lg bg-blue-50 border border-blue-200 font-mono text-blue-700 text-sm font-black">
                    {bandwidthGbps} Gbps <span className="text-xs text-slate-500 font-normal">({(bandwidthGbps * 1000).toLocaleString()} Mbps)</span>
                  </span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="100"
                  step="1"
                  value={bandwidthGbps}
                  onChange={(e) => setBandwidthGbps(Number(e.target.value))}
                  className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="flex justify-between text-[11px] text-slate-500 font-mono">
                  <span>2 Gbps (Local ISP)</span>
                  <span>50 Gbps (Mid Tier)</span>
                  <span>100 Gbps (Large IIG / Telco)</span>
                </div>
              </div>

              {/* Slider 2: Cache Hit Ratio */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-bold text-slate-800">
                    Estimated Cache Hit Ratio (GGC + FNA + Netflix + CDNs)
                  </label>
                  <span className="px-3 py-1 rounded-lg bg-emerald-50 border border-emerald-300 font-mono text-emerald-700 text-sm font-black">
                    {hitRatioPercent}% Offload
                  </span>
                </div>
                <input
                  type="range"
                  min="40"
                  max="90"
                  step="1"
                  value={hitRatioPercent}
                  onChange={(e) => setHitRatioPercent(Number(e.target.value))}
                  className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                />
                <div className="flex justify-between text-[11px] text-slate-500 font-mono">
                  <span>40% (Basic static only)</span>
                  <span>75% (Standard BD ISP)</span>
                  <span>90% (Optimized All-CDN)</span>
                </div>
              </div>

              {/* Slider 3: Upstream Transit Cost */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-bold text-slate-800">
                    Upstream Transit / IPLC Cost ({currency} per Mbps/month)
                  </label>
                  <span className="px-3 py-1 rounded-lg bg-indigo-50 border border-indigo-200 font-mono text-indigo-700 text-sm font-black">
                    {currency === 'USD' ? `$${costPerMbps.toFixed(2)}` : `৳${(costPerMbps * conversionRate).toFixed(0)}`} / Mbps
                  </span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="4.0"
                  step="0.1"
                  value={costPerMbps}
                  onChange={(e) => setCostPerMbps(Number(e.target.value))}
                  className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
                <div className="flex justify-between text-[11px] text-slate-500 font-mono">
                  <span>Low Tier ($0.50 / Mbps)</span>
                  <span>Market Avg ($1.50 / Mbps)</span>
                  <span>Premium High ($4.00 / Mbps)</span>
                </div>
              </div>
            </div>

            {/* Visual Traffic Split Bar */}
            <div className="mt-8 pt-6 border-t border-slate-200 space-y-2">
              <div className="flex justify-between text-xs font-bold text-slate-700">
                <span className="flex items-center gap-1.5 text-blue-700">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-600 inline-block" />
                  BD CacheX Local Edge ({hitRatioPercent}%)
                </span>
                <span className="flex items-center gap-1.5 text-slate-500">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-400 inline-block" />
                  International Transit ({100 - hitRatioPercent}%)
                </span>
              </div>
              <div className="h-4 w-full bg-slate-200 rounded-full overflow-hidden flex p-0.5 border border-slate-300">
                <div 
                  className="h-full bg-gradient-to-r from-blue-600 to-emerald-500 rounded-l-full transition-all duration-300"
                  style={{ width: `${hitRatioPercent}%` }}
                />
                <div 
                  className="h-full bg-slate-400 rounded-r-full transition-all duration-300"
                  style={{ width: `${100 - hitRatioPercent}%` }}
                />
              </div>
            </div>
          </div>

          {/* Results Column */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border-2 border-blue-100 shadow-xl flex flex-col justify-between relative overflow-hidden">
            <div>
              <div className="flex items-center gap-2 text-blue-700 font-mono text-xs font-bold mb-6">
                <TrendingDown className="w-4 h-4" />
                PROJECTED FINANCIAL IMPACT
              </div>

              {/* Monthly Savings Big Card */}
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 mb-6">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
                  Estimated Monthly Savings
                </span>
                <div className="text-3xl sm:text-4xl md:text-5xl font-black text-emerald-600 font-mono tracking-tight">
                  {formatMoney(monthlySavings)}
                </div>
                <span className="text-xs text-slate-500 mt-2 block font-medium">
                  Reoccurring every 30 billing days
                </span>
              </div>

              {/* Annual Savings Card */}
              <div className="p-4 rounded-xl bg-slate-50/70 border border-slate-200 mb-6 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-600 font-medium">Annual Net Capital Retained</span>
                  <span className="text-lg font-bold text-slate-900 font-mono">{formatMoney(annualSavings)}</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-slate-200 text-xs">
                  <span className="text-slate-600">Bandwidth Retained Locally</span>
                  <span className="text-blue-700 font-mono font-bold">{(offloadedMbps / 1000).toFixed(1)} Gbps</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-600">Average Latency Drop</span>
                  <span className="text-emerald-700 font-mono font-bold">85ms ➔ 3.2ms</span>
                </div>
              </div>

              <div className="space-y-2 text-xs text-slate-700 font-medium">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Eliminate transit bill shock during viral stream events</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Zero subscriber buffering on 4K YouTube & Facebook Video</span>
                </div>
              </div>
            </div>

            {/* Direct Architect Contact Strip Inside Calculator */}
            <div className="pt-6 mt-6 border-t border-slate-200 space-y-3">
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center gap-3">
                <div className="relative w-11 h-11 rounded-xl overflow-hidden border-2 border-emerald-500 shrink-0 shadow-xs">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/profile.jpg" alt="Md. Mohsin" className="w-full h-full object-cover" />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">Md. Mohsin</span>
                    <span className="text-[10px] text-emerald-700 font-mono font-bold bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">Online</span>
                  </div>
                  <p className="text-[11px] text-slate-600 truncate">
                    Ready to save {formatMoney(monthlySavings)}/mo on your network?
                  </p>
                </div>
              </div>

              {/* Direct Instant Action Buttons */}
              <div className="grid grid-cols-2 gap-2">
                <a
                  href={`https://wa.me/+8801881169880?text=${encodeURIComponent(`Hello Mohsin, I checked the BD CacheX ROI calculator for ${bandwidthGbps} Gbps traffic and estimated ${formatMoney(monthlySavings)} monthly savings. I'd like to discuss deployment for my network.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl font-bold text-xs bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition-all text-center whitespace-nowrap"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-current shrink-0" />
                  <span>WhatsApp Chat</span>
                </a>

                <a
                  href="https://www.facebook.com/muhammad.mohsin.0033/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl font-bold text-xs bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition-all text-center whitespace-nowrap"
                >
                  <svg className="w-3.5 h-3.5 fill-current shrink-0" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  <span>Facebook</span>
                </a>
              </div>

              <a
                href="#contact"
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-xs bg-slate-900 hover:bg-slate-800 text-white shadow-md transition-all text-center whitespace-nowrap"
              >
                <span>Request Custom Sizing & Consultation Form</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
