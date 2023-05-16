import classNames from 'classnames'
import React from 'react'

type BPSkeletonLoaderProps = {
  children?: React.ReactNode
  icon?: React.ReactNode
  loading?: boolean
  height?: string
  width?: string
  [x: string]: any
}

const BPSkeletonLoader = ({
  children,
  loading = false,
  height = 'h-6',
  width = 'w-full',
  icon = null,
  ...props
}: BPSkeletonLoaderProps) => {
  const elementClass = classNames({
    'bg-normal-300 dark:bg-normal-700 rounded-md ': loading,
    'animate-pulse': loading,
    [height]: loading,
    [width]: loading,
    [props.className]: props.className,
  })

  const LoadingContainer = () =>
    icon ? (
      <span className="flex h-full w-full justify-center items-center text-4xl">
        {icon}
      </span>
    ) : (
      <span>&nbsp;</span>
    )

  return (
    <div className={elementClass}>
      {!loading ? children : <LoadingContainer />}
    </div>
  )
}

export default BPSkeletonLoader
