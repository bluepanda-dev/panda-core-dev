import React, { ReactNode } from 'react'
import Footer from '@components/organisms/Footer'
import NavBar from './organisms/NavBar'

interface Props {
  children?: ReactNode
  className?: string
}

export default function Layout({ children, className }: Props) {
  return (
    <>
      <NavBar />
      <div className="bg-neutral-50 dark:bg-normal-900 text-normal dark:text-neutral-50 flex flex-col min-h-screen justify-between">
        <main className={`mt-14 relative ${className}`}>{children}</main>
        <Footer />
      </div>
    </>
  )
}
