/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Developer',
            value: 'Md. Mohsin (https://md-mohsin.vercel.app/)',
          },
        ],
      },
    ];
  },
}

export default nextConfig
