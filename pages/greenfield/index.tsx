import { GetStaticPropsContext } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import BPHeading from '@components/atoms/BPHeading'
import Layout from '@components/layout'

export default function Home() {
  return (
    <Layout>
      <main className="flex flex-col gap-y-36 md:gap-y-48 min-h-[100vh] mt-24 relative">
        <BPHeading className="text-center" size={'2xl'}>
          Start working here
        </BPHeading>
      </main>
    </Layout>
  )
}

export async function getStaticProps(ctx: GetStaticPropsContext) {
  return {
    props: {
      ...(await serverSideTranslations(ctx.locale!, ['common'])),
    },
  }
}
