import { Tab } from '@headlessui/react'

type SimpleTabProps = {
  className?: string
  isVertical?: boolean
  tabs: { [key: string]: React.ReactNode }
}

export default function SimpleTabs({
  tabs,
  isVertical = false,
  className = '',
}: SimpleTabProps) {
  return (
    <div className={`w-full md px-2 ${isVertical ? 'flex' : ''}`}>
      <Tab.Group>
        <Tab.List
          className={`flex flex-wrap space-x-1 p-1 gap-1 ${
            isVertical ? 'flex-col' : ''
          } `}
        >
          {Object.keys(tabs).map((tab) => (
            <Tab
              key={tab}
              className={({ selected }) =>
                `!ml-0 min-w-[10em] p-2 text-sm font-medium leading-5 ui-hoverable 
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
        <Tab.Panels className="mt-2 grow h-full">
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
