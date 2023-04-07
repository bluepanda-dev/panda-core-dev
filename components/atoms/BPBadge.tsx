import classNames from 'classnames'
import React from 'react'
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

type BPBadgeProps = {
  children?: React.ReactNode
  size?: SIZE
  type?: UI_TYPE
  outline?: boolean
  magic?: boolean
  hoverable?: boolean
  [x: string]: any
}

const BPBadge = ({
  children,
  size = DEFAULT_SIZE,
  type = UI_DEFAULT_TYPE,
  outline = false,
  magic = false,
  hoverable = false,
  url = undefined,
  ...props
}: BPBadgeProps) => {
  const superSet = outline ? 'outline' : 'normal'
  const palette = getPalette(superSet, type)
  const magicPalette = getMagicPalette()

  const elementClass = classNames({
    [`text-${size === 'md' ? 'base' : size}`]: true,
    [`${ROUNDED[size]}`]: true,
    [`${palette.focus}`]: true,
    [`${palette.border}`]: !magic,
    [`${palette.link}`]: true,
    [`${palette.color}`]: true,
    [`${palette.bg}`]: true,
    [`${palette.hover}`]: hoverable,
    [`p-${PADDINGS[size as SIZE] / 2}`]: true,
    [`px-${PADDINGS_X[size as SIZE]}`]: true,
    'whitespace-nowrap inline-block justify-center inline w-fit': true,
    [props.className]: props.className,
  })

  const wrapperClass = classNames({
    [`${ROUNDED[size]} ${magicPalette} !p-px`]: true,
  })

  const magicText = getMagicText()
  const titleClass = classNames({
    [magicText]: magic,
  })

  const Element = () => (
    <div className={elementClass}>
      <span className={titleClass}>{children}</span>
    </div>
  )

  return magic ? (
    <div className={wrapperClass}>
      <Element />
    </div>
  ) : (
    <Element />
  )
}

export default BPBadge
