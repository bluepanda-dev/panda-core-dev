import { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import BPKeepMeInformed from '@components/organisms/BPKeepMeInformed'

export default {
  title: 'Organisms/BPKeepMeInformed',
  component: BPKeepMeInformed,
  argTypes: {},
} as Meta<typeof BPKeepMeInformed>

type Story = StoryObj<typeof BPKeepMeInformed>

export const Basic: Story = {
  render: () => (
    <div className="flex gap-6 md:w-[100vw] justify-center">
      <BPKeepMeInformed />
    </div>
  ),
}
