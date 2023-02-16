import Button from '@components/atoms/Button'
import { useDataPages } from '@core/hooks/useDataPages'
import { FiCheckCircle } from 'react-icons/fi'
import { PlanCard } from '@core/types'

const PlanCard = ({ plan }: { plan: PlanCard }) => {
  const { plans } = useDataPages()

  return (
    <div
      className={`shadow-lg border dark:border-normal-700 rounded-md relative p-6 w-full lg:max-w-md h-80 lg:h-[30em]
    ${plan._popular ? 'bg-blue-900 text-neutral-50 lg:h-[35em]' : ''}
    `}
    >
      <div className="flex flex-col gap-4">
        <div className="from-accent-600 to-accent-500 text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r">
          {plan.title}
        </div>
        <div className="text-3xl font-bold">{plan.price}</div>
        <div className="text-md text-left">
          <ul>
            {plan.features.map((item, index) => (
              <li key={index} className="flex items-center gap-2 md:py-1">
                <FiCheckCircle className="text-success-500" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="absolute right-4 bottom-10 lg:bottom-4">
          <Button isSpecial={true}>{plans.cta}</Button>
        </div>
        <div className="absolute right-4 lg:left-6 bottom-2 lg:bottom-28">
          {plan.details}
        </div>
      </div>
    </div>
  )
}

export default function Plans() {
  const { plans } = useDataPages()

  return (
    <div className="w-full">
      <div className="text-center text-6xl font-bold">{plans.title}</div>
      <div className="pt-24 w-full flex justify-center">
        <div className="max-w-[90em] px-2 md:px-24 grid grid-cols-1 lg:grid-cols-3 justify-center justify-items-center gap-8 xl:gap-16 items-center w-full">
          {plans.list!.map((plan, index) => (
            <PlanCard key={index} plan={plan}></PlanCard>
          ))}
        </div>
      </div>
    </div>
  )
}
