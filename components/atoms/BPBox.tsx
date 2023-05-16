import classNames from 'classnames'
import { getPalette, getMagicPalette } from '@core/helpers/palette'
import {
  PADDINGS,
  SIZE,
  UI_DEFAULT_VARIANT,
  UI_VARIANT,
} from '@core/types/ui-kit'

type BPBoxProps = {
  title?: string
  children?: React.ReactNode
  size?: SIZE
  variant?: UI_VARIANT
  magic?: boolean
  outline?: boolean
  [x: string]: any
}

export default function BPBox({
  children,
  size = 'md',
  variant = UI_DEFAULT_VARIANT,
  magic = false,
  outline = false,
  ...props
}: BPBoxProps) {
  const superSet = outline ? 'outline' : 'normal'
  const palette = getPalette(superSet, variant)
  const magicPalette = getMagicPalette()

  const wrapperClass = classNames({
    [`rounded-lg`]: true,
    [`${magicPalette}`]: true,
  })

  const containerClass = classNames({
    [`p-${PADDINGS[size] * 3}`]: true,
    [`rounded-lg`]: true,
    [`${palette.border}`]: !magic,
    [`${palette.bg}`]: true,
    [`text-white dark:text-black`]: variant === 'inverted',
    [`max-w-6xl`]: true,
    [props.className]: props.className,
  })

  return magic ? (
    <div className={wrapperClass}>
      <div {...props} className={containerClass}>
        {children}
      </div>
    </div>
  ) : (
    <div {...props} className={containerClass}>
      {children}
    </div>
  )
}
