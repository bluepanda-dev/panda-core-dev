import { useEffect, useRef } from 'react'
import { useDataPages } from '@core/hooks/useDataPages'

export default function ShowVideo() {
  const videoRef = useRef() as React.MutableRefObject<HTMLVideoElement>
  const { showVideo } = useDataPages()

  function handleScroll() {
    videoRef.current.playbackRate = 2
    videoRef.current.play()
    window.removeEventListener('scroll', handleScroll)
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div className="relative">
      <div className="pt-24 w-full flex  justify-center">
        <div className="px-8 md:px-0 flex flex-col sm:flex-row justify-center gap-4 items-center w-full max-w-5xl">
          <div className="basis-1/2 shadow-lg rounded-sm order-2 md:order-1">
            <video ref={videoRef} autoPlay loop muted={true}>
              <source src="/videos/EasyColors.mp4" />
            </video>
          </div>
          <div className="text-center text-6xl font-bold pb-24 md:pb-0 order-1 md:order-2">
            {showVideo.title}
          </div>
        </div>
      </div>
    </div>
  )
}
