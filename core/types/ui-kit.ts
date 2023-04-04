export type SIZE = 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export interface UIBaseConfig {
  baseColor: string | null
  textColor?: string
  textColorOutline?: string
  placeholderColor?: string
  hasBorder?: boolean
  isLink?: boolean
}
export type UI_TYPE =
  | 'default'
  | 'danger'
  | 'cyber'
  | 'caution'
  | 'success'
  | 'primary'
  | 'secondary'
  | 'accent'
  | 'light'
  | 'link'

export type UIConfig = Record<UI_TYPE, UIBaseConfig>

export const UI_TYPES_CONFIG: UIConfig = {
  default: {
    baseColor: 'normal',
    hasBorder: true,
    textColor: 'text-white dark:text-normal-50',
    textColorOutline: 'text-normal-200 dark:text-normal-50',
    placeholderColor: 'dark:placeholder:text-normal-100',
  },
  danger: { baseColor: 'red', hasBorder: true },
  cyber: { baseColor: 'indigo', hasBorder: true },
  caution: { baseColor: 'orange', hasBorder: true },
  accent: { baseColor: 'accent', hasBorder: true },
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
  xxs: 1,
  xs: 1,
  sm: 2,
  md: 2,
  lg: 2,
  xl: 2,
}
export const PADDINGS_X = {
  xxs: 1,
  xs: 2,
  sm: 4,
  md: 4,
  lg: 6,
  xl: 6,
}

export const ROUNDED = {
  xxs: 'rounded-xl',
  xs: 'rounded-2xl',
  sm: 'rounded-3xl',
  md: 'rounded-3xl',
  lg: 'rounded-full',
  xl: 'rounded-full',
}

export const ICON_SIZE = {
  xxs: 'h-4 w-4',
  xs: 'h-5 w-5',
  sm: 'h-6 w-6',
  md: 'h-8 w-8',
  lg: 'h-8 w-8',
  xl: 'h-12 w-12',
}

export const AVATAR_SIZE = {
  xxs: 'h-7 w-7',
  xs: 'h-8 w-8',
  sm: 'h-10 w-10',
  md: 'h-12 w-12',
  lg: 'h-16 w-16',
  xl: 'h-24 w-24',
}

export const H_ELEMENT = {
  xl: 'h1',
  lg: 'h2',
  md: 'h3',
  sm: 'h4',
  xs: 'h5',
  xxs: 'h6',
}

export const H_ELEMENT_SIZE = {
  xl: 'text-6xl',
  lg: 'text-4xl',
  md: 'text-3xl',
  sm: 'text-2xl',
  xs: 'text-xl',
  xxs: 'text-lg',
}
