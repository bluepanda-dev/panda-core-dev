import { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { FiPenTool } from 'react-icons/fi'
import BPIcon from '@components/atoms/BPIcon'
import { UI_TYPES_CONFIG, UI_VARIANT } from '@core/types/ui-kit'

export default {
  title: 'Atoms/BPIcon',
  component: BPIcon,
  argTypes: {},
} as Meta<typeof BPIcon>

type Story = StoryObj<typeof BPIcon>

export const Basic: Story = {
  render: ({ ...args }: any) => (
    <BPIcon {...args}>
      <FiPenTool />
    </BPIcon>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-full items-center">
      <BPIcon>
        <FiPenTool />
      </BPIcon>
      <BPIcon size="xs">
        <FiPenTool />
      </BPIcon>
      <BPIcon size="sm">
        <FiPenTool />
      </BPIcon>
      <BPIcon size="lg">
        <FiPenTool />
      </BPIcon>
      <BPIcon size="xl">
        <FiPenTool />
      </BPIcon>
      <BPIcon size="2xl">
        <FiPenTool />
      </BPIcon>
    </div>
  ),
}

export const Statuses: Story = {
  render: () => (
    <div className=" flex flex-col gap-12 items-center overflow-y-auto h-[90vh] px-12 text-center">
      <div className="text-xl text-primary-600">Disabled</div>
      <BPIcon disabled>
        <FiPenTool />
      </BPIcon>
      <BPIcon disabled variant="danger">
        <FiPenTool />
      </BPIcon>
      <BPIcon outline disabled variant="danger">
        <FiPenTool />
      </BPIcon>
      <div className="text-xl text-primary-600">No border</div>
      <BPIcon borderless>
        <FiPenTool />
      </BPIcon>
      <BPIcon borderless variant="danger">
        <FiPenTool />
      </BPIcon>
      <BPIcon outline variant="danger" borderless>
        <FiPenTool />
      </BPIcon>
      <div className="text-xl text-primary-600">Hoverable</div>
      <BPIcon hoverable>
        <FiPenTool />
      </BPIcon>
      <BPIcon hoverable variant="danger">
        <FiPenTool />
      </BPIcon>
      <BPIcon outline hoverable variant="danger">
        <FiPenTool />
      </BPIcon>
    </div>
  ),
}

export const Types: Story = {
  render: () => (
    <div className="w-full h-[100vh] flex gap-16">
      <div className="flex flex-col gap-8 items-center">
        <div className="text-xl text-primary-600">Normal </div>
        {Object.keys(UI_TYPES_CONFIG).map((key, index) => (
          <BPIcon hoverable key={index} variant={key as UI_VARIANT}>
            <FiPenTool />
          </BPIcon>
        ))}
      </div>

      <div className="flex flex-col gap-8 items-center">
        <div className="text-xl text-primary-600">Outlined </div>
        {Object.keys(UI_TYPES_CONFIG).map((key, index) => (
          <BPIcon hoverable outline key={index} variant={key as UI_VARIANT}>
            <FiPenTool />
          </BPIcon>
        ))}
      </div>
    </div>
  ),
}
