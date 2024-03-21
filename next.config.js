/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  swcMinify: true,
  // fastRefresh: true,
  images: {
    domains: ['lh3.googleusercontent.com', 'res.cloudinary.com'],
  },
};

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer(nextConfig);

// The above code can be simplified to the following, if you are not using any other plugins with Next.js:

// module.exports = withBundleAnalyzer({
//   output: 'standalone',
//   swcMinify: true,
//   images: {
//     domains: ['lh3.googleusercontent.com', 'res.cloudinary.com'],
//   },
//   analyzer: {
//     enabled: process.env.ANALYZE === 'true',
//   },
// });
