import type { Metadata } from 'next';
import { LandingNavbar } from '@/components/landing/navbar';
import { LandingHero } from '@/components/landing/hero';
import { LandingStats } from '@/components/landing/stats';
import { LandingProviders } from '@/components/landing/providers';
import { LandingRoiCalculator } from '@/components/landing/roi-calculator';
import { LandingFeatures } from '@/components/landing/features';
import { LandingContact } from '@/components/landing/contact-section';
import { LandingFooter } from '@/components/landing/footer';
import { FloatingContactBar } from '@/components/landing/floating-contact';

export const metadata: Metadata = {
  title: 'BD CacheX | Enterprise CDN Edge Cache & Bandwidth Distribution Platform',
  description:
    'BD CacheX empowers Bangladesh ISPs and IIGs to centrally manage, partition, and monitor Google GGC, Meta FNA, Netflix OCA, Cloudflare, and Akamai edge caches, cutting upstream IP transit by up to 80%.',
  keywords: [
    'BD CacheX',
    'CDN Cache Management',
    'Edge Caching Bangladesh',
    'ISP Bandwidth Optimization',
    'Google Global Cache GGC',
    'Meta FNA',
    'Netflix OCA',
    'Cloudflare Edge',
    'Akamai CDN',
    'BDIX Local Peering',
    'Md. Mohsin',
  ],
  openGraph: {
    title: 'BD CacheX | Enterprise CDN Edge Cache & Bandwidth Distribution Platform',
    description:
      'Centralized multi-provider CDN edge caching and bandwidth optimization for ISPs, IIGs, and Datacenters in Bangladesh.',
    images: ['/images/bd-cachex-network.jpg'],
  },
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col selection:bg-blue-600 selection:text-white font-sans relative">
      {/* Top Fixed Navigation */}
      <LandingNavbar />

      <main className="flex-1">
        {/* 1. Hero Section with 3D Edge Network Visual & Live Telemetry HUD */}
        <LandingHero />

        {/* 2. Key Metrics Strip */}
        <LandingStats />

        {/* 3. Global Supported CDN Providers Showcase */}
        <LandingProviders />

        {/* 4. Interactive Bandwidth & Cost Savings ROI Calculator */}
        <LandingRoiCalculator />

        {/* 5. Core Telecom Platform Features */}
        <LandingFeatures />

        {/* 6. Direct WhatsApp & Contact Consultation Section */}
        <LandingContact />
      </main>

      {/* Persistent Floating Quick Contact Widget */}
      <FloatingContactBar />

      {/* Footer */}
      <LandingFooter />
    </div>
  );
}
