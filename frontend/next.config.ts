import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
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
