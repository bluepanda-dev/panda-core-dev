import { useAtom } from 'jotai'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useState, useEffect } from 'react'
import Button from '@components/atoms/Button'
import Layout from '@components/layout'
import Panel from '@components/molecules/Panel'
import { useUserContext } from '@core/contexts/UserContext'
import { useCredits } from '@core/hooks/useCredits'
import { usePayments } from '@core/hooks/usePayments'
import { loadingAtom } from '@core/store/Common'
import { CreditItem } from '@core/types/credits'

const Credits = () => {
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
    console.log('buying', item)
    setLoading(true)
    buyWithCredits(item, () => {
      setLoading(false)
    })
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
    if (profile) {
      setUp().then(() => {
        setPreparingPage(false)
      })
    }
  }, [profile])

  // Server-render loading state
  if (!profile || settingUp || preparingPage) {
    return <Layout></Layout>
  }

  const spendingLabel = (item: CreditItem) => {
    const found = spendings.find((spending) => spending.item === item.docId)
    if (found) {
      return (
        <span className="text-sm md:text-md absolute right-0 top-0 dark:bg-success-700 dark:text-success-300 rounded-sm p-1">
          You own it
        </span>
      )
    }

    return (
      <span className="text-sm md:text-md absolute right-0 top-0 dark:bg-normal-700 dark:text-neutral-300 rounded-sm p-1">
        {item.cost} credits
      </span>
    )
  }

  const spendingFooter = (item: CreditItem) => {
    const found = spendings.find((spending) => spending.item === item.docId)
    if (found) {
      if (found.protectedItem.download) {
        return (
          <Button isInverted={true} isSmall={true} className="w-24">
            Download
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
        Buy
      </Button>
    )
  }

  console.log('spendings', spendings)

  return (
    <Layout>
      <div>
        <div className="mt-4 text-center text-4xl font-bold">My Credits</div>
        <div className="mt-8 flex gap-6 justify-center">
          <span className="dark:bg-yellow-700 dark:text-yellow-100 rounded-lg p-1">
            I have {totalCredits} credits
          </span>
        </div>
      </div>
      <div className="px-4 mt-12 h-full w-full flex flex-col md:flex-row gap-8  justify-center">
        <div className="basis-1/2 max-w-2xl">
          <div className="text-center text-4xl font-bold">Buy Credits</div>
          <div className="mt-8 flex gap-6 justify-center mb-4">
            Buy credits to unlock protected content
          </div>
          <div className="flex flex-col gap-4 mx-6 md:mx-0">
            {creditProducts.map((product) =>
              product.prices.map((price) => (
                <Panel
                  key={price.docId}
                  title={`${price.transform_quantity.divide_by} ${product.name}`}
                  footer={
                    <>
                      <Button onClick={() => singlePayment(price)}>
                        Buy for ${price.unit_amount / 100}
                      </Button>
                    </>
                  }
                >
                  <img
                    src={product.images[0]}
                    className="w-12 absolute right-2 top-2"
                  />
                  <div className="text-justify">
                    The packaga contains{' '}
                    <span className="font-semibold text-yellow-600">
                      {price.transform_quantity.divide_by}
                    </span>{' '}
                    credits, you can spend it on any of our services with no
                    time limit.
                  </div>
                </Panel>
              )),
            )}
          </div>
        </div>
        <div className="basis-1/2 max-w-2xl">
          <div className="text-center text-4xl font-bold">Spend Credits</div>
          <div className="mt-8 flex gap-6 justify-center mb-4">
            You have used {totalSpending} credits
          </div>
          <div>
            <div className="flex flex-col gap-4 mx-6 md:mx-0">
              {creditItems.map((item, index) => (
                <Panel
                  key={index}
                  title={`${item.name}`}
                  footer={spendingFooter(item)}
                >
                  <img className="max-w-[150px]" src={item.preview} />
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
      ...(await serverSideTranslations(locale, ['common'])),
    },
  }
}
