import { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import BPBreadCrumps from '@components/molecules/BPBreadCrumps'
import { UI_TYPES_CONFIG, UI_VARIANT } from '@core/types/ui-kit'
import { hideControl } from '@core/utils/storybook'

export default {
  title: 'Molecules/BPBreadCrumps',
  component: BPBreadCrumps,
  argTypes: {
    items: hideControl,
  },
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

const DefaultExample = ({ ...props }) => (
  <BPBreadCrumps {...props} className="flex flex-wrap" />
)

export const Basic: Story = {
  render: ({ ...props }) => (
    <div className="w-[90vw] overflow-x-auto">
      <DefaultExample {...props} items={items} hoverable />
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="w-[90vw] h-[90vh] flex flex-col gap-8 overflow-y-auto overflow-x-none">
      <div className="text-xl text-primary-600">Default</div>
      <DefaultExample items={items} hoverable />
      <div className="text-xl text-primary-600">XS</div>
      <DefaultExample size={'xs'} items={items} hoverable />
      <div className="text-xl text-primary-600">SM</div>
      <DefaultExample size={'sm'} items={items} hoverable />
      <div className="text-xl text-primary-600">LG</div>
      <DefaultExample size={'lg'} items={items} hoverable />
      <div className="text-xl text-primary-600">XL</div>
      <DefaultExample size={'xl'} items={items} hoverable />
    </div>
  ),
}

export const Types: Story = {
  render: () => (
    <div className="md:flex block gap-16 w-[100vw] h-[90vh] overflow-y-auto px-6 justify-center">
      <div className="flex flex-col gap-8 items-center mb-6">
        <div className="text-xl text-primary-600">Normal </div>
        {Object.keys(UI_TYPES_CONFIG).map((key, index) => (
          <DefaultExample
            size={'sm'}
            key={index}
            variant={key as UI_VARIANT}
            items={items}
            hoverable
          />
        ))}
      </div>

      <div className="flex flex-col gap-8 items-center">
        <div className="text-xl text-primary-600">Outlined </div>
        {Object.keys(UI_TYPES_CONFIG).map((key, index) => (
          <DefaultExample
            size={'sm'}
            outline
            key={index}
            variant={key as UI_VARIANT}
            items={items}
            hoverable
          />
        ))}

        <DefaultExample size={'sm'} outline magic items={items} hoverable />
      </div>
    </div>
  ),
}
