import Head from 'next/head'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Layout from '@components/layout'
import BPCustomers from '@components/organisms/BPCustomers'
import BPFaqs from '@components/organisms/BPFaqs'
import BPFareWell from '@components/organisms/BPFareWell'
import BPFeatures from '@components/organisms/BPFeatures'
import BPHero from '@components/organisms/BPHero'
import BPKeepMeInformed from '@components/organisms/BPKeepMeInformed'
import BPOurNumbers from '@components/organisms/BPOurNumbers'
import BPPlans from '@components/organisms/BPPlans'
import BPProducts from '@components/organisms/BPProducts'
import BPReviews from '@components/organisms/BPReviews'
import BPShowVideo from '@components/organisms/BPShowVideo'
import BPTechStack from '@components/organisms/BPTechStack'
import BPTimeLine from '@components/organisms/BPTimeLine'
import BPWhyUs from '@components/organisms/BPWhyUs'

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
        <BPHero />
        <BPFeatures />
        <BPWhyUs />
        <BPReviews />
        <BPPlans />
        <BPTimeLine />
        <BPOurNumbers />
        <BPCustomers />
        <BPProducts />
        <BPShowVideo />
        <BPKeepMeInformed />
        <BPTechStack />
        <BPFaqs />
        <BPFareWell />
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
