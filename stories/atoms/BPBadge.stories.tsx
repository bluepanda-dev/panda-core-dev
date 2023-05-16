import { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { FiStar } from 'react-icons/fi'
import BPBadge from '@components/atoms/BPBadge'
import { UI_TYPES_CONFIG, UI_VARIANT } from '@core/types/ui-kit'

export default {
  title: 'Atoms/BPBadge',
  component: BPBadge,
  argTypes: {},
} as Meta<typeof BPBadge>

type Story = StoryObj<typeof BPBadge>

export const Basic: Story = {
  render: ({ ...args }) => <BPBadge {...args}>Badge</BPBadge>,
}

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col lg:flex-row justify-center gap-8 w-[90vw] items-center overflow-x-auto py-12 md:py-0">
      <BPBadge>Default Badge</BPBadge>
      <BPBadge size="xs">Size xs</BPBadge>
      <BPBadge size="sm">Size sm</BPBadge>
      <BPBadge size="lg">Size lg</BPBadge>
      <BPBadge size="xl">Size xl</BPBadge>
      <BPBadge size="xl">Size xl long long text</BPBadge>
    </div>
  ),
}

export const Statuses: Story = {
  render: () => (
    <div className="flex flex-col lg:flex-row gap-8 items-center justify-center overflow-x-auto w-[90vw] py-12 md:py-0">
      <BPBadge size={'xs'} hoverable>
        Hoverable Badge
      </BPBadge>
      <BPBadge size={'xs'} variant="primary" hoverable>
        Hoverable Badge
      </BPBadge>
      <BPBadge size={'xs'} outline variant="primary" hoverable>
        Hoverable Badge
      </BPBadge>
      <BPBadge size={'xs'} variant="danger" hoverable>
        Hoverable Badge
      </BPBadge>
      <BPBadge size={'xs'} outline variant="danger" hoverable>
        Hoverable Badge
      </BPBadge>
      <BPBadge outline variant="danger" size={'xs'}>
        <FiStar />
        With Icon
      </BPBadge>
    </div>
  ),
}

export const Types: Story = {
  render: () => (
    <div className="w-full flex flex-row gap-16 overflow-y-auto h-[90vh] px-12 md:px-0">
      <div className="flex flex-col gap-8 items-center">
        <div className="text-xl text-center text-primary-600">XS Normal</div>
        {Object.keys(UI_TYPES_CONFIG).map((key, index) => (
          <BPBadge size={'xs'} key={index} variant={key as UI_VARIANT}>
            {key}
          </BPBadge>
        ))}
      </div>

      <div className="flex flex-col gap-8 items-center">
        <div className="text-xl text-center text-primary-600">XS Outlined</div>
        {Object.keys(UI_TYPES_CONFIG).map((key, index) => (
          <BPBadge size={'xs'} key={index} variant={key as UI_VARIANT} outline>
            {key}
          </BPBadge>
        ))}
        <BPBadge size={'xs'} magic outline>
          Magic
        </BPBadge>
      </div>
    </div>
  ),
}
