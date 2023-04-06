import { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import BPBadge from '@components/atoms/BPBadge'
import { UI_TYPES_CONFIG, UI_TYPE } from '@core/types/ui-kit'

export default {
  title: 'Atoms/BPBadge',
  component: BPBadge,
  argTypes: {},
} as Meta<typeof BPBadge>

type Story = StoryObj<typeof BPBadge>

export const Basic: Story = {
  render: () => <BPBadge>Badge</BPBadge>,
}

export const Sizes: Story = {
  render: () => (
    <div className="flex gap-8 w-full items-center">
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
    <div className="flex gap-8 w-full items-center">
      <BPBadge size={'xs'} hoverable>
        Hoverable Badge
      </BPBadge>
      <BPBadge size={'xs'} type="primary" hoverable>
        Hoverable Badge
      </BPBadge>
      <BPBadge size={'xs'} outline type="primary" hoverable>
        Hoverable Badge
      </BPBadge>
      <BPBadge size={'xs'} type="danger" hoverable>
        Hoverable Badge
      </BPBadge>
      <BPBadge size={'xs'} outline type="danger" hoverable>
        Hoverable Badge
      </BPBadge>
    </div>
  ),
}

export const Types: Story = {
  render: () => (
    <div className="w-full flex gap-16">
      <div className="flex flex-col gap-8 items-center">
        <div className="text-xl text-primary-600">XS Normal</div>
        {Object.keys(UI_TYPES_CONFIG).map((key, index) => (
          <BPBadge size={'xs'} key={index} type={key as UI_TYPE}>
            {key}
          </BPBadge>
        ))}
      </div>

      <div className="flex flex-col gap-8 items-center">
        <div className="text-xl text-primary-600">XS Outlined</div>
        {Object.keys(UI_TYPES_CONFIG).map((key, index) => (
          <BPBadge size={'xs'} key={index} type={key as UI_TYPE} outline>
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
