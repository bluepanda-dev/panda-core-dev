import React, { ReactNode } from 'react'
import BPFooter from '@components/organisms/BPFooter'
import BPNavBar from './organisms/BPNavBar'

interface Props {
  children?: ReactNode
  className?: string
}

export default function Layout({ children }: Props) {
  return (
    <>
      <BPNavBar />
      <div className="text-normal flex flex-col min-h-screen justify-between relative">
        {children}
        <BPFooter />
      </div>
    </>
  )
}
