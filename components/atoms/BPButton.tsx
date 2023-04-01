import classNames from 'classnames'
import React from 'react'
import { FiLoader } from 'react-icons/fi'
import { MagicContainer, Palette } from '@core/helpers/palette'
import {
  DEFAULT_SIZE,
  PADDINGS,
  PADDINGS_X,
  ROUNDED,
  SIZE,
  UI_DEFAULT_TYPE,
  UI_TYPE,
} from '@core/types/ui-kit'

type BPButtonProps = {
  icon?: React.ReactNode
  children?: React.ReactNode
  isLoading?: boolean
  isDisabled?: boolean
  size?: SIZE
  type?: UI_TYPE
  outline?: boolean
  magic?: boolean
  onClick?: () => void
}

const BPButton = ({
  children,
  icon = null,
  size = DEFAULT_SIZE,
  type = UI_DEFAULT_TYPE,
  outline = false,
  magic = false,
  isLoading = false,
  isDisabled = false,
  onClick = () => {},
}: BPButtonProps) => {
  const buttonClass = classNames({
    [`text-${size === 'md' ? 'base' : size}`]: true,
    [`p-${PADDINGS[size]}`]: true,
    [`px-${PADDINGS_X[size]}`]: true,
    [`${ROUNDED[size]}`]: true,
    [`${Palette[type].focus}`]: true,
    [`${Palette[type].border}`]: !magic,
    [`${Palette[type].link}`]: true,
    [`${Palette[type].color}`]: !outline,
    [`${Palette[type].bg}`]: !outline,
    [`${Palette[type].outline}`]: outline,
    'transition ease-in-out': true,
    'whitespace-nowrap flex items-center gap-2': true,
    'select-none cursor-not-allowed': isDisabled || isLoading,
  })

  const Button = () => (
    <button onClick={onClick} className={buttonClass}>
      {isLoading && <FiLoader className="animate-spin" />}
      {!isLoading && icon && <i>{icon}</i>}
      {!isLoading && children && <span>{children}</span>}
    </button>
  )

  return (
    <>
      {magic ? (
        <div className={`${ROUNDED[size]} ${MagicContainer}`}>
          <Button />
        </div>
      ) : (
        <Button />
      )}
    </>
  )
}

export default BPButton
