/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", 
      },
    ],
  },
  typescript:{
    ignoreBuildErrors:true
  }
};

export default nextConfig;
