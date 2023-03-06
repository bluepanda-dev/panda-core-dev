import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'
import Layout from '@components/layout'
import ComponentsSample from '@components/molecules/ComponentsSample'
import CodeExample from '@components/organisms/CodeExample'
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
        <ShowVideo />
        <KeepMeInformed />
        <TechStack />
        <Faqs />
        <FareWell />
        <ComponentsSample className="m-4" />
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
