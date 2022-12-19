import { useEffect, useState } from 'react'

export const useTheme = () => {
  const [theme, setTheme] = useState('dark')

  useEffect(() => {
    if (
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.add('dark')
      setTheme('dark')
    } else {
      document.documentElement.classList.remove('dark')
      setTheme('light')
    }
  }, [])

  function themeDark() {
    localStorage.theme = 'dark'
    document.documentElement.classList.add('dark')
    document.documentElement.classList.remove('light')
    setTheme('dark')
  }

  function themeLight() {
    localStorage.theme = 'light'
    document.documentElement.classList.add('light')
    document.documentElement.classList.remove('dark')
    setTheme('light')
  }

  return {
    themeDark,
    themeLight,
    theme,
  }
}
