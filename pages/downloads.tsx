import Layout from '@components/layout'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useUser } from '@core/hooks/useUser'
import { doc, getDoc } from 'firebase/firestore/lite'
import { useEffect, useState } from 'react'

const Downloads = () => {
  // Fetch the user client-side
  const { profile } = useUser()

  // Server-render loading state
  if (!profile) {
    return <Layout>Loading...</Layout>
  }

  // Once the user request finishes, show the user
  return (
    <Layout>
      <h1>Your Profile</h1>
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
