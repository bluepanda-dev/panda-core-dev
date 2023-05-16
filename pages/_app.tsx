import '../styles/output.css'
import '../styles/custom.css'
import '../styles/uikit.css'
import 'react-toastify/dist/ReactToastify.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { appWithTranslation, useTranslation } from 'next-i18next'
import { DefaultSeo } from 'next-seo'
import { Suspense, useEffect } from 'react'
import BPButton from '@components/atoms/BPButton'
import BPScrollButton from '@components/molecules/BPScrollButton'
import {
  TWITTER,
  NAME,
  WEBSITE,
  DESCRIPTION,
  TITLE,
  KEYWORDS,
} from '@core/helpers/branding'

const MyApp = ({ Component, pageProps }: AppProps) => {
  const { t } = useTranslation()
  function handleDemoButton() {
    window.location.href = WEBSITE
  }

  const router = useRouter()
  const canonicalUrl = (
    `https://blue-panda.dev` + (router.asPath === '/' ? '' : router.asPath)
  ).split('?')[0]

  useEffect(() => {
    ;(window as any).start.init({
      Palette: 'palette6',
      Mode: 'banner bottom',
      Location: '/pricacy',
      Time: '15',
    })
  }, [])

  return (
    <Suspense fallback="loading">
      <DefaultSeo canonical={canonicalUrl} />
      <Head>
        <title>{TITLE}</title>
        <meta title={NAME} content="Production ready templates" />
        <meta name="viewport" content="width=device-width" />
        <meta key="author" name="author" content={NAME} />
        <meta name="publisher" content={NAME} />
        <meta name="robots" content="index, follow" />
        <meta name="theme-color" content="#3292ff" />
        <meta name="msapplication-TileColor" content="#3292ff" />
        <meta name="description" content={DESCRIPTION} />
        <meta key="og:title" name="og:title" content={TITLE} />
        <meta
          key="og:description"
          name="og:description"
          content={DESCRIPTION}
        />
        <meta name="og:site_name" content={NAME} />
        <meta key="og:type" name="og:type" content="website" />
        <meta key="og:url" name="og:url" content={canonicalUrl} />
        <meta
          key="og:image"
          name="og:image"
          content="https://blue-panda.dev/pandas/Pandas-design-preview-min.webp"
        />
        <meta key="twitter:title" name="twitter:title" content={NAME} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta key="twitter:creator" name="twitter:creator" content={TWITTER} />
        <meta name="twitter:site" content={TWITTER} />
        <meta
          key="twitter:image"
          name="twitter:image"
          content="https://blue-panda.dev/pandas/Pandas-design-preview-min.webp"
        />
        <meta
          key="twitter:description"
          name="twitter:description"
          content={DESCRIPTION}
        />
        <meta key="keywords" name="keywords" content={KEYWORDS} />
        <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
        <link rel="icon" href="favicon.ico" type="image/x-icon" />
        <link
          rel="apple-touch-icon"
          sizes="57x57"
          href="/favicon/apple-icon-57x57.png/"
        />
        <link
          rel="apple-touch-icon"
          sizes="60x60"
          href="/favicon/apple-icon-60x60.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="72x72"
          href="/favicon/apple-icon-72x72.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="76x76"
          href="/favicon/apple-icon-76x76.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="114x114"
          href="/favicon/apple-icon-114x114.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="120x120"
          href="/favicon/apple-icon-120x120.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="144x144"
          href="/favicon/apple-icon-144x144.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="/favicon/apple-icon-152x152.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-icon-180x180.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/favicon/android-icon-192x192.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="96x96"
          href="/favicon/favicon-96x96.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
      </Head>
      <Component {...pageProps} />
      <BPScrollButton />
      <div className="fixed bottom-0 left-0 m-4 z-50">
        <BPButton outline variant="accent" onClick={handleDemoButton}>
          {t('backTo')} {NAME}
        </BPButton>
      </div>
    </Suspense>
  )
}

export default appWithTranslation(MyApp)
