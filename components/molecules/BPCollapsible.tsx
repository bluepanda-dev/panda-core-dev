import * as Collapsible from '@radix-ui/react-collapsible'
import classNames from 'classnames'
import React from 'react'
import { RxCross1, RxRowSpacing } from 'react-icons/rx'
import BPButton from '@components/atoms/BPButton'
import {
  getMagicPalette,
  getMagicText,
  getPalette,
} from '@core/helpers/palette'
import {
  DEFAULT_SIZE,
  ICON_SIZE,
  PADDINGS,
  PADDINGS_X,
  ROUNDED,
  SIZE,
  UI_DEFAULT_VARIANT,
  UI_VARIANT,
} from '@core/types/ui-kit'

type BPCollapsibleProps = {
  children?: React.ReactNode
  size?: SIZE
  variant?: UI_VARIANT
  outline?: boolean
  magic?: boolean
  hoverable?: boolean
  title: string
  [x: string]: any
}

const BPCollapsible = ({
  children,
  title,
  size = DEFAULT_SIZE,
  variant = UI_DEFAULT_VARIANT,
  outline = false,
  magic = false,
  hoverable = false,
  ...props
}: BPCollapsibleProps) => {
  const [open, setOpen] = React.useState(false)
  const superSet = outline ? 'outline' : 'normal'
  const palette = getPalette(superSet, variant)
  const magicPalette = getMagicPalette()

  const elementClass = classNames({
    'relative flex flex-col gap-4 transition ease-in-out': true,
    [props.className]: props.className,
  })

  const triggerClass = classNames({
    [`text-${size === 'md' ? 'base' : size}`]: true,
    [`${ICON_SIZE[size]}`]: true,
  })

  const itemClass = classNames({
    [`text-${size === 'md' ? 'base' : size}`]: true,
    [`${palette.border}`]: !magic,
    [`${palette.color}`]: true,
    [`${palette.bg}`]: true,
    [`${palette.hover}`]: hoverable,
    [`p-${PADDINGS[size]}`]: true,
    [`px-${PADDINGS_X[size]}`]: true,
    [`${ROUNDED[size]}`]: true,
  })

  const itemTitleClass = classNames({
    [`text-${size === 'md' ? 'base' : size}`]: true,
    [`text-${palette.baseColor}-600`]: !magic,
    [`p-${PADDINGS[size]}`]: true,
  })

  const wrapperClass = classNames({
    [`${ROUNDED[size]} ${magicPalette}`]: true,
    [props.className]: props.className,
  })

  const magicText = getMagicText()
  const titleClass = classNames({
    [magicText]: magic,
  })

  return (
    <Collapsible.Root
      className={elementClass}
      open={open}
      onOpenChange={setOpen}
    >
      <div className="flex justify-between items-center">
        <span className={classNames(itemTitleClass, titleClass)}>{title}</span>
        <Collapsible.Trigger asChild>
          <BPButton
            variant={variant}
            size={size}
            icon={open ? <RxCross1 /> : <RxRowSpacing />}
            className={triggerClass}
            magic={magic}
            outline={outline}
          />
        </Collapsible.Trigger>
      </div>

      {magic ? (
        <div className={wrapperClass}>
          <div className={itemClass}>
            {children && (children as Array<any>)[0]}
          </div>
        </div>
      ) : (
        <div className={itemClass}>
          {children && (children as Array<any>)[0]}
        </div>
      )}

      <Collapsible.Content className="flex flex-col gap-4">
        {magic
          ? React.Children.map(children, (child, i) => {
              return (
                i !== 0 && (
                  <div className={wrapperClass}>
                    <div className={itemClass}>{child}</div>
                  </div>
                )
              )
            })
          : React.Children.map(children, (child, i) => {
              return i !== 0 && <div className={itemClass}>{child}</div>
            })}
      </Collapsible.Content>
    </Collapsible.Root>
  )
}

export default BPCollapsible
