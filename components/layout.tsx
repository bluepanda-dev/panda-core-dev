import React, { ReactNode } from 'react'
import NavBar from './organisms/NavBar'
import Footer from '@components/organisms/Footer'

interface Props {
  children?: ReactNode
}

export default function Layout({ children }: Props) {
  return (
    <>
      <NavBar />
      <div className="bg-neutral-50 dark:bg-normal-900 text-normal dark:text-neutral-50 flex flex-col min-h-screen">
        <main className="mt-14">{children}</main>
        <Footer />
      </div>
    </>
  )
}
