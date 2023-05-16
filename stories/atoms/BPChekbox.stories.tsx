import { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { FiZap } from 'react-icons/fi'
import BPCheckbox from '@components/atoms/BPCheckbox'
import { UI_TYPES_CONFIG, UI_VARIANT } from '@core/types/ui-kit'
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
  render: ({ ...args }) => (
    <BPCheckbox {...args}>Label for checkbox</BPCheckbox>
  ),
}

export const Statuses: Story = {
  render: () => (
    <div className="flex gap-4 w-full items-center">
      <BPCheckbox variant="danger">Default</BPCheckbox>
      <BPCheckbox disabled variant="danger">
        Disabled
      </BPCheckbox>
    </div>
  ),
}

export const Types: Story = {
  render: () => (
    <div className="w-full  gap-16 md:flex block overflow-y-auto h-[90vh] px-12 text-center">
      <div className="flex flex-col gap-8 items-start mb-6">
        <div className="text-xl text-primary-600">Normal buttons</div>
        {Object.keys(UI_TYPES_CONFIG).map((key, index) => (
          <BPCheckbox key={index} variant={key as UI_VARIANT}>
            {key}
          </BPCheckbox>
        ))}
      </div>

      <div className="flex flex-col gap-8 items-start">
        <div className="text-xl text-primary-600">Outlined buttons</div>
        {Object.keys(UI_TYPES_CONFIG).map((key, index) => (
          <BPCheckbox key={index} variant={key as UI_VARIANT} outline>
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

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col lg:flex-row items-center justify-center gap-8 w-[100vw] lg:w-[90vw] py-0 lg:py-12 overflow-x-auto">
      <BPCheckbox>Default Button</BPCheckbox>
      <BPCheckbox size="xs">Size xs</BPCheckbox>
      <BPCheckbox size="sm">Size sm</BPCheckbox>
      <BPCheckbox size="lg">Size lg</BPCheckbox>
      <BPCheckbox size="xl">Size xl</BPCheckbox>
      <BPCheckbox size="xl">Size xl long long text</BPCheckbox>
    </div>
  ),
}

export const Customs: Story = {
  render: () => (
    <div className="w-full flex gap-16">
      <div className="flex flex-col gap-8 items-center justify-center">
        <div className="text-xl text-primary-600">Other shape</div>
        <BPCheckbox className="rounded-full" magic outline>
          Magic
        </BPCheckbox>

        <div className="text-xl text-primary-600">Custom icon</div>
        <BPCheckbox icon={<FiZap />} variant="danger" outline>
          Danger outline
        </BPCheckbox>

        <BPCheckbox icon={<FiZap />} variant="danger">
          Danger
        </BPCheckbox>

        <div className="text-xl text-primary-600">Custom icon and shape</div>
        <BPCheckbox
          className="rounded-full"
          icon={<FiZap />}
          variant="danger"
          outline
        >
          Danger outline
        </BPCheckbox>

        <BPCheckbox className="rounded-full" icon={<FiZap />} variant="danger">
          Danger
        </BPCheckbox>
      </div>
    </div>
  ),
}

// custom icon
// loading check
