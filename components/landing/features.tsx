'use client';

import { 
  Network, 
  Server, 
  BellRing, 
  Building2, 
  FileText, 
  ShieldCheck, 
  ArrowRight,
  Cpu,
  MessageCircle
} from 'lucide-react';

export function LandingFeatures() {
  const features = [
    {
      title: 'Dynamic Cache Slice Allocation',
      description: 'Allocate dedicated or pooled cache capacity (in GB/TB) to downstream ISPs and POPs in seconds. Rebalance quotas dynamically without service interruption.',
      icon: Network,
      color: 'text-blue-600',
      bgGlow: 'bg-blue-50',
      borderColor: 'border-slate-200',
      tag: 'Core Engine',
    },
    {
      title: 'Datacenter Server & Rack Inventory',
      description: 'Comprehensive physical inventory tracking: brand, model (Dell PowerEdge, HPE, Supermicro), rack units, datacenter rooms, IP assignments, and live capacity utilization.',
      icon: Server,
      color: 'text-cyan-600',
      bgGlow: 'bg-cyan-50',
      borderColor: 'border-slate-200',
      tag: 'Hardware Ops',
    },
    {
      title: 'Automated Thresholds & Alerting',
      description: 'Never suffer cache miss storms. Configurable proactive threshold alerts notify engineers before nodes reach critical 90%+ saturation.',
      icon: BellRing,
      color: 'text-amber-600',
      bgGlow: 'bg-amber-50',
      borderColor: 'border-slate-200',
      tag: 'Telemetry',
    },
    {
      title: 'Multi-Tenant ISP & IIG Management',
      description: 'Designed specifically for telecom hierarchy. Seamlessly organize licensed ISPs, IIG gateways, contact persons, billing info, and SLAs in one place.',
      icon: Building2,
      color: 'text-emerald-600',
      bgGlow: 'bg-emerald-50',
      borderColor: 'border-slate-200',
      tag: 'Multi-Tenancy',
    },
    {
      title: 'Executive PDF & CSV Reports',
      description: 'Export polished capacity breakdowns, provider distribution matrices, and executive summaries for management presentations and regulatory compliance.',
      icon: FileText,
      color: 'text-indigo-600',
      bgGlow: 'bg-indigo-50',
      borderColor: 'border-slate-200',
      tag: 'Analytics',
    },
    {
      title: 'Audit Trails & Activity Logs',
      description: 'Carrier-grade accountability. Every change, server status toggle, allocation increase, and operator action is immutably logged with timestamp and user ID.',
      icon: ShieldCheck,
      color: 'text-rose-600',
      bgGlow: 'bg-rose-50',
      borderColor: 'border-slate-200',
      tag: 'Security & Compliance',
    },
  ];

  return (
    <section id="features" className="relative py-24 bg-slate-50/60 border-b border-slate-200 text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider mb-3">
            <Cpu className="w-3.5 h-3.5" />
            Built for High-Throughput Telecom Operations
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
            Engineered for Precision & Stability
          </h2>
          <p className="mt-4 text-base text-slate-600">
            Ditch messy spreadsheets and fragmented vendor consoles. BD CacheX gives your NOC and engineering team complete control over your caching infrastructure.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="group relative p-8 rounded-3xl bg-white border border-slate-200 hover:border-blue-400 transition-all duration-300 hover:shadow-xl shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className={`p-3 rounded-2xl ${feature.bgGlow} border border-slate-100 ${feature.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-600 font-semibold">
                      {feature.tag}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {feature.title}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 group-hover:text-blue-600 transition-colors">
                  <span className="font-semibold">Explore feature in dashboard</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
