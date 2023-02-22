import React from 'react'

type PanelProps = {
  title: string
  description?: string
  type?: null | 'primary' | 'success' | 'danger' | 'warning'
  hints?: React.ReactNode
  children?: React.ReactNode
  footer?: React.ReactNode
}

export default function Card({
  title,
  description,
  type,
  hints,
  children,
  footer,
}: PanelProps) {
  let typeClass = ''
  switch (type) {
    case 'primary':
      typeClass = '!border-primary-500'
      break
    case 'success':
      typeClass = '!border-success-500'
      break
    case 'danger':
      typeClass = '!border-red-500'
      break
    case 'warning':
      typeClass = '!border-yellow-500'
      break
    default:
      break
  }

  return (
    <div
      className={`ui-border-group rounded-md w-full flex flex-col items-start ${typeClass}`}
    >
      <div className="flex flex-col p-6 gap-4 items-start">
        <div className="ui-title">{title}</div>
        {description && (
          <div className="ui-focus-text text-sm">{description}</div>
        )}
        <div className="">{children}</div>
      </div>
      {(footer || hints) && (
        <div className="border-t rounded-b-lg px-2 border-neutral-600 bg-neutral-100 dark:bg-normal-800 flex h-14 w-full items-center">
          {hints && (
            <div className="ml-4 w-full text-left hidden sm:block">{hints}</div>
          )}
          <div className="w-full flex justify-end gap-2">{footer}</div>
        </div>
      )}
    </div>
  )
}
