import { useTranslation } from 'next-i18next'

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
  const { t } = useTranslation()

  return (
    <div
      className={`text-neutral-200 dark:text-neutral-400  border-neutral-200 dark:border-neutral-900 text-center border-dashed border-4 rounded-md flex items-center justify-center ${className}`}
    >
      {children ? children : <span>{title ?? t('content')}</span>}
    </div>
  )
}
