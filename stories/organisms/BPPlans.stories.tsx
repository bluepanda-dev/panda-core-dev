import { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import BPPlans from '@components/organisms/BPPlans'

export default {
  title: 'Organisms/BPPlans',
  component: BPPlans,
  argTypes: {},
} as Meta<typeof BPPlans>

type Story = StoryObj<typeof BPPlans>

export const Basic: Story = {
  render: () => (
    <div className="flex gap-6 md:w-[100vw] justify-center">
      <BPPlans />
    </div>
  ),
}
