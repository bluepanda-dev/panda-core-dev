import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { appWithTranslation, useTranslation } from 'next-i18next'
import { Suspense } from 'react'
import ScrollButton from '@components/molecules/ScrollButton'
import Button from '@components/atoms/Button'
import { UserProvider } from '@core/contexts/UserContext'
import { CustomerProvider } from '@core/contexts/CustomerContext'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const MyApp = ({ Component, pageProps }: AppProps) => {
  const { t } = useTranslation('common')

  function handleDemoButton() {
    window.location.href = 'https://blue-panda.dev/'
  }

  return (
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
              {t('backTo')}{' '}
            </Button>
          </div>
        </CustomerProvider>
      </UserProvider>
    </Suspense>
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
