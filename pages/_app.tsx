import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import Layout from '@components/layout'

const MyApp = ({ Component, pageProps }: AppProps) => (
  <Layout>
    <Head>
      <link rel="manifest" href="/manifest.json" />
    </Head>
    <Component {...pageProps} />
  </Layout>
)

export default MyApp
