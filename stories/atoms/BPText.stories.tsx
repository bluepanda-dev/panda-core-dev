import { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import BPText from '@components/atoms/BPText'
import { UI_TYPES_CONFIG, UI_VARIANT } from '@core/types/ui-kit'

export default {
  title: 'Atoms/BPText',
  component: BPText,
  argTypes: {},
} as Meta<typeof BPText>

type Story = StoryObj<typeof BPText>

export const Basic: Story = {
  render: ({ ...args }: any) => <BPText {...args}>Default Text</BPText>,
}

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-full items-center">
      <BPText>Default Text</BPText>
      <BPText size="xxs">Size xxs</BPText>
      <BPText size="xs">Size xs</BPText>
      <BPText size="sm">Size sm</BPText>
      <BPText size="lg">Size lg</BPText>
      <BPText size="xl">Size xl</BPText>
    </div>
  ),
}

export const Types: Story = {
  render: () => (
    <div className="w-full  gap-16 md:flex block overflow-y-auto h-[90vh] px-12 text-center">
      <div className="flex flex-col gap-8 items-left">
        <div className="text-xl text-primary-600">Types</div>
        {Object.keys(UI_TYPES_CONFIG)
          .filter((key) => key !== 'inverted')
          .map((key, index) => (
            <BPText key={index} variant={key as UI_VARIANT}>
              Default Text {key}
            </BPText>
          ))}
        <BPText magic>Default Text magic</BPText>
      </div>
    </div>
  ),
}
