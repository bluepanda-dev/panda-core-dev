import classNames from 'classnames'
import React from 'react'
import { FiLoader } from 'react-icons/fi'
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

type BPButtonProps = {
  icon?: React.ReactNode
  rightIcon?: React.ReactNode
  children?: React.ReactNode
  isLoading?: boolean
  loadingText?: string
  isDisabled?: boolean
  size?: SIZE
  type?: UI_TYPE
  outline?: boolean
  magic?: boolean
  [x: string]: any
}

const BPButton = ({
  children,
  icon = null,
  rightIcon = null,
  size = DEFAULT_SIZE,
  type = UI_DEFAULT_TYPE,
  outline = false,
  magic = false,
  isLoading = false,
  isDisabled = false,
  loadingText = '',
  ...props
}: BPButtonProps) => {
  const superSet = outline ? 'outline' : 'normal'
  const palette = getPalette(superSet, type)
  const magicPalette = getMagicPalette()

  const buttonClass = classNames({
    [`text-${size === 'md' ? 'base' : size}`]: true,
    [`p-${PADDINGS[size]}`]: true,
    [`px-${PADDINGS_X[size]}`]: true,
    [`${ROUNDED[size]}`]: true,
    [`${palette.focus}`]: true,
    [`${palette.border}`]: !magic,
    [`${palette.link}`]: true,
    [`${palette.color}`]: true,
    [`${palette.bg}`]: true,
    [`${palette.hover}`]: !magic,
    'transition ease-in-out': true,
    'whitespace-nowrap flex items-center gap-2': true,
    'select-none cursor-not-allowed	': isDisabled || isLoading,
    'opacity-70': isDisabled && !magic,
    [props.className]: props.className,
  })

  const wrapperClass = classNames({
    'select-none cursor-not-allowed	': isDisabled || isLoading,
    'opacity-70': isDisabled,
    [`${ROUNDED[size]} ${magicPalette}`]: true,
    [props.className]: props.className,
  })

  const magicText = getMagicText()
  const titleClass = classNames({
    [magicText]: magic,
  })

  const Button = () => (
    <button {...props} className={buttonClass}>
      {isLoading && (
        <span className="flex gap-2 items-center">
          <FiLoader className="animate-spin" />
          {loadingText && <span>{loadingText}</span>}
        </span>
      )}
      {!isLoading && icon && <i>{icon}</i>}
      {!isLoading && children && <span className={titleClass}>{children}</span>}
      {!isLoading && rightIcon && <i>{rightIcon}</i>}
    </button>
  )

  return (
    <>
      {magic ? (
        <div className={wrapperClass}>
          <Button />
        </div>
      ) : (
        <Button />
      )}
    </>
  )
}

export default BPButton
