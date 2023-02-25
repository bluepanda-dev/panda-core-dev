import { Menu, Transition } from '@headlessui/react'
import Link from 'next/link'
import React, { Fragment } from 'react'
import { useTranslation } from 'react-i18next'
import {
  FiLogOut,
  FiSettings,
  FiUsers,
  FiSun,
  FiShoppingBag,
  FiStar,
} from 'react-icons/fi'
import Button from '@components/atoms/Button'
import { useCustomerContext } from '@core/contexts/CustomerContext'
import { useTheme } from '@core/hooks/useTheme'
import { useUser } from '@core/hooks/useUser'

export type DropdownProps = {
  className?: string
  image?: string
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

export default function DropdownUser({
  className = '',
  image = '',
}: DropdownProps) {
  const { logOut } = useUser()
  const { subscriptionType } = useCustomerContext()
  const { t } = useTranslation()
  const { themeDark, themeLight, theme } = useTheme()

  return (
    <Menu
      as="div"
      className={`w-24 relative inline-block text-left ${className}`}
    >
      <Menu.Button
        aria-label="Menu"
        className="flex justify-center items-center h-10  w-full px-1"
      >
        {image && (
          <div className="flex gap-2 items-center">
            <img
              src={image}
              alt=""
              className="ring-neutral-100 hover:ring-neutral-50 ring-2 w-8 h-8 rounded-full"
            />
            {subscriptionType && (
              <div>
                <span
                  className={`pb-1 bg-yellow-100 text-yellow-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-yellow-900 dark:text-yellow-300
                    ${
                      subscriptionType === 'plus'
                        ? '!bg-primary-500 !text-primary-100'
                        : ''
                    }
                  `}
                >
                  {subscriptionType}
                </span>
              </div>
            )}
          </div>
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
        <Menu.Items className="dark:border-neutral-500 absolute z-10 bg-primary-50 dark:bg-normal-900 right-0 mt-2 w-56 origin-top-right shadow-lg rounded-sm border">
          <div className="y-1 ">
            <Link href="/account">
              <MenuAction
                icon={<FiSettings />}
                text={t('myAccount')}
                onClick={() => {}}
              />
            </Link>
            <Link href="/hideouts">
              <MenuAction
                icon={<FiUsers />}
                text={t('myHideouts')}
                onClick={() => {}}
              />
            </Link>
            <Link href="/orders">
              <MenuAction icon={<FiShoppingBag />} text="My Orders" />
            </Link>
            <Link href="/credits">
              <MenuAction icon={<FiStar />} text="My Credits" />
            </Link>
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
            <div className="bg-neutral-500 h-px w-full" />
            <Link href="" onClick={() => logOut()}>
              <MenuAction icon={<FiLogOut />} text={t('logOut')} />
            </Link>
            <div className="bg-neutral-500 h-px w-full" />
            <div className="p-4">
              <Button isSpecial={true}>{t('upgrade')}!</Button>
            </div>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
