import Accordion from '@components/molecules/Accordion'
import { useCopyPages } from '@core/hooks/useCopyPages'

export default function Faqs() {
  const { faqs } = useCopyPages()

  return (
    <div>
      <div className="text-center text-6xl font-bold">{faqs.title}</div>
      <div className="pt-24 w-full flex justify-center">
        <div className="px-2 md:px-0 flex justify-center items-center w-full">
          <Accordion
            options={faqs.list!.map((faq) => ({
              title: faq.question,
              content: faq.answer,
            }))}
            className="max-w-5xl text-2xl"
            contentClass="divide-y dark:divide-neutral-800 p-0"
            descriptionClass="px-2 !text-lg"
          />
        </div>
      </div>
    </div>
  )
}
