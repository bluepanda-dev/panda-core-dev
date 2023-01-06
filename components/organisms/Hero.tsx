import { useDataPages } from '@core/hooks/useDataPages'
import { useUser } from '@core/hooks/useUser'
import { useState, useEffect } from 'react'

export default function Hero() {
  const { hero } = useDataPages()

  const words = hero.list!
  const [active, setActive] = useState(0)

  useEffect(() => {
    console.log('executing effect')
    const interval = setInterval(() => {
      setActive((prev) => {
        const index = prev === words.length - 1 ? 0 : prev + 1
        return index
      })
    }, 3800)
    return () => clearInterval(interval)
  }, [words.length])

  return (
    <div className="text-7xl md:text-9xl font-extrabold text-center flex flex-col justify-center">
      {words.map((word, index) => (
        <div className="relative leading-tight md:leading-tight" key={index}>
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
      <div className="text-neutral-600 dark:text-neutral-400 flex justify-center text-xl md:text-2xl font-extralight mt-6 md:mt-16 px-8 ">
        <div className="md:max-w-lg">{hero.content}</div>
      </div>
    </div>
  )
}
