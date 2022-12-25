import React from 'react'
import { FiSun, FiMenu } from 'react-icons/fi'
import Image from 'next/image'
import Link from 'next/link'
import Dropdown from '@components/molecules/Dropdown'
import Button from '@components/atoms/Button'
import { useTheme } from '@core/hooks/useTheme'
import { Theme, ToastContainer } from 'react-toastify'

export default function NavBar() {
  const { themeDark, themeLight, theme } = useTheme()

  const AccountOptions = [
    {
      label: `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`,
      icon: <FiSun />,
      onClick: () => {
        theme === 'dark' ? themeLight() : themeDark()
      },
    },
  ]

  return (
    <>
      <nav className="z-10 bg-neutral-50 dark:bg-normal-900 fixed top-0 w-full p-2 flex justify-between items-center border-b border-neutral-800">
        <div>
          <Link href="/">
            <Image src="/logo.png" alt="" width={45} height={22} />
          </Link>
        </div>
        <div className="items-center gap-2 hidden md:flex">
          <Dropdown options={AccountOptions} title={'Settings'} />
        </div>
        <div className="items-center gap-2 md:hidden">
          <Dropdown options={AccountOptions} icon={<FiMenu />} />
        </div>
      </nav>
      <ToastContainer position="bottom-right" theme={theme as Theme} />
    </>
  )
}
