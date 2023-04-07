import { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { FiMicOff, FiZap } from 'react-icons/fi'
import BPCheckbox from '@components/atoms/BPCheckbox'
import { UI_TYPES_CONFIG, UI_TYPE } from '@core/types/ui-kit'

export default {
  title: 'Atoms/BPCheckbox',
  component: BPCheckbox,
  argTypes: {
    icon: {
      table: {
        disable: true,
      },
    },
  },
} as Meta<typeof BPCheckbox>

type Story = StoryObj<typeof BPCheckbox>

export const Basic: Story = {
  render: ({ data, ...args }) => (
    <BPCheckbox {...args}>Label for checkbox</BPCheckbox>
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
