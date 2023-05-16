import { Transition } from '@headlessui/react'
import classNames from 'classnames'
import { Fragment, useEffect } from 'react'
import BPButton from '@components/atoms/BPButton'
import BPHeading from '@components/atoms/BPHeading'
import { getPalette } from '@core/helpers/palette'
import { UI_DEFAULT_VARIANT, UI_VARIANT } from '@core/types/ui-kit'

type SidePanelProps = {
  title: string
  isOpen: boolean
  children: React.ReactNode
  closeModal: () => void
  closeText?: string
  side?: 'left' | 'right'
  variant?: UI_VARIANT
  outline?: boolean
  magic?: boolean
  [x: string]: any
}

export default function BPSidePanel({
  title,
  isOpen,
  children,
  closeText = 'Close',
  side = 'left',
  closeModal = () => {},
  variant = UI_DEFAULT_VARIANT,
  outline = false,
  magic = false,
  ...props
}: SidePanelProps) {
  const superSet = outline ? 'outline' : 'normal'
  const palette = getPalette(superSet, variant)

  const elementClass = classNames({
    [`${palette.border}`]: true,
    [`${palette.bg}`]: true,
    [`gap-8 fixed flex flex-col z-50 overflow-hidden h-screen w-screen md:w-2/5 top-0 p-2 ${
      side === 'right' ? 'right-0 border-l-2' : 'left-0 border-r-2'
    }`]: true,
    [props.className]: props.className,
  })

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
    <div>
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
            {...props}
          ></div>
          <div className={elementClass}>
            <BPHeading magic={magic}>{title}</BPHeading>
            <main className="mb-16 h-full">{children}</main>
          </div>
          <div
            className={`flex fixed z-50 p-4 bottom-0 justify-end w-screen md:w-2/5
             ${side === 'right' ? 'right-0' : 'left-0'}
          `}
          >
            <BPButton
              magic={magic}
              outline={outline}
              variant={variant}
              nativeType="button"
              onClick={closeModal}
            >
              {closeText}
            </BPButton>
          </div>
        </div>
      </Transition>
    </div>
  )
}
