import { useAtom } from 'jotai'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import React, { useEffect, useState } from 'react'
import { FiSun, FiMenu } from 'react-icons/fi'
import { Theme, ToastContainer } from 'react-toastify'
import { Statsig, useGate, useLayer } from 'statsig-react'
import AlertBanner from '@components/molecules/AlertBanner'
import Dropdown from '@components/molecules/Dropdown'
import { useTheme } from '@core/hooks/useTheme'
import { isAlertBannerActive } from '@core/store/Common'

export default function NavBar() {
  const router = useRouter()
  const { t, i18n } = useTranslation()
  const { themeDark, themeLight, theme } = useTheme()
  const [scrollPosition, setScrollPosition] = useState(0)
  const [alertActive] = useAtom(isAlertBannerActive)
  const { value: isSettingsVisible } = useGate('show_settings')
  const { layer } = useLayer('flags_names')

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
        Statsig.logEvent('switchTheme', 'SKU_10000', {
          currentTheme: theme,
        })
      },
    },
  ]

  const lanOptions = [
    {
      label: `🇺🇸 ${t('lanOptions.en')}`,
      onClick: () => {
        Statsig.logEvent('select_language', 'en')
        router.push('/', '', { locale: 'en' })
      },
    },
    {
      label: `🇪🇸 ${t('lanOptions.es')}`,
      onClick: () => {
        Statsig.logEvent('select_language', 'es')
        router.push('/', '', { locale: 'es' })
      },
    },
    {
      label: `🇩🇪 ${t('lanOptions.de')}`,
      onClick: () => {
        Statsig.logEvent('select_language', 'de')
        router.push('/', '', { locale: 'de' })
      },
    },
    {
      label: `🇯🇵 ${t('lanOptions.jp')}`,
      onClick: () => {
        Statsig.logEvent('select_language', 'jp')
        router.push('/', '', { locale: 'jp' })
      },
    },
  ]

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  function flag() {
    switch (i18n.language) {
      case 'en':
        return layer.get('hide_flags', false) ? t('lanOptions.en') : '🇺🇸'
      case 'es':
        return layer.get('hide_flags', false) ? t('lanOptions.es') : '🇪🇸'
      case 'de':
        return layer.get('hide_flags', false) ? t('lanOptions.de') : '🇩🇪'
      case 'jp':
        return layer.get('hide_flags', false) ? t('lanOptions.jp') : '🇯🇵'
    }
  }

  return (
    <>
      {alertActive && <AlertBanner />}
      <nav
        className={`z-40 backdrop-blur-sm bg-neutral-50/30 dark:bg-normal-900/30 fixed top-0 w-full p-2 flex justify-between items-center border-b border-neutral-800
        ${scrollPosition <= 0.5 && alertActive ? 'mt-12' : ''}
      `}
      >
        <div className="flex items-center">
          <Link href="/" aria-label="home link">
            <Image src="/logo.webp" alt="" width={45} height={22} />
          </Link>
          <div className="hidden md:block from-blue-600 to-blue-900 dark:from-blue-400 dark:to-blue-800 text-xl bg-clip-text text-transparent bg-gradient-to-r pl-6">
            Blue Panda
          </div>
        </div>
        <div className="hidden font-semibold md:flex items-center gap-4 text-accent-800 dark:text-accent-500">
          {t('youAreInDemo')}
        </div>
        <div className="items-center gap-2 hidden md:flex">
          {isSettingsVisible && (
            <Dropdown options={AccountOptions} title={t('settings') ?? ''} />
          )}
          <Dropdown options={lanOptions} title={flag()} />
        </div>
        <div className="items-center gap-2 md:hidden">
          <Dropdown options={AccountOptions} icon={<FiMenu />} />
          <Dropdown options={lanOptions} title={flag()} />
        </div>
      </nav>
      <ToastContainer position="bottom-right" theme={theme as Theme} />
    </>
  )
}
