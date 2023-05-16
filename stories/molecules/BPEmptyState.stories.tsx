import { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { GiPanda } from 'react-icons/gi'
import BPEmptyState from '@components/molecules/BPEmptyState'
import { UI_TYPES_CONFIG, UI_VARIANT } from '@core/types/ui-kit'
import { hideControl } from '@core/utils/storybook'

export default {
  title: 'Molecules/BPEmptyState',
  component: BPEmptyState,
  argTypes: {
    icon: hideControl,
  },
} as Meta<typeof BPEmptyState>

type Story = StoryObj<typeof BPEmptyState>

export const Basic: Story = {
  render: ({ ...props }) => (
    <div className="w-[100vw] flex flex-wrap justify-center">
      <BPEmptyState {...props} title="You have no orders so far">
        You can buy a product from home page and come back here.
      </BPEmptyState>
    </div>
  ),
}

export const Custom: Story = {
  render: () => (
    <div className="w-[100vw] flex flex-wrap justify-center">
      <BPEmptyState icon={<GiPanda />} title="You have no orders so far">
        You can buy a product from home page and come back here.
      </BPEmptyState>
    </div>
  ),
}

export const Types: Story = {
  render: () => (
    <div className="w-[90vw] flex flex-col gap-12 h-[90vh] overflow-y-auto px-10">
      <div className="grid gap-6 items-center">
        {Object.keys(UI_TYPES_CONFIG).map((key, index) => (
          <BPEmptyState
            key={index}
            variant={key as UI_VARIANT}
            title="You have no orders so far"
          >
            You can buy a product from home page and come back here.
          </BPEmptyState>
        ))}
        <BPEmptyState magic title="You have no orders so far">
          You can buy a pooroduct from home page and come back here.
        </BPEmptyState>
      </div>
    </div>
  ),
}
