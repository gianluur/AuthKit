import { remotePatterns } from "./lib/providers";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      ...remotePatterns
    ]
  }
};

export default nextConfig;
