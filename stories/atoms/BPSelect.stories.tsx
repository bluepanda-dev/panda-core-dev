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

export const Disable: Story = {
  args: {
    placeholder: 'Select an Option',
  },
  render: ({ placeholder }) => (
    <BPSelect placeholder={placeholder}>
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
        <BPSelect placeholder="Primary type" type="primary">
          <DefaultList />
        </BPSelect>

        <BPSelect placeholder="Secodnary type" type="secondary">
          <DefaultList />
        </BPSelect>

        <BPSelect placeholder="Success type" type="success">
          <DefaultList />
        </BPSelect>

        <BPSelect placeholder="Danger type" type="danger">
          <DefaultList />
        </BPSelect>

        <BPSelect placeholder="Caution type" type="caution">
          <DefaultList />
        </BPSelect>

        <BPSelect placeholder="Light type" type="light">
          <DefaultList />
        </BPSelect>

        <BPSelect placeholder="Link type" type="link">
          <DefaultList />
        </BPSelect>
      </div>
      <div className="flex flex-col gap-8 items-center">
        <BPSelect placeholder="Default type">
          <DefaultList />
        </BPSelect>

        <BPSelect placeholder="Second type" type="secondary" outline>
          <DefaultList />
        </BPSelect>
        <BPSelect placeholder="Success type" type="success" outline>
          <DefaultList />
        </BPSelect>
        <BPSelect placeholder="Danger type" type="danger" outline>
          <DefaultList />
        </BPSelect>
      </div>
    </div>
  ),
}

// TODO magic one with multi color bg
