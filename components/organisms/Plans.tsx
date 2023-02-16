import Button from '@components/atoms/Button'
import { useDataPages } from '@core/hooks/useDataPages'
import { FiCheckCircle } from 'react-icons/fi'
import { usePayments } from '@core/hooks/usePayments'
import { Price } from '@core/types/payments'

export const PlanCard = ({ price }: { price: Price }) => {
  const { plans } = useDataPages()
  const features = price.stripe_metadata_features.split('\n') as string[]
  const { startSubscription, loading } = usePayments()
  // TODO remove all hardfcoded text like enterprise, etc

  return (
    <div
      className={`shadow-lg border dark:border-normal-700 rounded-md relative p-6 w-full lg:max-w-md h-80 lg:h-[30em]
    ${
      price.stripe_metadata_special
        ? 'bg-blue-900 text-neutral-50 lg:h-[35em]'
        : ''
    }
    `}
    >
      <div className="flex flex-col gap-4">
        <div className="from-accent-600 to-accent-500 text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r">
          {price.stripe_metadata_name}
        </div>
        <div className="text-3xl font-bold">
          {price.unit_amount
            ? `${price.unit_amount / 100} ${price.currency}`
            : price.stripe_metadata_type}
        </div>
        <div className="text-md text-left">
          <ul>
            {features.map((item, index) => (
              <li key={index} className="flex items-center gap-2 md:py-1">
                <FiCheckCircle className="text-success-500" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        {price.unit_amount > 0 && (
          <div className="absolute right-4 bottom-10 lg:bottom-4">
            <Button
              loading={loading}
              isSpecial={true}
              onClick={() => startSubscription(price)}
            >
              {plans.cta}
            </Button>
          </div>
        )}
        {price.stripe_metadata_type === 'enterprise' && (
          <div className="absolute right-4 bottom-10 lg:bottom-4">
            <Button loading={loading}>Contact us</Button>
          </div>
        )}
        <div className="absolute right-4 lg:left-6 bottom-2 lg:bottom-28 text-neutral-300">
          {price.stripe_metadata_description}
        </div>
      </div>
    </div>
  )
}

export default function Plans() {
  const { plans } = useDataPages()
  const { planProduct } = usePayments()

  return (
    <div className="w-full">
      <div className="text-center text-6xl font-bold">{plans.title}</div>
      <div className="pt-24 w-full flex justify-center">
        <div className="max-w-[90em] px-2 md:px-24 grid grid-cols-1 lg:grid-cols-3 justify-center justify-items-center gap-8 xl:gap-16 items-center w-full">
          {planProduct &&
            planProduct.prices
              .sort((a, b) => {
                return (
                  Number(a.stripe_metadata_order) -
                  Number(b.stripe_metadata_order)
                )
              })
              .map((price, index) => (
                <PlanCard key={index} price={price}></PlanCard>
              ))}
        </div>
      </div>
    </div>
  )
}
