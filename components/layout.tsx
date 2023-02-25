import React, { ReactNode } from 'react'
import Footer from '@components/organisms/Footer'
import NavBar from './organisms/NavBar'

interface Props {
  children?: ReactNode
}

export default function Layout({ children }: Props) {
  return (
    <>
      <NavBar />
      <div className="bg-neutral-50 dark:bg-normal-900 text-normal dark:text-neutral-50 flex flex-col min-h-screen">
        <main className="mt-14 flex-grow">{children}</main>
        <Footer />
      </div>
    </>
  )
}
