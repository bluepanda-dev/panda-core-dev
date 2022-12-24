import { Disclosure } from '@headlessui/react'
import { FiChevronsUp } from 'react-icons/fi'

type AccordionOption = {
  title: string
  content: React.ReactNode
}

type AccordionProps = {
  className?: string
  options: AccordionOption[]
}

export default function Accordion({
  options = [],
  className = '',
}: AccordionProps) {
  return (
    <>
      <div className={`w-full ${className}`}>
        <div className="w-full bg-neutral-100 dark:bg-normal-800 p-2">
          {options.map((option, index) => (
            <Disclosure key={index}>
              {({ open }) => (
                <>
                  <Disclosure.Button className="text-neutral-800 dark:text-neutral-400 flex w-full justify-between  px-4 py-2 text-left text-sm font-medium  focus:outline-none focus-visible:ring">
                    <span>{option.title}</span>
                    <FiChevronsUp
                      className={`${
                        open ? 'rotate-180 transform' : ''
                      } h-5 w-5 text-primary-600 z-0`}
                    />
                  </Disclosure.Button>
                  <Disclosure.Panel className="text-neutral-600 pt-4 pb-2 text-sm text-left px-4">
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
