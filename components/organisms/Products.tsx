import Button from '@components/atoms/Button'
import Image from 'next/image'
import { useDataPages } from '@core/hooks/useDataPages'
import { ProductCard } from '@core/types'
import { FiChevronRight } from 'react-icons/fi'
import Modal from '@components/molecules/Modal'
import { useState } from 'react'
import Container from '@components/atoms/Container'
import { usePayments } from '@core/hooks/usePayments'
import { Price } from '@core/types/payments'

const Product = ({
  product,
  price,
  onBuy,
}: {
  product: ProductCard
  price: Price | null
  onBuy: (product: ProductCard, price: Price) => void
}) => {
  const { products } = useDataPages()

  function handleBuy(product: ProductCard, price: Price) {
    if (price) {
      onBuy(product, price)
    }
  }

  return (
    <div className="w-full max-w-sm justify-self-center pb-1 rounded-lg bg-gradient-to-r from-blue-600 via-blue-700 to-blue-400">
      <div className="bg-neutral-50 dark:bg-normal-900 h-full rounded-lg m-0.5 dark:m-[1px] flex flex-col">
        <div className="w-full rounded-t-lg flex justify-center">
          <Image alt="logo" src={product._image} width={180} height={48} />
        </div>
        <div className="p-4 text-2xl relative">
          {product.title}
          <div className="absolute text-sm right-2 -top-3">
            <span className="bg-primary-300 text-primary-800 rounded-lg p-1 ">
              {' '}
              {product.price}
            </span>
          </div>
        </div>
        <div className="px-4 text-sm text-normal-100">
          <ul>
            {product.features.map((feature, index) => (
              <li key={index} className="flex items-baseline">
                <FiChevronRight /> {feature}
              </li>
            ))}
          </ul>
        </div>
        <div className="p-6">
          {price ? (
            <Button
              onClick={() => handleBuy(product, price)}
              isSpecial={true}
              loading={false}
            >
              {products.texts!.buyNow}
            </Button>
          ) : (
            <div className="text-lg text-center pt-2">Out of stock</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function Products() {
  const [isOpen, setIsOpen] = useState(false)
  const [product, setProduct] = useState<ProductCard | null>(null)
  const [price, setPrice] = useState<Price | null>(null)
  const { products } = useDataPages()
  const { products: productList, singlePayment, loading } = usePayments()

  function handleBuy(product: ProductCard, price: Price) {
    setProduct(product)
    setPrice(price)
    setIsOpen(true)
  }

  function obtainPriceByName(name: string) {
    const found = productList.find((product) => product.name === name)
    if (found?.prices) {
      return found.prices[0]
    }
    return null
  }

  function handleBuyNow() {
    singlePayment(price!)
  }

  return (
    <div>
      <div className="text-center text-6xl font-bold">{products.title}</div>
      <div className="pt-24 w-full flex justify-center">
        <div className="w-full grid px-2 md:px-0 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center max-w-5xl">
          {products.list!.map((product, index) => (
            <Product
              key={index}
              product={product}
              onBuy={handleBuy}
              price={obtainPriceByName(product.title)}
            />
          ))}
        </div>
      </div>
      <Modal
        isOpen={isOpen}
        closeModal={() => setIsOpen(false)}
        hasCloseButton={false}
        title={product?.title ?? ''}
      >
        <Container className="h-48 mt-4 mb-10" />

        <Image
          className="absolute right-2 top-0 w-16"
          alt="logo"
          src={product?._image ?? ''}
          width={180}
          height={48}
        />

        <Button
          className="w-auto absolute bottom-3 right-3 !h-10"
          isSpecial={true}
          onClick={handleBuyNow}
          loading={loading}
        >
          {products.texts!.buyNow}
        </Button>
      </Modal>
    </div>
  )
}
