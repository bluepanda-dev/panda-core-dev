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
  render: ({ children, ...args }: any) => (
    <BPSelect {...args} placeholder="Select an Option">
      <DefaultList />
    </BPSelect>
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
