/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    qualities: [75, 95],
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.outletexpense.xyz',
        port: '',
        search: '',
      },
      {
        protocol: 'https',
        hostname: "**",
      },
    ],


  },
};

export default nextConfig;
