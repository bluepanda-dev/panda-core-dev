import { useAtom } from 'jotai'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { useState, useEffect } from 'react'
import Button from '@components/atoms/Button'
import Layout from '@components/layout'
import Plans from '@components/organisms/Plans'
import { useCustomerContext } from '@core/contexts/CustomerContext'
import { useUserContext } from '@core/contexts/UserContext'
import { useHideouts } from '@core/hooks/useHideouts'
import { loadingAtom } from '@core/store/Common'
import { Hideout } from '@core/types'

const Hideouts = () => {
  const { t } = useTranslation(['hideouts', 'common'])

  const [, setLoading] = useAtom(loadingAtom)
  const [preparingPage, setPreparingPage] = useState(true)
  const [hideouts, setHideouts] = useState<Hideout[]>([])
  const { profile } = useUserContext()
  const { isPremium, settingUp } = useCustomerContext()
  const { subscribeHideouts, handleAdd } = useHideouts()

  function add() {
    handleAdd({ owner: profile!.uid as string, name: 'New hideout' })
  }

  useEffect(() => {
    setLoading(true)
  }, [])

  useEffect(() => {
    if (!settingUp && !preparingPage) {
      setLoading(false)
    }
  }, [preparingPage, settingUp])

  useEffect(() => {
    if (profile) {
      subscribeHideouts(profile.uid, (data: Hideout[]) => {
        setHideouts(data)
        setPreparingPage(false)
      })
    }
  }, [profile])

  if (!profile || settingUp || preparingPage) {
    return <Layout></Layout>
  }

  if (!isPremium) {
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
      <div className="mx-8 my-16 h-full">
        <div className="text-center text-4xl font-bold">{t('myHideouts')}</div>
        <div className="mt-8">
          <Button isSpecial={true} className="!w-auto" onClick={add}>
            {t('addNew')}
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
                  {t('activeUsers')}: {hideout.activeUsers?.length ?? 0}
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
      ...(await serverSideTranslations(locale, ['hideouts', 'common'])),
    },
  }
}
