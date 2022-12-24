import { FiCheckCircle } from 'react-icons/fi'
import { Tab } from '@headlessui/react'

type SimpleTabProps = {
  className?: string
  tabs: { [key: string]: React.ReactNode }
}

export default function SimpleTabs({ tabs, className = '' }: SimpleTabProps) {
  return (
    <div className="w-full md px-2">
      <Tab.Group>
        <Tab.List className="flex flex-wrap space-x-1 p-1">
          {Object.keys(tabs).map((tab) => (
            <Tab
              key={tab}
              className={({ selected }) =>
                `min-w-[10em] py-2 px-2 text-sm font-medium leading-5 hover:!text-primary-500
                  ${
                    selected
                      ? 'text-primary-600 dark:text-primary-600 bg-neutral-100  dark:bg-normal-700'
                      : 'text-neutral-800 dark:text-neutral-600'
                  }`
              }
            >
              {tab}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-2">
          {Object.values(tabs).map((tab, idx) => (
            <Tab.Panel
              key={idx}
              className={'text-neutral-800 dark:text-neutral-400'}
            >
              {tab}
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  )
}
