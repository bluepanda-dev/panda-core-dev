import { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { FiAlertCircle } from 'react-icons/fi'
import {
  BPSelect,
  BPSelectGroup,
  BPSelectItem,
  BPSelectLabel,
  BPSelectSeparator,
} from '@components/atoms/BPSelect'
import { UI_TYPES_CONFIG, UI_TYPE } from '@core/types/ui-kit'

export default {
  title: 'Atoms/BPSelect',
  component: BPSelect,
  argTypes: {},
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
  render: () => (
    <BPSelect placeholder="Select an Option">
      <DefaultList />
    </BPSelect>
  ),
}

export const Statuses: Story = {
  args: {
    placeholder: 'Disabled select',
  },
  render: ({ placeholder }) => (
    <BPSelect placeholder={placeholder} disabled>
      <DefaultList />
      <BPSelectSeparator />
      <BPSelectGroup>
        <BPSelectLabel className="SelectLabel">Other</BPSelectLabel>
        <BPSelectItem value="lemon">Lemon</BPSelectItem>
      </BPSelectGroup>
    </BPSelect>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="flex gap-8 w-full items-center">
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
    <div className="w-full flex gap-6">
      <div className="flex flex-col gap-8 items-center">
        {Object.keys(UI_TYPES_CONFIG).map((key, index) => (
          <BPSelect key={index} type={key as UI_TYPE} placeholder={`${key}...`}>
            <DefaultList />
          </BPSelect>
        ))}
      </div>
      <div className="flex flex-col gap-8 items-center">
        {Object.keys(UI_TYPES_CONFIG).map((key, index) => (
          <BPSelect
            key={index}
            type={key as UI_TYPE}
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
