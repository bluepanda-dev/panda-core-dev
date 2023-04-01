import { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import BPButton from '@components/atoms/BPButton'

export default {
  title: 'Atoms/BPButton',
  component: BPButton,
  argTypes: {},
} as Meta<typeof BPButton>

type Story = StoryObj<typeof BPButton>

export const Basic: Story = {
  render: () => <BPButton>Button</BPButton>,
}

export const Sizes: Story = {
  render: () => (
    <div className="flex gap-8 w-full items-center">
      <BPButton>Default Button</BPButton>
      <BPButton size="xs">Size xs</BPButton>
      <BPButton size="sm">Size sm</BPButton>
      <BPButton size="lg">Size lg</BPButton>
      <BPButton size="xl">Size xl</BPButton>
      <BPButton size="xl">Size xl long long text</BPButton>
    </div>
  ),
}

export const Types: Story = {
  render: () => (
    <div className="w-full flex gap-16">
      <div className="flex flex-col gap-8 items-center">
        <div className="text-xl text-primary-600">Normal buttons</div>
        <BPButton>Button</BPButton>
        <BPButton type="primary">Primary</BPButton>
        <BPButton type="secondary">Secondary</BPButton>
        <BPButton type="success">Success</BPButton>
        <BPButton type="danger">Danger</BPButton>
        <BPButton type="caution">Caution</BPButton>
        <BPButton type="light">Light</BPButton>
        <BPButton type="link">Link</BPButton>
        <BPButton magic>Magic</BPButton>
      </div>

      <div className="flex flex-col gap-8 items-center">
        <div className="text-xl text-primary-600">Outlined buttons</div>
        <BPButton outline>Button</BPButton>
        <BPButton type="primary" outline>
          Primary
        </BPButton>
        <BPButton type="secondary" outline>
          Secondary
        </BPButton>
        <BPButton type="success" outline>
          Success
        </BPButton>
        <BPButton type="danger" outline>
          Danger
        </BPButton>
        <BPButton type="caution" outline>
          Caution
        </BPButton>
        <BPButton type="light" outline>
          Light
        </BPButton>
        <BPButton type="link" outline>
          Link
        </BPButton>
      </div>
    </div>
  ),
}
