import * as dayjs from 'dayjs'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { FiArrowLeft } from 'react-icons/fi'
import Button from '@components/atoms/Button'
import Layout from '@components/layout'
import Panel from '@components/molecules/Panel'
import SimpleHeader from '@components/molecules/SimpleHeader'
import { useCustomerContext } from '@core/contexts/CustomerContext'
import { useUserContext } from '@core/contexts/UserContext'
import { useCopyPages } from '@core/hooks/useCopyPages'
import { ProductCard, Order } from '@core/types'
import { useTranslation } from 'next-i18next'

type HydratedProduct = ProductCard & { order: Order }

const Orders = () => {
  const { t } = useTranslation(['orders', 'common'])
  const router = useRouter()
  const { profile } = useUserContext()
  const { orders } = useCustomerContext()
  const { products } = useCopyPages()
  const [ownProducts, setOwnProducts] = useState<HydratedProduct[]>([])

  function handleDownload(download?: string) {
    if (download) {
      window.open(download, '_blank')
    }
  }

  function handleInvoice(invoice?: string) {
    if (invoice) {
      window.open(invoice, '_blank')
    }
  }

  function back() {
    router.push('/')
  }

  async function fetchOwnProducts() {
    const productsMatch =
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

    // it checks if the product has metadata such as download link
    const hydratedOrder = await Promise.all(
      productsMatch.map(async (product) => {
        if (product.order) {
          product.order.invoice = product.order.charges.data[0].receipt_url
          return {
            ...product,
            order: {
              ...product.order,
            },
          }
        }

        return product
      }),
    )

    if (hydratedOrder) {
      setOwnProducts(hydratedOrder as HydratedProduct[])
    }
  }

  useEffect(() => {
    if (orders) {
      setOwnProducts([])
      fetchOwnProducts()
    }
  }, [orders])

  // Server-render loading state
  if (!profile) {
    return <Layout>{t('loading', { ns: 'common' })}...</Layout>
  }

  return (
    <Layout className="justify-center">
      <SimpleHeader
        title={
          <div className="flex items-center gap-4">
            <FiArrowLeft
              className="cursor-pointer hover:opacity-75"
              onClick={back}
            />
            <div className="text-center text-xl font-bold">{t('myOrders')}</div>
          </div>
        }
      />

      <div className="flex justify-center">
        <div className="px-4 md:px-8 my-16 h-full max-w-2xl w-full">
          <div className="mt-8 flex flex-col gap-6 justify-center">
            {ownProducts.map((product) => (
              <Panel
                key={product.order.id}
                title={product.title}
                description={product.description}
                hints={
                  <span>
                    {t('purchaseOn')}{' '}
                    {dayjs
                      .unix(Number(product.order.created))
                      .format('DD/MM/YYYY')}
                  </span>
                }
                footer={
                  <>
                    {product.order.invoice && (
                      <Button
                        onClick={() => handleInvoice(product.order.invoice)}
                        className="w-48"
                        isSmall={true}
                      >
                        {t('invoice')}
                      </Button>
                    )}
                    {product.order.protectedItem?.download && (
                      <Button
                        onClick={() =>
                          handleDownload(product.order.protectedItem.download)
                        }
                        isInverted={true}
                        className="w-48"
                        isSmall={true}
                      >
                        {t('download')}
                      </Button>
                    )}
                  </>
                }
              >
                <span className="absolute right-2 top-2 dark:bg-normal-700 dark:text-neutral-300 rounded-lg p-1">
                  {product.price}
                </span>
                {product.order.protectedItem?.raw && (
                  <div>
                    <div className="text-primary-600 font-semibold my-4">
                      {t('unlockedContent')}:
                    </div>
                    <div className="bg-neutral-200 dark:bg-neutral-800 p-8">
                      <code>{product.order.protectedItem?.raw}</code>
                    </div>
                  </div>
                )}
              </Panel>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Orders

export async function getServerSideProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['orders', 'common'])),
    },
  }
}
