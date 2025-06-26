import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/kosmetik/:path*',
        destination: '/apps/kosmetik/:path*',
      },
    ];
  },
};

export default nextConfig;
