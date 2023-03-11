'use client'
import React, { useEffect, useState } from 'react'
import { FaArrowCircleUp } from 'react-icons/fa'
import Button from '@components/atoms/Button'

const ScrollButton = () => {
  const [visible, setVisible] = useState(false)

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop
    if (scrolled > 300) {
      setVisible(true)
    } else if (scrolled <= 300) {
      setVisible(false)
    }
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  useEffect(() => {
    window.addEventListener('scroll', toggleVisible)
    return () => window.removeEventListener('scroll', toggleVisible)
  }, [])

  return (
    <div className="fixed z-10 bottom-24 right-4 ">
      <Button
        className="border-none hover:!bg-transparent"
        icon={
          <FaArrowCircleUp
            onClick={scrollToTop}
            style={{ display: visible ? 'inline' : 'none' }}
            className="text-4xl"
          />
        }
        name={'backToTop'}
      ></Button>
    </div>
  )
}

export default ScrollButton
