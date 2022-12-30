import { useTranslation } from 'next-i18next'

type ReviewProps = {
  name: string
  subtitle: string
  children: React.ReactNode
}

type Review = {
  name: string
  position: string
  content: string
}

const ReviewCard = ({ children, subtitle, name }: ReviewProps) => {
  return (
    <div className="max-w-sm bg-neutral-50 bg-opacity-20 rounded-md p-4 py-6">
      <div className="flex gap-4">
        <div className="basis-3/5 text-neutral-100 text-md text-left">
          {children}
        </div>
        <div className="basis-2/5 self-end text-right">
          <div className="self-end bg-clip-text text-transparent bg-gradient-to-r from-success-500 to-accent-500">
            {name}
          </div>
          <div className="self-end opacity-70">{subtitle}</div>
        </div>
      </div>
    </div>
  )
}

export default function Reviews() {
  const { t } = useTranslation('common')

  const options = t('reviews.list', { returnObjects: true }) as Review[]

  return (
    <div className="py-8 w-full bg-gradient-to-r from-accent-500 via-orange-600 to-primary-500 text-neutral-50">
      <div className="text-center text-6xl font-bold">{t('reviews.title')}</div>
      <div className="pt-24 w-full flex  justify-center">
        <div className="px-2 md:px-24 flex flex-col flex-wrap sm:flex-row justify-center gap-16 items-center w-full max-w-8xl">
          {options.map((option, index) => (
            <ReviewCard
              key={index}
              name={option.name}
              subtitle={option.position}
            >
              {option.content}
            </ReviewCard>
          ))}
        </div>
      </div>
    </div>
  )
}
