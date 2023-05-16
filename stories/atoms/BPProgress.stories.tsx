import { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import BPProgress from '@components/atoms/BPProgress'
import { UI_TYPES_CONFIG, UI_VARIANT } from '@core/types/ui-kit'
import { hideControl } from '@core/utils/storybook'

export default {
  title: 'Atoms/BPProgress',
  component: BPProgress,
  argTypes: {
    size: hideControl,
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
  render: ({ ...args }: any) => <BPDefaultProgress {...args} />,
}

export const Types: Story = {
  render: () => (
    <div className="w-full  gap-16 md:flex block overflow-y-auto h-[90vh] px-12 md:px-0">
      <div className="flex flex-col gap-8 items-center">
        <div className="text-xl text-primary-600">Normal </div>
        {Object.keys(UI_TYPES_CONFIG)
          .filter((key) => key !== 'inverted')
          .map((key, index) => (
            <BPDefaultProgress key={index} variant={key as UI_VARIANT} />
          ))}
      </div>

      <div className="flex flex-col gap-8 items-center">
        <div className="text-xl text-primary-600">Outlined </div>
        {Object.keys(UI_TYPES_CONFIG)
          .filter((key) => key !== 'inverted')
          .map((key, index) => (
            <BPDefaultProgress
              outline
              key={index}
              variant={key as UI_VARIANT}
            />
          ))}
        <BPDefaultProgress magic outline>
          Magic
        </BPDefaultProgress>
      </div>
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="flex gap-6 flex-col">
      <BPDefaultProgress className="w-24 h-4" />
      <BPDefaultProgress className="w-32 h-4" />
      <BPDefaultProgress className="w-48 h-4" />
      <BPDefaultProgress className="w-60 h-4" />
      <BPDefaultProgress className="w-80 h-4" />
      <BPDefaultProgress className="w-80 h-8" />
    </div>
  ),
}
