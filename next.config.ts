import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  productionBrowserSourceMaps: true,
  cacheComponents: false,
};

export default nextConfig;
