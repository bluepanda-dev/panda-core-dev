import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import classNames from 'classnames'
import React from 'react'
import { FiCheck, FiLoader, FiMenu } from 'react-icons/fi'
import {
  getMagicPalette,
  getMagicText,
  getPalette,
} from '@core/helpers/palette'
import {
  DEFAULT_SIZE,
  PADDINGS,
  PADDINGS_X,
  ROUNDED,
  SIZE,
  UI_DEFAULT_TYPE,
  UI_TYPE,
} from '@core/types/ui-kit'

type BPDropdownProps = {
  children?: React.ReactNode
  trigger?: React.ReactNode
  size?: SIZE
  type?: UI_TYPE
  outline?: boolean
  magic?: boolean
  [x: string]: any
}

export const BPDropdownItem = ({
  children,
  magic,
  palette,
  size,
  ...props
}: any) => {
  const itemClass = classNames({
    [`text-${size === 'md' ? 'base' : size}`]: true,
    [`p-${PADDINGS[size as SIZE]}`]: true,
    [`${palette.color}`]: !magic,
    [`${palette.bg}`]: true,
    [`${palette.hover}`]: true,
    [`${palette.focus}`]: true,
    'DropdownMenuItem flex gap-2 justify-between': true,
    DropdownMenuContent: true,
  })

  const magicText = getMagicText()
  const titleClass = classNames({
    [magicText]: magic,
  })
  return (
    <DropdownMenu.Item className={classNames(itemClass, titleClass)} {...props}>
      {children}
    </DropdownMenu.Item>
  )
}

export const BPDropdownSeparator = ({ palette, outline, ...props }: any) => {
  const itemClass = classNames({
    [`${palette.border}`]: true,
    [`border-normal-800 my-2`]: !outline,
  })

  return <DropdownMenu.Separator className={itemClass} {...props} />
}

const BPDropdown = ({
  children,
  trigger,
  size = DEFAULT_SIZE,
  type = UI_DEFAULT_TYPE,
  outline = false,
  magic = false,
  ...props
}: BPDropdownProps) => {
  const superSet = outline ? 'outline' : 'normal'
  const palette = getPalette(superSet, type)
  const magicPalette = getMagicPalette()

  const buttonClass = classNames({
    [`text-${size === 'md' ? 'base' : size}`]: true,
    [`p-${PADDINGS[size]}`]: true,
    [`${palette.focus}`]: true,
    [`${palette.border}`]: !magic,
    [`${palette.link}`]: true,
    [`${palette.color}`]: true,
    [`${palette.bg}`]: true,
    [`${palette.hover}`]: !magic,
    'transition ease-in-out': true,
    'whitespace-nowrap flex items-center gap-2 rounded-full': true,
    [props.className]: props.className,
  })

  const contentClass = classNames({
    'rounded-md': true,
    [`p-${PADDINGS[size]}`]: true,
    [`${palette.color}`]: true,
    [`${palette.bg}`]: true,
    [`${palette.border}`]: outline,
    DropdownMenuContent: true,
  })

  const wrapperClass = classNames({
    [`rounded-full w-fit ${magicPalette}`]: true,
    [props.className]: props.className,
  })

  const Trigger = () => (
    <DropdownMenu.Trigger asChild>
      <button className={buttonClass}>{trigger ? trigger : <FiMenu />}</button>
    </DropdownMenu.Trigger>
  )

  const Element = () => (
    <DropdownMenu.Root>
      <Trigger />

      <DropdownMenu.Portal>
        <DropdownMenu.Content className={contentClass} sideOffset={5}>
          {React.Children.map(children, (child) => {
            return React.cloneElement(child as React.ReactElement<any>, {
              palette,
              size,
              magic,
              outline,
            })
          })}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )

  return (
    <>
      {magic ? (
        <div className={wrapperClass}>
          <Element />
        </div>
      ) : (
        <Element />
      )}
    </>
  )
}

export default BPDropdown
