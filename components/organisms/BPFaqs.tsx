import BPAccordion, {
  BPAccordionContent,
  BPAccordionItem,
  BPAccordionTrigger,
} from '@components/atoms/BPAccordion'
import { useCopyPages } from '@core/hooks/useCopyPages'

export default function BPFaqs() {
  const { faqs } = useCopyPages()

  return (
    <div className="w-full">
      <div className="text-center text-6xl font-bold">{faqs.title}</div>
      <div className="pt-24 w-full flex justify-center">
        <div className="px-2 md:px-0 flex justify-center items-center w-full">
          <BPAccordion
            defaultValue="v0"
            className="px-8 md:px-0 justify-center gap-4 items-center w-full max-w-5xl !border-0"
            type="primary"
            size="xl"
            outline
          >
            {faqs.list!.map((faq, index) => (
              <BPAccordionItem key={index} value={`v${index}`}>
                <BPAccordionTrigger>{faq.question}</BPAccordionTrigger>
                <BPAccordionContent>{faq.answer}</BPAccordionContent>
              </BPAccordionItem>
            ))}
          </BPAccordion>
        </div>
      </div>
    </div>
  )
}
