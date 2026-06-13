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
          {
            key: 'X-Developer-GitHub',
            value: 'https://github.com/awesomemohsin',
          },
        ],
      },
    ];
  },
}

export default nextConfig
