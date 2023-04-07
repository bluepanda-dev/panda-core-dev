import { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { FiMicOff, FiZap } from 'react-icons/fi'
import BPCheckbox from '@components/atoms/BPCheckbox'
import { UI_TYPES_CONFIG, UI_TYPE } from '@core/types/ui-kit'
import { hideControl } from '@core/utils/storybook'

export default {
  title: 'Atoms/BPCheckbox',
  component: BPCheckbox,
  argTypes: {
    icon: hideControl,
  },
} as Meta<typeof BPCheckbox>

type Story = StoryObj<typeof BPCheckbox>

export const Basic: Story = {
  render: ({ data, ...args }) => (
    <BPCheckbox {...args}>Label for checkbox</BPCheckbox>
  ),
}

export const Statuses: Story = {
  render: () => (
    <div className="flex gap-4 w-full items-center">
      <BPCheckbox type="danger">Default</BPCheckbox>
      <BPCheckbox disabled type="danger">
        Disabled
      </BPCheckbox>
    </div>
  ),
}

export const Types: Story = {
  render: () => (
    <div className="w-full flex gap-16">
      <div className="flex flex-col gap-8 items-start">
        <div className="text-xl text-primary-600">Normal buttons</div>
        {Object.keys(UI_TYPES_CONFIG).map((key, index) => (
          <BPCheckbox key={index} type={key as UI_TYPE}>
            {key}
          </BPCheckbox>
        ))}
      </div>

      <div className="flex flex-col gap-8 items-start">
        <div className="text-xl text-primary-600">Outlined buttons</div>
        {Object.keys(UI_TYPES_CONFIG).map((key, index) => (
          <BPCheckbox key={index} type={key as UI_TYPE} outline>
            {key}
          </BPCheckbox>
        ))}
        <BPCheckbox magic outline>
          Magic
        </BPCheckbox>
      </div>
    </div>
  ),
}

export const Customs: Story = {
  render: () => (
    <div className="w-full flex gap-16">
      <div className="flex flex-col gap-8 items-start">
        <div className="text-xl text-primary-600">Other shape</div>
        <BPCheckbox className="rounded-full" magic outline>
          Magic
        </BPCheckbox>

        <div className="text-xl text-primary-600">Custom icon</div>
        <BPCheckbox icon={<FiZap />} type="danger" outline>
          Danger outline
        </BPCheckbox>

        <BPCheckbox icon={<FiZap />} type="danger">
          Danger
        </BPCheckbox>

        <div className="text-xl text-primary-600">Custom icon and shape</div>
        <BPCheckbox
          className="rounded-full"
          icon={<FiZap />}
          type="danger"
          outline
        >
          Danger outline
        </BPCheckbox>

        <BPCheckbox className="rounded-full" icon={<FiZap />} type="danger">
          Danger
        </BPCheckbox>
      </div>
    </div>
  ),
}

// custom icon
// loading check
