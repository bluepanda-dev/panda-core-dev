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
  nativeType?: 'button' | 'submit' | 'reset'
  magic?: boolean
  [x: string]: any
}

const BPButton = React.forwardRef(
  (
    {
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
      nativeType = 'button',
      ...props
    }: BPButtonProps,
    ref: any,
  ) => {
    const superSet = outline ? 'outline' : 'normal'
    const palette = getPalette(superSet, type)
    const magicPalette = getMagicPalette()

    const buttonClass = classNames({
      [`text-${size === 'md' ? 'base' : size}`]: true,
      [`p-${PADDINGS[size]}`]: !!children,
      [`px-${PADDINGS_X[size]}`]: !!children,
      [`${ROUNDED[size]}`]: true,
      [`${palette.focus}`]: true,
      [`${palette.border}`]: !magic,
      [`${palette.link}`]: true,
      [`${palette.color}`]: true,
      [`${palette.bg}`]: true,
      [`${palette.hover}`]: !magic,
      'transition ease-in-out h-fit': true,
      'whitespace-nowrap flex items-center gap-2 font-normal justify-center':
        true,
      'select-none cursor-not-allowed	': isDisabled || isLoading,
      'opacity-70': isDisabled && !magic,
      'w-full ': magic && children,
      'flex justify-center': !children,
      [props.className]: props.className,
    })

    const wrapperClass = classNames({
      'select-none cursor-not-allowed	': isDisabled || isLoading,
      'opacity-70': isDisabled,
      [`${ROUNDED[size]} ${magicPalette} h-auto`]: true,
    })

    const magicText = getMagicText()
    const titleClass = classNames({
      [magicText]: magic,
    })

    return (
      <>
        {magic ? (
          <div className={wrapperClass}>
            <button
              ref={ref}
              {...props}
              className={buttonClass}
              type={nativeType}
            >
              {isLoading && (
                <span className="flex gap-2 items-center">
                  <FiLoader className="animate-spin" />
                  {loadingText && <span>{loadingText}</span>}
                </span>
              )}
              {!isLoading && icon && <i>{icon}</i>}
              {!isLoading && children && (
                <span className={titleClass}>{children}</span>
              )}
              {!isLoading && rightIcon && <i>{rightIcon}</i>}
            </button>
          </div>
        ) : (
          <button
            ref={ref}
            {...props}
            className={buttonClass}
            type={nativeType}
          >
            {isLoading && (
              <span className="flex gap-2 items-center">
                <FiLoader className="animate-spin" />
                {loadingText && <span>{loadingText}</span>}
              </span>
            )}
            {!isLoading && icon && <i>{icon}</i>}
            {!isLoading && children && (
              <span className={titleClass}>{children}</span>
            )}
            {!isLoading && rightIcon && <i>{rightIcon}</i>}
          </button>
        )}
      </>
    )
  },
)

export default BPButton
