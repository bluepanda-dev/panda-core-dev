import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { appWithTranslation } from 'next-i18next'
import { Suspense } from 'react'

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <Suspense fallback="loading">
      <Head>
        <meta name="viewport" content="width=device-width, user-scalable=no" />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <Component {...pageProps} />
    </Suspense>
  )
}

export default appWithTranslation(MyApp)
