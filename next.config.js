const { i18n } = require('./next-i18next.config')

const prod = process.env.NODE_ENV === 'production'

const withPWA = require('next-pwa')({
  dest: 'public',
  disable: prod ? false : true,
})

const nextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md'],
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
  serverRuntimeConfig: {
    PROJECT_ROOT: __dirname,
  },
}

module.exports = withPWA(nextConfig)
