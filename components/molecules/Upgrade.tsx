import React from 'react'
import { PlanCard } from '@components/organisms/Plans'
import { usePayments } from '@core/hooks/usePayments'

type UpgradeProps = {
  type: string
}

export default function Upgrade({ type }: UpgradeProps) {
  const { planProduct } = usePayments()

  return (
    <div className="pt-24 w-full flex justify-center">
      <div className="max-w-[90em] px-2 md:px-24 grid grid-cols-1 lg:grid-cols-3 justify-center justify-items-center gap-8 xl:gap-16 items-center w-full">
        {planProduct &&
          planProduct.prices
            .filter((price) => price.stripe_metadata_type === type)
            .map((price, index) => (
              <PlanCard key={index} price={price}></PlanCard>
            ))}
      </div>
    </div>
  )
}
