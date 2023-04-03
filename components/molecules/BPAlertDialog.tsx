import * as AlertDialog from '@radix-ui/react-alert-dialog'
import classNames from 'classnames'

import React, { useEffect } from 'react'
import { FiLoader } from 'react-icons/fi'
import { getMagicPalette, getPalette } from '@core/helpers/palette'
import {
  DEFAULT_SIZE,
  PADDINGS,
  PADDINGS_X,
  ROUNDED,
  SIZE,
  UI_DEFAULT_TYPE,
  UI_TYPE,
} from '@core/types/ui-kit'

type BPAlertDialogProps = {
  title: React.ReactNode
  children?: React.ReactNode
  actions?: React.ReactNode
  size?: SIZE
  type?: UI_TYPE
  open?: boolean
  outline?: boolean
  magic?: boolean
  [x: string]: any
}

const BPAlertDialog = ({
  children,
  actions,
  title,
  size = DEFAULT_SIZE,
  type = UI_DEFAULT_TYPE,
  open = false,
  outline = false,
  magic = false,
  ...props
}: BPAlertDialogProps) => {
  const [isOpen, setOpen] = React.useState(false)
  const superSet = outline ? 'outline' : 'normal'
  const palette = getPalette(superSet, type)
  const magicPalette = getMagicPalette()

  const elementClass = classNames({
    [`text-${size === 'md' ? 'base' : size}`]: true,
    [`${palette.focus}`]: true,
    [`${palette.border}`]: !magic,
    [`${palette.color}`]: true,
    [`${palette.bg}`]: true,
    [`${magicPalette}`]: magic,
    AlertDialogContent: true,
    [props.className]: props.className,
  })

  const wrapperClass = classNames({
    [`bg-black p-8`]: magic,
    'flex flex-col gap-8 p-1 rounded-lg justify-around': true,
  })

  const Element = () => (
    <AlertDialog.Root open={isOpen} onOpenChange={setOpen}>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="AlertDialogOverlay" />
        <AlertDialog.Content className={elementClass}>
          <div className={wrapperClass}>
            <AlertDialog.Title className="AlertDialogTitle font-bold">
              {title}
            </AlertDialog.Title>
            <AlertDialog.Description className="AlertDialogDescription">
              {children}
            </AlertDialog.Description>
            <div className="flex gap-4 justify-end">{actions}</div>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  )

  useEffect(() => {
    setOpen(open)
  }, [open])

  return <Element />
}

export default BPAlertDialog
