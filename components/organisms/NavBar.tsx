import React, { useEffect, useState } from 'react'
import { FiSun, FiMenu } from 'react-icons/fi'
import Image from 'next/image'
import Link from 'next/link'
import Dropdown from '@components/molecules/Dropdown'
import { useTheme } from '@core/hooks/useTheme'
import { Theme, ToastContainer } from 'react-toastify'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { isAlertBannerActive } from '@core/store/Common'
import { useAtom } from 'jotai'
import AlertBanner from '@components/molecules/AlertBanner'

export default function NavBar() {
  const router = useRouter()
  const { t, i18n } = useTranslation()
  const { themeDark, themeLight, theme } = useTheme()
  const [scrollPosition, setScrollPosition] = useState(0)
  const [alertActive] = useAtom(isAlertBannerActive)

  const handleScroll = () => {
    const position = window.pageYOffset
    setScrollPosition(position)
  }

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

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <>
      {alertActive && <AlertBanner />}
      <nav
        className={`z-50 backdrop-blur-sm bg-neutral-50/30 dark:bg-normal-900/30 fixed top-0 w-full p-2 flex justify-between items-center border-b border-neutral-800
        ${scrollPosition <= 0.5 && alertActive ? 'mt-12' : ''}
      `}
      >
        <div className="flex items-center">
          <Link href="/" aria-label="home link">
            <Image src="/logo.webp" alt="" width={45} height={22} />
          </Link>
          <div className="from-blue-600 to-blue-900 dark:from-blue-400 dark:to-blue-800 text-xl bg-clip-text text-transparent bg-gradient-to-r pl-6">
            Blue Panda
          </div>
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
