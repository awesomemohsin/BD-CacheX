'use client';

import { 
  Server, 
  Network, 
  Sliders, 
  Zap, 
  CheckCircle2, 
  Activity, 
  ArrowRight,
  Layers
} from 'lucide-react';

export function LandingArchitecture() {
  const steps = [
    {
      step: '01',
      title: 'Edge Server Rack Provisioning',
      subtitle: 'Physical Hardware Setup',
      description: 'Mount high-density storage servers (Dell PowerEdge, HPE, Supermicro) in your regional datacenter racks (Dhaka, Chittagong, Sylhet) with 10GbE / 40GbE / 100GbE fiber NICs.',
      icon: Server,
      badge: 'Step 1: Datacenter',
    },
    {
      step: '02',
      title: 'BGP Peering & Autonomous Routing',
      subtitle: 'Core Network Integration',
      description: 'Establish BGP peering between your core routers (Cisco, Juniper, MikroTik, Huawei) and the CDN partner edge appliances (Google GGC, Meta FNA, Netflix OCA).',
      icon: Network,
      badge: 'Step 2: Peering',
    },
    {
      step: '03',
      title: 'BD CacheX Central Partitioning',
      subtitle: 'Intelligent Quota Allocation',
      description: 'Add server nodes into BD CacheX. Segment multi-terabyte pools into dedicated slices and allocate them to specific ISP clients or distribution rings with a single click.',
      icon: Sliders,
      badge: 'Step 3: Orchestration',
    },
    {
      step: '04',
      title: 'Real-Time Offload & Telemetry',
      subtitle: 'Autonomous Traffic Optimization',
      description: 'End-user video streams and heavy downloads are served from local edge flash at <4ms latency. Upstream transit costs drop by 60-80% with live NOC telemetry.',
      icon: Zap,
      badge: 'Step 4: Live Offload',
    },
  ];

  return (
    <section id="architecture" className="relative py-24 bg-white text-slate-900 border-b border-slate-200 overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Layers className="w-3.5 h-3.5" />
            Seamless Deployment Pipeline
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
            How BD CacheX Works in Practice
          </h2>
          <p className="mt-4 text-base text-slate-600">
            A turn-key, battle-tested operational workflow designed to integrate seamlessly into existing ISP core networks without disrupting active subscriber traffic.
          </p>
        </div>

        {/* 4 Steps Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="relative group p-6 rounded-3xl bg-slate-50 border border-slate-200 hover:bg-white hover:border-blue-400 transition-all duration-300 hover:shadow-xl shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-2xl font-black text-blue-600">
                      {item.step}
                    </span>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-white text-slate-600 border border-slate-200">
                      {item.badge}
                    </span>
                  </div>

                  <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>

                  <h3 className="text-base font-bold text-slate-900 mb-1">
                    {item.title}
                  </h3>
                  <p className="text-xs font-semibold text-blue-600 mb-3">
                    {item.subtitle}
                  </p>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-200 flex items-center gap-1.5 text-[11px] text-emerald-700 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Carrier-grade SLA</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Telemetry Showcase Panel */}
        <div className="rounded-3xl bg-slate-50 border border-slate-200 overflow-hidden shadow-xl p-6 sm:p-8 lg:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-mono font-bold border border-blue-200">
                <Activity className="w-3.5 h-3.5" />
                REAL-TIME TELEMETRY & NOC VISIBILITY
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
                Complete Network Visibility From Edge to Core
              </h3>

              <p className="text-sm text-slate-600 leading-relaxed">
                BD CacheX continuously polls server nodes, cache hit ratios, and ISP allocation ceilings. 
                Get sub-second telemetry on every single gigabyte delivered domestically versus upstream transit hops.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3">
                  <div className="p-1 rounded-full bg-blue-100 text-blue-700 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-slate-900">Live Hit-Ratio Tracking</h5>
                    <p className="text-[11px] text-slate-600">Visual curves showing real-time offload percentage and peak evening demand spikes.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-1 rounded-full bg-emerald-100 text-emerald-700 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-slate-900">Automated Capacity Balancing</h5>
                    <p className="text-[11px] text-slate-600">Shift allocations between saturated nodes and idle servers without dropouts.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-1 rounded-full bg-indigo-100 text-indigo-700 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-slate-900">Carrier Multi-Tenancy</h5>
                    <p className="text-[11px] text-slate-600">Separate ISP and IIG distributions with designated technical contacts and SLAs.</p>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 hover:text-blue-700 group"
                >
                  <span>Schedule an Architecture Consultation with Md. Mohsin</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>

            {/* NOC Screen Mockup */}
            <div className="lg:col-span-7">
              <div className="relative rounded-2xl overflow-hidden border border-slate-300 shadow-xl bg-slate-950 group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/bd-cachex-dashboard-telemetry.jpg"
                  alt="BD CacheX NOC Telemetry Interface"
                  className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono text-slate-300 bg-slate-950/85 backdrop-blur-md px-4 py-2 rounded-xl border border-slate-800">
                  <span className="flex items-center gap-2 text-emerald-400 font-bold">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
                    Telemetric Feed: LIVE STREAMING
                  </span>
                  <span className="text-slate-300">Cache Hit Ratio: 85.4%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
