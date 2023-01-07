import Image from 'next/image'

export default function FareWell() {
  return (
    <div className="py-8 w-full">
      <div className="text-center text-6xl font-bold pb-16">
        <span className="text-red-500">Thank </span>{' '}
        <span className="text-yellow-500">you</span>{' '}
        <span className="text-blue-500">for</span>{' '}
        <span className="text-purple-500">support</span>{' '}
        <span className="text-cyan-500">us</span>
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
