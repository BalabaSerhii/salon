import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
    ],
  },

  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "balabastudio.de",
          },
        ],
        destination: "https://www.balabastudio.de/:path*",
        permanent: true,
      },
      // Дополнительно: перенаправление с http на https
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "www.balabastudio.de",
          },
        ],
        missing: [
          {
            type: "header",
            key: "x-forwarded-proto",
            value: "https",
          },
        ],
        destination: "https://www.balabastudio.de/:path*",
        permanent: true,
      },
    ];
  },

  env: {},
};

export default nextConfig;
