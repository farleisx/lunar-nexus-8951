/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disabling image optimization for external images,
  // as the prompt specifies Pexels URLs which often change,
  // and local optimization is not explicitly requested.
  // This prevents potential build warnings/errors with dynamic image sources.
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;