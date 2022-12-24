type ContainerProps = {
  className?: string
  title?: string
  children?: React.ReactNode
}

export default function Container({
  className,
  title,
  children,
}: ContainerProps) {
  return (
    <div
      className={`text-neutral-200 dark:text-neutral-900  border-neutral-200 dark:border-neutral-900 text-center border-dashed border-4 rounded-md flex items-center justify-center ${className}`}
    >
      {children ? children : <span>{title ?? 'Your Content Here'}</span>}
    </div>
  )
}
