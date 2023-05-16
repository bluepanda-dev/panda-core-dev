import { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { FiImage } from 'react-icons/fi'
import BPSkeletonLoader from '@components/atoms/BPSkeletonLoader'

export default {
  title: 'Atoms/BPSkeletonLoader',
  component: BPSkeletonLoader,
  argTypes: {},
} as Meta<typeof BPSkeletonLoader>

type Story = StoryObj<typeof BPSkeletonLoader>

export const Basic: Story = {
  args: {
    loading: true,
  },
  render: ({ ...args }) => (
    <div className="w-[90vw] md:w-[400px] lg:w-[400px]">
      <BPSkeletonLoader {...args}>
        <div>My skeleton loader hide the content</div>
      </BPSkeletonLoader>
    </div>
  ),
}

export const IconLoader: Story = {
  args: {
    loading: true,
    icon: <FiImage />,
    width: 'w-36',
    height: 'h-36',
  },
  render: ({ ...args }) => (
    <div className="w-[400px] flex justify-center">
      <BPSkeletonLoader {...args}>
        <div>My skeleton loader hide the content</div>
      </BPSkeletonLoader>
    </div>
  ),
}
export const Customs: Story = {
  render: () => (
    <div className="w-[90vw] md:w-[400px] lg:w-[400px] flex-col flex gap-2">
      <BPSkeletonLoader loading={true}>
        <div>My skeleton loader hide the content</div>
      </BPSkeletonLoader>
      <BPSkeletonLoader height="h-4" loading={true}></BPSkeletonLoader>
      <BPSkeletonLoader height="h-4" loading={true}></BPSkeletonLoader>
      <BPSkeletonLoader height="h-4" loading={true}></BPSkeletonLoader>
      <div className="flex gap-2">
        <BPSkeletonLoader height="h-4" loading={true}></BPSkeletonLoader>
        <BPSkeletonLoader height="h-4" loading={true}></BPSkeletonLoader>
      </div>
    </div>
  ),
}
