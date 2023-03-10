import hljs from 'highlight.js'
import typescript from 'highlight.js/lib/languages/typescript'
import { CSSProperties, useEffect, useRef } from 'react'
import 'highlight.js/styles/base16/ashes.css'

// TODO here you can register the programming language
hljs.registerLanguage('typescript', typescript)

type CodeProps = {
  inner: string
  css?: CSSProperties
}

export default function Code({ inner, css }: CodeProps) {
  const codeSample = useRef<HTMLElement>(null)

  useEffect(() => {
    if (codeSample.current) {
      hljs.highlightBlock(codeSample.current)
    }
  }, [inner])

  return (
    <div
      style={css}
      className="rounded-lg relative drop-shadow-sm dark:border dark:border-y-neutral-900 dark:border-x-neutral-600"
    >
      <div className="absolute flex gap-2 left-2 top-2">
        <div className="w-3 h-3 rounded-full bg-red-600"></div>
        <div className="w-3 h-3 rounded-full bg-amber-300"></div>
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
      </div>
      <pre>
        <code className="text-[12px] md:text-[14px]" ref={codeSample}>
          {inner}
        </code>
      </pre>
    </div>
  )
}
