import classNames from 'classnames'
import React from 'react'
import BPHeading from '@components/atoms/BPHeading'
import {
  getPalette,
  getMagicPalette,
  getMagicText,
} from '@core/helpers/palette'
import { UI_DEFAULT_VARIANT, UI_VARIANT } from '@core/types/ui-kit'

type BPCardProps = {
  title: React.ReactNode
  description?: string
  children?: React.ReactNode
  footer?: React.ReactNode
  variant?: UI_VARIANT
  outline?: boolean
  magic?: boolean
  hoverable?: boolean
  [x: string]: any
}

export default function BPCard({
  title,
  description,
  children,
  footer,
  variant = UI_DEFAULT_VARIANT,
  outline = false,
  magic = false,
  hoverable = false,
  ...props
}: BPCardProps) {
  const superSet = outline ? 'outline' : 'normal'
  const palette = getPalette(superSet, variant)
  const magicPalette = getMagicPalette()
  const magicText = getMagicText()

  const elementClass = classNames({
    'transition ease-in-out p-6 w-[400px] min-h-[180px]': true,
    [`relative ui-border-group rounded-md flex justify-between flex-col gap-6`]:
      true,
    [`${palette.border}`]: true,
    [`${palette.bg}`]: true,
    [`${palette.hoverBorder}`]: hoverable,
    [props.className]: props.className,
  })

  const footerClass = classNames({
    'rounded-b-lg flex min-h-full w-full items-center': true,
  })

  const titleClass = classNames({
    [magicText]: magic,
  })

  const subTitleClass = classNames({
    'ui-focus-text w-full': true,
  })

  const wrapperClass = classNames({
    'transition ease-in-out w-auto h-auto': true,
    [`rounded-md ${magicPalette}`]: magic,
  })

  return (
    <div className={wrapperClass}>
      <div className={elementClass}>
        <div className="flex flex-col justify-between gap-4 items-start w-full">
          <BPHeading magic={magic} size="sm" className={titleClass}>
            {title}
          </BPHeading>
          {description && <div className={subTitleClass}>{description}</div>}
          <div className={subTitleClass}>{children}</div>
        </div>
        {footer && <div className={footerClass}>{footer}</div>}
      </div>
    </div>
  )
}
