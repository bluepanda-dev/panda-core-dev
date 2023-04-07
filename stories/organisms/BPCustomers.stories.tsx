import { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import BPCustomers from '@components/organisms/BPCustomers'

export default {
  title: 'Organisms/BPCustomers',
  component: BPCustomers,
  argTypes: {},
} as Meta<typeof BPCustomers>

type Story = StoryObj<typeof BPCustomers>

export const Basic: Story = {
  render: () => (
    <div className="flex gap-6">
      <BPCustomers />
    </div>
  ),
}
