import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { appWithTranslation, useTranslation } from 'next-i18next'
import Layout from '@components/layout'

const MyApp = ({ Component, pageProps }: AppProps) => {
  const { t } = useTranslation('common')
  console.log('con:>>>', t)

  return (
    <Layout>
      <Head>
        <link rel="manifest" href="/manifest.json" />
        <title>{t('title')}</title>
      </Head>
      <Component {...pageProps} />
    </Layout>
  )
}

export default appWithTranslation(MyApp)
