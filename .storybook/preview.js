import '../styles/globals.css'
import './sb.css'
import { themes } from '@storybook/theming'
import { I18nextProvider } from 'react-i18next'
import i18n from './i18n'

export const parameters = {
  themes: {
    clearable: false,
    list: [
      {
        name: 'Light',
        class: ['light'],
        color: '#ffffff',
      },
      {
        name: 'Dark',
        // The class dark will be added to the body tag
        class: ['dark'],
        color: '#000000',
        default: true,
      },
    ],
  },
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  docs: {
    theme: themes.dark,
  },
  decorators: [
    (Story) => (
      <I18nextProvider i18n={i18n}>
        <Story />
      </I18nextProvider>
    ),
  ],
}
