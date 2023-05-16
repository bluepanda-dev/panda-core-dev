import classNames from 'classnames'
import React from 'react'
import { getPalette, getMagicPalette } from '@core/helpers/palette'
import {
  DEFAULT_SIZE,
  PADDINGS,
  PADDINGS_X,
  ROUNDED,
  SIZE,
  UI_DEFAULT_VARIANT,
  UI_VARIANT,
} from '@core/types/ui-kit'

type BPInputProps = {
  size?: SIZE
  variant?: UI_VARIANT
  outline?: boolean
  magic?: boolean
  nativeType?: string
  hasError?: boolean
  errorMsg?: string
  [x: string]: any
}

const Input = ({ inputClass, nativeType, ...props }: any) => (
  <input {...props} className={inputClass} type={nativeType} />
)

const BPInput = ({
  size = DEFAULT_SIZE,
  variant = UI_DEFAULT_VARIANT,
  outline = false,
  magic = false,
  nativeType = 'text',
  disabled = false,
  hasError = false,
  errorMsg = '',
  ...props
}: BPInputProps) => {
  const superSet = outline ? 'outline' : 'normal'
  const palette = getPalette(superSet, variant)
  const magicPalette = getMagicPalette()

  const inputClass = classNames({
    [`text-${size === 'md' ? 'base' : size}`]: true,
    [`p-${PADDINGS[size]}`]: true,
    [`px-${PADDINGS_X[size]}`]: true,
    [`${ROUNDED[size]}`]: true,
    [`${palette.focus}`]: !magic,
    [`${palette.border}`]: !magic,
    [`${palette.link}`]: true,
    [`${palette.color}`]: true,
    [`${palette.bg}`]: true,
    [`${palette.placeholder}`]: true,
    [`text-white dark:text-black placeholder:text-white dark:placeholder:text-normal-900`]:
      variant === 'inverted',
    'transition ease-in-out font-medium': true,
    'whitespace-nowrap flex items-center gap-2': true,
    'outline-none': magic,
    'select-none cursor-not-allowed': disabled,
    'opacity-70': disabled && !magic,
    'border-red-500 border-2': hasError,
    [props.className]: props.className,
  })

  const wrapperClass = classNames({
    'select-none cursor-not-allowed opacity-70': disabled,
    [`${ROUNDED[size]} ${magicPalette}`]: true,
    [props.className]: props.className,
  })

  return (
    <>
      {magic ? (
        <div className={wrapperClass}>
          <Input
            {...props}
            inputClass={inputClass}
            nativeType={nativeType}
            disabled={disabled}
          />
          <span className="error-msg"> {errorMsg ? errorMsg : null}</span>
        </div>
      ) : (
        <>
          <Input
            {...props}
            inputClass={inputClass}
            nativeType={nativeType}
            disabled={disabled}
          />
          <span className="error-msg"> {errorMsg ? errorMsg : null}</span>
        </>
      )}
    </>
  )
}

export default BPInput
