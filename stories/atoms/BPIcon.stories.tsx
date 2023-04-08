import { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { FiPenTool } from 'react-icons/fi'
import BPIcon from '@components/atoms/BPIcon'
import { UI_TYPES_CONFIG, UI_TYPE } from '@core/types/ui-kit'

export default {
  title: 'Atoms/BPIcon',
  component: BPIcon,
  argTypes: {},
} as Meta<typeof BPIcon>

type Story = StoryObj<typeof BPIcon>

export const Basic: Story = {
  render: () => (
    <BPIcon>
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
    <div className="w-full flex flex-col gap-12 items-center">
      <div className="text-xl text-primary-600">Disabled</div>
      <BPIcon disabled>
        <FiPenTool />
      </BPIcon>
      <BPIcon disabled type="danger">
        <FiPenTool />
      </BPIcon>
      <BPIcon outline disabled type="danger">
        <FiPenTool />
      </BPIcon>
      <div className="text-xl text-primary-600">No border</div>
      <BPIcon borderless>
        <FiPenTool />
      </BPIcon>
      <BPIcon borderless type="danger">
        <FiPenTool />
      </BPIcon>
      <BPIcon outline type="danger" borderless>
        <FiPenTool />
      </BPIcon>
      <div className="text-xl text-primary-600">Hoverable</div>
      <BPIcon hoverable>
        <FiPenTool />
      </BPIcon>
      <BPIcon hoverable type="danger">
        <FiPenTool />
      </BPIcon>
      <BPIcon outline hoverable type="danger">
        <FiPenTool />
      </BPIcon>
    </div>
  ),
}

export const Types: Story = {
  render: () => (
    <div className="w-full flex gap-16">
      <div className="flex flex-col gap-8 items-center">
        <div className="text-xl text-primary-600">Normal </div>
        {Object.keys(UI_TYPES_CONFIG).map((key, index) => (
          <BPIcon hoverable key={index} type={key as UI_TYPE}>
            <FiPenTool />
          </BPIcon>
        ))}
      </div>

      <div className="flex flex-col gap-8 items-center">
        <div className="text-xl text-primary-600">Outlined </div>
        {Object.keys(UI_TYPES_CONFIG).map((key, index) => (
          <BPIcon hoverable outline key={index} type={key as UI_TYPE}>
            <FiPenTool />
          </BPIcon>
        ))}
      </div>
    </div>
  ),
}
