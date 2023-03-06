import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Button from '@components/atoms/Button'
import Layout from '@components/layout'

export default function Home() {
  const { t } = useTranslation()
  const router = useRouter()

  function goHome() {
    router.push('/')
  }

  return (
    <Layout>
      <Head>
        <title>{t('title')}</title>
      </Head>
      <main className="flex flex-col gap-y-36 md:gap-y-48 mt-12">
        <div className="text-7xl md:text-9xl font-extrabold text-center flex flex-col justify-center">
          <div className="relative leading-tight md:leading-tight">
            <span
              className={`bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-red-400`}
            >
              {t('payments.errorTitle')}
            </span>
          </div>
          <div className="text-neutral-600 dark:text-neutral-400 flex justify-center text-xl md:text-4xl font-extralight mt-6 md:mt-16 px-8 ">
            <div className="md:max-w-lg">{t('payments.errorContent')}</div>
          </div>
        </div>
        <div className="flex justify-center">
          <Button className="!w-56" isSpecial={true} onClick={goHome}>
            {t('payments.ctaError')}
          </Button>
        </div>
      </main>
    </Layout>
  )
}

export async function getServerSideProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  }
}
