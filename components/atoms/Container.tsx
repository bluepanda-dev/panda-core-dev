type ContainerProps = {
  className?: string
}

export default function Container({ className }: ContainerProps) {
  return (
    <div
      className={`border-neutral-200 dark:border-neutral-900 text-center border-dashed border-4 h-full w-full rounded-md flex items-center justify-center ${className}`}
    >
      <span>Your Content Here</span>
    </div>
  )
}
