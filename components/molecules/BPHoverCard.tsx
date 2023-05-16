import * as HoverCard from '@radix-ui/react-hover-card'
import classNames from 'classnames'
import React from 'react'
import { getMagicPalette, getPalette } from '@core/helpers/palette'
import {
  DEFAULT_SIZE,
  PADDINGS,
  PADDINGS_X,
  ROUNDED,
  SIZE,
  UI_DEFAULT_VARIANT,
  UI_VARIANT,
} from '@core/types/ui-kit'

type BPHoverCardProps = {
  children?: React.ReactNode
  trigger?: React.ReactNode
  size?: SIZE
  variant?: UI_VARIANT
  outline?: boolean
  magic?: boolean
  [x: string]: any
}

const BPHoverCard = ({
  children,
  trigger,
  size = DEFAULT_SIZE,
  variant = UI_DEFAULT_VARIANT,
  outline = false,
  magic = false,
  ...props
}: BPHoverCardProps) => {
  const superSet = outline ? 'outline' : 'normal'
  const palette = getPalette(superSet, variant)
  const magicPalette = getMagicPalette()

  const elementClass = classNames({
    [`text-${size === 'md' ? 'base' : size}`]: true,
    [`p-${PADDINGS[size] * 2}`]: true,
    [`px-${PADDINGS_X[size] * 2}`]: !!children,
    [`${ROUNDED[size]}`]: true,
    [`${palette.focus}`]: true,
    [`${palette.border}`]: !magic,
    [`${palette.link}`]: true,
    [`${palette.color}`]: true,
    [`${palette.bg}`]: true,
    'transition ease-in-out whitespace-nowrap ': true,
    [props.className]: props.className,
  })

  const arrowClass = classNames({
    [``]: true,
  })

  const wrapperClass = classNames({
    [`${magicPalette}`]: true,
    [`${ROUNDED[size]}`]: true,
    [props.className]: props.className,
  })

  return (
    <HoverCard.Root>
      <HoverCard.Trigger asChild>{trigger}</HoverCard.Trigger>
      <HoverCard.Portal>
        <HoverCard.Content
          className={magic ? wrapperClass : elementClass}
          sideOffset={5}
        >
          {magic ? <div className={elementClass}>{children}</div> : children}
          <HoverCard.Arrow className={arrowClass} />
        </HoverCard.Content>
      </HoverCard.Portal>
    </HoverCard.Root>
  )
}

export default BPHoverCard
