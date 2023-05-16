import * as Switch from '@radix-ui/react-switch'
import classNames from 'classnames'
import React from 'react'
import { getMagicPalette, getPalette } from '@core/helpers/palette'
import {
  DEFAULT_SIZE,
  SIZE,
  UI_DEFAULT_VARIANT,
  UI_VARIANT,
} from '@core/types/ui-kit'

type BPSwitchProps = {
  children?: React.ReactNode
  size?: SIZE
  variant?: UI_VARIANT
  outline?: boolean
  magic?: boolean
  disabled?: boolean
  id: string
  [x: string]: any
}
const BPSwitch = ({
  children,
  size = DEFAULT_SIZE,
  variant = UI_DEFAULT_VARIANT,
  outline = false,
  magic = false,
  disabled = false,
  id,
  ...props
}: BPSwitchProps) => {
  const superSet = outline ? 'outline' : 'normal'
  const palette = getPalette(superSet, variant)
  const magicPalette = getMagicPalette()

  const elementClass = classNames({
    [`text-${size === 'md' ? 'base' : size}`]: true,
    SwitchRoot: true,
    [`bg-${palette.baseColor}-400 dark:bg-${palette.baseColor}-900`]:
      palette.baseColor !== 'normal' && !outline,
    [`border border-${palette.baseColor}-900`]:
      palette.baseColor !== 'normal' && outline,
    [`border border-normal-700`]: palette.baseColor === 'normal',
    [`${palette.focus}`]: true,
    'select-none cursor-not-allowed	': disabled,
    [props.className]: props.className,
  })
  const labelClass = classNames({
    [`text-${size === 'md' ? 'base' : size}`]: true,
    [`${palette.color}`]: outline,
    'opacity-70': disabled && !magic,
  })

  const thumbClass = classNames({
    [`SwitchThumb`]: true,
    [`bg-${palette.baseColor}-400 dark:bg-${palette.baseColor}-700`]:
      palette.baseColor && outline && !magic,
    [`bg-normal-300`]:
      !magic && (palette.baseColor === 'normal' || !palette.baseColor),
    [`${palette.focus}`]: true,
    [`${palette.hover}`]: !disabled,
    'opacity-70': disabled && !magic,
    [`${magicPalette}`]: magic,
  })

  return (
    <div className="flex items-center justify-between">
      <label htmlFor={id} className={labelClass} style={{ paddingRight: 15 }}>
        {children}
      </label>
      <Switch.Root
        id={id}
        {...props}
        className={elementClass}
        disabled={disabled}
      >
        <Switch.Thumb className={thumbClass} />
      </Switch.Root>
    </div>
  )
}

export default BPSwitch
