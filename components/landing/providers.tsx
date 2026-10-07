'use client';

import { 
  Zap, 
  Layers, 
  Activity,
  Server
} from 'lucide-react';

interface ProviderInfo {
  name: string;
  tag: string;
  code: string;
  offload: string;
  trafficTypes: string;
  hardwareProfile: string;
  protocols: string;
  color: string;
  description: string;
}

export function LandingProviders() {
  const providers: ProviderInfo[] = [
    {
      name: 'Meta FNA',
      tag: 'Facebook Network Appliance',
      code: 'FNA',
      offload: '35% - 45%',
      trafficTypes: 'Facebook Video, Instagram Reels, Threads, WhatsApp Media',
      hardwareProfile: '2U Storage Appliance (100GbE NICs)',
      protocols: 'BGP Anycast, HTTPS/QUIC',
      color: 'from-blue-500 to-indigo-600',
      description: 'Caches the highest volume social video streams in Bangladesh. Reduces immense peak-hour evening mobile and broadband congestion.',
    },
    {
      name: 'Google GGC',
      tag: 'Google Global Cache',
      code: 'GGC',
      offload: '30% - 40%',
      trafficTypes: 'YouTube 4K/8K, Google Play, Android OS Updates, Drive',
      hardwareProfile: 'Dell/Supermicro High-Density NVMe nodes',
      protocols: 'BGP Autonomic Peering, HTTP/3, QUIC',
      color: 'from-red-500 via-amber-500 to-emerald-500',
      description: 'Delivers zero-buffering YouTube streaming and ultra-fast application downloads directly inside the local autonomous system.',
    },
    {
      name: 'Netflix OCA',
      tag: 'Open Connect Appliance',
      code: 'OCA',
      offload: '15% - 25%',
      trafficTypes: 'Netflix 4K HDR Films, TV Shows, Pre-positioned Catalogs',
      hardwareProfile: 'FreeBSD Custom Storage Vaults',
      protocols: 'BGP Route Steering, TLS 1.3',
      color: 'from-red-600 to-rose-700',
      description: 'Pre-fills localized high-demand titles during off-peak night hours, eliminating primetime intercontinental transit usage.',
    },
    {
      name: 'Cloudflare Edge',
      tag: 'Cloudflare Cache & Proxy',
      code: 'CLOUDFLARE',
      offload: '20% - 30%',
      trafficTypes: 'Global Websites, APIs, Static Assets, Media Delivery',
      hardwareProfile: 'Edge Proxy & SSD Cache Clusters',
      protocols: 'Anycast DNS, HTTP/2, HTTP/3',
      color: 'from-orange-500 to-amber-600',
      description: 'Accelerates millions of web properties while blocking automated bot attacks and absorbing volumetric DDoS assaults locally.',
    },
    {
      name: 'Akamai Intelligent',
      tag: 'Akamai Edge Platform',
      code: 'AKAMAI',
      offload: '15% - 20%',
      trafficTypes: 'Game Downloads (Steam, PSN, Xbox), Enterprise Software',
      hardwareProfile: 'Multi-tiered Caching Server Racks',
      protocols: 'Akamai Edge DNS & Dynamic Route Peering',
      color: 'from-cyan-500 to-blue-600',
      description: 'Handles gigabyte-heavy gaming patch release days without choking ISP core backbones.',
    },
    {
      name: 'BIGO & Live Media',
      tag: 'BIGO Edge Streaming',
      code: 'BIGO',
      offload: '10% - 18%',
      trafficTypes: 'Live Streaming, Video Chat, Interactive Broadcasts',
      hardwareProfile: 'Low-latency NVMe Slices',
      protocols: 'RTMP / WebRTC / HLS Edge Ingest',
      color: 'from-teal-400 to-emerald-600',
      description: 'Optimized specifically for real-time live video and creator platform playback with sub-second glass-to-glass latency.',
    },
    {
      name: 'Zenlayer & Baisan',
      tag: 'Edge Cloud Acceleration',
      code: 'ZENLAYER',
      offload: '8% - 15%',
      trafficTypes: 'Regional Gaming, Cross-Border Enterprise SaaS',
      hardwareProfile: 'Virtual & Bare-Metal Edge Pods',
      protocols: 'SDN Backbone Optimization',
      color: 'from-purple-500 to-indigo-700',
      description: 'Connects regional gaming servers and Asian enterprise software with guaranteed domestic route stability.',
    },
    {
      name: 'G-Core & Tencent',
      tag: 'Global Cloud & Gaming',
      code: 'GCORE',
      offload: '10% - 15%',
      trafficTypes: 'Esports Livestreams, Mobile Gaming Assets, OTT Video',
      hardwareProfile: 'High IOPS Storage Engines',
      protocols: 'BGP Direct Sessions & Anycast',
      color: 'from-pink-500 to-rose-600',
      description: 'Seamless offload for popular global mobile games and high-throughput streaming events.',
    },
  ];

  return (
    <section id="providers" className="relative py-24 bg-white text-slate-900 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider mb-3">
            <Layers className="w-3.5 h-3.5" />
            Global Content Delivery Ecosystem
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
            Seamless Orchestration for All Major CDNs
          </h2>
          <p className="mt-4 text-base text-slate-600">
            BD CacheX abstracts the complexity of different vendor hardware and peering requirements into a single, unified management dashboard.
          </p>
        </div>

        {/* Providers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {providers.map((item, idx) => (
            <div
              key={idx}
              className="group relative p-6 rounded-2xl bg-white border border-slate-200 hover:border-blue-400 transition-all duration-300 hover:shadow-xl shadow-xs flex flex-col justify-between"
            >
              {/* Top Accent Line */}
              <div className={`absolute top-0 left-6 right-6 h-[2px] bg-gradient-to-r ${item.color} rounded-full opacity-60 group-hover:opacity-100 transition-opacity`} />

              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs font-bold px-2 py-1 rounded bg-slate-100 text-blue-700 border border-slate-200">
                    {item.code}
                  </span>
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-300 px-2 py-0.5 rounded-full">
                    {item.offload} Offload
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                  {item.name}
                </h3>
                <p className="text-xs text-slate-500 mb-4">{item.tag}</p>

                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {item.description}
                </p>
              </div>

              {/* Specs Footer */}
              <div className="pt-4 border-t border-slate-100 space-y-2 text-[11px]">
                <div className="flex items-start gap-1.5 text-slate-500">
                  <Activity className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                  <span className="line-clamp-1">{item.trafficTypes}</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-500">
                  <Server className="w-3.5 h-3.5 text-cyan-600 shrink-0" />
                  <span className="line-clamp-1">{item.hardwareProfile}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="mt-12 p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 text-blue-700">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">
                Need a custom or proprietary cache appliance integrated?
              </h4>
              <p className="text-xs text-slate-600">
                BD CacheX supports adding custom cache engines, internal mirrors, and specialized video OTT proxies.
              </p>
            </div>
          </div>
          <a
            href="#contact"
            className="px-5 py-2.5 rounded-xl text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white transition-all shrink-0"
          >
            Inquire for Custom Cache Integration
          </a>
        </div>
      </div>
    </section>
  );
}
