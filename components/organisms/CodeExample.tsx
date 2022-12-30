import CodeTerminal from '@components/molecules/CodeTerminal'
import Image from 'next/image'
import { useTranslation } from 'next-i18next'
import { useState } from 'react'

export default function KeepMeInformed() {
  const { t } = useTranslation('common')
  const [blur, setBlur] = useState(0)

  const inner = `
export default function BlurExample() {
  const [blur, setBlur] = useState(0)

  return ( 
    <Image
        src="/pandas/blue-panda-key.webp"
        alt="blue panda"
        style={{ filter: 'blur(${blur}px)' }}
        width={190}
        height={48}
      />

  )
}
`
  return (
    <div className="md:py-16 relative">
      <div className="text-center text-6xl font-bold">
        {t('codeExample.title')}
      </div>
      <div className="py-12 w-full flex  justify-center">
        <div className="px-2 md:px-0 flex flex-col sm:flex-row justify-center gap-4 items-center w-full">
          <div>
            <input
              type="range"
              min="0"
              max="50"
              value={blur}
              onChange={(e) => setBlur(Number(e.target.value))}
            />
            <CodeTerminal inner={inner} />
          </div>
          <div>
            <Image
              src={'/pandas/blue-panda-key.webp'}
              alt="blue panda"
              className={`w-80`}
              style={{ filter: `blur(${blur}px)` }}
              width={190}
              height={48}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
