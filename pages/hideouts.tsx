import Layout from '@components/layout'

import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useUserContext } from '@core/contexts/UserContext'
import { Hideout } from '@core/types'
import { useState, useEffect } from 'react'
import { useHideouts } from '@core/hooks/useHideouts'
import Button from '@components/atoms/Button'
import Link from 'next/link'
import Plans from '@components/organisms/Plans'

const Hideouts = () => {
  const [hideouts, setHideouts] = useState<Hideout[]>([])
  const { profile, subscription } = useUserContext()
  const { subscribeHideouts, add } = useHideouts()

  function handleAdd() {
    add({ owner: profile!.uid as string, name: 'New hideout' })
  }

  useEffect(() => {
    if (profile) {
      subscribeHideouts(profile.uid, (data: Hideout[]) => {
        setHideouts(data)
      })
    }
  }, [profile])

  console.log('subsss', subscription.activeSubscriptions)

  if (!profile) {
    return <Layout>Loading...</Layout>
  }

  if (!subscription.isPremium) {
    return (
      <Layout>
        <div className="m-24 text-7xl md:text-7xl font-extrabold text-center flex flex-col justify-center">
          <div className="relative leading-tight md:leading-tight">
            <span
              className={`bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-red-400`}
            >
              You need a plan
            </span>
          </div>
        </div>
        <Plans />
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="mx-8 my-16 h-full flex flex-col md:flex-row">
        <div className="text-center text-4xl font-bold">My Hideouts</div>
        <div className="mt-8">
          <Button isSpecial={true} className="!w-auto" onClick={handleAdd}>
            Add new hideout
          </Button>
        </div>
        <div className="mt-8 grid gap-8 md:grid-cols-3 lg:grid-cols-5">
          {hideouts.map((hideout) => (
            <div
              key={hideout.uid}
              className="p-4 rounded-sm ring-2 ring-neutral-200 dark:ring-normal-600 hover:ring-primary-400 dark:hover:ring-primary-400 ring-offset-4 ring-offset-slate-50 dark:ring-offset-slate-900"
            >
              <Link href={`/hideout/${hideout.uid}`}>
                <div className="font-light">{hideout.uid}</div>
                <div className="font-thin">{hideout.name}</div>
                <div className="font-thin">
                  Active users: {hideout.activeUsers?.length ?? 0}
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}

export default Hideouts

export async function getServerSideProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  }
}
