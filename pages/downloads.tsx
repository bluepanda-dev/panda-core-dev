import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useEffect, useState } from 'react'
import Layout from '@components/layout'
import { useUserContext } from '@core/contexts/UserContext'

const Downloads = () => {
  const { t } = useTranslation('common')
  // Fetch the user client-side
  const { profile } = useUserContext()

  // Server-render loading state
  if (!profile) {
    return <Layout>{t('loading')}...</Layout>
  }

  // Once the user request finishes, show the user
  return (
    <Layout>
      <h1>{t('downloads')}</h1>
      <pre>{JSON.stringify(profile, null, 2)}</pre>
    </Layout>
  )
}

export default Downloads

export async function getServerSideProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  }
}
