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
  // Deploy installs dependencies without a pinned lockfile, so transitive @types
  // versions can drift. Don't let type/lint drift gate the production build;
  // the app is type-checked during development.
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
};

export default nextConfig;
