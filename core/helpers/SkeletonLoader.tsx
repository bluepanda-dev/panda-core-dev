import ContentLoader, { IContentLoaderProps } from 'react-content-loader'

export type ExtraSkeletonProps = IContentLoaderProps & {
  lines: number
}

const LINE_HEIGHT = 55
const LINE_WIDTH = 260

export const ListSkeleton = (props: ExtraSkeletonProps) => {
  return (
    <ContentLoader
      speed={2}
      viewBox={`0 0 ${props.lines * LINE_HEIGHT + 10} ${LINE_WIDTH}`}
      backgroundColor="#000"
      foregroundColor="gray"
      {...props}
    >
      {Array.from({ length: props.lines }).map((_, index) => (
        <rect
          key={index}
          x="0"
          y={index * LINE_HEIGHT}
          rx="4"
          ry="4"
          width="100%"
          height={LINE_HEIGHT - 10}
        />
      ))}
    </ContentLoader>
  )
}
