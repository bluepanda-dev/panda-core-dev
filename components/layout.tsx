import React, { ReactNode } from 'react'
import BPFooter from '@components/organisms/BPFooter'
import NavBar from './organisms/NavBar'

interface Props {
  children?: ReactNode
  className?: string
}

export default function Layout({ children, className }: Props) {
  return (
    <>
      <NavBar />
      <div className="text-normal flex flex-col min-h-screen justify-between">
        <main className={`min-h-[100vh] mt-14 relative ${className}`}>
          {children}
        </main>
        <BPFooter />
      </div>
    </>
  )
}
