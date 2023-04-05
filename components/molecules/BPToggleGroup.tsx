import * as ToggleGroup from '@radix-ui/react-toggle-group'
import classNames from 'classnames'
import React from 'react'
import { getPalette, getMagicPalette } from '@core/helpers/palette'
import {
  DEFAULT_SIZE,
  ICON_SIZE,
  SIZE,
  UI_DEFAULT_TYPE,
  UI_TYPE,
} from '@core/types/ui-kit'

type BPToggleGroupProps = {
  children?: React.ReactNode
  type?: UI_TYPE
  outline?: boolean
  magic?: boolean
  size?: SIZE
  selectionType?: 'single' | 'multiple'
  defaultValue?: string | string[]
  [x: string]: any
}

export const BPToggleItem = ({ outline, size, palette, ...props }: any) => {
  const elementClass = classNames({
    [`text-${size === 'md' ? 'base' : size}`]: true,
    [`${palette.bg}`]: true,
    [`${palette.color}`]: true,
    [`${palette.hover}`]: true,
    [`${ICON_SIZE[size as SIZE]}`]: true,
    'flex items-center justify-center': true,
    ToggleGroupItem: true,
    [`isOutline`]: outline,
    [props.className]: props.className,
  })
  return <ToggleGroup.Item {...props} className={elementClass} />
}

export default function BPToggleGroup({
  children,
  type = UI_DEFAULT_TYPE,
  size = DEFAULT_SIZE,
  outline = false,
  magic = false,
  selectionType = 'single',
  defaultValue = '',
  ...props
}: BPToggleGroupProps) {
  const superSet = outline ? 'outline' : 'normal'
  const palette = getPalette(superSet, type)
  const magicPalette = getMagicPalette()

  const elementClass = classNames({
    'transition ease-in-out': true,
    [`rounded-md flex items-center justify-center`]: true,
    [`${palette.border}`]: outline,
    ToggleGroup: true,
    [props.className]: props.className,
  })

  const wrapperClass = classNames({
    [`${magicPalette}`]: true,
  })
  return (
    <div className={wrapperClass}>
      <ToggleGroup.Root
        className={elementClass}
        type={selectionType}
        defaultValue={defaultValue as any}
        {...props}
      >
        {React.Children.map(children, (child) => {
          return React.cloneElement(child as React.ReactElement<any>, {
            palette,
            size,
            outline,
          })
        })}
      </ToggleGroup.Root>
    </div>
  )
}
