import { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import BPFooter from '@components/organisms/BPFooter'

export default {
  title: 'Organisms/BPFooter',
  component: BPFooter,
  argTypes: {},
} as Meta<typeof BPFooter>

type Story = StoryObj<typeof BPFooter>

export const Basic: Story = {
  render: () => (
    <div className="flex gap-6 md:w-[100vw] justify-center">
      <BPFooter />
    </div>
  ),
}
