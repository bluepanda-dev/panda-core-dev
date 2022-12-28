import { useTranslation } from 'next-i18next'

export default function Reviews() {
  const { t } = useTranslation('common')

  const customers = [
    {
      image: '/logo.png',
    },
    {
      image: '/logo.png',
    },
    {
      image: '/logo.png',
    },
    {
      image: '/logo.png',
    },
    {
      image: '/logo.png',
    },
  ]

  return (
    <div className="py-4 pt-14 w-full">
      <div className="text-center text-6xl font-bold pb-16">
        {t('customers.title')}
      </div>
      <div className="py-12 w-full flex  justify-center">
        <div className="relative flex overflow-x-hidden">
          <div className="absolute top-0 z-10 w-32 h-full bg-gradient-to-r from-neutral-50 dark:from-normal-900"></div>
          <div className="absolute top-0 right-0 z-10 w-32 h-full bg-gradient-to-l from-neutral-50 dark:from-normal-900"></div>
          <div className="py-12 animate-marquee whitespace-nowrap flex">
            {customers.map((customer, index) => (
              <span key={index}>
                <img
                  src={customer.image}
                  alt="customer"
                  className="w-16 md:w-28 grayscale mx-6"
                />
              </span>
            ))}
          </div>
          <div className="absolute top-0 py-12 animate-marquee2 whitespace-nowrap flex">
            {customers.map((customer, index) => (
              <span key={index}>
                <img
                  src={customer.image}
                  alt="customer"
                  className="w-16 md:w-28 grayscale mx-6"
                />
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
