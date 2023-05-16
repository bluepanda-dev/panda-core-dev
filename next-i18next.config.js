const path = require('path')

module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es', 'de', 'jp'],
  },
  localePath: path.resolve('./public/locales'),
}
