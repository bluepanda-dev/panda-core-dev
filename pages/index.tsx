import Container from '@components/atoms/Container'
import Layout from '@components/layout'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export default function Home() {
  return (
    <Layout>
      <main className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-4xl mt-14">
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
