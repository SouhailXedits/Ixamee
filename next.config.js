/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  swcMinify: true,
  // fastRefresh: true,
  images: {
    domains: ['lh3.googleusercontent.com', 'res.cloudinary.com'],
  },
};

module.exports = nextConfig;



const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer(nextConfig);