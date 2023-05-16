import classNames from 'classnames'
import React from 'react'
import { HiSparkles } from 'react-icons/hi'
import { getMagicText, getPalette } from '@core/helpers/palette'
import {
  DEFAULT_SIZE,
  PADDINGS,
  PADDINGS_X,
  ROUNDED,
  SIZE,
  UI_DEFAULT_VARIANT,
  UI_VARIANT,
} from '@core/types/ui-kit'

type BPEmptyStateProps = {
  children?: React.ReactNode
  icon?: React.ReactNode
  size?: SIZE
  variant?: UI_VARIANT
  magic?: boolean
  title: string
  titleClass?: string
  [x: string]: any
}

const BPEmptyState = ({
  children,
  icon,
  size = DEFAULT_SIZE,
  variant = UI_DEFAULT_VARIANT,
  magic = false,
  title = '',
  titleClass = '',
  ...props
}: BPEmptyStateProps) => {
  const palette = getPalette('outline', variant)

  const elementClass = classNames({
    [`text-${size === 'md' ? 'base' : size}`]: true,
    [`${ROUNDED[size]}`]: true,
    [`${palette.focus}`]: true,
    [`${palette.color}`]: true,
    [`p-${PADDINGS[size as SIZE] * 2}`]: true,
    [`px-${PADDINGS_X[size as SIZE]}`]: true,
    'flex flex-col justify-center w-full h-full text-center': true,
    [props.className]: props.className,
  })

  const magicText = getMagicText()
  const magicTitleClass = classNames({
    [`${palette.link}`]: true,
    [magicText]: magic,
  })

  const iconClass = classNames({
    [`${palette.color}`]: true,
  })

  return (
    <div className={elementClass}>
      <div
        className={classNames(
          'text-6xl flex flex-col justify-center gap-6 items-center',
          titleClass,
          magicTitleClass,
        )}
      >
        <span className={iconClass}>{icon ? icon : <HiSparkles />}</span>
        <div className={titleClass}>{title}</div>
      </div>
      <div className="flex justify-center text-xl md:text-2xl font-extralight mt-6 md:mt-16 px-8 ">
        <div className="md:max-w-lg">{children}</div>
      </div>
    </div>
  )
}

export default BPEmptyState
