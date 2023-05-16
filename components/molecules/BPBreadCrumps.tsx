import classNames from 'classnames'
import { useRouter } from 'next/router'
import React from 'react'
import { FiChevronRight } from 'react-icons/fi'
import BPHeading from '@components/atoms/BPHeading'
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

type BPBreadCrumpsItem = {
  label: string
  to: string
}

type BPBreadCrumpsProps = {
  size?: SIZE
  variant?: UI_VARIANT
  outline?: boolean
  magic?: boolean
  hoverable?: boolean
  items?: BPBreadCrumpsItem[]
  [x: string]: any
}

const BPBreadCrumps = ({
  size = DEFAULT_SIZE,
  variant = UI_DEFAULT_VARIANT,
  outline = false,
  magic = false,
  hoverable = false,
  items = [],
  ...props
}: BPBreadCrumpsProps) => {
  const superSet = outline ? 'outline' : 'normal'
  const palette = getPalette(superSet, variant)
  const magicPalette = getMagicPalette()
  const router = useRouter()

  const elementClass = classNames({
    [`text-${size === 'md' ? 'base' : size}`]: true,
    [`${palette.focus}`]: true,
    [`${palette.border}`]: !magic,
    [`${palette.link}`]: true,
    [`${palette.color}`]: true,
    [`${palette.bg}`]: true,
    [`p-${PADDINGS[size as SIZE]}`]: true,
    [`px-${PADDINGS_X[size as SIZE]}`]: true,
    'relative whitespace-nowrap items-center flex justify-start w-full gap-2':
      true,
    [props.className]: props.className,
  })

  const wrapperClass = classNames({
    [`${magicPalette} !p-px`]: true,
  })

  const magicText = getMagicText()
  const titleClass = classNames({
    [magicText]: magic,
  })

  function goTo(path: string) {
    router.push(path)
  }

  const Element = () => (
    <div className={elementClass}>
      {items.map((item, index) => {
        return (
          <div className="items-center flex justify-start gap-2" key={index}>
            <BPHeading
              size={size}
              className={titleClass}
              onClick={() => goTo(item.to)}
              hoverable={hoverable}
            >
              {item.label}
            </BPHeading>
            {index < items.length - 1 && (
              <BPIcon
                outline={outline}
                borderless
                variant={variant}
                size={size}
              >
                <FiChevronRight />
              </BPIcon>
            )}
          </div>
        )
      })}
    </div>
  )

  return magic ? (
    <div className={wrapperClass}>
      <Element />
    </div>
  ) : (
    <Element />
  )
}

export default BPBreadCrumps
