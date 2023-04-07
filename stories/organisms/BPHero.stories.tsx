import { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import BPHero from '@components/organisms/BPHero'

export default {
  title: 'Organisms/BPHero',
  component: BPHero,
  argTypes: {},
} as Meta<typeof BPHero>

type Story = StoryObj<typeof BPHero>

export const Basic: Story = {
  render: () => (
    <div className="flex gap-6 md:w-[100vw] justify-center">
      <BPHero />
    </div>
  ),
}
