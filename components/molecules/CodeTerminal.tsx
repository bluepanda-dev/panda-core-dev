import { CSSProperties, useEffect, useRef } from 'react'
import hljs from 'highlight.js'
import 'highlight.js/styles/base16/3024.css'
import typescript from 'highlight.js/lib/languages/typescript'

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
      className="rounded-lg relative drop-shadow-sm dark:border dark:border-y-success-500 dark:border-x-primary-500"
    >
      <div className="absolute flex gap-2 left-2 top-2">
        <div className="w-3 h-3 rounded-full bg-red-600"></div>
        <div className="w-3 h-3 rounded-full bg-amber-300"></div>
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
      </div>
      <pre>
        <code className="bg-black text-[12px] md:text-[14px]" ref={codeSample}>
          {inner}
        </code>
      </pre>
    </div>
  )
}
