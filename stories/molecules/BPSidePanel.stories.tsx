import { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import BPSidePanel from '@components/molecules/BPSidePanel'

export default {
  title: 'Molecules/BPSidePanel',
  component: BPSidePanel,
  argTypes: {},
} as Meta<typeof BPSidePanel>

type Story = StoryObj<typeof BPSidePanel>

export const Basic: Story = {
  render: () => (
    <div className="flex gap-6 w-80 h-80">
      <BPSidePanel closeModal={() => {}} isOpen={true} title="My Side Panel">
        FIXING
      </BPSidePanel>
    </div>
  ),
}
