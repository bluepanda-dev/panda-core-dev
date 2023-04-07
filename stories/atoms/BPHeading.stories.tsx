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
