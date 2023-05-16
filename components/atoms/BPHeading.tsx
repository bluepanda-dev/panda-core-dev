import classNames from 'classnames'
import React from 'react'
import { getMagicText, getPalette } from '@core/helpers/palette'
import {
  DEFAULT_SIZE,
  H_ELEMENT,
  H_ELEMENT_SIZE,
  SIZE,
  UI_DEFAULT_VARIANT,
  UI_VARIANT,
} from '@core/types/ui-kit'

type BPHeadingProps = {
  children?: React.ReactNode
  size?: SIZE
  variant?: UI_VARIANT
  magic?: boolean
  hoverable?: boolean
  [x: string]: any
}

const BPHeading = ({
  children,
  size = DEFAULT_SIZE,
  variant = UI_DEFAULT_VARIANT,
  magic = false,
  hoverable = false,
  ...props
}: BPHeadingProps) => {
  const palette = getPalette('outline', variant)

  const elementClass = classNames({
    [H_ELEMENT_SIZE[size]]: true,
    [`${palette.focus}`]: true,
    [`${palette.link}`]: true,
    [`${palette.color}`]: !magic,
    [`hover:opacity-70 cursor-pointer`]: hoverable,
    [props.className]: props.className,
  })

  const magicText = getMagicText()
  const titleClass = classNames({
    [magicText]: magic,
  })

  return React.createElement(
    H_ELEMENT[size],
    {
      ...props,
      className: classNames(elementClass, titleClass),
    },
    children,
  )
}

export default BPHeading
