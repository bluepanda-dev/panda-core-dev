import { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import BPLoadingModal from '@components/molecules/BPLoadingModal'

export default {
  title: 'Molecules/BPLoadingModal',
  component: BPLoadingModal,
  argTypes: {},
} as Meta<typeof BPLoadingModal>

type Story = StoryObj<typeof BPLoadingModal>

export const Basic: Story = {
  render: ({ ...props }) => (
    <div className="flex gap-6 w-80 h-80">
      <BPLoadingModal {...props} loading={true}></BPLoadingModal>
    </div>
  ),
}
