import Image from 'next/image'
import { useState } from 'react'
import { FiChevronRight } from 'react-icons/fi'
import Button from '@components/atoms/Button'
import Container from '@components/atoms/Container'
import Modal from '@components/molecules/Modal'
import { useCopyPages } from '@core/hooks/useCopyPages'
import { ProductCard } from '@core/types'

const Product = ({
  product,
  onBuy,
}: {
  product: ProductCard
  onBuy: (product: ProductCard) => void
}) => {
  const { products } = useCopyPages()

  function handleBuy(product: ProductCard) {
    onBuy(product)
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
          <Button
            onClick={() => handleBuy(product)}
            isSpecial={true}
            loading={false}
          >
            {products.texts!.buyNow}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default function Products() {
  const [isOpen, setIsOpen] = useState(false)
  const [product, setProduct] = useState<ProductCard | null>(null)
  const { products } = useCopyPages()

  function handleBuy(product: ProductCard) {
    setProduct(product)
    setIsOpen(true)
  }

  return (
    <div>
      <div className="text-center text-6xl font-bold">{products.title}</div>
      <div className="pt-24 w-full flex justify-center">
        <div className="w-full grid px-2 md:px-0 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center max-w-5xl">
          {products.list!.map((product, index) => (
            <Product key={index} product={product} onBuy={handleBuy} />
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
          onClick={() => setIsOpen(false)}
        >
          {products.texts!.buyNow}
        </Button>
      </Modal>
    </div>
  )
}
