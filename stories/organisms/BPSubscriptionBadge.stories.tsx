import { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import BPSubscriptionBadge from '@components/organisms/BPSubscriptionBadge'

export default {
  title: 'Organisms/BPSubscriptionBadge',
  component: BPSubscriptionBadge,
  argTypes: {},
} as Meta<typeof BPSubscriptionBadge>

type Story = StoryObj<typeof BPSubscriptionBadge>

export const Basic: Story = {
  render: () => (
    <div className="flex gap-6 md:w-[100vw] justify-center flex-col items-center">
      <BPSubscriptionBadge type="free" />
      <BPSubscriptionBadge type="trial" />
      <BPSubscriptionBadge type="plus" />
    </div>
  ),
}
