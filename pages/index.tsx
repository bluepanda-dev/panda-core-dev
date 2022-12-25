import Container from '@components/atoms/Container'
import ComponentsSample from '@components/organisms/ComponentsSample'
import Head from 'next/head'
import Layout from '@components/layout'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export default function Home() {
  const { t } = useTranslation()

  return (
    <Layout>
      <Head>
        <title>{t('title')}</title>
      </Head>
      <main className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-4xl">
        <div className="col-span-3">{t('title')}</div>
        <ComponentsSample className="md:col-span-3" />
        <Container className="h-48 md:col-span-2" />
        <Container className="h-48" />
        <Container className="h-36 md:col-span-3" />
        <Container className="h-36 md:col-span-3" />
        <Container className="h-80 md:col-span-3" />
        <Container className="h-36 md:col-span-3" />
        <Container className="h-36 md:col-span-1" />
        <Container className="h-36 md:col-span-2" />
        <Container className="h-36" />
        <Container className="h-36" />
        <Container className="h-36" />
        <div className="flex gap-4"></div>
      </main>
    </Layout>
  )
}

export async function getServerSideProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      // Will be passed to the page component as props
    },
  }
}
