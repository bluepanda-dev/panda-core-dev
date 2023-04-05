import * as RadioGroup from '@radix-ui/react-radio-group'

import * as Switch from '@radix-ui/react-switch'

import classNames from 'classnames'
import React from 'react'
import { FiCheck } from 'react-icons/fi'
import {
  getMagicPalette,
  getMagicText,
  getPalette,
} from '@core/helpers/palette'
import {
  DEFAULT_SIZE,
  ICON_SIZE,
  PADDINGS,
  SIZE,
  SIZES,
  UI_DEFAULT_TYPE,
  UI_TYPE,
} from '@core/types/ui-kit'

type BPSwitchProps = {
  children?: React.ReactNode
  size?: SIZE
  type?: UI_TYPE
  outline?: boolean
  magic?: boolean
  id: string
  [x: string]: any
}
const BPSwitch = ({
  children,
  size = DEFAULT_SIZE,
  type = UI_DEFAULT_TYPE,
  outline = false,
  magic = false,
  id,
  ...props
}: BPSwitchProps) => {
  const superSet = outline ? 'outline' : 'normal'
  const palette = getPalette(superSet, type)
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
    [props.className]: props.className,
  })
  const labelClass = classNames({
    [`text-${size === 'md' ? 'base' : size}`]: true,
    [`${palette.color}`]: outline,
  })

  const thumbClass = classNames({
    [`SwitchThumb`]: true,
    [`bg-${palette.baseColor}-400 dark:bg-${palette.baseColor}-700`]:
      palette.baseColor && outline,
    [`bg-normal-300`]: palette.baseColor === 'normal' || !palette.baseColor,
    [`${palette.focus}`]: true,
    [`${palette.hover}`]: !outline,
    [`${magicPalette}`]: magic,
  })

  const wrapperClass = classNames({
    [`rounded-sm ${magicPalette}`]: true,
    [props.className]: props.className,
  })

  const Element = () => (
    <div className="flex items-center justify-between">
      <label htmlFor={id} className={labelClass} style={{ paddingRight: 15 }}>
        {children}
      </label>
      <Switch.Root id={id} {...props} className={elementClass}>
        <Switch.Thumb className={thumbClass} />
      </Switch.Root>
    </div>
  )

  return <Element />
}

export default BPSwitch
