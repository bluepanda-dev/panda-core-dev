import { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import BPButton from '@components/atoms/BPButton'
import BPRadioGroup, { BPRadioGroupItem } from '@components/atoms/BPRadioGroup'
import { UI_TYPES_CONFIG, UI_TYPE } from '@core/types/ui-kit'

export default {
  title: 'Atoms/BPRadioGroup',
  component: BPRadioGroup,
  argTypes: {},
} as Meta<typeof BPRadioGroup>

type Story = StoryObj<typeof BPRadioGroup>

const DefaultExample = ({ ...props }) => (
  <BPRadioGroup onValueChange={console.log} {...props}>
    <BPRadioGroupItem id="1" value="1" label="Option 1" />
    <BPRadioGroupItem id="2" value="2" label="Option 2" />
    <BPRadioGroupItem id="3" value="3" label="Option 3" />
  </BPRadioGroup>
)

export const Basic: Story = {
  render: () => <DefaultExample />,
}

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-8 w-full items-center">
      <DefaultExample />
      <DefaultExample size="xs" />
      <DefaultExample size="sm" />
      <DefaultExample size="lg" />
      <DefaultExample size="xl" />
    </div>
  ),
}

export const Types: Story = {
  render: () => (
    <div className="w-full flex flex-col gap-12">
      <div className="text-xl text-primary-600">Normal</div>
      <div className="flex flex-wrap gap-8 items-center">
        {Object.keys(UI_TYPES_CONFIG).map((key, index) => (
          <BPRadioGroup key={index} type={key as UI_TYPE} defaultValue="1">
            <BPRadioGroupItem id="1" value="1" label="Option 1" />
            <BPRadioGroupItem id="2" value="2" label="Option 2" />
            <BPRadioGroupItem id="3" value="3" label="Option 3" />
          </BPRadioGroup>
        ))}
      </div>

      <div className="text-xl text-primary-600">Outlined</div>
      <div className="flex flex-wrap gap-8 items-center">
        {Object.keys(UI_TYPES_CONFIG).map((key, index) => (
          <BPRadioGroup
            key={index}
            type={key as UI_TYPE}
            defaultValue="1"
            outline
          >
            <BPRadioGroupItem id="1" value="1" label="Option 1" />
            <BPRadioGroupItem id="2" value="2" label="Option 2" />
            <BPRadioGroupItem id="3" value="3" label="Option 3" />
          </BPRadioGroup>
        ))}
      </div>
    </div>
  ),
}
