import { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import BPWhyUs from '@components/organisms/BPWhyUs'

export default {
  title: 'Organisms/BPWhyUs',
  component: BPWhyUs,
  argTypes: {},
} as Meta<typeof BPWhyUs>

type Story = StoryObj<typeof BPWhyUs>

export const Basic: Story = {
  render: () => (
    <div className="flex gap-6 md:w-[100vw] justify-center">
      <BPWhyUs />
    </div>
  ),
}
