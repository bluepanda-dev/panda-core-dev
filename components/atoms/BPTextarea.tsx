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

type BPTextareaProps = {
  size?: SIZE
  variant?: UI_VARIANT
  outline?: boolean
  magic?: boolean
  columns?: number
  rows?: number
  resize?: boolean
  readonly?: boolean
  [x: string]: any
}

const Textarea = ({ inputClass, columns, rows, readonly, ...props }: any) => (
  <textarea
    {...props}
    className={inputClass}
    cols={columns}
    rows={rows}
    readOnly={readonly}
  ></textarea>
)

const BPTextarea = ({
  size = DEFAULT_SIZE,
  variant = UI_DEFAULT_VARIANT,
  outline = false,
  magic = false,
  columns = 20,
  rows = 5,
  readonly = false,
  resize = false,
  disabled = false,
  ...props
}: BPTextareaProps) => {
  const superSet = outline ? 'outline' : 'normal'
  const palette = getPalette(superSet, variant)
  const magicPalette = getMagicPalette()
  const fixedSize = ['xl', 'lg', '2xl'].includes(size)
    ? `rounded-${size}`
    : ROUNDED[size]

  const inputClass = classNames({
    [`text-${size === 'md' ? 'base' : size}`]: true,
    [`p-${PADDINGS[size]}`]: true,
    [`px-${PADDINGS_X[size]}`]: true,
    [`${fixedSize} `]: true,
    [`${palette.focus}`]: !magic,
    [`${palette.border}`]: !magic,
    [`${palette.link}`]: true,
    [`${palette.color}`]: true,
    [`${palette.bg}`]: true,
    [`${palette.placeholder}`]: true,
    [`text-white dark:text-black placeholder:text-white dark:placeholder:text-normal-900`]:
      variant === 'inverted',
    'transition ease-in-out font-medium': true,
    'whitespace-pre-line flex items-center gap-2': true,
    'outline-none': magic,
    'select-none cursor-not-allowed': disabled,
    'opacity-70': disabled && !magic,
    'resize-none': !resize,
    [props.className]: props.className,
  })

  const wrapperClass = classNames({
    'select-none cursor-not-allowed opacity-70': disabled,
    [`${fixedSize} ${magicPalette}`]: true,
    [props.className]: props.className,
  })

  return (
    <>
      {magic ? (
        <div className={wrapperClass}>
          <Textarea
            {...props}
            inputClass={inputClass}
            columns={columns}
            rows={rows}
            readonly={readonly}
            disabled={disabled}
          />
        </div>
      ) : (
        <Textarea
          {...props}
          inputClass={inputClass}
          columns={columns}
          rows={rows}
          readonly={readonly}
          disabled={disabled}
        />
      )}
    </>
  )
}

export default BPTextarea
