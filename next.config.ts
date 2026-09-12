import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  agentRules: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "simplicitymedia.com",
        pathname: "/images/**",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/fonts/:file",
        destination: "https://simplicitymedia.com/fonts/:file",
      },
      {
        source: "/images/simplicity-logo.webp",
        destination: "https://simplicitymedia.com/images/simplicity-logo.webp",
      },
    ];
  },
};

export default nextConfig;
