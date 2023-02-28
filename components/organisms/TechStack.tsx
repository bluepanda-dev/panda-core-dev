import Image from 'next/image'
import { useCopyPages } from '@core/hooks/useCopyPages'

export default function TechStack() {
  const { techStack } = useCopyPages()

  const logos = [
    {
      image: '/tech/react.webp',
    },
    {
      image: '/tech/next-js.webp',
    },
    {
      image: '/tech/blockchain.webp',
    },
    {
      image: '/tech/stripe.webp',
    },
    {
      image: '/tech/firebase.webp',
    },
    {
      image: '/tech/pwa.webp',
    },
    {
      image: '/tech/headlessui.webp',
    },
    {
      image: '/tech/tailwindcss.webp',
    },
  ]

  return (
    <div className="w-full flex flex-col justify-center">
      <div className="text-center text-6xl font-bold">{techStack.title}</div>
      <div className="pt-24  w-full flex  justify-center">
        <div className="relative flex overflow-x-hidden items-center">
          <div className="absolute top-0 z-10 w-32 h-full bg-gradient-to-r from-neutral-50 dark:from-normal-900"></div>
          <div className="absolute top-0 right-0 z-10 w-32 h-full bg-gradient-to-l from-neutral-50 dark:from-normal-900"></div>
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
