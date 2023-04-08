import { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import BPShowVideo from '@components/organisms/BPShowVideo'

export default {
  title: 'Organisms/BPShowVideo',
  component: BPShowVideo,
  argTypes: {},
} as Meta<typeof BPShowVideo>

type Story = StoryObj<typeof BPShowVideo>

export const Basic: Story = {
  render: () => (
    <div className="flex gap-6 md:w-[100vw] justify-center">
      <BPShowVideo />
    </div>
  ),
}
