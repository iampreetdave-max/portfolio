/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'standalone', // Not needed for Netlify plugin
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
