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
        h-10 items-center hover:bg-neutral-100 dark:hover:bg-normal-700 inline-flex w-full justify-center rounded-sm gap-2 px-4 py-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75
        ${
          isSpecial
            ? 'h-12 text-neutral-50 bg-primary-600 shadow-lg shadow-primary-700/50 dark:hover:bg-primary-500 hover:!bg-primary-500'
            : ''
        }
        ${isSmall ? 'h-8 text-sm' : ''}
        ${className}`}
      >
        {loading && <FiLoader className="animate-spin" />}
        {!loading && icon && <i>{icon}</i>}
        {!loading && children && (
          <div className={`text-lg ${isSmall ? 'text-sm' : ''} `}>
            {children}
          </div>
        )}
      </button>
    )
  },
)

Button.displayName = 'Button'

export default Button
