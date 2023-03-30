import { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import {
  BPSelect,
  BPSelectGroup,
  BPSelectItem,
  BPSelectLabel,
  BPSelectSeparator,
} from '@components/atoms/BPSelect'

export default {
  title: 'Atoms/BPSelect',
  component: BPSelect,
  argTypes: {},
} as Meta<typeof BPSelect>

type Story = StoryObj<typeof BPSelect>

export const Basic: Story = {
  render: () => (
    <BPSelect placeholder="Select an Option">
      <BPSelectGroup>
        <BPSelectLabel className="SelectLabel">Fruits</BPSelectLabel>
        <BPSelectItem value="apple">Apple</BPSelectItem>
        <BPSelectItem value="banana">Banana</BPSelectItem>
        <BPSelectItem value="grapes">Grapes</BPSelectItem>
        <BPSelectItem value="pineapple">Pineapple</BPSelectItem>
      </BPSelectGroup>
    </BPSelect>
  ),
}

export const Disable: Story = {
  render: () => (
    <BPSelect placeholder="Select an Option">
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
      <BPSelectSeparator />
      <BPSelectGroup>
        <BPSelectLabel className="SelectLabel">Other</BPSelectLabel>
        <BPSelectItem value="lemon">Lemon</BPSelectItem>
      </BPSelectGroup>
    </BPSelect>
  ),
}
