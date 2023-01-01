import Button from '@components/atoms/Button'
import { useTranslation } from 'next-i18next'
import { FiCheckCircle } from 'react-icons/fi'

type Plan = {
  title: string
  price: string
  details: string
  _popular: boolean
  list: string[]
}

type PlanProps = {
  plan: Plan
}

const PlanCard = ({ plan }: PlanProps) => {
  const { t } = useTranslation()

  return (
    <div
      className={`shadow-lg border border-neutral-100 rounded-md relative p-6 w-full lg:max-w-md h-80 lg:h-[30em]
    ${
      plan._popular
        ? 'ring-primary-500 border-primary-600 bg-gradient-to-r from-normal-600 to-normal-900 text-neutral-50 ring-8  border-8'
        : ''
    }
    `}
    >
      <div className="flex flex-col gap-4">
        <div className="from-success-500 to-accent-500 text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r">
          {plan.title}
        </div>
        <div className="text-3xl font-bold">{plan.price}</div>
        <div className="text-neutral-100 text-md text-left">
          <ul>
            {plan.list.map((item, index) => (
              <li key={index} className="flex items-center gap-2">
                <FiCheckCircle className="text-success-500" />
                <span className="text-neutral-300">{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="absolute right-4 bottom-10">
          <Button isSpecial={true}>{t('plans.cta')}</Button>
        </div>
        <div className="absolute right-4 lg:left-6 bottom-2 lg:bottom-28 text-neutral-300">
          {plan.details}
        </div>
      </div>
    </div>
  )
}

export default function Plans() {
  const { t } = useTranslation('common')

  const options = t('plans.list', { returnObjects: true }) as Plan[]

  return (
    <div className="w-full">
      <div className="text-center text-6xl font-bold">{t('plans.title')}</div>
      <div className="pt-24  w-full flex justify-center">
        <div className="max-w-[90em] px-2 md:px-24 grid grid-cols-1 lg:grid-cols-3 justify-center justify-items-center gap-16 items-center w-full">
          {options.map((option, index) => (
            <PlanCard key={index} plan={option}></PlanCard>
          ))}
        </div>
      </div>
    </div>
  )
}
