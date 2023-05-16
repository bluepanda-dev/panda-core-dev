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
import * as Accordion from '@radix-ui/react-accordion'
import classNames from 'classnames'
import React from 'react'
import { FiChevronDown } from 'react-icons/fi'

type BPAccordionProps = {
  children: React.ReactNode
  size?: SIZE
  variant?: UI_VARIANT
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

export const BPAccordionTrigger = React.forwardRef<any, any>(
  ({ children, className, palette, size, magic, ...props }, forwardedRef) => {
    const elementClass = classNames({
      [`text-${size === 'md' ? 'base' : size}`]: true,
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

export const BPAccordionContent = React.forwardRef<HTMLInputElement, any>(
  ({ children, size, magic, ...props }, forwardedRef) => {
    const elementClass = classNames({
      [`text-${size === 'md' ? 'base' : size}`]: true,
      [`p-${PADDINGS[size as SIZE]}`]: true,
      [`px-${PADDINGS_X[size as SIZE]}`]: true,
      ['AccordionContent transition-all ease-in-out bg-white dark:bg-black']:
        true,
      '': magic,
    })

    return (
      <Accordion.Content {...props} className={elementClass} ref={forwardedRef}>
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
  variant = UI_DEFAULT_VARIANT,
  outline = false,
  magic = false,
  defaultValue = '0',
  ...props
}: BPAccordionProps) => {
  const superSet = outline ? 'outline' : 'normal'
  const palette = getPalette(superSet, variant)
  const magicPalette = getMagicPalette()

  const elementClass = classNames({
    [`text-${size === 'md' ? 'base' : size}`]: true,
    'transition ease-in-out': true,
    [`${palette.border}`]: true,
    [props.className]: props.className,
  })

  const wrapperClass = classNames({
    [`rounded-sm ${magicPalette}`]: true,
  })

  return (
    <>
      {magic ? (
        <div className={wrapperClass}>
          <Accordion.Root
            {...props}
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
        </div>
      ) : (
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
      )}
    </>
  )
}

export default BPAccordion
