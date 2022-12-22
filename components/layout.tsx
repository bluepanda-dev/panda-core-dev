import React, { ReactNode } from 'react'
import NavBar from './organisms/NavBar'

interface Props {
  children?: ReactNode
}

export default function Layout({ children }: Props) {
  return (
    <div className="bg-neutral-50 dark:bg-normal text-normal dark:text-neutral-50">
      <NavBar />
      <main className="mt-14">{children}</main>
    </div>
  )
}
