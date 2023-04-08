import { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { FiAlertCircle } from 'react-icons/fi'
import BPButton from '@components/atoms/BPButton'
import BPInput from '@components/atoms/BPInput'
import { UI_TYPE, UI_TYPES_CONFIG } from '@core/types/ui-kit'
import { hideControl } from '@core/utils/storybook'

export default {
  title: 'Atoms/BPInput',
  component: BPInput,
  argTypes: {
    nativeType: hideControl,
    placeholder: {
      control: { type: 'text' },
    },
    value: {
      control: { type: 'text' },
    },
  },
} as Meta<typeof BPInput>

type Story = StoryObj<typeof BPInput>

export const Basic: Story = {
  render: ({ children, ...args }: any) => (
    <BPInput {...args} placeholder="Please add text..." />
  ),
}

export const Statuses: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex justify-start items-start gap-2 w-full">
        <BPInput placeholder="Default" />
        <BPInput placeholder="Disabled" disabled />
      </div>

      <div className="flex justify-start items-start gap-2 w-full">
        <BPInput outline type="danger" placeholder="Default" />
        <BPInput outline type="danger" placeholder="Disabled" disabled />
      </div>

      <div className="flex justify-start items-start gap-2 w-full">
        <BPInput outline placeholder="Default" />
        <BPInput outline placeholder="Disabled" disabled />
      </div>
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="flex gap-8 w-full items-center md:w-full  flex overflow-x-auto w-[300px] py-12 md:py-0">
      <BPInput placeholder="Default" />
      <BPInput placeholder="Size xs" size="xs" />
      <BPInput placeholder="Size sm" size="sm" />
      <BPInput placeholder="Size lg" size="lg" />
      <BPInput placeholder="Size xl" size="xl" />
    </div>
  ),
}

export const Types: Story = {
  render: () => (
    <div className="w-full  gap-16 md:flex block overflow-y-auto h-[700px] px-12 md:px-0">
      <div className="flex flex-col gap-8 items-center">
        <div className="text-xl text-primary-600">Normal inputs</div>
        {Object.keys(UI_TYPES_CONFIG).map((key, index) => (
          <BPInput
            placeholder={`${key}...`}
            key={index}
            type={key as UI_TYPE}
          />
        ))}
      </div>
      <div className="flex flex-col gap-8 items-center">
        <div className="text-xl text-primary-600">Outline inputs</div>
        {Object.keys(UI_TYPES_CONFIG).map((key, index) => (
          <BPInput
            key={index}
            placeholder={`${key}...`}
            type={key as UI_TYPE}
            outline
          />
        ))}

        <div className="text-xl text-primary-600">Special</div>
        <BPInput placeholder={`Magic...`} magic outline />
      </div>
    </div>
  ),
}

export const Customs: Story = {
  render: () => (
    <div className="w-full flex gap-16">
      <div className="flex flex-col gap-8 items-center">
        <BPInput placeholder="Default" className="" />
        <BPInput placeholder="Custom shape" className="rounded-none" />
        <BPInput placeholder="Custom shape" className="rounded-r-none" />
        <BPInput placeholder="Custom shape" className="rounded-l-none" />
        <div className="text-xl text-primary-600">Combine with all types</div>
        <BPInput
          placeholder="Custom shape"
          className="rounded-none"
          magic
          outline
        />

        <div className="text-xl text-primary-600">Example input-button</div>
        <div className="flex">
          <BPInput
            placeholder="Custom shape"
            className="!border-r-0 rounded-r-none focus:!ring-r-0 !ring-yellow-400"
            outline
          />

          <BPButton className="rounded-none rounded-r-full h-full">
            Normal
          </BPButton>
        </div>
      </div>
    </div>
  ),
}
