import classNames from 'classnames'
import React from 'react'
import {
  getPalette,
  getMagicPalette,
  getMagicText,
} from '@core/helpers/palette'
import { UI_DEFAULT_VARIANT, UI_VARIANT } from '@core/types/ui-kit'

type BPPanelProps = {
  title: string
  description?: string
  hints?: React.ReactNode
  children?: React.ReactNode
  footer?: React.ReactNode
  variant?: UI_VARIANT
  outline?: boolean
  magic?: boolean
  [x: string]: any
}

export default function BPPanel({
  title,
  description,
  hints,
  children,
  footer,
  variant = UI_DEFAULT_VARIANT,
  outline = false,
  magic = false,
  ...props
}: BPPanelProps) {
  const superSet = outline ? 'outline' : 'normal'
  const palette = getPalette(superSet, variant)
  const magicPalette = getMagicPalette()
  const magicText = getMagicText()

  const elementClass = classNames({
    'transition ease-in-out whitespace-nowrap': true,
    [`relative ui-border-group rounded-md`]: true,
    [`${palette.border}`]: true,
    [`${palette.bg}`]: true,
    [props.className]: props.className,
  })

  const footerClass = classNames({
    [`${palette.color}`]: true,
    [`${palette.border}`]: outline,
    'border-t border-x-0 border-b-0 rounded-b-lg px-2 flex min-h-full py-2 w-full items-center':
      true,
    '!border-0': !outline,
  })

  const titleClass = classNames({
    'ui-title': true,
    [`${palette.color}`]: !magic,
    [magicText]: magic,
  })

  const subTitleClass = classNames({
    'ui-focus-text w-full': true,
    [`${palette.color}`]: true,
  })

  const wrapperClass = classNames({
    [`rounded-md ${magicPalette}`]: magic,
  })

  return (
    <div className={wrapperClass}>
      <div className={elementClass}>
        <div className="flex flex-col p-6 gap-4 items-start w-full">
          <div className={titleClass}>{title}</div>
          {description && <div className={subTitleClass}>{description}</div>}
          <div className={subTitleClass}>{children}</div>
        </div>
        {(footer || hints) && (
          <div className={footerClass}>
            {hints && (
              <div className="ml-4 w-full text-left hidden sm:block">
                {hints}
              </div>
            )}
            <div className="w-full flex justify-end gap-2">{footer}</div>
          </div>
        )}
      </div>
    </div>
  )
}
