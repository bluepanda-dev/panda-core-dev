import { Fragment, useEffect } from 'react'
import { Transition } from '@headlessui/react'

type SidePanelProps = {
  title: string
  isOpen: boolean
  children: React.ReactNode
  closeModal: () => void
  closeText?: string
  className?: string
  side?: 'left' | 'right'
}

export default function SidePanel({
  title,
  className,
  isOpen,
  children,
  closeText = 'Close',
  side = 'left',
  closeModal = () => {},
}: SidePanelProps) {
  useEffect(() => {
    if (document.body.parentNode) {
      if (isOpen) {
        ;(document.body.parentNode as HTMLElement).style.overflow = 'hidden'
      } else {
        ;(document.body.parentNode as HTMLElement).style.overflow = 'unset'
      }
    }
  }, [isOpen])

  return (
    <>
      <Transition
        show={isOpen}
        as={Fragment}
        enter="transition-opacity duration-75"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div>
          <div
            className={`fixed z-10 bg-normal-400 dark:bg-normal-900 opacity-70 w-screen h-screen top-0 left-0`}
            onClick={closeModal}
          ></div>
          <div
            className={`fixed flex flex-col z-50 overflow-hidden bg-neutral-50 dark:bg-normal-900 h-screen border-neutral-800 w-screen md:w-2/5 top-0 p-2 ${
              side === 'right' ? 'right-0 border-l-2' : 'left-0 border-r-2'
            } ${className}`}
          >
            <h1 className="text-2xl">{title}</h1>
            <main className="mb-16 h-full">{children}</main>
          </div>
          <div
            className={`flex fixed z-50 p-4 bottom-0 justify-end w-screen md:w-2/5
             ${side === 'right' ? 'right-0' : 'left-0'}
          `}
          >
            <button
              type="button"
              className="text-neutral-50 bg-primary-700 inline-flex rounded-md border border-transparent px-4 py-2 text-sm font-medium hover:bg-primary-500 "
              onClick={closeModal}
            >
              {closeText}
            </button>
          </div>
        </div>
      </Transition>
    </>
  )
}
