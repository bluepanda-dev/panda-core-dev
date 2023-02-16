import React, { Fragment } from 'react'
import { FiChevronDown } from 'react-icons/fi'
import { Menu, Transition } from '@headlessui/react'

export type Option = {
  label: string
  icon?: React.ReactNode
  onClick: () => void
}

export type DropdownProps = {
  title?: string
  icon?: React.ReactNode
  className?: string
  options: Option[]
}

export default function Dropdown({
  title,
  icon,
  className = '',
  options = [],
}: DropdownProps) {
  return (
    <Menu as="div" className={`relative inline-block text-left ${className}`}>
      <Menu.Button
        aria-label="Menu"
        className="ui-selectable transition ease-in-out h-10 inline-flex w-full justify-center items-center rounded-sm px-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75"
      >
        {title && <span className="text-lg">{title}</span>}
        {icon ? (
          icon
        ) : (
          <FiChevronDown
            className="ml-2 -mr-1 h-5 w-5 mt-1"
            aria-hidden="true"
          />
        )}
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="ui-border-group bg-primary-50 dark:bg-normal-900 absolute z-10 right-0 mt-2 w-56 origin-top-right shadow-lg rounded-md ">
          {options.map((option, index) => (
            <Menu.Item key={index}>
              {({ active }) => {
                return (
                  <button
                    onClick={option.onClick}
                    role={option.label}
                    aria-label={option.label}
                    title={option.label}
                    className={`cursor-pointer flex w-full rounded-md items-center px-2 py-2 text-sm gap-2
                    ${
                      active
                        ? 'ui-hoverable'
                        : 'text-normal-900 dark:text-normal-200'
                    }
                  `}
                  >
                    <i>{option.icon}</i>
                    {option.label}
                  </button>
                )
              }}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
