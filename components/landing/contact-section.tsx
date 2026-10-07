'use client';

import { 
  MessageCircle, 
  ExternalLink, 
  Globe, 
  Zap, 
  ArrowRight,
  Server,
  TrendingDown,
  Building2
} from 'lucide-react';

export function LandingContact() {
  const whatsappNumber = '+880 1958-113265';
  const whatsappUrl = 'https://wa.me/8801958113265';

  const quickInquiries = [
    {
      title: 'ISP Bandwidth Optimization',
      desc: 'Discuss caching Google GGC, Meta FNA, and Netflix to cut 60-80% upstream IP transit.',
      icon: TrendingDown,
      color: 'bg-emerald-50/70 border-emerald-200 hover:border-emerald-400',
      text: 'Hello Mohsin! I want to discuss deploying BD CacheX to optimize our ISP upstream bandwidth and cut transit costs.',
    },
    {
      title: 'Live Demo & Platform Access',
      desc: 'Get an interactive walkthrough of the distribution manager, server telemetry, and logs.',
      icon: Zap,
      color: 'bg-blue-50/70 border-blue-200 hover:border-blue-400',
      text: 'Hello Mohsin! I would like to request a live demo walkthrough and test access to BD CacheX.',
    },
    {
      title: 'Edge Hardware & BGP Peering',
      desc: 'Consult on Dell/HP/Supermicro server specifications, NVMe storage, and BGP router sessions.',
      icon: Server,
      color: 'bg-indigo-50/70 border-indigo-200 hover:border-indigo-400',
      text: 'Hello Mohsin! I would like to consult on edge server hardware specifications and BGP routing integration.',
    },
    {
      title: 'Custom Sizing & Capacity Quote',
      desc: 'Get a tailored capacity analysis for your network (5 Gbps to 100+ Gbps scale).',
      icon: Building2,
      color: 'bg-purple-50/70 border-purple-200 hover:border-purple-400',
      text: 'Hello Mohsin! I would like a capacity sizing analysis and deployment plan for our network.',
    },
  ];

  return (
    <section id="contact" className="relative py-24 bg-white text-slate-900 overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-blue-400/5 rounded-full blur-[128px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-400/5 rounded-full blur-[128px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
            <MessageCircle className="w-3.5 h-3.5" />
            Direct Instant Communication
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
            Connect Directly on WhatsApp
          </h2>
          <p className="mt-4 text-base text-slate-600">
            No waiting and no contact forms to fill out. Chat directly with lead architect{' '}
            <span className="text-blue-600 font-bold">Md. Mohsin</span> for deployment assistance, technical questions, and demo access.
          </p>
        </div>

        {/* 3 Primary Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* WhatsApp Card */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative p-7 rounded-3xl bg-emerald-50/60 border-2 border-emerald-300 hover:border-emerald-500 transition-all duration-300 hover:shadow-xl flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="p-3.5 rounded-2xl bg-emerald-100 text-emerald-700 border border-emerald-300 group-hover:scale-110 transition-transform">
                  <MessageCircle className="w-7 h-7 fill-current" />
                </div>
                <span className="flex items-center gap-1.5 text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                  Online Now
                </span>
              </div>

              <h3 className="text-2xl font-black text-slate-900 mb-1 group-hover:text-emerald-700 transition-colors">
                WhatsApp Direct
              </h3>
              <p className="text-sm text-emerald-700 font-mono font-bold mb-3 tracking-wide">
                {whatsappNumber}
              </p>
              <p className="text-xs text-slate-600 leading-relaxed">
                Click to open direct chat. Fastest way to get pricing, deployment blueprints, or setup assistance.
              </p>
            </div>

            <div className="pt-6 mt-6 border-t border-emerald-200 flex items-center justify-between text-xs font-bold text-emerald-700">
              <span>Open WhatsApp Chat</span>
              <ExternalLink className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </div>
          </a>

          {/* Facebook Card */}
          <a
            href="https://www.facebook.com/muhammad.mohsin.0033/"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative p-7 rounded-3xl bg-blue-50/60 border-2 border-blue-200 hover:border-blue-400 transition-all duration-300 hover:shadow-xl flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="p-3.5 rounded-2xl bg-blue-100 text-blue-700 border border-blue-300 group-hover:scale-110 transition-transform">
                  <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </div>
                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-blue-100 text-blue-800 border border-blue-300">
                  Social Network
                </span>
              </div>

              <h3 className="text-2xl font-black text-slate-900 mb-1 group-hover:text-blue-700 transition-colors">
                Facebook Profile
              </h3>
              <p className="text-sm text-blue-700 font-mono font-bold mb-3 tracking-wide">
                muhammad.mohsin.0033
              </p>
              <p className="text-xs text-slate-600 leading-relaxed">
                Connect on Facebook Messenger for networking, engineering discussions, and ongoing project updates.
              </p>
            </div>

            <div className="pt-6 mt-6 border-t border-blue-200 flex items-center justify-between text-xs font-bold text-blue-700">
              <span>View Facebook Profile</span>
              <ExternalLink className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </div>
          </a>

          {/* Portfolio & Web Card */}
          <a
            href="https://md-mohsin.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative p-7 rounded-3xl bg-sky-50/60 border-2 border-sky-200 hover:border-sky-400 transition-all duration-300 hover:shadow-xl flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="p-3.5 rounded-2xl bg-sky-100 text-sky-700 border border-sky-300 group-hover:scale-110 transition-transform">
                  <Globe className="w-7 h-7" />
                </div>
                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-sky-100 text-sky-800 border border-sky-300">
                  Architect Portfolio
                </span>
              </div>

              <h3 className="text-2xl font-black text-slate-900 mb-1 group-hover:text-sky-700 transition-colors">
                Official Website
              </h3>
              <p className="text-sm text-sky-700 font-mono font-bold mb-3 tracking-wide">
                md-mohsin.vercel.app
              </p>
              <p className="text-xs text-slate-600 leading-relaxed">
                Explore portfolio, full-stack systems engineering work, and other telecom and cloud platforms built by Mohsin.
              </p>
            </div>

            <div className="pt-6 mt-6 border-t border-sky-200 flex items-center justify-between text-xs font-bold text-sky-700">
              <span>Visit Portfolio Site</span>
              <ExternalLink className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </div>
          </a>
        </div>

        {/* 1-Click WhatsApp Quick-Message Dispatcher Box */}
        <div className="max-w-4xl mx-auto rounded-3xl bg-slate-50 border-2 border-emerald-200/90 p-6 sm:p-10 shadow-xl relative overflow-hidden mb-14">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                  Send Direct WhatsApp Message
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Click any topic below to open WhatsApp with a ready-made message, or start a general chat.
              </p>
            </div>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-xs sm:text-sm bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-600/20 transition-all transform hover:-translate-y-0.5 shrink-0 whitespace-nowrap"
            >
              <MessageCircle className="w-4 h-4 fill-current shrink-0" />
              <span>Chat Now (+880 1958-113265)</span>
            </a>
          </div>

          {/* 4 Quick Message Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6">
            {quickInquiries.map((item, idx) => {
              const Icon = item.icon;
              const link = `https://wa.me/8801958113265?text=${encodeURIComponent(item.text)}`;
              return (
                <a
                  key={idx}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group p-4 sm:p-5 rounded-2xl bg-white border ${item.color} transition-all duration-300 flex flex-col justify-between hover:scale-[1.01] hover:shadow-md`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="p-2 rounded-xl bg-slate-100 text-slate-700 border border-slate-200">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                        1-Click WhatsApp
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-700 group-hover:text-emerald-800">
                    <span>Send on WhatsApp</span>
                    <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </a>
              );
            })}
          </div>
        </div>

        {/* Creator & Architect Bio Card with profile.jpg */}
        <div className="max-w-4xl mx-auto p-6 sm:p-8 rounded-3xl bg-white border-2 border-slate-200 shadow-xl flex flex-col md:flex-row items-center gap-6">
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-gradient-to-tr from-blue-600 via-cyan-500 to-indigo-600 p-[2.5px] shrink-0 shadow-lg shadow-blue-500/15">
            <div className="w-full h-full bg-white rounded-[14px] overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src="/profile.jpg" 
                alt="Md. Mohsin - Lead Architect" 
                className="w-full h-full object-cover" 
              />
            </div>
            <span className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-emerald-500 ring-2 ring-white" />
          </div>

          <div className="space-y-2.5 text-center md:text-left flex-1">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
              <h4 className="text-xl font-black text-slate-900">Md. Mohsin</h4>
              <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                Founder & System Architect
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Specialized in high-performance networking platforms, edge computing orchestration, and ISP automation software in Bangladesh. Architected BD CacheX to eliminate the friction of multi-vendor CDN cache management.
            </p>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-2 text-xs">
              <a 
                href={whatsappUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-3.5 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-300 font-bold flex items-center gap-1.5 font-mono transition-all"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp: {whatsappNumber}</span>
              </a>

              <a 
                href="https://www.facebook.com/muhammad.mohsin.0033/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-3.5 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-300 font-bold flex items-center gap-1.5 transition-all"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                <span>Facebook: muhammad.mohsin.0033</span>
              </a>

              <a 
                href="https://md-mohsin.vercel.app/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-3.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 font-semibold flex items-center gap-1.5 transition-all"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>Website: md-mohsin.vercel.app</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
