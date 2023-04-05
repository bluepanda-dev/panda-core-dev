import * as RadioGroup from '@radix-ui/react-radio-group'
import * as Tabs from '@radix-ui/react-tabs'
import classNames from 'classnames'
import React from 'react'
import {
  getMagicPalette,
  getMagicText,
  getPalette,
} from '@core/helpers/palette'
import {
  DEFAULT_SIZE,
  ICON_SIZE,
  PADDINGS,
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
  const magicPalette = getMagicPalette()

  const elementClass = classNames({
    'flex flex-col gap-2': true,
    [props.className]: props.className,
  })

  const wrapperClass = classNames({
    [`rounded-sm ${magicPalette}`]: true,
    [props.className]: props.className,
  })

  const Element = () => (
    <Tabs.Root defaultValue={defaultValue} {...props}>
      <Tabs.List>
        {React.Children.map(children, (child: any, index) => {
          return (
            <Tabs.Trigger value={`${index}`}>{child?.props.title}</Tabs.Trigger>
          )
        })}
      </Tabs.List>

      {React.Children.map(children, (child, index) => {
        return <Tabs.Content value={`${index}`}>{child} </Tabs.Content>
      })}
    </Tabs.Root>
  )

  return <>{magic ? <Element /> : <Element />}</>
}

export default BPTabs
