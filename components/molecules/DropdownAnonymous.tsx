import { Menu, Transition } from '@headlessui/react'
import React, { Fragment } from 'react'
import { useTranslation } from 'react-i18next'
import { FiSun } from 'react-icons/fi'
import { useTheme } from '@core/hooks/useTheme'

export type DropdownProps = {
  className?: string
  image: React.ReactNode
}

const MenuAction = ({
  text,
  icon,
  onClick,
}: {
  text: string
  icon?: React.ReactNode
  onClick?: () => void
}) => {
  return (
    <div className="py-1">
      <Menu.Item>
        {({ active }) => (
          <div
            className={`${
              active ? 'ui-hoverable' : 'text-normal-900 dark:text-normal-200'
            } group flex w-full items-center px-4 py-2 text-sm gap-x-2 cursor-pointer`}
          >
            {icon}
            <button onClick={onClick}>{text}</button>
          </div>
        )}
      </Menu.Item>
    </div>
  )
}

export default function DropdownAnonymous({
  className = '',
  image,
}: DropdownProps) {
  const { t } = useTranslation()
  const { themeDark, themeLight, theme } = useTheme()

  return (
    <Menu
      as="div"
      className={`w-16 relative inline-block text-left ${className}`}
    >
      <Menu.Button
        aria-label="Menu"
        className="flex justify-center items-center h-10  w-full px-1"
      >
        {image}
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
        <Menu.Items className="dark:border-neutral-500 absolute z-10 bg-primary-50 dark:bg-normal-900 right-0 mt-2 w-56 origin-top-right shadow-lg rounded-sm border">
          <div className="y-1 ">
            <div
              onClick={() => (theme === 'dark' ? themeLight() : themeDark())}
            >
              <MenuAction
                icon={<FiSun />}
                text={t('switchTheme', {
                  theme: theme === 'light' ? 'dark' : 'light',
                })}
              />
            </div>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
