import { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import BPTechStack from '@components/organisms/BPTechStack'

export default {
  title: 'Organisms/BPTechStack',
  component: BPTechStack,
  argTypes: {},
} as Meta<typeof BPTechStack>

type Story = StoryObj<typeof BPTechStack>

export const Basic: Story = {
  render: () => (
    <div className="flex gap-6 md:w-[100vw] justify-center">
      <BPTechStack />
    </div>
  ),
}
