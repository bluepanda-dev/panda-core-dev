export type SIZE = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export type TYPE =
  | 'default'
  | 'danger'
  | 'caution'
  | 'success'
  | 'primary'
  | 'secondary'
  | 'light'
  | 'link'

export const DEFAULT_TYPE = 'default'

export const DEFAULT_SIZE = 'md'

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
  lg: 'rounded-3xl',
  xl: 'rounded-3xl',
}

export const TYPES = {
  default: {
    color: 'text-primary-600',
    border: 'border border-primary-600 hover:border-primary-400',
    bg: 'bg-white dark:bg-black  hover:bg-black/70',
    other:
      'active:bg-primary-700 focus:outline-none focus:ring focus:ring-primary-400',
    outline: '',
  },
  primary: {
    color: 'text-white',
    border: 'border border-transparent',
    bg: 'bg-primary-800 hover:bg-primary-700/70',
    other:
      'active:bg-primary-700 focus:outline-none focus:ring focus:ring-primary-400',
    outline: '',
  },
  secondary: {
    color: 'text-white',
    border: '',
    bg: 'bg-secondary-800  hover:bg-secondary-700/70',
    other:
      'active:bg-secondary-700 focus:outline-none focus:ring focus:ring-secondary-400',
    outline:
      'bg-white dark:bg-black border border-secondary-600 text-secondary-600 hover:border-secondary-500 hover:text-secondary-500',
  },
  success: {
    color: 'text-white',
    border: '',
    bg: 'bg-green-500 hover:bg-green-700/70',
    other:
      'active:bg-green-700 focus:outline-none focus:ring focus:ring-green-400',
    outline:
      'bg-white dark:bg-black border border-green-600 text-green-600 hover:border-green-500 hover:text-green-500',
  },
  danger: {
    color: 'text-white',
    border: '',
    bg: 'bg-red-600 hover:bg-red-700/70',
    other: 'active:bg-red-700 focus:outline-none focus:ring focus:ring-red-400',
    outline:
      'bg-white dark:bg-black border border-red-600 text-red-600 hover:border-red-500 hover:text-red-500',
  },
  caution: {
    color: 'text-white',
    border: 'border border-transparent',
    bg: 'bg-orange-500 hover:bg-orange-700/70',
    other:
      'active:bg-orange-700 focus:outline-none focus:ring focus:ring-orange-400',
    outline: '',
  },
  light: {
    color: '',
    border: 'border border-transparent',
    bg: 'bg-neutral-500 hover:bg-neutral-700/70',
    other:
      'active:bg-neutral-700 focus:outline-none focus:ring focus:ring-neutral-400',
    outline: '',
  },
  link: {
    color: 'text-blue-600 underline',
    border: 'border border-transparent',
    bg: 'bg-transparent',
    other:
      'active:bg-primary-700 focus:outline-none focus:ring focus:ring-primary-400',
    outline: '',
  },
}
