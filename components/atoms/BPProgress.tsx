import * as Progress from '@radix-ui/react-progress'
import classNames from 'classnames'

import React from 'react'
import { getMagicPalette, getPalette } from '@core/helpers/palette'
import { SIZE, UI_DEFAULT_VARIANT, UI_VARIANT } from '@core/types/ui-kit'

type BPProgressProps = {
  children?: React.ReactNode
  size?: SIZE
  variant?: UI_VARIANT
  outline?: boolean
  magic?: boolean
  progress?: number
  [x: string]: any
}

const BPProgress = ({
  variant = UI_DEFAULT_VARIANT,
  outline = false,
  magic = false,
  progress = 0,
  ...props
}: BPProgressProps) => {
  const superSet = outline ? 'outline' : 'normal'
  const palette = getPalette(superSet, variant)
  const magicPalette = getMagicPalette()

  const elementClass = classNames({
    [`${palette.bg}`]: true,
    [`ProgressRoot`]: true,
    [`${palette.border}`]: outline,
    [props.className]: props.className,
  })

  const indicatorClass = classNames({
    [`${palette.bg}`]: !outline,
    [`bg-${palette.baseColor ? palette.baseColor : ''}-800/30`]: outline,
    [`${magicPalette}`]: magic,
    [`ProgressIndicator`]: true,
  })

  return (
    <Progress.Root
      value={progress}
      {...props}
      className={classNames(elementClass, props.className)}
    >
      <Progress.Indicator
        className={indicatorClass}
        style={{ transform: `translateX(-${100 - progress}%)` }}
      />
    </Progress.Root>
  )
}

export default BPProgress
