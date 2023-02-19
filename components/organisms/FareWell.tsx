import Image from 'next/image'
import { useTranslation } from 'react-i18next'

export default function FareWell() {
  const { i18n } = useTranslation()

  const supportUsText = () => {
    switch (i18n.language) {
      case 'es':
        return (
          <div>
            <span className="text-red-500">Gracias </span>{' '}
            <span className="text-yellow-500">por</span>{' '}
            <span className="text-blue-500">apoyarnos</span>{' '}
          </div>
        )
      default:
        return (
          <div>
            <span className="text-red-500">Thank </span>{' '}
            <span className="text-yellow-500">you</span>{' '}
            <span className="text-blue-500">for</span>{' '}
            <span className="text-purple-500">support</span>{' '}
            <span className="text-cyan-500">us</span>
          </div>
        )
    }
  }

  return (
    <div className="py-8 w-full">
      <div className="text-center text-6xl font-bold pb-16">
        {supportUsText()}
      </div>
      <div className="pt-12 w-full flex  justify-center">
        <Image
          src={`/pandas/group.webp`}
          alt="tech stack"
          className="px-2 mt-16"
          width={880}
          height={48}
        />
      </div>
    </div>
  )
}
