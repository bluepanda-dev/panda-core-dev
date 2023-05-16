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
  UI_DEFAULT_VARIANT,
  UI_VARIANT,
} from '@core/types/ui-kit'

type BPBadgeProps = {
  children?: React.ReactNode
  size?: SIZE
  variant?: UI_VARIANT
  outline?: boolean
  magic?: boolean
  hoverable?: boolean
  [x: string]: any
}

const BPBadge = ({
  children,
  size = DEFAULT_SIZE,
  variant = UI_DEFAULT_VARIANT,
  outline = false,
  magic = false,
  hoverable = false,
  ...props
}: BPBadgeProps) => {
  const superSet = outline ? 'outline' : 'normal'
  const palette = getPalette(superSet, variant)
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
    'whitespace-nowrap ': true,
    'inline-block justify-center w-fit': !magic,
    [props.className]: props.className,
  })

  const wrapperClass = classNames({
    [`${ROUNDED[size]} ${magicPalette} !p-px !inline`]: true,
  })

  const magicText = getMagicText()
  const titleClass = classNames({
    'flex gap-1 justify-center items-center': !magic,
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
