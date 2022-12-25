const { i18n } = require('./next-i18next.config')

const withPWA = require('next-pwa')({
  dest: 'public',
})

const nextConfig = {
  reactStrictMode: true,
  i18n,
}

module.exports = withPWA(nextConfig)
