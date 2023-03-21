import '../styles/globals.css'
import '../styles/custom.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { appWithTranslation } from 'next-i18next'
import { Suspense, useEffect } from 'react'
import { StatsigProvider } from 'statsig-react'
import Button from '@components/atoms/Button'
import ScrollButton from '@components/molecules/ScrollButton'
import { NAME, WEBSITE } from '@core/helpers/branding'

const MyApp = ({ Component, pageProps }: AppProps) => {
  function handleDemoButton() {
    window.location.href = WEBSITE
  }

  useEffect(() => {
    ;(window as any).start.init({
      Palette: 'palette6',
      Mode: 'banner bottom',
      Location: '/pricacy',
      Time: '15',
    })
  }, [])

  return (
    <StatsigProvider
      sdkKey={process.env.NEXT_PUBLIC_STATSIG_CLIENT_SDK_KEY!}
      waitForInitialization={true}
      // StatsigOptions (Not Required)
      options={{
        environment: { tier: process.env.NEXT_PUBLIC_STATSIG_ENVIRONMENT },
      }}
      user={{ userID: '0' }}
    >
      <Suspense fallback="loading">
        <Head>
          <meta
            name="viewport"
            content="width=device-width, user-scalable=no"
          />
          <meta title={NAME} content="Production ready templates" />
          <meta
            name="description"
            content="Template for Blue Panda Dev Plus. CHANGE_NAME"
          />
          <meta name="theme-color" content="#000000" />
          <link rel="manifest" href="/manifest.json" />
        </Head>
        <Component {...pageProps} />
        <ScrollButton />
        <div className="fixed bottom-0 left-0 m-4 z-50">
          <Button
            isSpecial={true}
            onClick={handleDemoButton}
            className="bg-blue-600/70 shadow-blue-700/50 hover:bg-blue-500"
          >
            Back to {NAME}
          </Button>
        </div>
      </Suspense>
    </StatsigProvider>
  )
}

export default appWithTranslation(MyApp)
