import { useState, useEffect } from 'react'
import { BreakPoint, breakpoints } from '@core/utils/breakpoints'

const useBreakpoint = () => {
  const [breakpoint, setBreakPoint] = useState<BreakPoint | undefined>(
    undefined,
  )
  const [windowSize, setWindowSize] = useState<{
    width: number
    height: number
  }>({
    width: 0,
    height: 0,
  })

  const handleResize = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    })
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    handleResize()

    if (windowSize.width) {
      const bp = Object.keys(breakpoints)
        .map((b) => Number(b))
        .concat()
        .reverse()
        .find((b: number) => b < windowSize.width)
      setBreakPoint(breakpoints[bp!])
    }

    return () => window.removeEventListener('resize', handleResize)
  }, [windowSize.width])

  return { breakpoint, windowSize }
}

export default useBreakpoint
