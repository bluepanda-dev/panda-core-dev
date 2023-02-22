import Layout from '@components/layout'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useUserContext } from '@core/contexts/UserContext'
import { useState, useEffect } from 'react'
import Button from '@components/atoms/Button'
import Panel from '@components/molecules/Panel'
import { usePayments } from '@core/hooks/usePayments'
import { Product } from '@core/types/payments'
import { useCustomerContext } from '@core/contexts/CustomerContext'

const Credits = () => {
  const { profile } = useUserContext()
  const { fetchCreditsProducts, singlePayment, products, loading } =
    usePayments()
  const [creditProducts, setCreditProducts] = useState<Product[]>([])
  const { totalCredits, totalSpending } = useCustomerContext()

  useEffect(() => {
    async function fetchCredits() {
      setCreditProducts(await fetchCreditsProducts())
    }
    fetchCredits()
  }, [products])

  // Server-render loading state
  if (!profile) {
    return <Layout>Loading...</Layout>
  }

  console.log('credits::: ', creditProducts)

  return (
    <Layout className="flex justify-center">
      <div className="my-16 h-full max-w-6xl w-full flex flex-col md:flex-row gap-8">
        <div className="flex-1">
          <div className="text-center text-4xl font-bold mb-12">
            Buy Credits
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
                        loading={loading}
                        onClick={() => singlePayment(price)}
                      >
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
        <div className="flex-1">
          <div className="text-center text-4xl font-bold">My Credits</div>
          <div className="mt-8 flex gap-6 justify-center">
            You have {totalCredits} credits
          </div>
        </div>
        <div className="flex-1">
          <div className="text-center text-4xl font-bold">Spend Credits</div>
          <div className="mt-8 flex gap-6 justify-center">
            You have used {totalSpending} credits
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
