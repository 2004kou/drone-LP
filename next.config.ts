import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ldrubozxqbvkeciwrnir.supabase.co",
      },
    ],
  },
};

export default nextConfig;
