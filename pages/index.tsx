import Head from 'next/head'
import { Tab } from '@headlessui/react'

export default function Home() {
  return (
    <>
      <Head>
        <title>Panda Core</title>
      </Head>
      <main>
        <Tab.Group>
          <Tab.List>
            <Tab>Features</Tab>
            <Tab>Your work</Tab>
            <Tab>Tab 3</Tab>
          </Tab.List>
          <Tab.Panels>
            <Tab.Panel>Content Features 1</Tab.Panel>
            <Tab.Panel>Content 2</Tab.Panel>
            <Tab.Panel>Content 3</Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </main>
    </>
  )
}
