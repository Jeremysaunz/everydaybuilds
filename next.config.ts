import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "everydaybuilds.vercel.app" }],
        destination: "https://everydaybuilds.blog/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.everydaybuilds.blog" }],
        destination: "https://everydaybuilds.blog/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
