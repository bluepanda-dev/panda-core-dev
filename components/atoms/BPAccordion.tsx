import * as Accordion from '@radix-ui/react-accordion'
import classNames from 'classnames'
import React from 'react'
import { FiChevronDown } from 'react-icons/fi'
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
  UI_DEFAULT_TYPE,
  UI_TYPE,
} from '@core/types/ui-kit'

type BPAccordionProps = {
  children: React.ReactNode
  size?: SIZE
  type?: UI_TYPE
  outline?: boolean
  magic?: boolean
  defaultValue?: string
  [x: string]: any
}

export const BPAccordionItem = ({ children, value, ...props }: any) => (
  <Accordion.Item value={value}>
    {React.Children.map(children, (child) => {
      return React.cloneElement(child as React.ReactElement<any>, { ...props })
    })}
  </Accordion.Item>
)

export const AccordionTrigger = React.forwardRef<any, any>(
  ({ children, className, palette, size, magic, ...props }, forwardedRef) => {
    const elementClass = classNames({
      [`${palette?.color}`]: true,
      [`${palette?.bg}`]: true,
      [`${palette?.hover}`]: !magic,
      [`${palette.link}`]: true,
      [`p-${PADDINGS[size as SIZE]}`]: true,
      [`px-${PADDINGS_X[size as SIZE]}`]: true,
    })
    const magicText = getMagicText()
    const titleClass = classNames({
      [magicText]: magic,
    })

    return (
      <Accordion.Header className={elementClass}>
        <Accordion.Trigger
          className={classNames(
            'AccordionTrigger w-full flex justify-between items-center',
            className,
            titleClass,
          )}
          {...props}
          ref={forwardedRef}
        >
          {children}
          <FiChevronDown className="AccordionChevron" aria-hidden />
        </Accordion.Trigger>
      </Accordion.Header>
    )
  },
)

export const AccordionContent = React.forwardRef<HTMLInputElement, any>(
  ({ children, className, palette, size, ...props }, forwardedRef) => {
    const elementClass = classNames({
      [`p-${PADDINGS[size as SIZE]}`]: true,
      [`px-${PADDINGS_X[size as SIZE]}`]: true,
      ['AccordionContent transition-all ease-in-out bg-white dark:bg-black']:
        true,
    })

    return (
      <Accordion.Content className={elementClass} {...props} ref={forwardedRef}>
        <div className="AccordionContentText transition-all ease-in-out">
          {children}
        </div>
      </Accordion.Content>
    )
  },
)

const BPAccordion = ({
  children,
  size = DEFAULT_SIZE,
  type = UI_DEFAULT_TYPE,
  outline = false,
  magic = false,
  defaultValue = '0',
  ...props
}: BPAccordionProps) => {
  const superSet = outline ? 'outline' : 'normal'
  const palette = getPalette(superSet, type)
  const magicPalette = getMagicPalette()

  const elementClass = classNames({
    [`text-${size === 'md' ? 'base' : size}`]: true,
    'transition ease-in-out whitespace-nowrap': true,
    [`${palette.border}`]: true,
    [props.className]: props.className,
  })

  const wrapperClass = classNames({
    [`rounded-sm ${magicPalette}`]: true,
  })

  const Element = () => (
    <Accordion.Root
      className={elementClass}
      type="single"
      defaultValue={defaultValue}
      collapsible
    >
      {React.Children.map(children, (child) => {
        return React.cloneElement(child as React.ReactElement<any>, {
          palette,
          size,
          magic,
        })
      })}
    </Accordion.Root>
  )

  return (
    <>
      {magic ? (
        <div className={wrapperClass}>
          <Element />
        </div>
      ) : (
        <Element />
      )}
    </>
  )
}

export default BPAccordion
