export type BreakPoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'

export const breakpoints: Record<number, BreakPoint> = {
  0: 'xs',
  640: 'sm',
  768: 'md',
  1024: 'lg',
  1280: 'xl',
  1536: '2xl',
}
