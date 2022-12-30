import { useTranslation } from 'next-i18next'
import Image from 'next/image'

export default function Reviews() {
  const { t } = useTranslation('common')

  const customers = [
    {
      image: '/logo.webp',
    },
    {
      image: '/logo.webp',
    },
    {
      image: '/logo.webp',
    },
    {
      image: '/logo.webp',
    },
    {
      image: '/logo.webp',
    },
  ]

  return (
    <div className="w-full">
      <div className="text-center text-6xl font-bold">
        {t('customers.title')}
      </div>
      <div className="pt-24  w-full flex  justify-center">
        <div className="relative flex overflow-x-hidden">
          <div className="absolute top-0 z-10 w-32 h-full bg-gradient-to-r from-neutral-50 dark:from-normal-900"></div>
          <div className="absolute top-0 right-0 z-10 w-32 h-full bg-gradient-to-l from-neutral-50 dark:from-normal-900"></div>
          <div className="py-12 animate-marquee whitespace-nowrap flex">
            {customers.map((customer, index) => (
              <span key={index}>
                <Image
                  src={customer.image}
                  alt="customer"
                  className="grayscale mx-6 w-16 md:w-24"
                  width={90}
                  height={48}
                />
              </span>
            ))}
          </div>
          <div className="absolute top-0 py-12 animate-marquee2 whitespace-nowrap flex">
            {customers.map((customer, index) => (
              <span key={index}>
                <Image
                  src={customer.image}
                  alt="customer"
                  className="grayscale mx-6 w-16 md:w-24"
                  width={90}
                  height={48}
                />
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
