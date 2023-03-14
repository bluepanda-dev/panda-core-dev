import { useAtom } from 'jotai'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useState, useEffect } from 'react'
import { FiArrowLeft } from 'react-icons/fi'
import Button from '@components/atoms/Button'
import Layout from '@components/layout'
import Panel from '@components/molecules/Panel'
import SimpleHeader from '@components/molecules/SimpleHeader'
import { useUserContext } from '@core/contexts/UserContext'
import { useCredits } from '@core/hooks/useCredits'
import { usePayments } from '@core/hooks/usePayments'
import { loadingAtom } from '@core/store/Common'
import { CreditItem } from '@core/types/credits'
import { formatPrice } from '@core/utils/currency'

const Credits = () => {
  const { t } = useTranslation(['credits', 'common'])
  const router = useRouter()
  const { profile } = useUserContext()
  const [, setLoading] = useAtom(loadingAtom)
  const [preparingPage, setPreparingPage] = useState(true)
  const { singlePayment } = usePayments()
  const {
    buyWithCredits,
    creditItems,
    creditProducts,
    totalCredits,
    totalSpending,
    spendings,
    setUp,
    settingUp,
  } = useCredits()

  function handleBuy(item: CreditItem) {
    setLoading(true)
    buyWithCredits(item, () => {
      setLoading(false)
    })
  }

  function back() {
    router.push('/')
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
    setUp().then(() => {
      setPreparingPage(false)
    })
  }, [profile])

  // Server-render loading state
  if (settingUp || preparingPage) {
    return <Layout></Layout>
  }

  const spendingLabel = (item: CreditItem) => {
    const found = spendings.find((spending) => spending.item === item.docId)
    if (found) {
      return (
        <span className="text-sm md:text-md absolute right-0 top-0 dark:bg-success-700 dark:text-success-300 rounded-sm p-1">
          {t('youOwnIt')}
        </span>
      )
    }

    return (
      <span className="text-sm md:text-md absolute right-0 top-0 dark:bg-normal-700 dark:text-neutral-300 rounded-sm p-1">
        {item.cost} {t('credits')}
      </span>
    )
  }

  const spendingFooter = (item: CreditItem) => {
    const found = spendings.find((spending) => spending.item === item.docId)
    if (found) {
      if (found.protectedItem.download) {
        return (
          <Button isInverted={true} isSmall={true} className="w-24">
            {t('download')}
          </Button>
        )
      } else {
        return (
          <code className="w-full text-xs md:text-sm">
            {found.protectedItem.raw}
          </code>
        )
      }
    }

    return (
      <Button
        className="w-24"
        isSpecial={true}
        isSmall={true}
        onClick={() => handleBuy(item)}
      >
        {t('buy')}
      </Button>
    )
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
              {t('myCredits')}
            </div>
          </div>
        }
        extra={
          <span className="dark:bg-yellow-700 dark:text-yellow-100 rounded-lg p-1">
            {t('iHave')} {totalCredits} {t('credits')}
          </span>
        }
      />
      <div className="px-4 mt-12 h-full w-full flex flex-col md:flex-row gap-8  justify-center">
        <div className="basis-1/2 max-w-2xl">
          <div className="text-center text-4xl font-bold">
            {t('buyCredits')}
          </div>
          <div className="mt-8 flex gap-6 justify-center mb-4">
            {t('buyCreditsTo')}
          </div>
          <div className="flex flex-col gap-4 mx-6 md:mx-0">
            {creditProducts.map((product) =>
              product.prices.map((price) => (
                <Panel
                  key={price.docId}
                  title={`${price.transform_quantity.divide_by} ${product.name}`}
                  footer={
                    <>
                      <Button
                        className="w-32"
                        isSmall={true}
                        onClick={() => singlePayment(price)}
                      >
                        {t('buyFor')} {formatPrice(price.unit_amount)}
                      </Button>
                    </>
                  }
                >
                  <Image
                    alt=""
                    src={product.images[0]}
                    className="w-12 absolute right-2 top-2"
                  />
                  <div className="text-justify">
                    {t('thePackage')}{' '}
                    <span className="font-semibold text-yellow-600">
                      {price.transform_quantity.divide_by}
                    </span>{' '}
                    {t('youCanSpend')}
                  </div>
                </Panel>
              )),
            )}
          </div>
        </div>
        <div className="basis-1/2 max-w-2xl">
          <div className="text-center text-4xl font-bold">Spend Credits</div>
          <div className="mt-8 flex gap-6 justify-center mb-4">
            {t('youHaveUsed')} {totalSpending} {t('credits')}
          </div>
          <div>
            <div className="flex flex-col gap-4 mx-6 md:mx-0">
              {creditItems.map((item, index) => (
                <Panel
                  key={index}
                  title={`${item.name}`}
                  footer={spendingFooter(item)}
                >
                  <Image alt="" className="max-w-[150px]" src={item.preview} />
                  {spendingLabel(item)}
                </Panel>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Credits

export async function getServerSideProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['credits', 'common'])),
    },
  }
}
