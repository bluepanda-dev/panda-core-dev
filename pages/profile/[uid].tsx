import { useEffect, useState } from 'react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { Hideout, Profile } from '@core/types'
import { useRouter } from 'next/router'
import Layout from '@components/layout'
import { useUserContext } from '@core/contexts/UserContext'
import { useHideouts } from '@core/hooks/useHideouts'
import Link from 'next/link'
import { useUser } from '@core/hooks/useUser'

const Hideout = () => {
  const router = useRouter()
  const { subscribeHideouts } = useHideouts()
  const [hideouts, setHideouts] = useState<Hideout[]>([])
  const { loading } = useUserContext()
  const [profile, setProfile] = useState<Profile>()
  const { fetchPublicProfile } = useUser()
  const { uid } = router.query

  useEffect(() => {
    if (uid) {
      fetchPublicProfile(uid as string).then((user) => {
        setProfile(user)
      })
    }
  }, [loading, uid])

  useEffect(() => {
    if (profile) {
      subscribeHideouts(profile.uid, (data: Hideout[]) => {
        setHideouts(data)
      })
    }
  }, [profile])

  if (!profile) {
    return <>Loading...</>
  }

  return (
    <Layout>
      <div className="mx-8 my-16 relative">
        <div className="text-center text-4xl font-bold">
          {profile.displayName}s Hideouts
          <div>Web: {profile.website}</div>
        </div>

        <div className="text-neutral-600 dark:text-neutral-400 flex justify-center text-xl md:text-2xl font-extralight mt-6 md:mt-16 px-8 ">
          <div className="md:max-w-lg text-center">
            Here is the public profile of {profile.displayName}
          </div>
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

export default Hideout

export async function getServerSideProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  }
}