import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import Button from '@components/atoms/Button'

type DialogProps = {
  title: string
  isOpen: boolean
  children: React.ReactNode
  closeModal?: () => void
  closeText?: string
  hasCloseButton?: boolean
}

export default function Modal({
  title,
  isOpen,
  children,
  closeText = 'Close',
  closeModal = () => {},
  hasCloseButton = true,
}: DialogProps) {
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100 bg-normal-400/50 dark:bg-normal-900/50"
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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden border-neutral-400 border-2 bg-neutral-50 dark:bg-normal-900 p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6"
                  >
                    {title}
                  </Dialog.Title>
                  <div>{children}</div>
                  <div className="mt-4 flex justify-end">
                    {hasCloseButton && (
                      <Button
                        className="w-auto"
                        isSpecial={true}
                        onClick={closeModal}
                      >
                        {closeText}
                      </Button>
                    )}
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
