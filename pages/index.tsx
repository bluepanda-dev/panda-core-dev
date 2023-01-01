import Container from '@components/atoms/Container'
import ComponentsSample from '@components/organisms/ComponentsSample'
import Head from 'next/head'
import Layout from '@components/layout'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Hero from '@components/organisms/Hero'
import Features from '@components/organisms/Features'
import WhyUs from '@components/organisms/WhyUs'
import Faqs from '@components/organisms/Faqs'
import KeepMeInformed from '@components/organisms/KeepMeInformed'
import Reviews from '@components/organisms/Reviews'
import Plans from '@components/organisms/Plans'
import OurNumbers from '@components/organisms/OurNumbers'
import Customers from '@components/organisms/Customers'
import TimeLine from '@components/organisms/TimeLine'
import CodeExample from '@components/organisms/CodeExample'
import Products from '@components/organisms/Products'

export default function Home() {
  const { t } = useTranslation()

  return (
    <Layout>
      <Head>
        <title>{t('title')}</title>
      </Head>
      <main className="flex flex-col gap-y-36 md:gap-y-48 mt-12">
        <Hero />
        <Features />
        <WhyUs />
        <Reviews />
        <Plans />
        <TimeLine />
        <OurNumbers />
        <Customers />
        <CodeExample />
        <Products />
        <KeepMeInformed />
        <Faqs />
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
