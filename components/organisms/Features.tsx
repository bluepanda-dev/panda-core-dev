import Image from 'next/image'
import { useDataPages } from '@core/hooks/useDataPages'
import { FeatureCard } from '@core/types'

const Feature = ({ feature }: { feature: FeatureCard }) => {
  return (
    <div className="basis-1/3 max-w-sm rounded-lg bg-gradient-to-r  from-blue-900 via-blue-200 to-blue-800">
      <div className="bg-neutral-50 dark:bg-normal-900 rounded-lg m-0.5 dark:m-[1px] flex items-center h-56">
        <div className="basis-2/5">
          <Image src={feature._image} alt="Features" width={140} height={48} />
        </div>
        <div className="basis-3/5 flex flex-col gap-2 px-1 items-start self-start mt-4">
          <div className="text-lg">{feature.title}</div>
          <div className="text-normal-400 dark:text-normal-100 text-sm">
            {feature.content}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Features() {
  const { features } = useDataPages()

  return (
    <div>
      <div className="text-center text-6xl font-bold">{features.title}</div>
      <div className="pt-24 w-full flex justify-center">
        <div className="grid px-2 md:px-0 sm:grid-cols-2 lg:grid-cols-3 justify-center items-center gap-8 max-w-5xl">
          {features.list.map((feature, index) => (
            <Feature key={index} feature={feature} />
          ))}
        </div>
      </div>
    </div>
  )
}
