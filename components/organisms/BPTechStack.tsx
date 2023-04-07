import Image from 'next/image'
import { useCopyPages } from '@core/hooks/useCopyPages'

export default function BPTechStack() {
  const { techStack } = useCopyPages()

  const logos = [
    {
      image: 'https://plus.blue-panda.dev/tech/react.webp',
    },
    {
      image: 'https://plus.blue-panda.dev/tech/next-js.webp',
    },
    {
      image: 'https://plus.blue-panda.dev/tech/blockchain.webp',
    },
    {
      image: 'https://plus.blue-panda.dev/tech/stripe.webp',
    },
    {
      image: 'https://plus.blue-panda.dev/tech/firebase.webp',
    },
    {
      image: 'https://plus.blue-panda.dev/tech/pwa.webp',
    },
    {
      image: 'https://plus.blue-panda.dev/tech/headlessui.webp',
    },
    {
      image: 'https://plus.blue-panda.dev/tech/tailwindcss.webp',
    },
  ]

  return (
    <div className="w-full flex flex-col justify-center">
      <div className="text-center text-6xl font-bold">{techStack.title}</div>
      <div className="pt-24  w-full flex  justify-center">
        <div className="relative flex overflow-x-hidden items-center">
          <div className="absolute top-0 z-10 w-32 h-full bg-gradient-to-r from-white dark:from-black"></div>
          <div className="absolute top-0 right-0 z-10 w-32 h-full bg-gradient-to-l from-white dark:from-black"></div>
          <div className="py-12 animate-marquee whitespace-nowrap flex">
            {logos.map((logo, index) => (
              <span key={index} className="self-center">
                <Image
                  src={logo.image}
                  alt="tech stack"
                  className="px-2 w-20 md:w-24"
                  width={90}
                  height={48}
                />
              </span>
            ))}
          </div>
          <div className="absolute top-0 py-12 animate-marquee2 whitespace-nowrap flex">
            {logos.map((logo, index) => (
              <span key={index} className="self-center">
                <Image
                  src={logo.image}
                  alt="tech stack"
                  className="px-2 w-20 md:w-24"
                  width={90}
                  height={48}
                />
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
