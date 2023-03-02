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
      className={`rounded-sm justify-between border-neutral-200 dark:border-neutral-800 p-6 w-full items-center flex gap-4 border-x-0 border-t-0 border-0 border-b ${className}`}
    >
      <div>{title}</div>
      <div>{extra}</div>
    </div>
  )
}
