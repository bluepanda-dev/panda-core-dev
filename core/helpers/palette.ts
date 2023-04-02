import { UIBaseConfig, UI_TYPE, UI_TYPES_CONFIG } from '@core/types/ui-kit'

export type PaletteConfigValue = {
  color: string
  bg: string
  focus: string
  outline: string
  border: string
  link: string
  placeholder: string
}

export type PaletteConfig = {
  [x: string]: Record<UI_TYPE, PaletteConfigValue>
}

export type PaletteSuperSetsType = 'normal' | 'outline'

export const paletteSuperSets: PaletteSuperSetsType[] = ['outline', 'normal']

const DEFAULT_HOVER_BG = 'hover:bg-normal-10 dark:hover:bg-normal-800'

function buildOutlinePalette({
  baseColor,
  isLink,
  placeholderColor,
  textColor,
}: UIBaseConfig) {
  const color = () => {
    if (textColor) {
      return textColor
    } else if (!baseColor) {
      return `text-normal-400 hover:text-normal-100`
    } else {
      return `text-${baseColor}-600 hover:text-${baseColor}-700`
    }
  }
  const outline = `border border-${baseColor}-600  hover:border-${baseColor}-500  `
  const placeholder = () => {
    if (placeholderColor) {
      return `placeholder:italic ${placeholderColor}`
    } else if (!baseColor) {
      return `placeholder:italic placeholder:text-black dark:placeholder:text-normal-100`
    } else {
      return `placeholder:italic placeholder:text-${baseColor}-700 dark:placeholder:text-${baseColor}-900`
    }
  }
  const link = isLink && 'underline'
  const focus = `active:bg-${baseColor}-700 focus:outline-none focus:ring focus:ring-${baseColor}-400 ring-inset`

  return {
    color: color(),
    bg: `bg-white dark:bg-black dark:hover:bg-${baseColor}-900/30`,
    focus,
    outline: !baseColor
      ? `bg-white dark:bg-black border border-black dark:border-white hover:opacity-90 ${DEFAULT_HOVER_BG}`
      : outline,
    link,
    border: '',
    placeholder: placeholder(),
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
      return `text-normal-800 dark:text-normal-50 ${DEFAULT_HOVER_BG}`
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
      return `placeholder:italic placeholder:text-normal-400 dark:placeholder:text-normal-700`
    }
  }

  const bg = `bg-${baseColor}-600 hover:bg-${baseColor}-700 dark:hover:bg-${baseColor}-500`
  const focus = `active:bg-${baseColor}-700 focus:outline-none focus:ring focus:ring-${baseColor}-400 ring-inset`
  const border = hasBorder && `border border-${baseColor}-600`
  const link = isLink && 'underline'

  return {
    color: color(),
    bg: !baseColor ? 'bg-white dark:bg-black' : bg,
    focus,
    link,
    border:
      !baseColor && hasBorder
        ? 'border border-black dark:border-white'
        : border,
    placeholder: placeholder(),
    outline: '',
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
  return `ring-inset active:bg-yellow-700 focus-within:outline-none focus-within:ring focus-within:ring-purple-400 p-[3px] bg-gradient-to-r from-purple-600 from-10% via-sky-500 via-30% via-red-500 via-60% via-orange-500 via-80% to-yellow-500 to-90%`
}
