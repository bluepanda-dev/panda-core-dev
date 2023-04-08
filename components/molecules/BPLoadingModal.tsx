import { Dialog, Transition } from '@headlessui/react'
import Image from 'next/image'
import { Fragment } from 'react'

type DialogProps = {
  loading: boolean
}

export default function BPLoadingModal({ loading }: DialogProps) {
  return (
    <>
      <Transition appear show={loading} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => {}}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100 bg-normal-400/50 dark:bg-normal-900/50"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-80" />
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
                <Dialog.Panel className="w-full flex justify-center flex-col items-center gap-8 max-w-md transform overflow-hidden p-6 align-middle transition-all">
                  <Image
                    src="https://plus.blue-panda.dev/logo.webp"
                    alt=""
                    width={65}
                    height={22}
                    className="grayscale"
                  />
                  <div className="lds-grid">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
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
