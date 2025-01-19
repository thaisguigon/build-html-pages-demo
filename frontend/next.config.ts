import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: `/graphql`,
        destination: `${process.env.API_URL}/graphql`,
      },
    ];
  },
};

export default nextConfig;
