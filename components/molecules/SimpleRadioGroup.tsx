import { RadioGroup } from '@headlessui/react'
import { FiCheckCircle } from 'react-icons/fi'

export type RadioOption = {
  title: string
  content: React.ReactNode
}

type RadioGroupProps = {
  className?: string
  selected?: unknown
  onSelect?: (option: RadioOption) => void
  options: RadioOption[]
}

export default function SimpleRadioGroup({
  options = [],
  className = '',
  selected = {},
  onSelect = () => {},
}: RadioGroupProps) {
  return (
    <div className={`w-full px-4 ${className}`}>
      <div className="w-full">
        <RadioGroup value={selected} onChange={onSelect}>
          <RadioGroup.Label className="sr-only">Server size</RadioGroup.Label>
          <div className="space-y-2">
            {options.map((option) => (
              <RadioGroup.Option
                key={option.title}
                value={option}
                className={({ active, checked }) =>
                  `                  ${
                    checked
                      ? 'bg-neutral-100 dark:bg-normal-600 bg-opacity-75'
                      : 'bg-neutral-50 dark:bg-normal-800'
                  }
                  flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none`
                }
              >
                {({ active, checked }) => (
                  <>
                    <div className="flex w-full items-center justify-between">
                      <div className="flex items-center">
                        <div className="text-sm">
                          <RadioGroup.Label
                            as="p"
                            className={`font-medium text-left ${
                              checked
                                ? 'text-neutral-900 dark:text-neutral-50'
                                : 'text-neutral-500'
                            }`}
                          >
                            {option.title}
                          </RadioGroup.Label>
                          <RadioGroup.Description
                            as="span"
                            className={`inline ${
                              checked
                                ? 'text-neutral-900 dark:text-neutral-600'
                                : 'text-gray-500'
                            }`}
                          >
                            <span>{option.content}</span>
                          </RadioGroup.Description>
                        </div>
                      </div>
                      {checked && (
                        <div className="shrink-0 text-primary-600">
                          <FiCheckCircle className="h-6 w-6" />
                        </div>
                      )}
                    </div>
                  </>
                )}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
      </div>
    </div>
  )
}
