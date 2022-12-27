import { useTranslation } from 'next-i18next'
import { useState, useEffect } from 'react'

type WhyProps = {
  title: string
  face: React.ReactNode
  children: React.ReactNode
}

const Why = ({ children, face, title }: WhyProps) => {
  return (
    <div className="basis-1/3 max-w-sm">
      <div className="rounded-lg flex flex-col gap-4 items-center h-56">
        <div className="h-1/3">{face}</div>
        <div className="text-2xl">{title}</div>
        <div className="grow text-normal-400 text-md text-center">
          {children}
        </div>
      </div>
    </div>
  )
}

export default function WhyUs() {
  const { t } = useTranslation('common')

  const options = [
    {
      title: t('whyUs.0.title'),
      face: <img src="/logo.png" className="h-full sepia" />,
      content: t('whyUs.0.content'),
    },
    {
      title: t('whyUs.1.title'),
      face: <img src="/logo.png" className="h-full sepia" />,
      content: t('whyUs.1.content'),
    },
    {
      title: t('whyUs.2.title'),
      face: <img src="/logo.png" className="h-full sepia" />,
      content: t('whyUs.2.content'),
    },
  ]

  return (
    <>
      <div className="text-center text-6xl font-bold">{t('whyUsTitle')}</div>
      <div className="py-12 w-full flex justify-center">
        <div className="grid px-2 md:px-0 md:grid-cols-3 justify-center items-center gap-8 max-w-5xl">
          {options.map((option, index) => (
            <Why key={index} title={option.title} face={option.face}>
              {option.content}
            </Why>
          ))}
        </div>
      </div>
    </>
  )
}
