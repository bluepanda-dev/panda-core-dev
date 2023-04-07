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

const DefaultExample = ({ id, ...props }: any) => (
  <BPRadioGroup onValueChange={console.log} {...props}>
    <BPRadioGroupItem id={`${id}1`} value="1" label="Option 1" />
    <BPRadioGroupItem id={`${id}2`} value="2" label="Option 2" />
    <BPRadioGroupItem id={`${id}3`} value="3" label="Option 3" />
  </BPRadioGroup>
)

export const Basic: Story = {
  render: ({ children, ...args }: any) => <DefaultExample {...args} id="def" />,
}

export const Statuses: Story = {
  render: () => (
    <BPRadioGroup onValueChange={console.log}>
      <BPRadioGroupItem id={`1`} value="1" label="Option 1" />
      <BPRadioGroupItem disabled id={`2`} value="2" label="Disabled Option 2" />
      <BPRadioGroupItem id={`3`} value="3" label="Option 3" />
    </BPRadioGroup>
  ),
}

export const Types: Story = {
  render: () => (
    <div className="w-full flex flex-col gap-12">
      <div className="text-xl text-primary-600">Normal</div>
      <div className="flex flex-wrap gap-8 items-center">
        {Object.keys(UI_TYPES_CONFIG).map((key, index) => (
          <BPRadioGroup key={index} type={key as UI_TYPE} defaultValue="1">
            <BPRadioGroupItem id={`1${key}`} value="1" label="Option 1" />
            <BPRadioGroupItem id={`2${key}`} value="2" label="Option 2" />
            <BPRadioGroupItem id={`3${key}`} value="3" label="Option 3" />
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
            <BPRadioGroupItem id={`o1${key}`} value="1" label="Option 1" />
            <BPRadioGroupItem id={`o2${key}`} value="2" label="Option 2" />
            <BPRadioGroupItem id={`o3${key}`} value="3" label="Option 3" />
          </BPRadioGroup>
        ))}

        <BPRadioGroup defaultValue="1" outline magic>
          <BPRadioGroupItem id="m1" value="1" label="Option 1" />
          <BPRadioGroupItem id="m2" value="2" label="Option 2" />
          <BPRadioGroupItem id="m3" value="3" label="Option 3" />
        </BPRadioGroup>
      </div>
    </div>
  ),
}
