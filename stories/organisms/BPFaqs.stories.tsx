import { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import BPFaqs from '@components/organisms/BPFaqs'

export default {
  title: 'Organisms/BPFaqs',
  component: BPFaqs,
  argTypes: {},
} as Meta<typeof BPFaqs>

type Story = StoryObj<typeof BPFaqs>

export const Basic: Story = {
  render: () => (
    <div className="flex gap-6 md:w-[600px] justify-center">
      <BPFaqs />
    </div>
  ),
}
