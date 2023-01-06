import Layout from '@components/layout'

import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useUser } from '@core/hooks/useUser'
import Container from '@components/atoms/Container'
import SimpleTabs from '@components/molecules/SimpleTabs'
import Profile from '@components/organisms/account/Profile'

const Account = () => {
  // Fetch the user client-side
  const { profile } = useUser()

  // Server-render loading state
  if (!profile) {
    return <Layout>Loading...</Layout>
  }

  const tabs = {
    'My Profile': <Profile />,
    Tab2: <Container className="h-48" title="Your Tab 2 content" />,
  }

  // Once the user request finishes, show the user
  return (
    <Layout>
      <div className="mx-8 my-16">
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
