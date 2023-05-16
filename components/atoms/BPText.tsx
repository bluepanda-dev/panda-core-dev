import classNames from 'classnames'
import React from 'react'
import { getMagicText, getPalette } from '@core/helpers/palette'
import {
  DEFAULT_SIZE,
  SIZE,
  UI_DEFAULT_VARIANT,
  UI_VARIANT,
} from '@core/types/ui-kit'

type BPTextProps = {
  children?: React.ReactNode
  size?: SIZE
  variant?: UI_VARIANT
  magic?: boolean
  [x: string]: any
}

const BPText = ({
  children,
  size = DEFAULT_SIZE,
  variant = UI_DEFAULT_VARIANT,
  magic = false,
  ...props
}: BPTextProps) => {
  const palette = getPalette('outline', variant)
  const magicText = getMagicText()

  const elementClass = classNames({
    [`text-${size === 'md' ? 'base' : size}`]: true,
    [`${palette.color}`]: !magic,
    [`${palette.link}`]: !magic,
    [magicText]: magic,
    [props.className]: props.className,
  })

  return React.createElement(
    'span',
    {
      ...props,
      className: elementClass,
    },
    children,
  )
}

export default BPText
