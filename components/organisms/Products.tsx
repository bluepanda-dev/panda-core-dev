import { useTranslation } from 'next-i18next'
import { useState, useEffect } from 'react'
import { FiChevronRight } from 'react-icons/fi'
import Image from 'next/image'
import Button from '@components/atoms/Button'

type Product = {
  _id: number
  title: string
  description: string
  price: string
  features: string[]
  _image: string
}

const Product = ({ product }: { product: Product }) => {
  const { t } = useTranslation('common')

  return (
    <div className="w-full max-w-sm justify-self-center rounded-lg bg-gradient-to-r from-blue-600 via-blue-700 to-blue-400">
      <div className="bg-neutral-50 dark:bg-normal-900 rounded-lg m-0.5 dark:m-[1px] flex flex-col">
        <div className="w-full rounded-t-lg flex justify-center">
          <Image alt="logo" src={product._image} width={180} height={48} />
        </div>
        <div className="p-4 text-2xl relative">
          {product.title}
          <div className="absolute text-sm right-2 -top-3">
            <span className="bg-accent-300 text-accent-800 rounded-lg p-1 ">
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
          <Button className="text-neutral-50 bg-primary-700 shadow-lg shadow-primary-700/50 hover:bg-primary-500">
            {t('buyNow')}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default function Products() {
  const { t } = useTranslation('common')

  const products = t('products.list', { returnObjects: true }) as Product[]

  return (
    <div>
      <div className="text-center text-6xl font-bold">
        {t('products.title')}
      </div>
      <div className="pt-24 w-full flex justify-center">
        <div className="w-full grid px-2 md:px-0 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center max-w-5xl">
          {products.map((product, index) => (
            <Product key={index} product={product} />
          ))}
        </div>
      </div>
    </div>
  )
}
