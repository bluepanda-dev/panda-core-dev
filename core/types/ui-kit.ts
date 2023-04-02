export type SIZE = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export interface UIBaseConfig {
  baseColor: string | null
  textColor?: string
  placeholderColor?: string
  hasBorder?: boolean
  isLink?: boolean
}
export type UI_TYPE =
  | 'default'
  | 'danger'
  | 'caution'
  | 'success'
  | 'primary'
  | 'secondary'
  | 'light'
  | 'link'

export type UIConfig = Record<UI_TYPE, UIBaseConfig>

export const UI_TYPES_CONFIG: UIConfig = {
  default: {
    baseColor: 'normal',
    hasBorder: false,
    textColor: 'text-normal-50',
    placeholderColor: 'dark:placeholder:text-normal-100',
  },
  danger: { baseColor: 'red', hasBorder: true },
  caution: { baseColor: 'orange', hasBorder: true },
  success: { baseColor: 'green', hasBorder: true },
  primary: { baseColor: 'primary', hasBorder: true },
  secondary: { baseColor: 'secondary', hasBorder: true },
  light: { baseColor: 'neutral', hasBorder: true },
  link: {
    baseColor: '',
    hasBorder: false,
    isLink: true,
    textColor: 'text-normal-400 dark:text-normal-50',
    placeholderColor: 'dark:placeholder:text-normal-100',
  },
}

export const UI_DEFAULT_TYPE = 'default'

export const DEFAULT_SIZE = 'md'

// some general configurations to create components
export const SIZES = {
  xs: 24,
  sm: 28,
  md: 32,
  lg: 40,
  xl: 48,
}

export const PADDINGS = {
  xs: 1,
  sm: 2,
  md: 2,
  lg: 2,
  xl: 2,
}
export const PADDINGS_X = {
  xs: 2,
  sm: 4,
  md: 4,
  lg: 6,
  xl: 6,
}

export const ROUNDED = {
  xs: 'rounded-2xl',
  sm: 'rounded-3xl',
  md: 'rounded-3xl',
  lg: 'rounded-full',
  xl: 'rounded-full',
}

export const ICON_SIZE = {
  xs: 'h-5 w-5',
  sm: 'h-6 w-6',
  md: 'h-8 w-8',
  lg: 'h-8 w-8',
  xl: 'h-12 w-12',
}
