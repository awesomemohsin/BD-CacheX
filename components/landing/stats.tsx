'use client';

import { TrendingDown, Zap, Server, ShieldCheck } from 'lucide-react';

export function LandingStats() {
  const stats = [
    {
      value: '80%+',
      label: 'Upstream Transit Saved',
      description: 'Serve video, social feeds, and updates directly from local edge NVMe storage.',
      icon: TrendingDown,
      color: 'from-blue-600 to-cyan-600',
      badge: 'Cost Efficiency',
    },
    {
      value: '< 4ms',
      label: 'Ultra-Low Edge Latency',
      description: 'Sub-second start times for YouTube 4K, Facebook Reels, and Netflix streams.',
      icon: Zap,
      color: 'from-amber-600 to-orange-600',
      badge: 'User Experience',
    },
    {
      value: '12+',
      label: 'Global CDN Engines',
      description: 'Unified management for Google GGC, Meta FNA, Netflix OCA, Cloudflare & Akamai.',
      icon: Server,
      color: 'from-emerald-600 to-teal-600',
      badge: 'Broad Integration',
    },
    {
      value: '99.99%',
      label: 'Edge Cluster Reliability',
      description: 'Automated capacity alarms, rack telemetry, and instant failover safeguards.',
      icon: ShieldCheck,
      color: 'from-purple-600 to-indigo-600',
      badge: 'Carrier Grade',
    },
  ];

  return (
    <section className="relative py-14 bg-white border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="relative group p-6 rounded-2xl bg-slate-50/80 border border-slate-200/90 hover:bg-white hover:border-slate-300 transition-all duration-300 hover:shadow-xl shadow-xs"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 group-hover:text-blue-600 transition-colors shadow-xs">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded-full bg-white text-slate-600 border border-slate-200">
                    {stat.badge}
                  </span>
                </div>

                <div className={`text-3xl sm:text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r ${stat.color} mb-1 font-mono`}>
                  {stat.value}
                </div>

                <h3 className="text-base font-bold text-slate-900 mb-1.5">
                  {stat.label}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {stat.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
