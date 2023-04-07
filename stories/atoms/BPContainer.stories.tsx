import { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import BPContainer from '@components/atoms/BPContainer'

export default {
  title: 'Atoms/BPContainer',
  component: BPContainer,
  argTypes: {},
} as Meta<typeof BPContainer>

type Story = StoryObj<typeof BPContainer>

export const Basic: Story = {
  render: () => (
    <div className="w-[100vw] flex justify-center">
      <BPContainer className="p-16 flex flex-col gap-12 w-full border-neutral-200 dark:border-neutral-900 text-center border-dashed border-4 rounded-md">
        <p>Container (default max 4xl)</p>
        <p>(Dotted border is just to show the sizes)</p>
        <p>
          You can use this when you dont want you container to grow infinitely.
        </p>
      </BPContainer>
    </div>
  ),
}

const SizeDefault = ({ size }: any) => (
  <BPContainer
    size={size}
    className="p-6 flex flex-col gap-2 w-full border-neutral-200 dark:border-neutral-900 text-center border-dashed border-4 rounded-md"
  >
    <p className="text-cyber-600">{size} Container</p>
    <p>(Dotted border is just to show the sizes)</p>
    <p>You can use this when you dont want you container to grow infinitely.</p>
  </BPContainer>
)

export const Sizes: Story = {
  render: () => (
    <div className="w-[100vw] flex items-center flex-col justify-center gap-2">
      <SizeDefault size="xs" />
      <SizeDefault size="sm" />
      <SizeDefault size="lg" />
      <SizeDefault size="xl" />
    </div>
  ),
}
