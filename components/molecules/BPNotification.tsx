import classNames from 'classnames'
import React from 'react'
import { FiInfo } from 'react-icons/fi'
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

type BPNotificationProps = {
  children?: React.ReactNode
  icon?: React.ReactNode
  size?: SIZE
  type?: UI_TYPE
  outline?: boolean
  magic?: boolean
  hoverable?: boolean
  [x: string]: any
}

const BPNotification = ({
  children,
  icon,
  size = DEFAULT_SIZE,
  type = UI_DEFAULT_TYPE,
  outline = false,
  magic = false,
  hoverable = false,
  url = undefined,
  ...props
}: BPNotificationProps) => {
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
    [`p-${PADDINGS[size as SIZE] * 2}`]: true,
    [`px-${PADDINGS_X[size as SIZE]}`]: true,
    'items-center flex justify-start w-full gap-2': true,
  })

  const wrapperClass = classNames({
    [`${ROUNDED[size]}`]: true,
    [`${magicPalette} w-full`]: true,
  })

  const contentClass = classNames({
    'w-full items-center': true,
    [props.className]: props.className,
  })

  const iconClass = classNames({
    [`pr-2 text-xl`]: true,
  })

  const Element = () => (
    <div className={elementClass}>
      <div className={iconClass}> {icon ?? <FiInfo />} </div>
      <div className={contentClass}> {children} </div>
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

export default BPNotification
