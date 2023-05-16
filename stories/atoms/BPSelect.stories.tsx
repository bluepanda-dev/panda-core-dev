import { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import {
  BPSelect,
  BPSelectGroup,
  BPSelectItem,
  BPSelectLabel,
} from '@components/atoms/BPSelect'
import { UI_TYPES_CONFIG, UI_VARIANT } from '@core/types/ui-kit'

export default {
  title: 'Atoms/BPSelect',
  component: BPSelect,
  argTypes: {
    disabled: {
      control: { type: 'boolean' },
    },
  },
} as Meta<typeof BPSelect>

type Story = StoryObj<typeof BPSelect>

const DefaultList = () => (
  <BPSelectGroup>
    <BPSelectLabel className="SelectLabel">Fruits</BPSelectLabel>
    <BPSelectItem value="apple">Apple</BPSelectItem>
    <BPSelectItem value="banana">Banana</BPSelectItem>
    <BPSelectItem value="blueberry" disabled>
      Blueberry
    </BPSelectItem>
    <BPSelectItem value="grapes">Grapes</BPSelectItem>
    <BPSelectItem value="pineapple">Pineapple</BPSelectItem>
  </BPSelectGroup>
)

export const Basic: Story = {
  render: ({ ...args }: any) => (
    <BPSelect {...args} placeholder="Select an Option">
      <DefaultList />
    </BPSelect>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col lg:flex-row gap-8 overflow-x-auto w-[90vw] py-12 md:py-0">
      <BPSelect placeholder="Default size">
        <DefaultList />
      </BPSelect>
      <BPSelect size="xs" placeholder="Size xs">
        <DefaultList />
      </BPSelect>
      <BPSelect size="sm" placeholder="Size sm">
        <DefaultList />
      </BPSelect>
      <BPSelect size="lg" placeholder="Size lg">
        <DefaultList />
      </BPSelect>
      <BPSelect size="xl" placeholder="Size xl">
        <DefaultList />
      </BPSelect>

      <BPSelect size="xl" placeholder="Size xl long long text">
        <DefaultList />
      </BPSelect>
    </div>
  ),
}

export const Types: Story = {
  render: () => (
    <div className="w-full  gap-16 md:flex block overflow-y-auto h-[90vh] px-12 md:px-0">
      <div className="flex flex-col gap-8 items-center">
        {Object.keys(UI_TYPES_CONFIG).map((key, index) => (
          <BPSelect
            key={index}
            variant={key as UI_VARIANT}
            placeholder={`${key}...`}
          >
            <DefaultList />
          </BPSelect>
        ))}
      </div>
      <div className="flex flex-col gap-8 items-center">
        {Object.keys(UI_TYPES_CONFIG).map((key, index) => (
          <BPSelect
            key={index}
            variant={key as UI_VARIANT}
            placeholder={`${key}...`}
            outline
          >
            <DefaultList />
          </BPSelect>
        ))}
        <BPSelect placeholder="Magic type" magic outline>
          <DefaultList />
        </BPSelect>
      </div>
    </div>
  ),
}
