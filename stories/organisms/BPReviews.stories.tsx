import { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import BPReviews from '@components/organisms/BPReviews'

export default {
  title: 'Organisms/BPReviews',
  component: BPReviews,
  argTypes: {},
} as Meta<typeof BPReviews>

type Story = StoryObj<typeof BPReviews>

export const Basic: Story = {
  render: () => (
    <div className="flex gap-6 md:w-[100vw] justify-center">
      <BPReviews />
    </div>
  ),
}
