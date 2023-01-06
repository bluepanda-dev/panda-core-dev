import React, { Fragment } from 'react'
import { FiChevronDown } from 'react-icons/fi'
import { Menu, Transition } from '@headlessui/react'
import Button from '@components/atoms/Button'
import { useUser } from '@core/hooks/useUser'
import Link from 'next/link'

export type DropdownProps = {
  className?: string
  image?: string
}

const MenuAction = ({
  text,
  onClick,
}: {
  text: string
  onClick?: () => void
}) => {
  return (
    <div className="py-1">
      <Menu.Item>
        {({ active }) => (
          <button
            onClick={onClick}
            className={`${
              active ? 'bg-normal-800 text-neutral-200' : 'text-neutral-500'
            } group flex w-full items-center px-4 py-2 text-sm`}
          >
            {text}
          </button>
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

  return (
    <Menu
      as="div"
      className={`w-16 relative inline-block text-left ${className}`}
    >
      <Menu.Button
        aria-label="Menu"
        className="flex justify-center items-center h-10  w-full px-1"
      >
        {image && (
          <img
            src={image}
            alt=""
            className="ring-neutral-100 hover:ring-neutral-50 ring-2 w-8 h-8 rounded-full"
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
        <Menu.Items className="dark:border-neutral-500 absolute z-10 bg-primary-50 dark:bg-normal-900 right-0 mt-2 w-56 origin-top-right shadow-lg rounded-sm border">
          <div className="y-1 ">
            <MenuAction text="My account" onClick={() => {}} />

            <Link href="/downloads">
              <MenuAction text="My downloads" />
            </Link>

            <MenuAction text="Theme" onClick={() => {}} />
            <div className="bg-neutral-500 h-px w-full" />
            <MenuAction text="other" onClick={() => {}} />
            <MenuAction text="Log out" onClick={() => logOut()} />
            <div className="bg-neutral-500 h-px w-full" />
            <div className="p-4">
              <Button isSpecial={true}>Upgrade!</Button>
            </div>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
