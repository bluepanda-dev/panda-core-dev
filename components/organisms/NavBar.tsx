import React, { useState } from 'react'
import { FiSun, FiMenu } from 'react-icons/fi'
import Image from 'next/image'
import Link from 'next/link'
import Dropdown from '@components/molecules/Dropdown'
import Button from '@components/atoms/Button'
import Modal from './Modal'
import Container from '@components/atoms/Container'
import { useTheme } from '@core/hooks/useTheme'
import { Theme, ToastContainer, toast } from 'react-toastify'

export default function NavBar() {
  const { themeDark, themeLight, theme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)

  const AccountOptions = [
    {
      label: 'Simple Modal',
      icon: <FiMenu />,
      onClick: () => {
        setIsOpen(true)
      },
    },
    {
      label: 'Simple Toast',
      icon: <FiMenu />,
      onClick: () => {
        toast('Wow so easy!')
      },
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
    <>
      <Modal isOpen={isOpen} closeModal={() => setIsOpen(false)} title="Title">
        <Container className="h-48" />
      </Modal>
      <nav className="backdrop-blur-xl bg-neutral-50 dark:bg-normal-900 opacity-75 fixed top-0 w-full p-2 flex justify-between items-center border-b border-neutral-800">
        <div>
          <Link href="/">
            <Image src="/logo.png" alt="" width={45} height={22} />
          </Link>
        </div>
        <div className="items-center gap-2 hidden md:flex">
          <Link href="/pricing">
            <Button>Restricted Area</Button>
          </Link>
          <Dropdown options={AccountOptions} title={'Components'} />
        </div>
        <div className="items-center gap-2 md:hidden">
          <Dropdown options={AccountOptions} icon={<FiMenu />} />
        </div>
      </nav>
      <ToastContainer position="bottom-right" theme={theme as Theme} />
    </>
  )
}
