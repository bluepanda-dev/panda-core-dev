import classNames from 'classnames'
import React from 'react'
import { FiCircle } from 'react-icons/fi'
import BPIcon from '@components/atoms/BPIcon'
import {
  getMagicPalette,
  getMagicText,
  getPalette,
} from '@core/helpers/palette'
import {
  DEFAULT_SIZE,
  PADDINGS,
  PADDINGS_X,
  SIZE,
  UI_DEFAULT_VARIANT,
  UI_VARIANT,
} from '@core/types/ui-kit'

type BPStepsItem = {
  label: string
  icon?: React.ReactNode
  disabled?: boolean
  active?: boolean
  value?: string
}

type BPStepsProps = {
  size?: SIZE
  variant?: UI_VARIANT
  outline?: boolean
  magic?: boolean
  items?: BPStepsItem[]
  // eslint-disable-next-line no-unused-vars
  onValueChange?(value: string): void
  hoverable?: boolean
  [x: string]: any
}

const BPSteps = ({
  size = DEFAULT_SIZE,
  variant = UI_DEFAULT_VARIANT,
  outline = false,
  magic = false,
  hoverable = false,
  items = [],
  onValueChange,
  ...props
}: BPStepsProps) => {
  const superSet = outline ? 'outline' : 'normal'
  const palette = getPalette(superSet, variant)
  const magicPalette = getMagicPalette()

  const elementClass = classNames({
    [`text-${size === 'md' ? 'base' : size}`]: true,
    [`p-${PADDINGS[size as SIZE]}`]: true,
    [`px-${PADDINGS_X[size as SIZE]}`]: true,
    'whitespace-nowrap items-center flex justify-between w-full gap-2': true,
    [props.className]: props.className,
  })

  const stepClass = classNames({
    [`${palette.focus}`]: true,
    [`justify-self-center flex flex-col items-center justify-center gap-2`]:
      true,
  })

  const lineClass = classNames({
    [`w-full h-px bg-${palette.baseColor}-600`]: true,
    [`${magicPalette} !p-px`]: magic,
  })

  const magicText = getMagicText()
  const titleClass = classNames({
    [`${palette.link}`]: true,
    [`${palette.color}`]: !magic && outline,
    [magicText]: magic,
  })

  function handleClick(item: BPStepsItem, value: string) {
    if (item.disabled) {
      return
    }
    onValueChange && onValueChange(value)
  }

  return (
    <div className={elementClass}>
      {items.map((item, index) => {
        return (
          <>
            <div
              className={classNames(
                stepClass,
                `${item.active ? 'brightness-150' : ''}`,
              )}
              onClick={() => handleClick(item, item.value ?? `${index}`)}
            >
              <BPIcon
                variant={variant}
                disabled={item.disabled}
                hoverable={hoverable}
                className={`${hoverable ? 'cursor-pointer' : ''}`}
                outline={outline}
              >
                {item.icon ?? <FiCircle />}
              </BPIcon>
              <span
                className={classNames(
                  titleClass,
                  `${item.disabled ? 'opacity-50' : ''}`,
                )}
              >
                {item.label}
              </span>
            </div>
            {index < items.length - 1 && (
              <span
                className={classNames(
                  lineClass,
                  `${item.disabled ? 'opacity-50' : ''}`,
                )}
              ></span>
            )}
          </>
        )
      })}
    </div>
  )
}

export default BPSteps
