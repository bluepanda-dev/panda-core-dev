import React from 'react'

type ButtonProps = {
  icon?: React.ReactNode
  children: React.ReactNode
  className?: string
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
        className={`h-10 items-center hover:bg-neutral-800 inline-flex w-full justify-center rounded-sm gap-2 px-4 py-2 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 ${className}`}
      >
        {icon && <i>{icon}</i>}
        <div className="text-lg">{children}</div>
      </button>
    )
  },
)

Button.displayName = 'Button'

export default Button
