import { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { FiAlignCenter, FiAlignLeft, FiAlignRight } from 'react-icons/fi'
import BPToggleGroup, {
  BPToggleItem,
} from '@components/molecules/BPToggleGroup'
import { UI_TYPES_CONFIG, UI_TYPE } from '@core/types/ui-kit'

export default {
  title: 'Molecules/BPToggleGroup',
  component: BPToggleGroup,
  argTypes: {},
} as Meta<typeof BPToggleGroup>

type Story = StoryObj<typeof BPToggleGroup>

const DefaultToggleGroup = ({ ...props }) => (
  <BPToggleGroup
    {...props}
    onValueChange={console.log}
    defaultValue={['center']}
    selectionType="multiple"
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
)

export const Basic: Story = {
  render: () => (
    <>
      <DefaultToggleGroup />
    </>
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
    <div className="w-full flex flex-col gap-12">
      <div className="text-xl text-primary-600">Normal</div>
      <div className="grid grid-cols-3 gap-6 items-center">
        {Object.keys(UI_TYPES_CONFIG).map((key, index) => (
          <DefaultToggleGroup key={index} type={key as UI_TYPE} />
        ))}
      </div>

      <div className="text-xl text-primary-600">Outlined</div>
      <div className="grid grid-cols-3 gap-6 items-center">
        {Object.keys(UI_TYPES_CONFIG).map((key, index) => (
          <DefaultToggleGroup outline key={index} type={key as UI_TYPE} />
        ))}

        <DefaultToggleGroup magic outline />
      </div>
    </div>
  ),
}