import { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import BPFeatures from '@components/organisms/BPFeatures'

export default {
  title: 'Organisms/BPFeatures',
  component: BPFeatures,
  argTypes: {},
} as Meta<typeof BPFeatures>

type Story = StoryObj<typeof BPFeatures>

export const Basic: Story = {
  render: () => (
    <div className="flex gap-6 md:w-[100vw] justify-center">
      <BPFeatures />
    </div>
  ),
}
