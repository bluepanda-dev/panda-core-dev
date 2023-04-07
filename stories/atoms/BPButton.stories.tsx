import { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { FiAlertCircle, FiStar } from 'react-icons/fi'
import BPButton from '@components/atoms/BPButton'

export default {
  title: 'Atoms/BPButton',
  component: BPButton,
  argTypes: {
    parameters: { actions: { argTypesRegex: '^on.*' } },
    loadingText: {
      control: { type: 'text' },
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
    size: {
      options: ['xxs', 'xs', 'sm', 'md', 'lg', 'xl'],
      control: { type: 'select' },
    },
    nativeType: {
      options: ['button', 'submit', 'reset'],
      control: { type: 'select' },
    },
    icon: {
      table: {
        disable: true,
      },
    },
    children: {
      table: {
        disable: true,
      },
    },
    rightIcon: {
      table: {
        disable: true,
      },
    },
  },
} as Meta<typeof BPButton>

type Story = StoryObj<typeof BPButton>

export const Basic: Story = {
  render: ({ data, ...args }) => <BPButton {...args}>Button</BPButton>,
}

export const Icons: Story = {
  render: () => (
    <div className="flex gap-8 w-full items-center">
      <BPButton icon={<FiAlertCircle />}>Normal Icon</BPButton>
      <BPButton icon={<FiStar />} magic outline>
        Normal Icon
      </BPButton>
      <BPButton rightIcon={<FiStar />} magic outline>
        Right Icon
      </BPButton>
    </div>
  ),
}

export const Statuses: Story = {
  render: () => (
    <div className="w-full flex flex-col gap-8">
      <div className="text-xl text-primary-600">Loading</div>
      <div className="flex gap-8 w-full items-center">
        <BPButton isLoading={true} icon={<FiAlertCircle />}>
          Button
        </BPButton>
        <BPButton isLoading={true} magic outline>
          Button
        </BPButton>
        <BPButton isLoading={true} loadingText="Loading text..." magic outline>
          Button
        </BPButton>
      </div>
      <div className="text-xl text-primary-600">Disabled</div>
      <div className="flex gap-8 w-full items-center">
        <BPButton isDisabled={true} icon={<FiAlertCircle />}>
          Button
        </BPButton>
        <BPButton isDisabled={true} icon={<FiAlertCircle />} magic outline>
          Button
        </BPButton>
      </div>
      <div className="text-xl text-primary-600">Click</div>
      <div className="flex gap-8 w-full items-center">
        <BPButton icon={<FiAlertCircle />} onClick={() => alert('example')}>
          Button
        </BPButton>
      </div>
    </div>
  ),
}
