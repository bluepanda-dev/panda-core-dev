import { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import BPRadioGroup, { BPRadioGroupItem } from '@components/atoms/BPRadioGroup'
import { UI_TYPES_CONFIG, UI_VARIANT } from '@core/types/ui-kit'

export default {
  title: 'Atoms/BPRadioGroup',
  component: BPRadioGroup,
  argTypes: {},
} as Meta<typeof BPRadioGroup>

type Story = StoryObj<typeof BPRadioGroup>

const DefaultExample = ({ id, ...props }: any) => (
  <BPRadioGroup onValueChange={console.log} {...props}>
    <BPRadioGroupItem id={`${id}1`} value="1" label="Option 1" />
    <BPRadioGroupItem id={`${id}2`} value="2" label="Option 2" />
    <BPRadioGroupItem id={`${id}3`} value="3" label="Option 3" />
  </BPRadioGroup>
)

export const Basic: Story = {
  render: ({ ...args }: any) => <DefaultExample {...args} id="def" />,
}

export const Statuses: Story = {
  render: () => (
    <BPRadioGroup onValueChange={console.log}>
      <BPRadioGroupItem id={`1`} value="1" label="Option 1" />
      <BPRadioGroupItem disabled id={`2`} value="2" label="Disabled Option 2" />
      <BPRadioGroupItem id={`3`} value="3" label="Option 3" />
    </BPRadioGroup>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="w-full  gap-16 md:flex block overflow-y-auto h-[90vh] px-12 text-center">
      <div className="mt-6">
        <div className="text-xl text-primary-600 mb-4">Default</div>
        <DefaultExample id="default" />
      </div>
      <div className="mt-6">
        <div className="text-xl text-primary-600 mb-4">XS</div>
        <DefaultExample id="xs" size="xs" />
      </div>
      <div className="mt-6">
        <div className="text-xl text-primary-600 mb-4">SM</div>
        <DefaultExample id="sm" size="sm" />
      </div>
      <div className="mt-6">
        <div className="text-xl text-primary-600 mb-4">LG</div>
        <DefaultExample id="lg" size="lg" />
      </div>
      <div className="mt-6">
        <div className="text-xl text-primary-600 mb-4">XL</div>
        <DefaultExample id="xl" size="xl" />
      </div>
    </div>
  ),
}

export const Types: Story = {
  render: () => (
    <div className="w-[90vw] flex flex-row flex-wrap gap-16 justify-center overflow-y-auto h-[90vh] px-12 md:px-0 text-center">
      <div className="mb-6">
        <div className="text-xl text-primary-600 mb-4">Normal</div>
        {Object.keys(UI_TYPES_CONFIG).map((key, index) => (
          <div key={index} className="p-4">
            <BPRadioGroup variant={key as UI_VARIANT} defaultValue="1">
              <BPRadioGroupItem id={`1${key}`} value="1" label="Option 1" />
              <BPRadioGroupItem id={`2${key}`} value="2" label="Option 2" />
              <BPRadioGroupItem id={`3${key}`} value="3" label="Option 3" />
            </BPRadioGroup>
          </div>
        ))}
      </div>

      <div>
        <div className="text-xl text-primary-600 mb-4">Outlined</div>
        {Object.keys(UI_TYPES_CONFIG).map((key, index) => (
          <div key={index} className="p-4">
            <BPRadioGroup variant={key as UI_VARIANT} defaultValue="1" outline>
              <BPRadioGroupItem id={`o1${key}`} value="1" label="Option 1" />
              <BPRadioGroupItem id={`o2${key}`} value="2" label="Option 2" />
              <BPRadioGroupItem id={`o3${key}`} value="3" label="Option 3" />
            </BPRadioGroup>
          </div>
        ))}
        <div className="p-4">
          <BPRadioGroup defaultValue="1" outline magic>
            <BPRadioGroupItem id="m1" value="1" label="Option 1" />
            <BPRadioGroupItem id="m2" value="2" label="Option 2" />
            <BPRadioGroupItem id="m3" value="3" label="Option 3" />
          </BPRadioGroup>
        </div>
      </div>
    </div>
  ),
}
