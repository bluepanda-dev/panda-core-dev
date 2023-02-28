type SimpleHeaderProps = {
  title: React.ReactNode
  className?: string
  extra?: React.ReactNode
}

export default function SimpleHeaderProps({
  title,
  className = '',
  extra,
}: SimpleHeaderProps) {
  return (
    <div
      className={`rounded-sm border-2 justify-between border-neutral-200 dark:border-neutral-800 p-6 w-full items-center flex gap-4 ${className}`}
    >
      <div>{title}</div>
      <div>{extra}</div>
    </div>
  )
}
