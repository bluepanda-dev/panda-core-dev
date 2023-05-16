import { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import BPTabs from '@components/atoms/BPTabs'
import { UI_TYPES_CONFIG, UI_VARIANT } from '@core/types/ui-kit'

export default {
  title: 'Atoms/BPTabs',
  component: BPTabs,
  argTypes: {
    orientation: {
      options: ['vertical', 'horizontal'],
      control: { type: 'select' },
    },
  },
} as Meta<typeof BPTabs>

type Story = StoryObj<typeof BPTabs>

const DefaultTab = (props: any) => (
  <BPTabs
    onValueChange={console.log}
    className="min-h-[300px] w-[90%] lg:w-[400px] md:w-[400px]"
    {...props}
  >
    <div title="Tab 1">Tab 1 content</div>
    <div title="Tab 2">Tab 2 content</div>
    <div title="Tab 3">Tab 3 content</div>
  </BPTabs>
)

export const Basic: Story = {
  render: ({ ...args }: any) => (
    <div className="w-[100vw] flex justify-center overflow-y-auto">
      <DefaultTab {...args} />
    </div>
  ),
}

export const Vertical: Story = {
  render: () => (
    <div className="w-[100vw] flex justify-center overflow-y-auto">
      <DefaultTab orientation="vertical" />
    </div>
  ),
}

export const Statuses: Story = {
  render: () => (
    <div className="w-[100vw] flex flex-col items-center overflow-y-auto h-[90vh] px-12">
      <BPTabs className="min-h-[300px] lg:w-[400px] md:w-[400px] mb-4">
        <div title="Tab 1">Tab 1 content</div>
        <div title="Disabled" data-disabled>
          Tab 2 content
        </div>
        <div title="Tab 3">Tab 3 content</div>
      </BPTabs>
      <BPTabs
        variant="danger"
        className="min-h-[300px] lg:w-[400px] md:w-[400px] mb-4"
      >
        <div title="Tab 1">Tab 1 content</div>
        <div title="Disabled" data-disabled>
          Tab 2 content
        </div>
        <div title="Tab 3">Tab 3 content</div>
      </BPTabs>
      <BPTabs
        outline
        variant="danger"
        className="min-h-[300px] lg:w-[400px] md:w-[400px] mb-4"
      >
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
    <div className="w-[90vw] flex flex-col lg:flex-row lg:justify-center md:flex-row gap-12 h-[90vh] overflow-y-auto px-10">
      <div className="flex flex-col gap-12 items-center">
        <div className="text-xl text-primary-600">Normal</div>
        <div className="grid gap-6 items-center">
          {Object.keys(UI_TYPES_CONFIG).map((key, index) => (
            <DefaultTab
              key={index}
              variant={key as UI_VARIANT}
              className="min-h-[100px] lg:w-[300px] md:w-[300px]"
            />
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-12 items-center">
        <div className="text-xl text-primary-600">Outlined</div>
        <div className="grid gap-6 items-center">
          {Object.keys(UI_TYPES_CONFIG).map((key, index) => (
            <DefaultTab
              outline
              key={index}
              variant={key as UI_VARIANT}
              className="min-h-[100px] lg:w-[300px] md:w-[300px]"
            />
          ))}

          <DefaultTab
            className="min-h-[100px] lg:w-[300px] md:w-[300px]"
            magic
            outline
          />
        </div>
      </div>
    </div>
  ),
}
