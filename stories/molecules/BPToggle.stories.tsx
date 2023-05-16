import { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { FiAlignCenter, FiAlignLeft, FiAlignRight } from 'react-icons/fi'
import BPToggleGroup, {
  BPToggleItem,
} from '@components/molecules/BPToggleGroup'
import { UI_TYPES_CONFIG, UI_VARIANT } from '@core/types/ui-kit'
import { hideControl } from '@core/utils/storybook'

export default {
  title: 'Molecules/BPToggleGroup',
  component: BPToggleGroup,
  argTypes: {
    defaultValue: hideControl,
  },
} as Meta<typeof BPToggleGroup>

type Story = StoryObj<typeof BPToggleGroup>

const DefaultToggleGroup = ({ ...props }) => (
  <BPToggleGroup {...props} onValueChange={console.log} defaultValue={'center'}>
    <BPToggleItem value="left">
      <FiAlignLeft />
    </BPToggleItem>
    <BPToggleItem value="center">
      <FiAlignCenter />
    </BPToggleItem>
    <BPToggleItem value="right">
      <FiAlignRight />
    </BPToggleItem>
  </BPToggleGroup>
)

export const Basic: Story = {
  render: ({ ...args }) => (
    <>
      <DefaultToggleGroup {...args} />
    </>
  ),
}

export const Statuses: Story = {
  render: () => (
    <div className="w-full flex flex-col gap-12 items-center">
      <div className="text-xl text-primary-600">Center Disabled</div>
      <BPToggleGroup
        defaultValue="left"
        onValueChange={console.log}
        selectionType="single"
      >
        <BPToggleItem value="left">
          <FiAlignLeft />
        </BPToggleItem>
        <BPToggleItem disabled value="center">
          <FiAlignCenter />
        </BPToggleItem>
        <BPToggleItem value="right">
          <FiAlignRight />
        </BPToggleItem>
      </BPToggleGroup>
      <BPToggleGroup
        outline
        variant="danger"
        onValueChange={console.log}
        selectionType="single"
        defaultValue="left"
      >
        <BPToggleItem value="left">
          <FiAlignLeft />
        </BPToggleItem>
        <BPToggleItem disabled value="center">
          <FiAlignCenter />
        </BPToggleItem>
        <BPToggleItem value="right">
          <FiAlignRight />
        </BPToggleItem>
      </BPToggleGroup>

      <BPToggleGroup
        defaultValue="left"
        variant="danger"
        onValueChange={console.log}
        selectionType="single"
      >
        <BPToggleItem value="left">
          <FiAlignLeft />
        </BPToggleItem>
        <BPToggleItem disabled value="center">
          <FiAlignCenter />
        </BPToggleItem>
        <BPToggleItem value="right">
          <FiAlignRight />
        </BPToggleItem>
      </BPToggleGroup>

      <div className="text-xl text-primary-600">Component Disabled</div>
      <BPToggleGroup
        onValueChange={console.log}
        selectionType="single"
        disabled
      >
        <BPToggleItem value="left">
          <FiAlignLeft />
        </BPToggleItem>
        <BPToggleItem value="center">
          <FiAlignCenter />
        </BPToggleItem>
        <BPToggleItem value="right">
          <FiAlignRight />
        </BPToggleItem>
      </BPToggleGroup>
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-8 w-full items-center">
      <DefaultToggleGroup />
      <DefaultToggleGroup size="xs" />
      <DefaultToggleGroup size="sm" />
      <DefaultToggleGroup size="lg" />
      <DefaultToggleGroup size="xl" />
    </div>
  ),
}

export const Types: Story = {
  render: () => (
    <div className="w-full flex flex-col gap-12 h-[90vh] overflow-y-auto px-6">
      <div className="text-xl text-primary-600 text-center">Normal</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 items-center">
        {Object.keys(UI_TYPES_CONFIG).map((key, index) => (
          <DefaultToggleGroup key={index} variant={key as UI_VARIANT} />
        ))}
      </div>

      <div className="text-xl text-primary-600 text-center">Outlined</div>
      <div className="grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 gap-6 items-center">
        {Object.keys(UI_TYPES_CONFIG).map((key, index) => (
          <DefaultToggleGroup outline key={index} variant={key as UI_VARIANT} />
        ))}
      </div>

      <div className="text-xl text-primary-600 text-center">Magic</div>
      <div className="grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 gap-6 items-center">
        <DefaultToggleGroup magic outline />
      </div>
    </div>
  ),
}
