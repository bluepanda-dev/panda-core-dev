import { Disclosure } from '@headlessui/react'
import { FiChevronsUp } from 'react-icons/fi'

type AccordionOption = {
  title: string
  content: React.ReactNode
}

type AccordionProps = {
  className?: string
  contentClass?: string
  optionClass?: string
  descriptionClass?: string
  options: AccordionOption[]
}

export default function Accordion({
  options = [],
  className = '',
  contentClass = '',
  descriptionClass = '',
  optionClass = '',
}: AccordionProps) {
  return (
    <>
      <div className={`w-full ${className}`}>
        <div className={`w-full p-2 ${contentClass}`}>
          {options.map((option, index) => (
            <Disclosure key={index}>
              {({ open }) => (
                <>
                  <Disclosure.Button
                    className={`text-neutral-800 dark:text-neutral-400 flex w-full justify-between   py-2 text-left font-medium  focus:outline-none focus-visible:ring optionClass`}
                  >
                    <span>{option.title}</span>
                    <FiChevronsUp
                      className={`${
                        !open ? 'rotate-180 transform' : ''
                      } h-5 w-5 text-primary-600 z-0`}
                    />
                  </Disclosure.Button>
                  <Disclosure.Panel
                    className={`text-neutral-600 pt-4 pb-2 text-sm text-left px-4 ${descriptionClass}`}
                  >
                    {option.content}
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          ))}
        </div>
      </div>
    </>
  )
}
