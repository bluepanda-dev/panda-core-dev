import { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import BPProducts from '@components/organisms/BPProducts'

export default {
  title: 'Organisms/BPProducts',
  component: BPProducts,
  argTypes: {},
} as Meta<typeof BPProducts>

type Story = StoryObj<typeof BPProducts>

export const Basic: Story = {
  render: () => (
    <div className="flex gap-6 md:w-[100vw] justify-center">
      <BPProducts />
    </div>
  ),
}
