import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'

type DialogProps = {
  title: string
  isOpen: boolean
  children: React.ReactNode
  closeModal: () => void
  closeText?: string
  className?: string
}

export default function Modal({
  title,
  className,
  isOpen,
  children,
  closeText = 'Close',
  closeModal = () => {},
}: DialogProps) {
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-md border-neutral-800 border-2 bg-neutral-50 dark:bg-normal-900 p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6"
                  >
                    {title}
                  </Dialog.Title>
                  <div>{children}</div>
                  <div className="mt-4 flex justify-end">
                    <button
                      type="button"
                      className="text-neutral-50 bg-primary-700 inline-flex rounded-md border border-transparent px-4 py-2 text-sm font-medium hover:bg-primary-500 "
                      onClick={closeModal}
                    >
                      {closeText}
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
