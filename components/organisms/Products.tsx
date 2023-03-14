import { useTranslation } from 'next-i18next'
import { useEffect, useState } from 'react'
import { FiChevronRight } from 'react-icons/fi'
import Button from '@components/atoms/Button'
import Container from '@components/atoms/Container'
import Modal from '@components/molecules/Modal'
import { usePayments } from '@core/hooks/usePayments'
import { Price, Product } from '@core/types/payments'
import { formatPrice } from '@core/utils/currency'

const ProductCard = ({
  product,
  onBuy,
}: {
  product: Product
  onBuy: (product: Product) => void
}) => {
  const { t } = useTranslation()
  const price = product.prices[0]
  const features =
    (product.stripe_metadata_features?.split('\n') as string[]) ?? []

  function handleBuy(product: Product) {
    onBuy(product)
  }

  return (
    <div className="w-full max-w-sm justify-self-center pb-1 rounded-lg bg-gradient-to-r from-blue-600 via-blue-700 to-blue-400">
      <div className="bg-neutral-50 dark:bg-normal-900 h-full rounded-lg m-0.5 dark:m-[1px] flex flex-col justify-between">
        <div className="w-full rounded-t-lg flex justify-center">
          <img
            className="p-4"
            alt="product"
            src={product.images[0]}
            width={180}
            height={48}
          />
        </div>
        <div className="p-4 text-2xl relative">
          {product.name}
          <div className="absolute text-sm right-2 -top-3">
            <span className="bg-primary-300 text-primary-800 rounded-lg p-1 ">
              {formatPrice(price.unit_amount)}
            </span>
          </div>
        </div>
        <div className="px-4 text-sm text-normal dark:text-slate-300">
          <ul>
            {features.map((feature, index) => (
              <li key={index} className="flex items-baseline">
                <FiChevronRight /> {feature}
              </li>
            ))}
          </ul>
        </div>
        <div className="p-6">
          {price ? (
            <Button
              onClick={() => handleBuy(product)}
              isSpecial={true}
              loading={false}
            >
              {t('buyNow')}
            </Button>
          ) : (
            <div className="text-lg text-center pt-2">{t('outOfStock')}</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function Products() {
  const { t } = useTranslation()
  const [buying, setBuying] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [product, setProduct] = useState<Product | null>(null)
  const [price, setPrice] = useState<Price | null>(null)
  const { products, singlePayment, setUp } = usePayments()

  function handleBuy(product: Product) {
    setProduct(product)
    setPrice(product.prices[0])
    setIsOpen(true)
  }

  function handleBuyNow() {
    setBuying(true)
    singlePayment(price!, () => {
      setBuying(false)
    })
  }

  useEffect(() => {
    setUp()
  }, [])

  return (
    <div>
      <div className="text-center text-6xl font-bold">
        {t('products.title')}
      </div>
      <div className="pt-24 w-full flex justify-center">
        <div className="w-full grid px-2 md:px-0 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:justify-center max-w-5xl">
          {products.map((product, index) => (
            <ProductCard key={index} product={product} onBuy={handleBuy} />
          ))}
        </div>
      </div>
      <Modal
        isOpen={isOpen}
        closeModal={() => setIsOpen(false)}
        hasCloseButton={false}
        title={product?.name ?? ''}
      >
        <Container className="h-48 mt-4 mb-10" />

        <img
          className="absolute right-2 top-0 w-14"
          alt="product image"
          src={product ? product.images[0] : ''}
        />

        <Button
          className="w-auto absolute bottom-3 right-3 !h-10"
          isSpecial={true}
          onClick={handleBuyNow}
          loading={buying}
        >
          {t('buyNow')}
        </Button>
      </Modal>
    </div>
  )
}
