/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // This allows images from any domain
      },
    ],
  },
  typescript:{
    ignoreBuildErrors:true
  }
};

export default nextConfig;
