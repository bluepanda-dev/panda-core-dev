import { useAtom } from 'jotai'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useEffect } from 'react'
import { FiArrowLeft } from 'react-icons/fi'
import Container from '@components/atoms/Container'
import Layout from '@components/layout'
import SimpleHeader from '@components/molecules/SimpleHeader'
import SimpleTabs from '@components/molecules/SimpleTabs'
import Billing from '@components/organisms/account/Billing'
import Notifications from '@components/organisms/account/Notifications'
import Profile from '@components/organisms/account/Profile'
import { useUserContext } from '@core/contexts/UserContext'
import useBreakpoint from '@core/hooks/useBreakpoint'
import { loadingAtom } from '@core/store/Common'
import { breakpointsWidths } from '@core/utils/breakpoints'

const Account = () => {
  const { t } = useTranslation(['account', 'common'])
  const router = useRouter()
  const { profile } = useUserContext()
  const { windowSize } = useBreakpoint()
  const [, setGlobalLoading] = useAtom(loadingAtom)

  useEffect(() => {
    setGlobalLoading(true)
  }, [])

  useEffect(() => {
    if (profile) {
      setGlobalLoading(false)
    }
  }, [profile])

  // Server-render loading state
  if (!profile) {
    return <Layout />
  }

  const tabs = {
    [t('myProfile')]: <Profile />,
    [t('notifications')]: <Notifications />,
    [t('billing')]: <Billing />,
    [t('other')]: <Container className="h-48" title={t('tabContent')!} />,
  }

  function back() {
    router.push('/')
  }

  // Once the user request finishes, show the user
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
              {t('myProfile')}
            </div>
          </div>
        }
      />
      <div className="flex justify-center">
        <div className="md:mx-8 h-full max-w-2xl w-full">
          <div className="mt-8 flex justify-center">
            <SimpleTabs
              tabs={tabs}
              isVertical={breakpointsWidths[2] < windowSize.width}
            />
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Account

export async function getServerSideProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['account', 'common'])),
    },
  }
}
