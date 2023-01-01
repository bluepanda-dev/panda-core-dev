import { useTranslation } from 'next-i18next'
import { useState, useEffect } from 'react'
import Image from 'next/image'

type WhyUs = {
  title: string
  content: string
  _image: string
}

const Why = ({ why }: { why: WhyUs }) => {
  return (
    <div className="basis-1/3 max-w-sm">
      <div className="rounded-lg flex flex-col gap-4 items-center h-56">
        <div className="h-1/3">
          <Image
            alt={why.title}
            src={why._image}
            width={100}
            height={100}
            className="sepia"
          />
        </div>
        <div className="text-2xl">{why.title}</div>
        <div className="grow text-normal-400 dark:text-normal-100 text-md text-center">
          {why.content}
        </div>
      </div>
    </div>
  )
}

export default function WhyUs() {
  const { t } = useTranslation('common')

  const options = t('whyUs.list', { returnObjects: true }) as WhyUs[]

  return (
    <div>
      <div className="text-center text-6xl font-bold">{t('whyUs.title')}</div>
      <div className="pt-24 w-full flex justify-center">
        <div className="grid px-2 md:px-0 md:grid-cols-3 justify-center items-center gap-8 max-w-5xl">
          {options.map((option, index) => (
            <Why key={index} why={option} />
          ))}
        </div>
      </div>
    </div>
  )
}
