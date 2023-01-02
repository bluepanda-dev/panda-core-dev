import Image from 'next/image'
import { useDataPages } from '@core/hooks/useDataPages'
import { WhyUsCard } from '@core/types'

const Why = ({ why }: { why: WhyUsCard }) => {
  return (
    <div className="basis-1/3 max-w-sm">
      <div className="rounded-lg flex flex-col gap-4 items-center h-56">
        <div className="h-1/3">
          <Image
            alt={why.title}
            src={why._image}
            width={100}
            height={100}
            className="sepia"
          />
        </div>
        <div className="text-2xl">{why.title}</div>
        <div className="grow text-normal-400 dark:text-normal-100 text-md text-center">
          {why.content}
        </div>
      </div>
    </div>
  )
}

export default function WhyUs() {
  const { whyUs } = useDataPages()

  return (
    <div>
      <div className="text-center text-6xl font-bold">{whyUs.title}</div>
      <div className="pt-24 w-full flex justify-center">
        <div className="grid px-2 md:px-0 md:grid-cols-3 justify-center items-center gap-8 max-w-5xl">
          {whyUs.list!.map((option, index) => (
            <Why key={index} why={option} />
          ))}
        </div>
      </div>
    </div>
  )
}
