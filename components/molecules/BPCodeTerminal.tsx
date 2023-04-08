import hljs from 'highlight.js'
import typescript from 'highlight.js/lib/languages/typescript'
import { useEffect, useRef } from 'react'
import 'highlight.js/styles/base16/dracula.css'

// TODO here you can register the programming language
hljs.registerLanguage('typescript', typescript)

type CodeProps = {
  children: React.ReactNode
  [x: string]: any
}

export default function BPCodeTerminal({ children, ...props }: CodeProps) {
  const codeSample = useRef<HTMLElement>(null)

  useEffect(() => {
    if (codeSample.current) {
      hljs.highlightElement(codeSample.current)
    }
  }, [children])

  return (
    <div className="rounded-lg relative drop-shadow-sm" {...props}>
      <div className="absolute flex gap-2 left-2 top-2">
        <div className="w-3 h-3 rounded-full bg-red-600"></div>
        <div className="w-3 h-3 rounded-full bg-amber-300"></div>
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
      </div>
      <pre className="h-full">
        <code className="text-[12px] md:text-[14px] h-full" ref={codeSample}>
          {children}
        </code>
      </pre>
    </div>
  )
}
