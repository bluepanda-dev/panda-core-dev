import { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import BPButton from '@components/atoms/BPButton'
import BPTooltip from '@components/atoms/BPTooltip'
import { UI_TYPES_CONFIG, UI_VARIANT } from '@core/types/ui-kit'
import { hideControl, size, type } from '@core/utils/storybook'

export default {
  title: 'Atoms/BPTooltip',
  component: BPTooltip,
  argTypes: {
    size: size,
    variant: type,
    tooltip: {
      control: { type: 'text', default: 'BP Tooltip' },
    },
    outline: {
      control: { type: 'boolean' },
    },
    children: hideControl,
  },
} as Meta<typeof BPTooltip>

type Story = StoryObj<typeof BPTooltip>

const DefaultTooltip = (props: any) => (
  <BPTooltip {...props} tooltip={props.tooltip ? props.tooltip : 'Default'}>
    <BPButton>{props.size ? props.size : 'Default'}</BPButton>
  </BPTooltip>
)

export const Basic: Story = {
  render: ({ ...args }: any) => <DefaultTooltip {...args} />,
}

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-8 w-full lg:flex-row lg:w-[90vw] justify-center overflow-x-auto py-12 md:py-0 ">
      <DefaultTooltip />
      <DefaultTooltip size="xs" />
      <DefaultTooltip size="sm" />
      <DefaultTooltip size="lg" />
      <DefaultTooltip size="xl" />
    </div>
  ),
}

export const Types: Story = {
  render: () => (
    <div className="w-full  gap-16 md:flex block overflow-y-auto h-[90vh] px-12 text-center">
      <div className="flex flex-col gap-8 items-center">
        <div className="text-xl text-primary-600">Normal</div>
        {Object.keys(UI_TYPES_CONFIG).map((key, index) => (
          <BPTooltip tooltip="Tooltip" key={index} variant={key as UI_VARIANT}>
            <BPButton>{key}</BPButton>
          </BPTooltip>
        ))}
      </div>

      <div className="flex flex-col gap-8 items-center">
        <div className="text-xl text-primary-600">Outlined</div>
        {Object.keys(UI_TYPES_CONFIG).map((key, index) => (
          <BPTooltip tooltip="Tooltip" key={index} variant={key as UI_VARIANT}>
            <BPButton>{key}</BPButton>
          </BPTooltip>
        ))}

        <BPTooltip tooltip="Tooltip" magic>
          <BPButton>magic</BPButton>
        </BPTooltip>
      </div>
    </div>
  ),
}
