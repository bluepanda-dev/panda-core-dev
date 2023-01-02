import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3'
import { appWithTranslation } from 'next-i18next'
import { Suspense } from 'react'
import ScrollButton from '@components/molecules/ScrollButton'

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <Suspense fallback="loading">
      <Head>
        <meta name="viewport" content="width=device-width, user-scalable=no" />
        <meta
          title="Blue Panda Dev Demo"
          content="Production ready templates"
        />
        <meta name="description" content="Template for Blue Panda Dev Plus." />
        <meta name="theme-color" content="#000000" />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <GoogleReCaptchaProvider
        reCaptchaKey={process.env.NEXT_PUBLIC_GOOGLE_CAPTCHA_V3_APIKEY!}
        scriptProps={{
          async: false,
          defer: false,
          appendTo: 'head',
          nonce: undefined,
        }}
      >
        <Component {...pageProps} />
      </GoogleReCaptchaProvider>
      <ScrollButton />
    </Suspense>
  )
}

export default appWithTranslation(MyApp)
