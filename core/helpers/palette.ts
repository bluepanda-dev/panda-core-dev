import { UIBaseConfig, UI_TYPE, UI_TYPES_CONFIG } from '@core/types/ui-kit'

export type PaletteConfigValue = {
  color: string
  bg: string
  focus: string
  border: string
  link: string
  placeholder: string
  hover: string
  baseColor: string
}

export type PaletteConfig = {
  [x: string]: Record<UI_TYPE, PaletteConfigValue>
}

export type PaletteSuperSetsType = 'normal' | 'outline'

export const paletteSuperSets: PaletteSuperSetsType[] = ['outline', 'normal']

function buildOutlinePalette({
  baseColor,
  isLink,
  placeholderColor,
  textColorOutline,
}: UIBaseConfig) {
  const color = () => {
    if (textColorOutline) {
      return textColorOutline
    } else if (!baseColor) {
      return `text-normal-400 `
    } else {
      return `text-${baseColor}-600`
    }
  }
  const placeholder = () => {
    if (placeholderColor) {
      return `placeholder:italic ${placeholderColor}`
    } else if (!baseColor) {
      return `placeholder:italic placeholder:text-black dark:placeholder:text-normal-100`
    } else {
      return `placeholder:italic placeholder:text-${baseColor}-700 dark:placeholder:text-${baseColor}-900`
    }
  }
  const hover = () => {
    if (baseColor === 'normal') {
      return `hover:bg-${baseColor}-50 dark:hover:bg-${baseColor}-800`
    }
    return !baseColor
      ? `hover:bg-normal-10 dark:hover:bg-normal-800 hover:text-normal-100`
      : `hover:bg-${baseColor}-400/20 dark:hover:bg-${baseColor}-960  hover:border-${baseColor}-500  hover:text-${baseColor}-700`
  }
  const link = isLink && 'underline'
  const focus = `active:bg-${baseColor}-700 focus:outline-none focus:ring focus:ring-${baseColor}-400 ring-inset`
  const bg = `bg-white dark:bg-black`
  const border = baseColor
    ? ` border border-${baseColor}-400 dark:border-${baseColor}-700 `
    : `border border-normal-400 dark:border-white`

  return {
    color: color(),
    placeholder: placeholder(),
    hover: hover(),
    border,
    bg,
    focus,
    link,
    baseColor,
  }
}

function buildPalette({
  baseColor,
  isLink,
  hasBorder,
  textColor,
  placeholderColor,
}: UIBaseConfig) {
  const color = () => {
    if (textColor) {
      return textColor
    } else if (!baseColor) {
      return `text-normal-800 dark:text-normal-50`
    } else {
      return `text-white dark:text-normal-900`
    }
  }
  const placeholder = () => {
    if (placeholderColor) {
      return `placeholder:italic ${placeholderColor}`
    } else if (!baseColor) {
      return `placeholder:italic placeholder:text-text-normal-400 dark:placeholder:text-normal-100`
    } else {
      return `placeholder:italic placeholder:text-normal-600 dark:placeholder:text-normal-700`
    }
  }
  const hover = () => {
    if (baseColor === 'normal') {
      return `hover:bg-${baseColor}-300 dark:hover:bg-${baseColor}-700`
    }
    return !baseColor
      ? `hover:bg-normal-10 dark:hover:bg-normal-800`
      : ` hover:bg-${baseColor}-700 dark:hover:bg-${baseColor}-500`
  }

  const bg = !baseColor ? 'bg-white dark:bg-black' : `bg-${baseColor}-600`
  const focus = `active:bg-${baseColor}-700 focus:outline-none focus:ring focus:ring-${baseColor}-400 ring-inset`
  const border =
    !baseColor && hasBorder
      ? 'border border-black dark:border-white'
      : hasBorder && `border border-${baseColor}-600`
  const link = isLink && 'underline'

  return {
    color: color(),
    placeholder: placeholder(),
    hover: hover(),
    border,
    bg,
    focus,
    link,
    baseColor,
  }
}

function buildPaletteBySet(
  superSet: PaletteSuperSetsType,
  config: UIBaseConfig,
) {
  if (superSet === 'outline') {
    return buildOutlinePalette(config)
  }
  if (superSet === 'normal') {
    return buildPalette(config)
  }
  return {}
}

export const palette: PaletteConfig = paletteSuperSets.reduce(
  (atype, ctype) => ({
    ...(atype as any),
    [ctype]: Object.keys(UI_TYPES_CONFIG).reduce((acc, curr) => {
      const config = UI_TYPES_CONFIG[curr as UI_TYPE]
      return { ...acc, [curr]: buildPaletteBySet(ctype, config) }
    }, {} as Record<UI_TYPE, PaletteConfigValue>),
  }),
  {},
)

export function getPalette(superSet: PaletteSuperSetsType, type: UI_TYPE) {
  return palette[superSet][type]
}

export function getMagicPalette() {
  return `hover:opacity-90 ring-inset active:bg-yellow-700 focus-within:outline-none focus-within:ring focus-within:ring-purple-400 p-[3px] bg-gradient-to-r from-purple-600 from-10% via-sky-500 via-30% via-red-500 via-60% via-orange-500 via-80% to-yellow-500 to-90%`
}

export function getMagicText() {
  return `text-transparent bg-clip-text bg-gradient-to-r from-purple-400 from-pink-600 to-accent-600`
}
