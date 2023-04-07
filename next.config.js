const { i18n } = require('./next-i18next.config')

const withPWA = require('next-pwa')({
  dest: 'public',
})

const nextConfig = {
  reactStrictMode: true,
  i18n,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'blue-panda.dev',
        port: '',
        pathname: '/**',
      },

      {
        protocol: 'https',
        hostname: 'plus.blue-panda.dev',
        port: '',
        pathname: '/**',
      },
    ],
  },
}

module.exports = withPWA(nextConfig)
