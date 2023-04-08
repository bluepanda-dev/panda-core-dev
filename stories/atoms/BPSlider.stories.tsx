import { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import BPSlider from '@components/atoms/BPSlider'
import { UI_TYPES_CONFIG, UI_TYPE } from '@core/types/ui-kit'

export default {
  title: 'Atoms/BPSlider',
  component: BPSlider,
  argTypes: {},
} as Meta<typeof BPSlider>

type Story = StoryObj<typeof BPSlider>

export const Basic: Story = {
  render: ({ children, ...args }: any) => <BPSlider {...args} />,
}

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <BPSlider className="w-10" onValueChange={console.log} />
      <BPSlider className="w-24" onValueChange={console.log} />
      <BPSlider className="w-60" onValueChange={console.log} />
      <BPSlider className="w-80" onValueChange={console.log} />
    </div>
  ),
}

export const Types: Story = {
  render: () => (
    <div className="w-full  gap-16 md:flex block overflow-y-auto h-[600px] px-12 md:px-0">
      <div className="flex flex-col gap-8 items-center">
        <div className="text-xl text-primary-600">Normal </div>
        {Object.keys(UI_TYPES_CONFIG).map((key, index) => (
          <BPSlider key={index} type={key as UI_TYPE} />
        ))}
      </div>

      <div className="flex flex-col gap-8 items-center">
        <div className="text-xl text-primary-600">Outlined </div>
        {Object.keys(UI_TYPES_CONFIG).map((key, index) => (
          <BPSlider outline key={index} type={key as UI_TYPE} />
        ))}
        <BPSlider magic outline>
          Magic
        </BPSlider>
      </div>
    </div>
  ),
}
