import * as Select from '@radix-ui/react-select'
import classNames from 'classnames'
import React, { ReactNode } from 'react'
import { FiCheck, FiChevronDown, FiChevronUp } from 'react-icons/fi'
import {
  getMagicPalette,
  getPalette,
  MagicContainer,
  Palette,
} from '@core/helpers/palette'
import {
  SIZE,
  DEFAULT_SIZE,
  PADDINGS,
  PADDINGS_X,
  ROUNDED,
  UI_TYPE,
  UI_DEFAULT_TYPE,
} from '@core/types/ui-kit'

type SelectProps = {
  placeholder: string
  children: ReactNode
  ariaLabel?: string
  size?: SIZE
  type?: UI_TYPE
  outline?: boolean
  magic?: boolean
  [x: string]: any
}

type SelectItemProps = {
  children?: ReactNode
  value?: string
  [x: string]: any
}

export const BPSelectSeparator = ({ ...props }) => {
  return <Select.Separator className="SelectSeparator" {...props} />
}

export const BPSelectGroup = Select.Group

export const BPSelectLabel = Select.Label

export const BPSelectItem = ({
  children,
  value = '',
  ...props
}: SelectItemProps) => {
  const selectClass = classNames({
    SelectItem: true,
  })

  return (
    <Select.Item className={selectClass} value={value} {...props}>
      <Select.ItemText>{children}</Select.ItemText>
      <Select.ItemIndicator className="SelectItemIndicator">
        <FiCheck />
      </Select.ItemIndicator>
    </Select.Item>
  )
}

export function BPSelect({
  children,
  placeholder,
  ariaLabel,
  size = DEFAULT_SIZE,
  type = UI_DEFAULT_TYPE,
  outline = false,
  magic = false,
  ...props
}: SelectProps) {
  const superSet = outline ? 'outline' : 'normal'
  const palette = getPalette(superSet, type)
  const magicPalette = getMagicPalette()

  const triggerClass = classNames({
    [`text-${size === 'md' ? 'base' : size}`]: true,
    [`p-${PADDINGS[size]}`]: true,
    [`px-${PADDINGS_X[size]}`]: true,
    [`${ROUNDED[size]}`]: true,
    [`${palette.focus}`]: true,
    [`${palette.border}`]: !magic,
    [`${palette.link}`]: true,
    [`${palette.color}`]: true,
    [`${palette.bg}`]: true,
    [`${palette.hover}`]: !magic,
    'transition ease-in-out': true,
    SelectTrigger: true,
  })

  const viewportClass = classNames({
    [`text-${size === 'md' ? 'base' : size}`]: true,
    SelectViewport: true,
  })

  const Trigger = () => (
    <Select.Trigger className={triggerClass} aria-label={ariaLabel}>
      <Select.Value placeholder={placeholder} />
      <Select.Icon className="SelectIcon">
        <FiChevronDown />
      </Select.Icon>
    </Select.Trigger>
  )
  const wrapperClass = classNames({
    [`${ROUNDED[size]} ${magicPalette}`]: true,
    [props.className]: props.className,
  })

  return (
    <Select.Root {...props}>
      {magic ? (
        <div className={wrapperClass}>
          <Trigger />
        </div>
      ) : (
        <Trigger />
      )}
      <Select.Portal container={document.getElementById('BPportal')}>
        <Select.Content className="SelectContent">
          <Select.ScrollUpButton className="SelectScrollButton">
            <FiChevronUp />
          </Select.ScrollUpButton>
          <Select.Viewport className={viewportClass}>
            {children}
          </Select.Viewport>
          <Select.ScrollDownButton className="SelectScrollButton">
            <FiChevronDown />
          </Select.ScrollDownButton>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  )
}
