import Accordion from '@components/molecules/Accordion'
import { useTranslation } from 'next-i18next'

type Faq = {
  question: string
  answer: string
}

export default function Faqs() {
  const { t } = useTranslation('common')

  const options = (t('faqs.list', { returnObjects: true }) as Faq[]).map(
    (option: Faq) => ({
      title: option.question,
      content: option.answer,
    }),
  )

  return (
    <div>
      <div className="text-center text-6xl font-bold">{t('faqs.title')}</div>
      <div className="pt-24 w-full flex justify-center">
        <div className="px-2 md:px-0 flex justify-center items-center w-full">
          <Accordion
            options={options}
            className="max-w-5xl text-2xl"
            contentClass="divide-y dark:divide-neutral-800 p-0"
            descriptionClass="px-2 !text-lg"
          />
        </div>
      </div>
    </div>
  )
}
