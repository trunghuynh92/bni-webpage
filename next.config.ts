import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "drive.google.com" },
      { protocol: "https", hostname: "*.googleusercontent.com" },
    ],
  },
  async redirects() {
    // Old per-role leadership pages were replaced by the single roster page
    return [
      {
        source: "/leadership-teams/:role",
        destination: "/leadership-teams",
        permanent: false,
      },
      {
        source: "/vi/leadership-teams/:role",
        destination: "/vi/leadership-teams",
        permanent: false,
      },
    ];
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
