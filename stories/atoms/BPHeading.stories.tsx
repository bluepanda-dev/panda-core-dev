import { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import BPHeading from '@components/atoms/BPHeading'
import { UI_TYPES_CONFIG, UI_TYPE } from '@core/types/ui-kit'

export default {
  title: 'Atoms/BPHeading',
  component: BPHeading,
  argTypes: {},
} as Meta<typeof BPHeading>

type Story = StoryObj<typeof BPHeading>

export const Basic: Story = {
  render: ({ children, ...args }: any) => (
    <BPHeading {...args}>Default Heading</BPHeading>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-full items-center">
      <BPHeading>Default Heading</BPHeading>
      <BPHeading size="xxs">Size xxs</BPHeading>
      <BPHeading size="xs">Size xs</BPHeading>
      <BPHeading size="sm">Size sm</BPHeading>
      <BPHeading size="lg">Size lg</BPHeading>
      <BPHeading size="xl">Size xl</BPHeading>
    </div>
  ),
}

export const Types: Story = {
  render: () => (
    <div className="w-full  gap-16 md:flex block overflow-y-auto h-[700px] px-12 text-center">
      <div className="flex flex-col gap-8 items-left">
        <div className="text-xl text-primary-600">Types</div>
        {Object.keys(UI_TYPES_CONFIG).map((key, index) => (
          <BPHeading key={index} type={key as UI_TYPE}>
            Default Heading {key}
          </BPHeading>
        ))}
        <BPHeading magic>Default Heading magic</BPHeading>
      </div>
    </div>
  ),
}
