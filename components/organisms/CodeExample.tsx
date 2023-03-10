import Image from 'next/image'
import { useState } from 'react'
import CodeTerminal from '@components/molecules/CodeTerminal'
import { useCopyPages } from '@core/hooks/useCopyPages'

export default function CodeExample() {
  const { codeExample } = useCopyPages()
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
    <div className="relative">
      <div className="text-center text-6xl font-bold">{codeExample.title}</div>
      <div className="pt-24 w-full flex  justify-center">
        <div className="px-2 md:px-0 flex flex-col sm:flex-row justify-center gap-4 items-center w-full">
          <div>
            <input
              aria-label="range"
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
              width={290}
              height={148}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
