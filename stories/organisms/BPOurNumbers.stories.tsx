import { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import BPOurNumbers from '@components/organisms/BPOurNumbers'

export default {
  title: 'Organisms/BPOurNumbers',
  component: BPOurNumbers,
  argTypes: {},
} as Meta<typeof BPOurNumbers>

type Story = StoryObj<typeof BPOurNumbers>

export const Basic: Story = {
  render: () => (
    <div className="flex gap-6 md:w-[100vw] justify-center">
      <BPOurNumbers />
    </div>
  ),
}
