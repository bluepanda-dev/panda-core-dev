import BPButton from '@components/atoms/BPButton'
import BPDropdown, {
  BPDropdownItem,
  BPDropdownSeparator,
} from '@components/atoms/BPDropdown'
import BPText from '@components/atoms/BPText'
import { NAME, TITLE } from '@core/helpers/branding'
import { useTheme } from '@core/hooks/useTheme'
import { isAlertBannerActive } from '@core/store/Common'
import { useAtom } from 'jotai'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import React, { useEffect, useState } from 'react'
import { FiExternalLink, FiSun } from 'react-icons/fi'
import { Theme, ToastContainer } from 'react-toastify'

export default function BPNavBar() {
  const router = useRouter()
  const { t } = useTranslation()
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
      label: `🇺🇸 ${t('lanOptions.en')}`,
      onClick: () => {
        router.push('/', '', { locale: 'en' })
      },
    },
    {
      label: `🇪🇸 ${t('lanOptions.es')}`,
      onClick: () => {
        router.push('/', '', { locale: 'es' })
      },
    },
    {
      label: `🇩🇪 ${t('lanOptions.de')}`,
      onClick: () => {
        router.push('/', '', { locale: 'de' })
      },
    },
    {
      label: `🇯🇵 ${t('lanOptions.jp')}`,
      onClick: () => {
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

  return (
    <>
      <nav
        className={`z-10 backdrop-blur-sm bg-neutral-50/30 dark:bg-normal-900/30 fixed top-0 w-full p-2 flex justify-between items-center border-b border-neutral-800
        ${scrollPosition <= 0.5 && alertActive ? 'mt-12' : ''}
      `}
      >
        <div className="flex items-center">
          <Link href="/" title="Home" aria-label="home link">
            <Image
              src="https://plus.blue-panda.dev/logo.webp"
              alt={TITLE}
              title={TITLE}
              width={45}
              height={22}
            />
          </Link>
          <BPText magic className="hidden md:block pl-6" size="lg">
            {NAME}
          </BPText>
        </div>
        <div className="z-20 items-center gap-2 flex">
          <a
            target="_blank"
            title="Documentation"
            href="https://docu.blue-panda.dev/"
            rel="noreferrer"
          >
            <BPButton outline>Documentation</BPButton>
          </a>
          <a
            target="_blank"
            title="UI Kit"
            href="https://ui-kit.blue-panda.dev/"
            rel="noreferrer"
          >
            <BPButton icon={<FiExternalLink />} variant="secondary" outline>
              UI Kit
            </BPButton>
          </a>
          <BPDropdown variant="primary" outline>
            {AccountOptions.map((option, index) => (
              <BPDropdownItem key={index} onSelect={option.onClick}>
                {option.label}
              </BPDropdownItem>
            ))}
            <BPDropdownSeparator />

            {lanOptions.map((option, index) => (
              <BPDropdownItem key={index} onSelect={option.onClick}>
                {option.label}
              </BPDropdownItem>
            ))}
          </BPDropdown>
        </div>
      </nav>
      <ToastContainer position="bottom-right" theme={theme as Theme} />
    </>
  )
}
