import { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import BPNavBar from '@components/organisms/BPNavBar'

export default {
  title: 'Organisms/BPNavBar',
  component: BPNavBar,
  argTypes: {},
} as Meta<typeof BPNavBar>

type Story = StoryObj<typeof BPNavBar>

export const Basic: Story = {
  render: () => (
    <div className="flex gap-6 md:w-[100vw] justify-center">
      <BPNavBar />
    </div>
  ),
}
