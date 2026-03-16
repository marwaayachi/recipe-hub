import type { NextConfig } from "next";

const nextConfig: NextConfig = {
 images: {
  
   remotePatterns: [
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "54321",
        pathname: "/storage/v1/object/public/**",
      },
      {
        protocol: "https",
        hostname:  "www.grillfuerst.de",
      },
      {
        protocol: "https",
        hostname:"www.einfachbacken.de",
      },
      {
        protocol: "https",
        hostname: "images.ctfassets.net",
      },
    ],
  },

  reactStrictMode: true,
  experimental: {
    serverActions: {
      // Increase limit to 10 MB (adjust as needed)
      bodySizeLimit: '10mb',
    },
  },
};

export default nextConfig;
