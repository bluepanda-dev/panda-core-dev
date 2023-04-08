import { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import BPBreadCrumps from '@components/molecules/BPBreadCrumps'
import { UI_TYPES_CONFIG, UI_TYPE } from '@core/types/ui-kit'

export default {
  title: 'Molecules/BPBreadCrumps',
  component: BPBreadCrumps,
  argTypes: {},
} as Meta<typeof BPBreadCrumps>

type Story = StoryObj<typeof BPBreadCrumps>

const items = [
  {
    label: 'Home',
    to: '/',
  },
  {
    label: 'My Account',
    to: '/myaccount',
  },
  {
    label: 'Billing',
    to: '/myaccount/billing',
  },
]

export const Basic: Story = {
  render: () => (
    <div className="w-[400px] md:w-[800px]">
      <BPBreadCrumps items={items} hoverable />
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="w-[400px] md:w-[800px] flex flex-col gap-8">
      <div className="text-xl text-primary-600">Default</div>
      <BPBreadCrumps items={items} hoverable />
      <div className="text-xl text-primary-600">XS</div>
      <BPBreadCrumps size={'xs'} items={items} hoverable />
      <div className="text-xl text-primary-600">SM</div>
      <BPBreadCrumps size={'sm'} items={items} hoverable />
      <div className="text-xl text-primary-600">LG</div>
      <BPBreadCrumps size={'lg'} items={items} hoverable />
      <div className="text-xl text-primary-600">XL</div>
      <BPBreadCrumps size={'xl'} items={items} hoverable />
    </div>
  ),
}

export const Types: Story = {
  render: () => (
    <div className="w-full flex gap-16">
      <div className="flex flex-col gap-8 items-center">
        <div className="text-xl text-primary-600">Normal </div>
        {Object.keys(UI_TYPES_CONFIG).map((key, index) => (
          <BPBreadCrumps
            size={'sm'}
            key={index}
            type={key as UI_TYPE}
            items={items}
            hoverable
          />
        ))}
      </div>

      <div className="flex flex-col gap-8 items-center">
        <div className="text-xl text-primary-600">Outlined </div>
        {Object.keys(UI_TYPES_CONFIG).map((key, index) => (
          <BPBreadCrumps
            size={'sm'}
            outline
            key={index}
            type={key as UI_TYPE}
            items={items}
            hoverable
          />
        ))}

        <BPBreadCrumps size={'sm'} outline magic items={items} hoverable />
      </div>
    </div>
  ),
}
