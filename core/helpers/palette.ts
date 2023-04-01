import { UIBaseConfig, UI_TYPE, UI_TYPES_CONFIG } from '@core/types/ui-kit'

export type PaletteConfig = {
  color: string
  bg: string
  focus: string
  outline: string
  border: string
  link: string
}

const DEFAULT_HOVER_BG = 'hover:bg-normal-10 dark:hover:bg-normal-800'

function buildPalette({ baseColor, isLink, hasBorder }: UIBaseConfig) {
  const color = 'text-white dark:text-black'
  const bg = `bg-${baseColor}-600 hover:bg-${baseColor}-700 dark:hover:bg-${baseColor}-500`
  const focus = `active:bg-${baseColor}-700 focus:outline-none focus:ring focus:ring-${baseColor}-400`
  const outline = `bg-white dark:bg-black border border-${baseColor}-600 text-${baseColor}-600 hover:border-${baseColor}-500 hover:text-${baseColor}-700 ${DEFAULT_HOVER_BG}`

  const border = hasBorder && `border border-${baseColor}-600`
  const link = isLink && 'underline'

  return {
    color: !baseColor
      ? `text-normal-800 dark:text-normal-50 ${DEFAULT_HOVER_BG}`
      : color,
    bg: !baseColor ? 'bg-white dark:bg-black' : bg,
    focus,
    outline: !baseColor
      ? `bg-white dark:bg-black border border-black dark:border-white hover:opacity-90 ${DEFAULT_HOVER_BG}`
      : outline,
    link,
    border:
      !baseColor && hasBorder
        ? 'border border-black dark:border-white'
        : border,
  }
}

export const MagicContainer =
  'p-[3px] bg-gradient-to-r from-purple-600 from-10% via-sky-500 via-30% via-red-500 via-60% via-orange-500 via-80% to-yellow-500 to-90%'

export const Palette: Record<UI_TYPE, PaletteConfig> = Object.keys(
  UI_TYPES_CONFIG,
).reduce((acc, curr) => {
  const config = UI_TYPES_CONFIG[curr as UI_TYPE]
  return { ...acc, [curr]: buildPalette(config) }
}, {} as Record<UI_TYPE, PaletteConfig>)
