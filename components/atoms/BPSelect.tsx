import * as Select from '@radix-ui/react-select'
import classnames from 'classnames'
import React, { ReactNode } from 'react'
import { FiCheck, FiChevronDown, FiChevronUp } from 'react-icons/fi'

type SelectProps = {
  placeholder: string
  children?: ReactNode
  ariaLabel?: string
  [x: string]: any
}

type SelectItemProps = {
  children?: ReactNode
  className?: string
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
  className = '',
  value = '',
  ...props
}: SelectItemProps) => {
  return (
    <Select.Item
      className={classnames('SelectItem', className)}
      value={value}
      {...props}
    >
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
  ...props
}: SelectProps) {
  return (
    <Select.Root {...props}>
      <Select.Trigger className="SelectTrigger" aria-label={ariaLabel}>
        <Select.Value placeholder={placeholder} />
        <Select.Icon className="SelectIcon">
          <FiChevronDown />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal container={document.getElementById('BPportal')}>
        <Select.Content className="SelectContent">
          <Select.ScrollUpButton className="SelectScrollButton">
            <FiChevronUp />
          </Select.ScrollUpButton>
          <Select.Viewport className="SelectViewport">
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
