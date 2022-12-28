import { useTranslation } from 'next-i18next'
import { useState, useEffect } from 'react'

type FeatureProps = {
  title: string
  face: React.ReactNode
  children: React.ReactNode
}

const Feature = ({ children, face, title }: FeatureProps) => {
  return (
    <div className="basis-1/3 max-w-sm rounded-lg bg-gradient-to-r  from-blue-900 via-blue-200 to-blue-800">
      <div className="bg-neutral-50 dark:bg-normal-900 rounded-lg m-0.5 dark:m-[1px] flex items-center h-56">
        <div className="basis-2/5">{face}</div>
        <div className="basis-3/5 flex flex-col gap-2 px-1 items-start self-start mt-4">
          <div className="text-lg">{title}</div>
          <div className="text-normal-400 text-sm">{children}</div>
        </div>
      </div>
    </div>
  )
}

export default function Features() {
  const { t } = useTranslation('common')

  const features = [
    {
      title: t('features.0.title'),
      face: <img src="/features/rainbow.webp" />,
      content: t('features.0.content'),
    },
    {
      title: t('features.1.title'),
      face: <img src="/features/brown.webp" />,
      content: t('features.1.content'),
    },
    {
      title: t('features.2.title'),
      face: <img src="/features/blue.webp" />,
      content: t('features.2.content'),
    },
    {
      title: t('features.3.title'),
      face: <img src="/features/green.webp" />,
      content: t('features.3.content'),
    },
    {
      title: t('features.4.title'),
      face: <img src="/features/magenta.webp" />,
      content: t('features.4.content'),
    },
    {
      title: t('features.5.title'),
      face: <img src="/features/cyan.webp" />,
      content: t('features.5.content'),
    },
  ]

  return (
    <>
      <div className="text-center text-6xl font-bold">{t('featuresTitle')}</div>
      <div className="py-12 w-full flex justify-center">
        <div className="grid px-2 md:px-0 sm:grid-cols-2 lg:grid-cols-3 justify-center items-center gap-8 max-w-5xl">
          {features.map((feature, index) => (
            <Feature key={index} title={feature.title} face={feature.face}>
              {feature.content}
            </Feature>
          ))}
        </div>
      </div>
    </>
  )
}
