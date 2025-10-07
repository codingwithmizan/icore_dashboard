import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // experimental: {
  //   reactCompiler: true,
  // },
  turbopack:{
  

  },
  
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
           {
        protocol: "https",
        hostname: "randomuser.me",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "i.pravatar.cc",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "storyset.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "ifarmer-public-files.s3.ap-southeast-1.amazonaws.com",
        pathname: "/logos/**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/home",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
