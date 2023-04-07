import classNames from 'classnames'
import { getPalette, getMagicPalette } from '@core/helpers/palette'
import { PADDINGS, SIZE, UI_DEFAULT_TYPE, UI_TYPE } from '@core/types/ui-kit'

type BPBoxProps = {
  title?: string
  children?: React.ReactNode
  size?: SIZE
  type?: UI_TYPE
  magic?: boolean
  outline?: boolean
  [x: string]: any
}

export default function BPBox({
  children,
  size = 'md',
  type = UI_DEFAULT_TYPE,
  magic = false,
  outline = false,
  ...props
}: BPBoxProps) {
  const superSet = outline ? 'outline' : 'normal'
  const palette = getPalette(superSet, type)
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
    [`max-w-6xl`]: true,
    [props.className]: props.className,
  })

  return magic ? (
    <div className={wrapperClass}>
      <div className={containerClass}>{children}</div>
    </div>
  ) : (
    <div className={containerClass}>{children}</div>
  )
}
