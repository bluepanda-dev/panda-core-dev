import { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { FiAlertCircle, FiStar } from 'react-icons/fi'
import BPButton from '@components/atoms/BPButton'
import { UI_TYPE, UI_TYPES_CONFIG } from '@core/types/ui-kit'
import { hideControl, size, type } from '@core/utils/storybook'

export default {
  title: 'Atoms/BPButton',
  component: BPButton,
  argTypes: {
    parameters: { actions: { argTypesRegex: '^on.*' } },
    loadingText: {
      control: { type: 'text' },
    },
    type: type,
    size: size,
    nativeType: {
      options: ['button', 'submit', 'reset'],
      control: { type: 'select' },
    },
    icon: hideControl,
    children: hideControl,
    rightIcon: hideControl,
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

export const Sizes: Story = {
  render: () => (
    <div className="flex gap-8 w-full items-center">
      <BPButton>Default Button</BPButton>
      <BPButton size="xs">Size xs</BPButton>
      <BPButton size="sm">Size sm</BPButton>
      <BPButton size="lg">Size lg</BPButton>
      <BPButton size="xl">Size xl</BPButton>
      <BPButton size="xl">Size xl long long text</BPButton>
    </div>
  ),
}

export const Types: Story = {
  render: () => (
    <div className="w-full flex gap-16">
      <div className="flex flex-col gap-8 items-center">
        <div className="text-xl text-primary-600">Normal buttons</div>
        {Object.keys(UI_TYPES_CONFIG).map((key, index) => (
          <BPButton key={index} type={key as UI_TYPE}>
            {key}
          </BPButton>
        ))}
      </div>

      <div className="flex flex-col gap-8 items-center">
        <div className="text-xl text-primary-600">Outlined buttons</div>
        {Object.keys(UI_TYPES_CONFIG).map((key, index) => (
          <BPButton key={index} type={key as UI_TYPE} outline>
            {key}
          </BPButton>
        ))}
        <BPButton magic outline>
          Magic
        </BPButton>
      </div>
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
