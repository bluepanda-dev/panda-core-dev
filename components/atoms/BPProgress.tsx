import * as Progress from '@radix-ui/react-progress'
import * as Slider from '@radix-ui/react-slider'
import classNames from 'classnames'

import React from 'react'
import {
  getMagicPalette,
  getMagicText,
  getPalette,
} from '@core/helpers/palette'
import {
  AVATAR_SIZE,
  DEFAULT_SIZE,
  ICON_SIZE,
  PADDINGS,
  PADDINGS_X,
  ROUNDED,
  SIZE,
  SIZES,
  UI_DEFAULT_TYPE,
  UI_TYPE,
} from '@core/types/ui-kit'

type BPProgressProps = {
  children?: React.ReactNode
  size?: SIZE
  type?: UI_TYPE
  outline?: boolean
  magic?: boolean
  progress?: number
  [x: string]: any
}

const BPProgress = ({
  children,
  size = DEFAULT_SIZE,
  type = UI_DEFAULT_TYPE,
  outline = false,
  magic = false,
  progress = 0,
  ...props
}: BPProgressProps) => {
  const superSet = outline ? 'outline' : 'normal'
  const palette = getPalette(superSet, type)
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
