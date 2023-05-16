import classNames from 'classnames'
import React from 'react'
import { getPalette } from '@core/helpers/palette'
import {
  DEFAULT_SIZE,
  PADDINGS,
  ROUNDED,
  SIZE,
  UI_DEFAULT_VARIANT,
  UI_VARIANT,
} from '@core/types/ui-kit'

type BPIconProps = {
  children?: React.ReactNode
  size?: SIZE
  variant?: UI_VARIANT
  hoverable?: boolean
  outline?: boolean
  disabled?: boolean
  borderless?: boolean
  [x: string]: any
}

const BPIcon = ({
  children,
  size = DEFAULT_SIZE,
  variant = UI_DEFAULT_VARIANT,
  disabled = false,
  hoverable = false,
  outline = false,
  borderless = false,
  ...props
}: BPIconProps) => {
  const superSet = outline ? 'outline' : 'normal'
  const palette = getPalette(superSet, variant)

  const elementClass = classNames({
    [`text-${size === 'md' ? 'base' : size}`]: true,
    [`p-${PADDINGS[size]}`]: true,
    [`${ROUNDED[size]}`]: true,
    [`${palette.focus}`]: true,
    [`${palette.color}`]: true,
    [`${palette.bg}`]: true,
    [`${palette.border}`]: outline && !borderless,
    [`${palette.hover}`]: !disabled && hoverable,
    'select-none cursor-not-allowed	': disabled,
    'opacity-70': disabled,
    'w-fit': true,
    block: true,
    [props.className]: props.className,
  })

  return (
    <span {...props} className={elementClass}>
      {children}
    </span>
  )
}

export default BPIcon
