import React from 'react'

type ButtonProps = {
  icon?: React.ReactNode
  children?: React.ReactNode
  className?: string
  isSpecial?: boolean
  role?: string
  title?: string
  label?: string
  onClick?: () => void
}

const Button = React.forwardRef(
  (
    {
      children,
      className = '',
      icon = null,
      isSpecial = false,
      role = '',
      label = '',
      title = '',
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
        className={`
        h-10 items-center hover:bg-neutral-800 inline-flex w-full justify-center rounded-sm gap-2 px-4 py-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75
        ${
          isSpecial
            ? 'h-12 text-neutral-50 bg-primary-600 shadow-lg shadow-primary-700/50 hover:bg-primary-500'
            : ''
        }
        ${className}`}
      >
        {icon && <i>{icon}</i>}
        {children && <div className="text-lg">{children}</div>}
      </button>
    )
  },
)

Button.displayName = 'Button'

export default Button
