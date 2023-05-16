import { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { FiAlertCircle, FiStar } from 'react-icons/fi'
import BPButton from '@components/atoms/BPButton'
import { UI_VARIANT, UI_TYPES_CONFIG } from '@core/types/ui-kit'
import { hideControl, size, type } from '@core/utils/storybook'

export default {
  title: 'Atoms/BPButton',
  component: BPButton,
  argTypes: {
    parameters: { actions: { argTypesRegex: '^on.*' } },
    loadingText: {
      control: { type: 'text' },
    },
    variant: type,
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
  render: ({ ...args }) => <BPButton {...args}>Button</BPButton>,
}

export const Icons: Story = {
  render: () => (
    <div className="flex flex-col gap-8 w-full lg:flex-row lg:w-[90vw] justify-center items-center overflow-x-auto  py-12 md:py-0">
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
    <div className="w-[100vw] lg:w-[90vw] lg:py-12 flex flex-col lg:flex-row gap-8 justify-center items-center overflow-x-auto py-0 ">
      <BPButton>Default Button</BPButton>
      <BPButton size="xs">Size xs</BPButton>
      <BPButton size="sm">Size sm</BPButton>
      <BPButton size="lg">Size lg</BPButton>
      <BPButton size="xl">Size xl</BPButton>
      <BPButton size="xl">Size xl long long text</BPButton>
    </div>
  ),
}

export const Statuses: Story = {
  render: () => (
    <div className="w-full  gap-16 md:flex block overflow-y-auto h-[90vh] px-12 text-center">
      <div className="flex flex-col gap-8 items-center">
        <div className="text-xl text-primary-600">Loading</div>
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
      <div className="flex flex-col gap-8 items-center md:mt-0 mt-6">
        <div className="text-xl text-primary-600">Disabled</div>
        <BPButton isDisabled={true} icon={<FiAlertCircle />}>
          Button
        </BPButton>
        <BPButton isDisabled={true} icon={<FiAlertCircle />} magic outline>
          Button
        </BPButton>
      </div>
      <div className="flex flex-col gap-8 items-center md:mt-0 mt-6">
        <div className="text-xl text-primary-600">Click</div>
        <BPButton icon={<FiAlertCircle />} onClick={() => alert('example')}>
          Button
        </BPButton>
      </div>
    </div>
  ),
}

export const Customs: Story = {
  render: () => (
    <div>
      <div className="flex flex-col lg:flex-row gap-8  items-center justify-center overflow-x-auto w-[90vw] py-12 md:py-0 ">
        <BPButton noRounded={false}>No rounded</BPButton>
        <BPButton noRounded={true}>Rounded</BPButton>
        <BPButton borderless={true}>No border</BPButton>
      </div>
      <div className="mt-6">
        <BPButton expanded={true}>Expanded</BPButton>
      </div>
    </div>
  ),
}

export const Types: Story = {
  render: () => (
    <div className="w-full gap-16 md:flex block overflow-y-auto h-[90vh] px-12 text-center">
      <div className="flex flex-col gap-8 items-center">
        <div className="text-xl text-primary-600">Normal buttons</div>
        {Object.keys(UI_TYPES_CONFIG).map((key, index) => (
          <BPButton key={index} variant={key as UI_VARIANT}>
            {key}
          </BPButton>
        ))}
      </div>

      <div className="flex flex-col gap-8 items-center">
        <div className="text-xl text-primary-600">Outlined buttons</div>
        {Object.keys(UI_TYPES_CONFIG).map((key, index) => (
          <BPButton key={index} variant={key as UI_VARIANT} outline>
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
