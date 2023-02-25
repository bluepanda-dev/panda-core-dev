import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Container from '@components/atoms/Container'
import Layout from '@components/layout'
import SimpleTabs from '@components/molecules/SimpleTabs'
import Billing from '@components/organisms/account/Billing'
import Notifications from '@components/organisms/account/Notifications'
import Profile from '@components/organisms/account/Profile'
import { useUserContext } from '@core/contexts/UserContext'
import useBreakpoint from '@core/hooks/useBreakpoint'
import { breakpointsWidths } from '@core/utils/breakpoints'

const Account = () => {
  const { t } = useTranslation('common')
  const { profile } = useUserContext()
  const { windowSize } = useBreakpoint()

  // Server-render loading state
  if (!profile) {
    return <Layout>{t('loading')}...</Layout>
  }

  const tabs = {
    'My Profile': <Profile />,
    Notifications: <Notifications />,
    Billing: <Billing />,
    Other: <Container className="h-48" title="Your Tab 2 content" />,
  }

  // Once the user request finishes, show the user
  return (
    <Layout className="flex justify-center">
      <div className="md:mx-8 my-16 h-full max-w-2xl w-full">
        <div className="text-center text-4xl font-bold">{t('myProfile')}</div>
        <div className="mt-8 flex justify-center">
          <SimpleTabs
            tabs={tabs}
            isVertical={breakpointsWidths[2] < windowSize.width}
          />
        </div>
      </div>
    </Layout>
  )
}

export default Account

export async function getServerSideProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  }
}
