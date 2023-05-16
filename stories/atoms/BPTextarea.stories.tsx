import { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import BPButton from '@components/atoms/BPButton'
import BPTextarea from '@components/atoms/BPTextarea'
import { UI_VARIANT, UI_TYPES_CONFIG } from '@core/types/ui-kit'
import { hideControl } from '@core/utils/storybook'

export default {
  title: 'Atoms/BPTextarea',
  component: BPTextarea,
  argTypes: {
    nativeType: hideControl,
    placeholder: {
      control: { type: 'text' },
    },
    value: {
      control: { type: 'text' },
    },
  },
} as Meta<typeof BPTextarea>

type Story = StoryObj<typeof BPTextarea>

export const Basic: Story = {
  render: ({ ...args }: any) => (
    <BPTextarea {...args} placeholder="Please add text..." />
  ),
}

export const Statuses: Story = {
  render: () => (
    <div className="w-[100vw] h-[90vh] flex flex-col gap-6 py-3 justify-start items-center overflow-y-scroll">
      <div className="flex flex-col lg:flex-row justify-start items-center gap-2">
        <BPTextarea placeholder="Default" />
        <BPTextarea placeholder="Disabled" disabled />
      </div>

      <div className="flex flex-col lg:flex-row justify-start items-start gap-2">
        <BPTextarea outline variant="danger" placeholder="Default" />
        <BPTextarea outline variant="danger" placeholder="Disabled" disabled />
      </div>

      <div className="flex flex-col lg:flex-row justify-start items-start gap-2">
        <BPTextarea outline placeholder="Default" />
        <BPTextarea outline placeholder="Disabled" disabled />
      </div>
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-row flex-wrap gap-8 items-center justify-center lg:w-[90vw] overflow-auto h-[90vh] w-full py-12 md:py-1">
      <BPTextarea placeholder="Default" />
      <BPTextarea placeholder="Size xs" size="xs" />
      <BPTextarea placeholder="Size sm" size="sm" />
      <BPTextarea placeholder="Size lg" size="lg" />
      <BPTextarea placeholder="Size xl" size="xl" />
    </div>
  ),
}

export const Types: Story = {
  render: () => (
    <div className="flex flex-col lg:flex-row items-start w-full shrink-0 gap-3 overflow-y-auto h-[90vh] px-12 md:px-0">
      <div className="flex flex-col h-fit shrink-0 px-3 gap-8 items-center">
        <div className="text-xl text-primary-600">Normal inputs</div>
        {Object.keys(UI_TYPES_CONFIG).map((key, index) => (
          <BPTextarea
            className="min-h-[120px]"
            placeholder={`${key}...`}
            key={index}
            variant={key as UI_VARIANT}
          />
        ))}
      </div>
      <div className="flex flex-col h-fit shrink-0 px-3 gap-8 items-center">
        <div className="text-xl text-primary-600">Outline inputs</div>
        {Object.keys(UI_TYPES_CONFIG).map((key, index) => (
          <BPTextarea
            className="min-h-[120px]"
            key={index}
            placeholder={`${key}...`}
            variant={key as UI_VARIANT}
            outline
          />
        ))}

        <div className="text-xl text-primary-600">Special</div>
        <BPTextarea
          className="min-h-[120px]"
          placeholder={`Magic...`}
          magic
          outline
        />
      </div>
    </div>
  ),
}

export const Customs: Story = {
  render: () => (
    <div className="w-[100vw] h-[90vh] flex gap-16 py-3 justify-center overflow-scroll">
      <div className="flex flex-row flex-wrap gap-8 items-center justify-center">
        <BPTextarea placeholder="Default" className="" />
        <BPTextarea placeholder="Custom shape" className="rounded-none" />
        <BPTextarea placeholder="Custom shape" className="rounded-r-none" />
        <BPTextarea placeholder="Custom shape" className="rounded-l-none" />
        <div className="flex flex-col items-center gap-8">
          <div className="text-xl text-primary-600">Combine with all types</div>
          <BPTextarea
            placeholder="Custom shape"
            className="rounded-none"
            magic
            outline
          />
        </div>
        <div className="flex flex-col items-center gap-7">
          <div className="text-xl text-primary-600">
            Example textarea-button
          </div>
          <div className="flex flex-col">
            <BPTextarea
              placeholder="Custom shape"
              className="!border-b-0 rounded-b-none focus:!ring-b-0 !ring-yellow-400"
              outline
            />

            <BPButton className="rounded-none rounded-b-2xl h-full">
              Normal
            </BPButton>
          </div>
        </div>
        <div className="flex flex-col items-center py-3 gap-8">
          <div className="text-xl text-primary-600">Custom gradient</div>
          <div className="flex flex-col">
            <BPButton className="rounded-none rounded-t-2xl h-full">
              Custom
            </BPButton>
            <BPTextarea
              placeholder="Custom shape"
              className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-t-none"
            />
          </div>
        </div>
      </div>
    </div>
  ),
}
