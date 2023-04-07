import { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import BPButton from '@components/atoms/BPButton'
import BPTooltip from '@components/atoms/BPTooltip'
import { UI_TYPES_CONFIG, UI_TYPE } from '@core/types/ui-kit'

export default {
  title: 'Atoms/BPTooltip',
  component: BPTooltip,
  argTypes: {
    size: {
      options: ['xxs', 'xs', 'sm', 'md', 'lg', 'xl'],
      control: { type: 'select' },
    },
    type: {
      options: [
        'default',
        'danger',
        'cyber',
        'caution',
        'success',
        'primary',
        'secondary',
        'accent',
        'light',
        'link',
      ],
      control: { type: 'select' },
    },
    tooltip: {
      control: { type: 'text' },
    },
    children: {
      table: {
        disable: true,
      },
    },
  },
} as Meta<typeof BPTooltip>

type Story = StoryObj<typeof BPTooltip>

const DefaultTooltip = ({ ...props }) => (
  <BPTooltip {...props}>
    <BPButton>Tooltip</BPButton>
  </BPTooltip>
)

export const Basic: Story = {
  render: ({ children, ...args }: any) => <DefaultTooltip {...args} />,
}

export const Sizes: Story = {
  render: () => (
    <div className="flex gap-8 w-full items-center">
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
    <div className="w-full flex flex-col gap-12">
      <div className="text-xl text-primary-600">Normal</div>
      <div className="grid grid-cols-3 gap-6 items-center">
        {Object.keys(UI_TYPES_CONFIG).map((key, index) => (
          <DefaultTooltip key={index} type={key as UI_TYPE} />
        ))}
      </div>

      <div className="text-xl text-primary-600">Outlined</div>
      <div className="grid grid-cols-3 gap-6 items-center">
        {Object.keys(UI_TYPES_CONFIG).map((key, index) => (
          <DefaultTooltip outline key={index} type={key as UI_TYPE} />
        ))}

        <DefaultTooltip magic outline />
      </div>
    </div>
  ),
}
