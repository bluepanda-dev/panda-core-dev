import classNames from 'classnames'
import React from 'react'
import { getPalette, getMagicText } from '@core/helpers/palette'
import { DEFAULT_SIZE, SIZE, UI_VARIANT } from '@core/types/ui-kit'

type BPLinkProps = {
  children?: React.ReactNode
  size?: SIZE
  underline?: boolean
  magic?: boolean
  variant?: UI_VARIANT
  [x: string]: any
}

const BPLink = ({
  children,
  size = DEFAULT_SIZE,
  underline = false,
  variant = 'default',
  magic = false,
  ...props
}: BPLinkProps) => {
  const palette = getPalette('outline', variant)

  const elementClass = classNames({
    [`text-${size === 'md' ? 'base' : size}`]: true,
    underline: underline,
    'cursor-pointer': true,
    [`hover:text-normal-500 hover:dark:text-normal-500`]:
      variant === 'inverted' && !magic,
    [`hover:text-${palette.baseColor}-400`]:
      variant !== 'default' && variant !== 'inverted' && !magic,
    'text-primary-600 hover:text-primary-500': variant === 'default' && !magic,
    [`${palette.color}`]: variant !== 'default' && !magic,
    [props.className]: props.className,
  })

  const magicText = getMagicText()
  const titleClass = classNames({
    [magicText]: magic,
    [`decoration-red-400 hover:opacity-80`]: magic,
  })

  return (
    <span {...props} className={classNames(elementClass, titleClass)}>
      {children}
    </span>
  )
}

export default BPLink
