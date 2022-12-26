import { useTranslation } from 'next-i18next'
import { useState, useEffect } from 'react'

export default function Hero() {
  const { t } = useTranslation('common')
  const words = [t('hero.first'), t('hero.second'), t('hero.third')]
  const [active, setActive] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => {
        const index = prev === words.length - 1 ? 0 : prev + 1
        return index
      })
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="text-6xl md:text-9xl py-12 font-extrabold text-center flex flex-col justify-center">
      {words.map((word, index) => (
        <div className="relative leading-snug md:leading-normal" key={index}>
          {index === active && (
            <span
              className={`absolute animate-[appearing_4s_ease-in-out_infinite] bg-clip-text text-transparent bg-gradient-to-r 
              ${
                index === 0
                  ? 'from-primary-600 to-violet-600'
                  : index === 1
                  ? 'from-green-600 to-blue-500'
                  : 'from-accent-500 to-red-500'
              }
            `}
            >
              {word}
            </span>
          )}
          <span className="">{word}</span>
        </div>
      ))}
    </div>
  )
}
