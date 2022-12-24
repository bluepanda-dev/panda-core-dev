import Head from 'next/head'
import Container from '@components/atoms/Container'
import ComponentsSample from '@components/organisms/ComponentsSample'

export default function Home() {
  return (
    <>
      <Head>
        <title>Panda Core</title>
      </Head>
      <main className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-4xl">
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
    </>
  )
}
