/** @type {import('next-sitemap').IConfig} */
const siteUrl = process.env.SITE_URL || process.env.NEXT_PUBLIC_WEBSITE

module.exports = {
  siteUrl,
  generateRobotsTxt: true,
  changefreq: 'monthly',
  exclude: [
    '/orders',
    '/payment/*',
    '/my-drive',
    '/account',
    '/profile',
    '/hideouts',
    '/credits',
  ],
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
