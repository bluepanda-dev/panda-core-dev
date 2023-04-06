import classNames from 'classnames'
import React from 'react'
import { getMagicText, getPalette } from '@core/helpers/palette'
import {
  DEFAULT_SIZE,
  H_ELEMENT,
  H_ELEMENT_SIZE,
  ROUNDED,
  SIZE,
  UI_DEFAULT_TYPE,
  UI_TYPE,
} from '@core/types/ui-kit'

type BPHeadingProps = {
  children?: React.ReactNode
  size?: SIZE
  type?: UI_TYPE
  magic?: boolean
  [x: string]: any
}

const BPHeading = ({
  children,
  size = DEFAULT_SIZE,
  type = UI_DEFAULT_TYPE,
  magic = false,
  ...props
}: BPHeadingProps) => {
  const palette = getPalette('outline', type)

  const elementClass = classNames({
    [H_ELEMENT_SIZE[size]]: true,
    [`${ROUNDED[size]}`]: true,
    [`${palette.focus}`]: true,
    [`${palette.link}`]: true,
    [`${palette.color}`]: !magic,
    [props.className]: props.className,
  })

  const magicText = getMagicText()
  const titleClass = classNames({
    [magicText]: magic,
  })

  const Element = () =>
    React.createElement(
      H_ELEMENT[size],
      { className: classNames(elementClass, titleClass), ...props },
      children,
    )

  return (
    <>
      <Element />
    </>
  )
}

export default BPHeading
