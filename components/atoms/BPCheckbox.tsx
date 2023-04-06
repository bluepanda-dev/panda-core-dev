import * as Checkbox from '@radix-ui/react-checkbox'
import classNames from 'classnames'
import React from 'react'
import { FiCheck } from 'react-icons/fi'
import { getMagicPalette, getPalette } from '@core/helpers/palette'
import {
  DEFAULT_SIZE,
  ICON_SIZE,
  PADDINGS,
  SIZE,
  UI_DEFAULT_TYPE,
  UI_TYPE,
} from '@core/types/ui-kit'

type BPCheckboxProps = {
  icon?: React.ReactNode
  children?: React.ReactNode
  size?: SIZE
  type?: UI_TYPE
  outline?: boolean
  magic?: boolean
  [x: string]: any
}

const BPCheckbox = ({
  children,
  icon,
  size = DEFAULT_SIZE,
  type = UI_DEFAULT_TYPE,
  outline = false,
  magic = false,
  disabled = false,
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
    [`${palette.hover}`]: !disabled && !magic,
    'select-none cursor-not-allowed	': disabled,
    'opacity-70': disabled && !magic,
    'rounded-sm transition ease-in-out whitespace-nowrap flex items-center gap-2 justify-center':
      true,
    [props.className]: props.className,
  })

  const wrapperClass = classNames({
    [`rounded-sm ${magicPalette}`]: true,
    [props.className]: props.className,
  })

  const labelClass = classNames({
    'whitespace-nowrap': true,
    'opacity-70': disabled,
  })

  const Element = () => (
    // todo fgix id and add auto or sth
    <Checkbox.Root
      {...props}
      className={elementClass}
      defaultChecked
      id={children?.toString()}
      disabled={disabled}
    >
      <Checkbox.Indicator className="CheckboxIndicator">
        {icon ? icon : <FiCheck />}
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
          <label className={labelClass} htmlFor={children?.toString()}>
            {children}
          </label>
        </div>
      )}
    </>
  )
}

export default BPCheckbox
