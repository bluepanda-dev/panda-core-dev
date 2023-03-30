const path = require('path')

module.exports = {
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    'storybook-addon-themes',
  ],
  stories: ['../stories/**/*.mdx', '../stories/**/*.stories.@(js|jsx|ts|tsx)'],
  framework: {
    name: '@storybook/nextjs',
    options: {
      nextConfigPath: '/Users/mbj/MGIT/panda/panda-core-dev/next.config.js',
    },
  },
  docs: {
    autodocs: true,
  },
  webpackFinal: async (config, { configType }) => {
    config.resolve = {
      ...config.resolve,
      fallback: {
        ...(config.resolve || {}).fallback,
        fs: false,
        stream: false,
        os: false,
      },
    }
    config.module.rules.push({
      test: /\.css$/,
      use: ['style-loader', 'css-loader'],
      include: path.resolve(__dirname, '../src'),
    })
    // Return the altered config
    return config
  },
}
