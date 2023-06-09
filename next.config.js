/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // allow any image to be used
    domains: ['firebasestorage.googleapis.com'],
  },
}

module.exports = nextConfig
