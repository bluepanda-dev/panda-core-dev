import { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import BPBox from '@components/atoms/BPBox'
import { UI_TYPES_CONFIG, UI_VARIANT } from '@core/types/ui-kit'

export default {
  title: 'Atoms/BPBox',
  component: BPBox,
  argTypes: {},
} as Meta<typeof BPBox>

type Story = StoryObj<typeof BPBox>

export const Basic: Story = {
  render: ({ ...args }) => (
    <div className="w-[80vw] flex justify-center">
      <BPBox {...args} className="flex flex-col gap-8 w-full lg:w-[50%]">
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
  <BPBox
    size={size}
    {...props}
    className="flex flex-col gap-8 w-full items-center"
  >
    <p>Box {props.variant}</p>
    <p>
      You can use the box component to wrap other components and give them a
      default padding and border.
    </p>
  </BPBox>
)

export const Sizes: Story = {
  render: () => (
    <div className="w-[100vw] md:w-full lg:w-full gap-16 h-[90vh] overflow-y-auto px-6 justify-center items-center">
      <div className="mb-4">
        <DefaultSize />
      </div>
      <div className="mb-4">
        <DefaultSize size="xs" />
      </div>
      <div className="mb-4">
        <DefaultSize size="sm" />
      </div>
      <div className="mb-4">
        <DefaultSize size="lg" />
      </div>
      <div className="mb-4">
        <DefaultSize size="xl" />
      </div>
    </div>
  ),
}

export const Types: Story = {
  render: () => (
    <div className="flex flex-col lg:flex-row gap-16 w-[100vw] h-[90vh] overflow-y-auto px-6">
      <div className="flex flex-col gap-8 items-center">
        <div className="text-xl text-primary-600">Normal</div>
        {Object.keys(UI_TYPES_CONFIG).map((key, index) => (
          <DefaultSize key={index} variant={key as UI_VARIANT} />
        ))}
      </div>

      <div className="flex flex-col gap-8 items-center">
        <div className="text-xl text-primary-600">Outline</div>
        {Object.keys(UI_TYPES_CONFIG).map((key, index) => (
          <DefaultSize outline key={index} variant={key as UI_VARIANT} />
        ))}

        <DefaultSize magic outline />
      </div>
    </div>
  ),
}
