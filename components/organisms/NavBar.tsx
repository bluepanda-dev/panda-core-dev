import React, { useEffect, useState } from 'react'
import { FiSun, FiMenu } from 'react-icons/fi'
import Image from 'next/image'
import Link from 'next/link'
import Dropdown from '@components/molecules/Dropdown'
import { useTheme } from '@core/hooks/useTheme'
import { Theme, ToastContainer } from 'react-toastify'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'

export default function NavBar() {
  const router = useRouter()
  const { t, i18n } = useTranslation()
  const { themeDark, themeLight, theme } = useTheme()

  const AccountOptions = [
    {
      label: t('switchTheme', { theme: theme === 'light' ? 'dark' : 'light' }),
      icon: <FiSun />,
      onClick: () => {
        theme === 'dark' ? themeLight() : themeDark()
      },
    },
  ]

  const lanOptions = [
    {
      label: t('lanOptions.en'),
      onClick: () => {
        router.push('/', '', { locale: 'en' })
      },
    },
    {
      label: t('lanOptions.es'),
      onClick: () => {
        router.push('/', '', { locale: 'es' })
      },
    },
    {
      label: t('lanOptions.de'),
      onClick: () => {
        router.push('/', '', { locale: 'de' })
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
          <Dropdown options={AccountOptions} title={t('settings') ?? ''} />
          <Dropdown options={lanOptions} title={i18n.language} />
        </div>
        <div className="items-center gap-2 md:hidden">
          <Dropdown options={AccountOptions} icon={<FiMenu />} />
          <Dropdown options={lanOptions} title={i18n.language} />
        </div>
      </nav>
      <ToastContainer position="bottom-right" theme={theme as Theme} />
    </>
  )
}
