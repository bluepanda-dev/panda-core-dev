import { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { GiPanda } from 'react-icons/gi'
import BPEmptyState from '@components/molecules/BPEmptyState'
import { UI_TYPES_CONFIG, UI_TYPE } from '@core/types/ui-kit'

export default {
  title: 'Molecules/BPEmptyState',
  component: BPEmptyState,
  argTypes: {},
} as Meta<typeof BPEmptyState>

type Story = StoryObj<typeof BPEmptyState>

export const Basic: Story = {
  render: () => (
    <>
      <BPEmptyState title="You have no orders so far">
        You can buy a pooroduct from home page and come back here.
      </BPEmptyState>
    </>
  ),
}

export const Custom: Story = {
  render: () => (
    <>
      <BPEmptyState icon={<GiPanda />} title="You have no orders so far">
        You can buy a pooroduct from home page and come back here.
      </BPEmptyState>
    </>
  ),
}

export const Types: Story = {
  render: () => (
    <div className="w-full flex flex-col gap-12 h-[80vh] overflow-y-auto px-10">
      <div className="grid gap-6 items-center">
        {Object.keys(UI_TYPES_CONFIG).map((key, index) => (
          <BPEmptyState
            key={index}
            type={key as UI_TYPE}
            title="You have no orders so far"
          >
            You can buy a pooroduct from home page and come back here.
          </BPEmptyState>
        ))}
        <BPEmptyState magic title="You have no orders so far">
          You can buy a pooroduct from home page and come back here.
        </BPEmptyState>
      </div>
    </div>
  ),
}
