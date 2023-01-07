import Layout from '@components/layout'

import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useUser } from '@core/hooks/useUser'
import Container from '@components/atoms/Container'
import SimpleTabs from '@components/molecules/SimpleTabs'
import Profile from '@components/organisms/account/Profile'
import Notifications from '@components/organisms/account/Notifications'
import { useUserContext } from '@core/contexts/UserContext'

const Account = () => {
  const { profile } = useUserContext()

  // Server-render loading state
  if (!profile) {
    return <Layout>Loading...</Layout>
  }

  const tabs = {
    'My Profile': <Profile />,
    Notifications: <Notifications />,
    Purchases: <Container className="h-48" title="Your Tab 2 content" />,
    Other: <Container className="h-48" title="Your Tab 2 content" />,
  }

  // Once the user request finishes, show the user
  return (
    <Layout>
      <div className="mx-8 my-16 h-full">
        <div className="text-center text-6xl font-bold">My Profile</div>
        <div className="mt-16">
          <SimpleTabs tabs={tabs} />
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
