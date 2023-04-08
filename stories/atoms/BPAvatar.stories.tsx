import { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import BPAvatar from '@components/atoms/BPAvatar'
import { UI_TYPES_CONFIG, UI_TYPE } from '@core/types/ui-kit'
import { DefaultExample } from './BPDropdown.stories'

export default {
  title: 'Atoms/BPAvatar',
  component: BPAvatar,
  argTypes: {},
} as Meta<typeof BPAvatar>

type Story = StoryObj<typeof BPAvatar>

export const Basic: Story = {
  render: ({ data, ...args }) => (
    <div className="flex gap-6">
      <BPAvatar
        {...args}
        url="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80"
      />
      <BPAvatar {...args} />
    </div>
  ),
}

const imageUrl =
  'https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80'

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex gap-8 w-full items-center">
        <BPAvatar url={imageUrl} text="J M" />
        <BPAvatar url={imageUrl} size="xs" />
        <BPAvatar url={imageUrl} size="sm" />
        <BPAvatar url={imageUrl} size="lg" />
        <BPAvatar url={imageUrl} size="xl" />
      </div>

      <div className="flex gap-8 w-full items-center">
        <BPAvatar text="J M" />
        <BPAvatar text="J M" size="xs" />
        <BPAvatar text="J M" size="sm" />
        <BPAvatar text="J M" size="lg" />
        <BPAvatar text="J M" size="xl" />
      </div>
    </div>
  ),
}

export const Types: Story = {
  render: () => (
    <div className="w-full gap-16 md:flex block overflow-y-auto h-[600px] px-12 md:px-0">
      <div className="flex flex-col gap-8 items-center ">
        <div className="text-xl text-primary-600">Normal</div>
        {Object.keys(UI_TYPES_CONFIG).map((key, index) => (
          <BPAvatar key={index} type={key as UI_TYPE} text="J M" />
        ))}
      </div>

      <div className="flex flex-col gap-8 items-center">
        <div className="text-xl text-primary-600">Outlined</div>
        {Object.keys(UI_TYPES_CONFIG).map((key, index) => (
          <BPAvatar key={index} type={key as UI_TYPE} text="J M" outline />
        ))}
        <BPAvatar text="J M" magic outline>
          Magic
        </BPAvatar>
      </div>
      <div className="flex flex-col gap-8 items-center">
        <div className="text-xl text-primary-600">Normal</div>
        {Object.keys(UI_TYPES_CONFIG).map((key, index) => (
          <BPAvatar
            url={imageUrl}
            key={index}
            type={key as UI_TYPE}
            text="J M"
          />
        ))}
      </div>

      <div className="flex flex-col gap-8 items-center">
        <div className="text-xl text-primary-600">Outlined</div>
        {Object.keys(UI_TYPES_CONFIG).map((key, index) => (
          <BPAvatar
            url={imageUrl}
            key={index}
            type={key as UI_TYPE}
            text="J M"
            outline
          />
        ))}
        <BPAvatar url={imageUrl} magic outline>
          Magic
        </BPAvatar>
      </div>
    </div>
  ),
}

export const Combined: Story = {
  render: () => (
    <div className="flex flex-col gap-6 justify-center items-center">
      <div className="text-xl text-primary-600">Combined with Dropdown</div>
      <DefaultExample className="!p-0">
        <BPAvatar
          url="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80"
          text="J M"
        />
      </DefaultExample>
      <DefaultExample className="!p-0" outline magic>
        <BPAvatar
          url="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80"
          text="J M"
          outline
          magic
        />
      </DefaultExample>
    </div>
  ),
}
