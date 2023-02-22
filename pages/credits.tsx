import Layout from '@components/layout'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import * as dayjs from 'dayjs'
import { useUserContext } from '@core/contexts/UserContext'
import { useCustomerContext } from '@core/contexts/CustomerContext'
import { useDataPages } from '@core/hooks/useDataPages'
import { useState, useEffect } from 'react'
import { ProductCard, Order } from '@core/types'
import Button from '@components/atoms/Button'
import Panel from '@components/molecules/Panel'
import { usePayments } from '@core/hooks/usePayments'

const Credits = () => {
  const { profile } = useUserContext()
  const { orders } = useCustomerContext()
  const { creditProducts, singlePayment } = usePayments()

  console.log('orders', orders)
  console.log('products', creditProducts)

  // Server-render loading state
  if (!profile) {
    return <Layout>Loading...</Layout>
  }

  return (
    <Layout className="flex justify-center">
      <div className="my-16 h-full max-w-6xl w-full flex flex-col md:flex-row gap-8">
        <div className="flex-1">
          <div className="text-center text-4xl font-bold">Buy Credits</div>
          <div>
            {creditProducts.map((product) => (
              <Panel
                key={product.docId}
                title={product.name}
                description={'desc'}
                footer={
                  <>
                    {product.prices.map((price) => (
                      <Button
                        key={price.guid}
                        onClick={() => singlePayment(price)}
                      >
                        ${price.unit_amount / 100} x{' '}
                        {price.transform_quantity.divide_by}
                      </Button>
                    ))}
                  </>
                }
              >
                <img src={product.images[0]} width="50px" />
              </Panel>
            ))}
          </div>
        </div>
        <div className="flex-1">
          <div className="text-center text-4xl font-bold">My Credits</div>
          <div className="mt-8 flex gap-6 justify-center">
            You have 0 credits
          </div>
        </div>
        <div className="flex-1">
          <div className="text-center text-4xl font-bold">My Credits</div>
          <div className="text-center text-4xl font-bold">Spend Credits</div>
          <div className="mt-8 flex gap-6 justify-center">
            You have 0 credits
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
