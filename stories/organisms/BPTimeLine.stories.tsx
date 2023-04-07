import { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import BPTimeLine from '@components/organisms/BPTimeLine'

export default {
  title: 'Organisms/BPTimeLine',
  component: BPTimeLine,
  argTypes: {},
} as Meta<typeof BPTimeLine>

type Story = StoryObj<typeof BPTimeLine>

export const Basic: Story = {
  render: () => (
    <div className="flex gap-6 md:w-[100vw] justify-center">
      <BPTimeLine />
    </div>
  ),
}
