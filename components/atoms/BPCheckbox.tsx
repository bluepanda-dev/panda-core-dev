import * as Checkbox from '@radix-ui/react-checkbox'
import classNames from 'classnames'
import React from 'react'
import { FiCheck, FiLoader } from 'react-icons/fi'
import { getMagicPalette, getPalette } from '@core/helpers/palette'
import {
  DEFAULT_SIZE,
  ICON_SIZE,
  PADDINGS,
  PADDINGS_X,
  ROUNDED,
  SIZE,
  UI_DEFAULT_TYPE,
  UI_TYPE,
} from '@core/types/ui-kit'

type BPCheckboxProps = {
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

const BPCheckbox = ({
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
}: BPCheckboxProps) => {
  const superSet = outline ? 'outline' : 'normal'
  const palette = getPalette(superSet, type)
  const magicPalette = getMagicPalette()

  const elementClass = classNames({
    [`text-${size === 'md' ? 'base' : size}`]: true,
    [`p-${PADDINGS[size]}`]: true,
    //todo improve this naming for rounded icon size etc
    [`${ICON_SIZE[size]}`]: true,
    [`${palette.focus}`]: true,
    [`${palette.border}`]: !magic,
    [`${palette.link}`]: true,
    [`${palette.color}`]: true,
    [`${palette.bg}`]: true,
    [`${palette.outline}`]: true,
    'select-none cursor-not-allowed	': isDisabled || isLoading,
    'opacity-70': isDisabled && !magic,
    'rounded-sm transition ease-in-out whitespace-nowrap flex items-center gap-2 justify-center':
      true,
    [props.className]: props.className,
  })

  const wrapperClass = classNames({
    ' select-none cursor-not-allowed	': isDisabled || isLoading,
    'opacity-70': isDisabled,
    [`rounded-sm ${magicPalette}`]: true,
    [props.className]: props.className,
  })

  const Element = () => (
    // todo fgix id and add auto or sth
    <Checkbox.Root
      {...props}
      className={elementClass}
      defaultChecked
      id={children?.toString()}
    >
      <Checkbox.Indicator className="CheckboxIndicator">
        <FiCheck />
      </Checkbox.Indicator>
    </Checkbox.Root>
  )

  return (
    <>
      {magic ? (
        <div className="flex gap-4 items-center">
          <div className={wrapperClass}>
            <Element />
          </div>
          <label className="whitespace-nowrap" htmlFor={children?.toString()}>
            {children}
          </label>
        </div>
      ) : (
        <div className="flex gap-4 items-center">
          <Element />
          <label className="whitespace-nowrap" htmlFor={children?.toString()}>
            {children}
          </label>
        </div>
      )}
    </>
  )
}

export default BPCheckbox
