import React from 'react'
import { useTheme } from '@core/hooks/useTheme'
import { FiSun } from 'react-icons/fi'
import Image from 'next/image'
import Link from 'next/link'
import Dropdown from '@components/molecules/Dropdown'
import Button from '@components/atoms/Button'

export default function NavBar() {
  const { themeDark, themeLight, theme } = useTheme()

  const AccountOptions = [
    {
      label: 'Profile',
      icon: <FiSun />,
      onClick: () => {},
    },
    {
      label: `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`,
      icon: <FiSun />,
      onClick: () => {
        theme === 'dark' ? themeLight() : themeDark()
      },
    },
  ]

  return (
    <nav className="backdrop-blur-md bg-neutral-50 dark:bg-normal opacity-95 fixed top-0 w-full p-2 flex justify-between items-center border-b border-neutral-800">
      <div>
        <Link href="/">
          <Image src="/logo.png" alt="" width={45} height={22} />
        </Link>
      </div>
      <div className="flex items-center gap-2">
        <Link href="/pricing">
          <Button>Restricted Area</Button>
        </Link>
        <Dropdown options={AccountOptions} title={'Options'} />
      </div>
    </nav>
  )
}
