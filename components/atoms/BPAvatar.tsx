import * as Avatar from '@radix-ui/react-avatar'
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
  ROUNDED,
  SIZE,
  UI_DEFAULT_VARIANT,
  UI_VARIANT,
} from '@core/types/ui-kit'

type BPAvatarProps = {
  url?: string
  text?: string
  size?: SIZE
  variant?: UI_VARIANT
  outline?: boolean
  magic?: boolean
  [x: string]: any
}

const BPAvatar = ({
  size = DEFAULT_SIZE,
  variant = UI_DEFAULT_VARIANT,
  outline = false,
  magic = false,
  url = undefined,
  text = '',
  ...props
}: BPAvatarProps) => {
  const superSet = outline ? 'outline' : 'normal'
  const palette = getPalette(superSet, variant)
  const magicPalette = getMagicPalette()

  const elementClass = classNames({
    [`text-${size === 'md' ? 'base' : size}`]: true,
    [`${ICON_SIZE[size]}`]: true,
    [`${ROUNDED[size]}`]: true,
    [`${palette.focus}`]: true,
    [`${palette.border}`]: !magic,
    [`${palette.link}`]: true,
    [`${palette.color}`]: true,
    [`${palette.bg}`]: true,
    [`${palette.hover}`]: !magic,
    'transition ease-in-out': true,
    'AvatarRoot whitespace-nowrap flex items-center gap-2': true,
    'border-2': !magic,
    [props.className]: props.className,
  })

  const wrapperClass = classNames({
    [`${ROUNDED[size]} ${magicPalette} p-px`]: true,
  })

  const magicText = getMagicText()
  const titleClass = classNames({
    [magicText]: magic,
  })

  return (
    <>
      {magic ? (
        <div className={wrapperClass}>
          <Avatar.Root className={elementClass}>
            <Avatar.Image className="AvatarImage" src={url} {...props} />
            <Avatar.Fallback
              className={classNames(titleClass, 'AvatarFallback')}
              delayMs={600}
            >
              {text}
            </Avatar.Fallback>
          </Avatar.Root>
        </div>
      ) : (
        <Avatar.Root className={elementClass}>
          <Avatar.Image className="AvatarImage" src={url} {...props} />
          <Avatar.Fallback
            className={classNames(titleClass, 'AvatarFallback')}
            delayMs={600}
          >
            {text}
          </Avatar.Fallback>
        </Avatar.Root>
      )}
    </>
  )
}

export default BPAvatar
