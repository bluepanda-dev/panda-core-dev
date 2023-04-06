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

const DefaultTab = (props: any) => (
  <BPTabs
    onValueChange={console.log}
    className="min-w-[400px] min-h-[300px]"
    {...props}
  >
    <div title="Tab 1">Tab 1 content</div>
    <div title="Tab 2">Tab 2 content</div>
    <div title="Tab 3">Tab 3 content</div>
  </BPTabs>
)

export const Basic: Story = {
  render: () => <DefaultTab />,
}

export const Vertical: Story = {
  render: () => <DefaultTab orientation="vertical" />,
}

export const Statuses: Story = {
  render: () => (
    <div className="flex gap-4 w-full flex-col items-center">
      <BPTabs className="min-w-[400px] min-h-[300px]">
        <div title="Tab 1">Tab 1 content</div>
        <div title="Disabled" data-disabled>
          Tab 2 content
        </div>
        <div title="Tab 3">Tab 3 content</div>
      </BPTabs>
      <BPTabs type="danger" className="min-w-[400px] min-h-[300px]">
        <div title="Tab 1">Tab 1 content</div>
        <div title="Disabled" data-disabled>
          Tab 2 content
        </div>
        <div title="Tab 3">Tab 3 content</div>
      </BPTabs>
      <BPTabs outline type="danger" className="min-w-[400px] min-h-[300px]">
        <div title="Tab 1">Tab 1 content</div>
        <div title="Disabled" data-disabled>
          Tab 2 content
        </div>
        <div title="Tab 3">Tab 3 content</div>
      </BPTabs>
    </div>
  ),
}

export const Types: Story = {
  render: () => (
    <div className="w-full flex flex-col gap-12 h-[80vh] overflow-y-auto px-10">
      <div className="text-xl text-primary-600">Normal</div>
      <div className="grid gap-6 items-center">
        {Object.keys(UI_TYPES_CONFIG).map((key, index) => (
          <DefaultTab
            key={index}
            type={key as UI_TYPE}
            className="min-w-[400px] min-h-[100px]"
          />
        ))}
      </div>

      <div className="text-xl text-primary-600">Outlined</div>
      <div className="grid gap-6 items-center">
        {Object.keys(UI_TYPES_CONFIG).map((key, index) => (
          <DefaultTab
            outline
            key={index}
            type={key as UI_TYPE}
            className="min-w-[400px] min-h-[100px]"
          />
        ))}

        <DefaultTab magic outline />
      </div>
    </div>
  ),
}
