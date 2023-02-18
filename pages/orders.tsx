import Layout from '@components/layout'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useUserContext } from '@core/contexts/UserContext'
import { usePayments } from '@core/hooks/usePayments'
import { useCustomerContext } from '@core/contexts/CustomerContext'
import { useDataPages } from '@core/hooks/useDataPages'
import { useState, useEffect } from 'react'
import { ProductCard } from '@core/types'
import Button from '@components/atoms/Button'
import Panel from '@components/molecules/Panel'
import { Order } from '@stripe/stripe-js'

const Orders = () => {
  const { profile } = useUserContext()
  const { orders } = useCustomerContext()
  const { products } = useDataPages()
  const [ownProducts, setOwnProducts] = useState<
    (ProductCard & { order: Order })[]
  >([])

  useEffect(() => {
    if (orders) {
      const ownProducts = products.list
        ?.filter((product) => {
          const found = orders.find(
            (order) => order.items[0].description === product.title,
          )
          if (!found) return false
          return product.title === found.items[0].description
        })
        .map((product) => {
          const found = orders.find(
            (order) => order.items[0].description === product.title,
          )
          if (found) {
            return { ...product, order: found }
          }
          return product
        })
      if (ownProducts) setOwnProducts(ownProducts)
    }
  }, [orders])

  // Server-render loading state
  if (!profile) {
    return <Layout>Loading...</Layout>
  }

  console.log('orders:>>>', ownProducts)

  return (
    <Layout className="flex justify-center">
      <div className="md:mx-8 my-16 h-full max-w-2xl w-full">
        <div className="text-center text-4xl font-bold">My Orders</div>
        <div className="mt-8 flex justify-center">
          {ownProducts.map((product) => (
            <Panel
              key={product.order.id}
              title={product.title}
              description="You will be unable to use the system after cancelling the subscription"
              footer={
                <Button isInverted={true} className="w-48" isSmall={true}>
                  Download
                </Button>
              }
            ></Panel>
          ))}
        </div>
      </div>
    </Layout>
  )
}

export default Orders

export async function getServerSideProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  }
}
