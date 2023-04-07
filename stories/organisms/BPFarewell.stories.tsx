import { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import BPFareWell from '@components/organisms/BPFareWell'

export default {
  title: 'Organisms/BPFareWell',
  component: BPFareWell,
  argTypes: {},
} as Meta<typeof BPFareWell>

type Story = StoryObj<typeof BPFareWell>

export const Basic: Story = {
  render: () => (
    <div className="flex gap-6 md:w-[100vw] justify-center">
      <BPFareWell />
    </div>
  ),
}
