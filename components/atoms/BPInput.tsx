import classNames from 'classnames'
import React from 'react'
import { getPalette, getMagicPalette } from '@core/helpers/palette'
import {
  DEFAULT_SIZE,
  PADDINGS,
  PADDINGS_X,
  ROUNDED,
  SIZE,
  UI_DEFAULT_TYPE,
  UI_TYPE,
} from '@core/types/ui-kit'

type BPInputProps = {
  size?: SIZE
  type?: UI_TYPE
  outline?: boolean
  magic?: boolean
  nativeType?: string
  [x: string]: any
}

const Input = ({ inputClass, nativeType, ...props }: any) => (
  <input {...props} className={inputClass} type={nativeType} />
)

const BPInput = ({
  size = DEFAULT_SIZE,
  type = UI_DEFAULT_TYPE,
  outline = false,
  magic = false,
  nativeType = 'text',
  disabled = false,
  ...props
}: BPInputProps) => {
  const superSet = outline ? 'outline' : 'normal'
  const palette = getPalette(superSet, type)
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
    [`${palette.hover}`]: !disabled && !magic,
    [`${palette.placeholder}`]: true,
    'transition ease-in-out': true,
    'whitespace-nowrap flex items-center gap-2': true,
    'outline-none': magic,
    'select-none cursor-not-allowed	': disabled,
    'opacity-70': disabled && !magic,
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
        </div>
      ) : (
        <Input
          {...props}
          inputClass={inputClass}
          nativeType={nativeType}
          disabled={disabled}
        />
      )}
    </>
  )
}

export default BPInput
