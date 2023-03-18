import '../styles/globals.css'
import '../styles/custom.css'
import { useAtom } from 'jotai'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { appWithTranslation, useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { Suspense, useEffect } from 'react'
import { StatsigProvider } from 'statsig-react'
import Button from '@components/atoms/Button'
import LoadingModal from '@components/molecules/LoadingModal'
import ScrollButton from '@components/molecules/ScrollButton'
import { CustomerProvider } from '@core/contexts/CustomerContext'
import { UserProvider } from '@core/contexts/UserContext'
import { loadingAtom } from '@core/store/Common'

const MyApp = ({ Component, pageProps }: AppProps) => {
  const { t } = useTranslation('common')

  const [loading] = useAtom(loadingAtom)

  function handleDemoButton() {
    window.location.href = 'https://blue-panda.dev/'
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
        <UserProvider>
          <CustomerProvider>
            <Head>
              <meta
                name="viewport"
                content="width=device-width, user-scalable=no"
              />
              <meta
                title="Blue Panda Dev Demo"
                content="Production ready templates"
              />
              <meta
                name="description"
                content="Template for Blue Panda Dev Plus."
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
                {t('backTo')}
              </Button>
            </div>
            <LoadingModal loading={loading} />
          </CustomerProvider>
        </UserProvider>
      </Suspense>
    </StatsigProvider>
  )
}

export default appWithTranslation(MyApp)

export async function getServerSideProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  }
}
