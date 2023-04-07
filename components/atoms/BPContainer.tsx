import classNames from 'classnames'
import { SIZE } from '@core/types/ui-kit'

type BPContainerProps = {
  title?: string
  children?: React.ReactNode
  size?: SIZE
  [x: string]: any
}

export default function BPContainer({
  children,
  size = 'md',
  ...props
}: BPContainerProps) {
  const containerClass = classNames({
    [`max-w-4xl`]: size === 'md',
    [`max-w-2xl`]: size === 'sm',
    [`max-w-xl`]: size === 'xs',
    [`max-w-5xl`]: size === 'lg',
    [`max-w-6xl`]: size === 'xl',
    [props.className]: props.className,
  })

  return <div className={containerClass}>{children}</div>
}
