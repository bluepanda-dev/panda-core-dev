import '!style-loader!css-loader!postcss-loader!tailwindcss/tailwind.css'
import '../styles/globals.css'
import './sb.css'

export const parameters = {
  themes: {
    clearable: false,
    list: [
      {
        name: 'Light',
        class: [],
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
}
