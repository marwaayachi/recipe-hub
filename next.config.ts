import type { NextConfig } from "next";

const nextConfig: NextConfig = {
 images: {
   remotePatterns: [
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
};

export default nextConfig;
