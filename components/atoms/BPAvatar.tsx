import * as Avatar from '@radix-ui/react-avatar'
import classNames from 'classnames'
import React from 'react'
import {
  getMagicPalette,
  getMagicText,
  getPalette,
} from '@core/helpers/palette'
import {
  AVATAR_SIZE,
  DEFAULT_SIZE,
  ICON_SIZE,
  PADDINGS,
  PADDINGS_X,
  ROUNDED,
  SIZE,
  SIZES,
  UI_DEFAULT_TYPE,
  UI_TYPE,
} from '@core/types/ui-kit'

type BPAvatarProps = {
  children?: React.ReactNode
  url?: string
  text?: string
  size?: SIZE
  type?: UI_TYPE
  outline?: boolean
  magic?: boolean
  [x: string]: any
}

const BPAvatar = ({
  children,
  size = DEFAULT_SIZE,
  type = UI_DEFAULT_TYPE,
  outline = false,
  magic = false,
  url = undefined,
  text = '',
  ...props
}: BPAvatarProps) => {
  const superSet = outline ? 'outline' : 'normal'
  const palette = getPalette(superSet, type)
  const magicPalette = getMagicPalette()

  const elementClass = classNames({
    [`text-${size === 'md' ? 'base' : size}`]: true,
    //[`w-${SIZES[size]} h-${SIZES[size]}`]: true,
    [`${AVATAR_SIZE[size]}`]: true,
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

  const Element = () => (
    <Avatar.Root className={elementClass}>
      <Avatar.Image className="AvatarImage" src={url} {...props} />
      <Avatar.Fallback
        className={classNames(titleClass, 'AvatarFallback')}
        delayMs={600}
      >
        {text}
      </Avatar.Fallback>
    </Avatar.Root>
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

export default BPAvatar
