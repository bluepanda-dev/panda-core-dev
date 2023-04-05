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

type BPSliderProps = {
  children?: React.ReactNode
  size?: SIZE
  type?: UI_TYPE
  outline?: boolean
  magic?: boolean
  max?: number
  min?: number
  step?: number
  defaultValue?: number
  [x: string]: any
}

const BPSlider = ({
  children,
  size = DEFAULT_SIZE,
  type = UI_DEFAULT_TYPE,
  outline = false,
  magic = false,
  step = 1,
  min = 1,
  max = 100,
  defaultValue = 50,
  ...props
}: BPSliderProps) => {
  const superSet = outline ? 'outline' : 'normal'
  const palette = getPalette(superSet, type)
  const magicPalette = getMagicPalette()

  const elementClass = classNames({
    [`SliderRoot`]: true,
    [props.className]: props.className,
  })

  const trackClass = classNames({
    [`SliderTrack`]: true,
    [`bg-normal-100 dark:bg-normal-800`]: true,
  })

  const rangeClass = classNames({
    [`SliderRange`]: true,
    [`${palette.bg}`]: !outline,
    [`${palette.border}`]: outline,
    [`${magicPalette} !p-px`]: magic,
  })

  const thumbClass = classNames({
    [`SliderThumb`]: true,
    [`bg-normal-100 dark:bg-normal-900 hover:brightness-150`]: outline,
    [`${palette.bg}`]: !outline,
    [`${palette.border}`]: outline,
    [`${palette.focus}`]: true,
    [`${palette.hover}`]: !outline,
    [`${magicPalette}`]: magic,
  })

  const Element = () => (
    <Slider.Root
      defaultValue={[defaultValue]}
      max={max}
      min={min}
      step={step}
      {...props}
      className={classNames(elementClass, props.className)}
    >
      <Slider.Track className={trackClass}>
        <Slider.Range className={rangeClass} />
      </Slider.Track>
      <Slider.Thumb className={thumbClass} />
    </Slider.Root>
  )

  return (
    <>
      <Element />
    </>
  )
}

export default BPSlider