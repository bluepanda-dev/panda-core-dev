import Layout from '@components/layout'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useUserContext } from '@core/contexts/UserContext'
import { useCustomerContext } from '@core/contexts/CustomerContext'
import { useDataPages } from '@core/hooks/useDataPages'
import { useState, useEffect } from 'react'
import { ProductCard, Order } from '@core/types'
import Button from '@components/atoms/Button'
import Panel from '@components/molecules/Panel'

type HydratedProduct = ProductCard & { order: Order }

const Orders = () => {
  const { profile } = useUserContext()
  const { orders, fetchVault } = useCustomerContext()
  const { products } = useDataPages()
  const [ownProducts, setOwnProducts] = useState<HydratedProduct[]>([])

  useEffect(() => {
    setOwnProducts([])
    if (orders) {
      const list =
        products.list
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
            return { ...product, order: found }
          }) ?? []

      if (list) {
        setOwnProducts(list as HydratedProduct[])
      }

      list.map(async (product) => {
        if (product.order) {
          console.log('p[roduct:>]', product.order.items[0].price.product)
          const res = await fetchVault(
            product.order.id,
            product.order.items[0].price.product,
          )
          console.log('res:>]', res)
        }
      })
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
