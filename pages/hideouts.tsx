import { useAtom } from 'jotai'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useState, useEffect } from 'react'
import { FiArrowLeft } from 'react-icons/fi'
import Button from '@components/atoms/Button'
import Layout from '@components/layout'

import SimpleHeader from '@components/molecules/SimpleHeader'
import { useUserContext } from '@core/contexts/UserContext'
import { useHideouts } from '@core/hooks/useHideouts'
import { loadingAtom } from '@core/store/Common'
import { Hideout } from '@core/types'

const Hideouts = () => {
  const { t } = useTranslation(['hideouts', 'common'])
  const router = useRouter()
  const [, setLoading] = useAtom(loadingAtom)
  const [hideouts, setHideouts] = useState<Hideout[]>([])
  const { profile } = useUserContext()
  const { subscribeHideouts, handleAdd } = useHideouts()

  function add() {
    handleAdd({ owner: profile!.uid as string, name: 'New hideout' })
  }

  function back() {
    router.push('/')
  }

  useEffect(() => {
    setLoading(true)
  }, [])

  useEffect(() => {
    if (profile) {
      subscribeHideouts(profile.uid, (data: Hideout[]) => {
        setHideouts(data)
        setLoading(false)
      })
    }
  }, [profile])

  if (!profile) {
    return <Layout>{t('loading', { ns: 'common' })}...</Layout>
  }

  return (
    <Layout>
      <SimpleHeader
        title={
          <div className="flex items-center gap-4">
            <FiArrowLeft
              className="cursor-pointer hover:opacity-75"
              onClick={back}
            />
            <div className="text-center text-xl font-bold">
              {t('myHideouts')}
            </div>
          </div>
        }
      />
      <div className="mx-8 my-16 h-full">
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
