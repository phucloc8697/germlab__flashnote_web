const withPWA = require('next-pwa')

const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
}

module.exports = withPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
})(nextConfig)
