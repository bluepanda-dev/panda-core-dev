/** @type {import('next-sitemap').IConfig} */
const siteUrl = process.env.SITE_URL || 'https://blue-panda.dev'

module.exports = {
  siteUrl,
  generateRobotsTxt: true,
  changefreq: 'monthly',
  exclude: ['/account/*', '/profile/*', '/hideouts/*', '/credits/*'],
  alternateRefs: [
    {
      href: `${siteUrl}/jp`,
      hreflang: 'en',
    },
    {
      href: `${siteUrl}/es`,
      hreflang: 'es',
    },
    {
      href: `${siteUrl}/jp`,
      hreflang: 'jp',
    },
    {
      href: `${siteUrl}/de`,
      hreflang: 'de',
    },
  ],
}
