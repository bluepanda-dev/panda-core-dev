export type BreakPoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'

export const breakpointsWidths = [0, 640, 768, 1024, 1280, 1536]

export const breakpoints: Record<number, BreakPoint> = {
  [breakpointsWidths[0]]: 'xs',
  [breakpointsWidths[1]]: 'sm',
  [breakpointsWidths[2]]: 'md',
  [breakpointsWidths[3]]: 'lg',
  [breakpointsWidths[4]]: 'xl',
  [breakpointsWidths[5]]: '2xl',
}
