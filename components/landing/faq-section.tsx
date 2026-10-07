'use client';

import { useState } from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';

export function LandingFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'What is BD CacheX and who is it designed for?',
      a: 'BD CacheX is an enterprise CDN cache distribution, capacity allocation, and monitoring platform built specifically for Internet Service Providers (ISPs), International Internet Gateways (IIGs), and Datacenters in Bangladesh. It allows network teams to centrally manage, slice, and monitor edge caching appliances from multiple global content providers (Google, Meta, Netflix, Cloudflare, Akamai) from one intuitive command center.',
    },
    {
      q: 'How much upstream IP transit bandwidth can we realistically save?',
      a: 'Most broadband networks in Bangladesh observe that 60% to 80% of total subscriber traffic consists of video streaming (YouTube, Netflix) and social feeds (Facebook Video, Instagram Reels, TikTok). By serving this traffic directly from local BD CacheX edge storage nodes, you immediately offload up to 80% of expensive international upstream transit.',
    },
    {
      q: 'Which CDN cache providers and protocols are supported?',
      a: 'BD CacheX natively supports Google Global Cache (GGC), Meta/Facebook Network Appliance (FNA), Netflix Open Connect Appliance (OCA), Cloudflare Edge, Akamai Intelligent Platform, BIGO Live, BaisanCloud, Zenlayer, Tencent, and G-Core Labs. It also allows adding custom HTTP/HTTPS cache mirrors and specialized OTT video proxies.',
    },
    {
      q: 'Can we use our existing Dell, HP, or Supermicro server racks?',
      a: 'Yes! BD CacheX is hardware-agnostic. Whether you run 1U/2U Dell PowerEdge, HPE ProLiant, Supermicro storage chassis, or dedicated appliances supplied by CDN partners, BD CacheX catalogs their IP addresses, rack positions, RAID/NVMe capacity, and health metrics effortlessly.',
    },
    {
      q: 'How does BD CacheX integrate with our core BGP routers?',
      a: 'BD CacheX operates seamlessly alongside standard BGP autonomous systems and anycast routing across Cisco, Juniper, MikroTik, and Huawei core routers. It manages the provisioning layer, allocation quotas, and capacity forecasting, ensuring your BGP route steering always points traffic to healthy, un-saturated edge nodes.',
    },
    {
      q: 'How can I test the system or get BD CacheX deployed for my ISP?',
      a: 'You can explore the live working platform right now by clicking "Dashboard" in the top bar. To discuss deploying BD CacheX on your network or getting tailored hardware sizing, contact lead architect Md. Mohsin directly via WhatsApp (+880 1958-113265), Facebook, or through the direct contact hub below.',
    },
  ];

  return (
    <section id="faq" className="relative py-24 bg-slate-50/70 border-b border-slate-200 text-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            Frequently Asked Questions
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Got Questions? We Have Answers.
          </h2>
          <p className="mt-4 text-base text-slate-600">
            Everything you need to know about implementing BD CacheX in your telecommunications network.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-white border border-slate-200 transition-all duration-200 overflow-hidden shadow-xs"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full py-5 px-6 flex items-center justify-between text-left gap-4 hover:bg-slate-50/80 transition-colors"
                >
                  <span className="text-base font-bold text-slate-900">
                    {faq.q}
                  </span>
                  <div className={`p-1.5 rounded-lg bg-slate-100 text-slate-500 shrink-0 transition-transform ${isOpen ? 'rotate-180 text-blue-600' : ''}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Need more help banner */}
        <div className="mt-12 text-center p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
          <p className="text-sm text-slate-600">
            Have a specialized topology or custom peering question?{' '}
            <a href="#contact" className="text-blue-600 font-bold hover:underline">
              Speak directly with Md. Mohsin on WhatsApp →
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
