import { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import BPTabs from '@components/atoms/BPTabs'
import { UI_TYPES_CONFIG, UI_TYPE } from '@core/types/ui-kit'

export default {
  title: 'Atoms/BPTabs',
  component: BPTabs,
  argTypes: {},
} as Meta<typeof BPTabs>

type Story = StoryObj<typeof BPTabs>

export const Basic: Story = {
  render: () => (
    <BPTabs onValueChange={console.log}>
      <div title="Tab 1">Tab 1 content</div>
      <div title="Tab 2">Tab 2 content</div>
      <div title="Tab 3">Tab 3 conten</div>
    </BPTabs>
  ),
}
