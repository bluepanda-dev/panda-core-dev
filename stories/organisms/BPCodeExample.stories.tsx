import { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import BPCodeExample from '@components/organisms/BPCodeExample'

export default {
  title: 'Organisms/BPCodeExample',
  component: BPCodeExample,
  argTypes: {},
} as Meta<typeof BPCodeExample>

type Story = StoryObj<typeof BPCodeExample>

export const Basic: Story = {
  render: () => (
    <div className="flex gap-6 md:w-[100vw] justify-center">
      <BPCodeExample />
    </div>
  ),
}
