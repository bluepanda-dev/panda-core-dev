import { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import BPProgress from '@components/atoms/BPProgress'
import { UI_TYPES_CONFIG, UI_TYPE } from '@core/types/ui-kit'

export default {
  title: 'Atoms/BPProgress',
  component: BPProgress,
  argTypes: {
    size: {
      table: {
        disable: true,
      },
    },
  },
} as Meta<typeof BPProgress>

type Story = StoryObj<typeof BPProgress>

const BPDefaultProgress = ({ ...props }) => {
  const [progress, setProgress] = React.useState(13)

  React.useEffect(() => {
    const interval = setInterval(() => {
      setProgress(Math.floor(Math.random() * 100))
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return <BPProgress progress={progress} {...props} />
}

export const Basic: Story = {
  render: ({ children, ...args }: any) => <BPDefaultProgress {...args} />,
}

export const Types: Story = {
  render: () => (
    <div className="w-full flex gap-16">
      <div className="flex flex-col gap-8 items-center">
        <div className="text-xl text-primary-600">Normal </div>
        {Object.keys(UI_TYPES_CONFIG).map((key, index) => (
          <BPDefaultProgress key={index} type={key as UI_TYPE} />
        ))}
      </div>

      <div className="flex flex-col gap-8 items-center">
        <div className="text-xl text-primary-600">Outlined </div>
        {Object.keys(UI_TYPES_CONFIG).map((key, index) => (
          <BPDefaultProgress outline key={index} type={key as UI_TYPE} />
        ))}
        <BPDefaultProgress magic outline>
          Magic
        </BPDefaultProgress>
      </div>
    </div>
  ),
}
