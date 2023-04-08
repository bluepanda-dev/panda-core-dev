import { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import BPBox from '@components/atoms/BPBox'
import { UI_TYPES_CONFIG, UI_TYPE } from '@core/types/ui-kit'

export default {
  title: 'Atoms/BPBox',
  component: BPBox,
  argTypes: {},
} as Meta<typeof BPBox>

type Story = StoryObj<typeof BPBox>

export const Basic: Story = {
  render: () => (
    <div className="w-[80vw] flex justify-center">
      <BPBox className="flex flex-col gap-8 w-full">
        <p>Box</p>
        <p>
          You can use the box component to wrap other components and give them a
          default padding and border.
        </p>
      </BPBox>
    </div>
  ),
}

const DefaultSize = ({ size = 'md', ...props }: any) => (
  <BPBox size={size} {...props} className="flex flex-col gap-8 w-full">
    <p>
      Box {props.type} {size === 'md' ? 'Default' : size}
    </p>
    <p>
      You can use the box component to wrap other components and give them a
      default padding and border.
    </p>
  </BPBox>
)

export const Sizes: Story = {
  render: () => (
    <div className="w-[80vw] flex-col items-center gap-2 flex justify-center">
      <DefaultSize />
      <DefaultSize size="xs" />
      <DefaultSize size="sm" />
      <DefaultSize size="lg" />
      <DefaultSize size="xl" />
    </div>
  ),
}

export const Types: Story = {
  render: () => (
    <div className="w-full flex gap-16 w-[100vw] h-[90vh] overflow-y-auto px-6">
      <div className="flex flex-col gap-8 items-center">
        <div className="text-xl text-primary-600">Normal</div>
        {Object.keys(UI_TYPES_CONFIG).map((key, index) => (
          <DefaultSize key={index} type={key as UI_TYPE} />
        ))}
      </div>

      <div className="flex flex-col gap-8 items-center">
        <div className="text-xl text-primary-600">Outline</div>
        {Object.keys(UI_TYPES_CONFIG).map((key, index) => (
          <DefaultSize outline key={index} type={key as UI_TYPE} />
        ))}

        <DefaultSize magic outline />
      </div>
    </div>
  ),
}
