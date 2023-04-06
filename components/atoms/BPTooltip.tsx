import * as Tooltip from '@radix-ui/react-tooltip'
import classNames from 'classnames'
import React from 'react'
import { getMagicText, getPalette } from '@core/helpers/palette'
import {
  DEFAULT_SIZE,
  PADDINGS,
  PADDINGS_X,
  ROUNDED,
  SIZE,
  UI_DEFAULT_TYPE,
  UI_TYPE,
} from '@core/types/ui-kit'

type BPTooltip = {
  children: React.ReactNode
  tooltip: React.ReactNode
  size?: SIZE
  type?: UI_TYPE
  outline?: boolean
  magic?: boolean
  [x: string]: any
}

const BPToggle = React.forwardRef(
  (
    {
      children,
      tooltip,
      size = DEFAULT_SIZE,
      type = UI_DEFAULT_TYPE,
      outline = false,
      magic = false,
      ...props
    }: BPTooltip,
    ref: any,
  ) => {
    const superSet = outline ? 'outline' : 'normal'
    const palette = getPalette(superSet, type)

    const elementClass = classNames({
      [`text-${size === 'md' ? 'base' : size}`]: true,
      [`p-${PADDINGS[size]}`]: true,
      [`px-${PADDINGS_X[size]}`]: true,
      [`${ROUNDED[size]}`]: true,
      [`${palette.border}`]: !magic,
      [`${palette.link}`]: true,
      [`${palette.color}`]: !magic,
      [`${palette.bg}`]: !magic,
      TooltipContent: true,
      [`!bg-black`]: magic,
      [props.className]: props.className,
    })

    const magicText = getMagicText()
    const titleClass = classNames({
      [magicText]: magic,
    })

    return (
      <Tooltip.Provider>
        <Tooltip.Root>
          <Tooltip.Trigger ref={ref} asChild>
            {children}
          </Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Content className={elementClass} sideOffset={5}>
              <span className={titleClass}>{tooltip}</span>
            </Tooltip.Content>
          </Tooltip.Portal>
        </Tooltip.Root>
      </Tooltip.Provider>
    )
  },
)

export default BPToggle
