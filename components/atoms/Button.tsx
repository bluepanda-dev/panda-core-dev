import React from 'react'
import { FiLoader } from 'react-icons/fi'

type ButtonProps = {
  icon?: React.ReactNode
  children?: React.ReactNode
  className?: string
  isSpecial?: boolean
  role?: string
  title?: string
  label?: string
  loading?: boolean
  isSmall?: boolean
  isInverted?: boolean
  onClick?: () => void
}

const Button = React.forwardRef(
  (
    {
      children,
      className = '',
      icon = null,
      isSpecial = false,
      isSmall = false,
      isInverted = false,
      role = '',
      label = '',
      title = '',
      loading = false,
      onClick = () => {},
    }: ButtonProps,
    ref: any,
  ) => {
    return (
      <button
        ref={ref}
        onClick={onClick}
        role={role}
        aria-label={label}
        title={title}
        disabled={loading}
        className={`
        transition-colors h-10 items-center inline-flex w-full justify-center rounded-sm gap-2 px-4 py-2
        ${isSpecial ? 'ui-special-button' : 'ui-normal-button'}
        ${isSmall && '!h-8 !text-sm'}
        ${isInverted && 'ui-inverted-button'}
        ${className}`}
      >
        {loading && <FiLoader className="animate-spin" />}
        {!loading && icon && <i>{icon}</i>}
        {!loading && children && (
          <span className={`text-lg ${isSmall ? '!text-xs' : ''} `}>
            {children}
          </span>
        )}
      </button>
    )
  },
)

Button.displayName = 'Button'

export default Button
