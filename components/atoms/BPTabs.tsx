import * as Tabs from '@radix-ui/react-tabs'
import classNames from 'classnames'
import React from 'react'
import { getMagicText, getPalette } from '@core/helpers/palette'
import {
  DEFAULT_SIZE,
  PADDINGS,
  PADDINGS_X,
  ROUNDED,
  SIZE,
  UI_DEFAULT_TYPE,
  UI_TYPE,
} from '@core/types/ui-kit'

type BPTabsProps = {
  children?: React.ReactNode
  size?: SIZE
  type?: UI_TYPE
  defaultValue?: string
  outline?: boolean
  magic?: boolean
  [x: string]: any
}

const BPTabs = ({
  children,
  size = DEFAULT_SIZE,
  type = UI_DEFAULT_TYPE,
  outline = false,
  magic = false,
  defaultValue = '0',
  ...props
}: BPTabsProps) => {
  const superSet = outline ? 'outline' : 'normal'
  const palette = getPalette(superSet, type)

  const elementClass = classNames({
    [`text-${size === 'md' ? 'base' : size}`]: true,
    [`${ROUNDED[size]}`]: true,
    TabsRoot: true,
    [props.className]: props.className,
  })

  const magicText = getMagicText()

  const triggerClass = classNames({
    [`text-${size === 'md' ? 'base' : size}`]: true,
    [`p-${PADDINGS[size]}`]: true,
    [`px-${PADDINGS_X[size]}`]: true,
    [`${palette.hover}`]: true,
    [`${palette.bg}`]: !magic,
    [`${palette.color}`]: !magic,
    [`whitespace-nowrap`]: true,
    [`${magicText}`]: magic,
    TabsTrigger: true,
  })

  const contentClass = classNames({
    [`text-${size === 'md' ? 'base' : size}`]: true,
    [`p-${PADDINGS[size] * 2}`]: true,
    [`w-full h-auto`]: true,
    [`border border-normal-600`]: magic,
    [`${palette.border}`]: !magic,
  })

  const disabledTabClass = classNames({
    'opacity-70 select-none cursor-not-allowed	': true,
  })

  return (
    <Tabs.Root defaultValue={defaultValue} {...props} className={elementClass}>
      <Tabs.List className="flex">
        {React.Children.map(children, (child: any, index) => {
          return (
            <Tabs.Trigger
              disabled={child.props['data-disabled']}
              className={classNames(
                triggerClass,
                child.props['data-disabled'] ? disabledTabClass : '',
              )}
              value={`${index}`}
            >
              {child?.props.title}
            </Tabs.Trigger>
          )
        })}
      </Tabs.List>

      {React.Children.map(children, (child, index) => {
        return (
          <Tabs.Content className={contentClass} value={`${index}`}>
            {child}
          </Tabs.Content>
        )
      })}
    </Tabs.Root>
  )
}

export default BPTabs
