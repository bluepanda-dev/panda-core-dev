import Head from 'next/head'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Layout from '@components/layout'
import Customers from '@components/organisms/Customers'
import Faqs from '@components/organisms/Faqs'
import FareWell from '@components/organisms/FareWell'
import Features from '@components/organisms/Features'
import Hero from '@components/organisms/Hero'
import KeepMeInformed from '@components/organisms/KeepMeInformed'
import OurNumbers from '@components/organisms/OurNumbers'
import Plans from '@components/organisms/Plans'
import Products from '@components/organisms/Products'
import Reviews from '@components/organisms/Reviews'
import ShowVideo from '@components/organisms/ShowVideo'
import TechStack from '@components/organisms/TechStack'
import TimeLine from '@components/organisms/TimeLine'
import WhyUs from '@components/organisms/WhyUs'

export default function Home() {
  const { t } = useTranslation()

  return (
    <Layout>
      <Head>
        <title>{t('title')}</title>
        <meta name="robots" content="all" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="test title" />
        <meta name="twitter:description" content="test description" />
        <meta name="twitter:image" content="/pandas/group.png" />
        <meta property="og:image" content="/pandas/group.png" />
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
        <Products />
        <ShowVideo />
        <KeepMeInformed />
        <TechStack />
        <Faqs />
        <FareWell />
      </main>
    </Layout>
  )
}

export async function getServerSideProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  }
}
