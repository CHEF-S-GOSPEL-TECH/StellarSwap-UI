/** @type {import('next').NextConfig} */
const nextConfig = {
  // Soroban SDK uses Node.js built-ins — polyfill them for the browser bundle.
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
    };
    return config;
  },
};

module.exports = nextConfig;
