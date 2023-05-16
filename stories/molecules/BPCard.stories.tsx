import { Meta, StoryObj } from '@storybook/react'
import Image from 'next/image'
import React from 'react'
import BPCard from '@components/molecules/BPCard'
import { UI_TYPES_CONFIG, UI_VARIANT } from '@core/types/ui-kit'

export default {
  title: 'Molecules/ BPCard',
  component: BPCard,
  argTypes: {
    title: {
      control: { type: 'text' },
    },
  },
} as Meta<typeof BPCard>

type Story = StoryObj<typeof BPCard>

const DefaultExample = ({ title = 'Default Example', ...props }: any) => (
  <BPCard
    title={title}
    className="w-[90vw] lg:w-[400px] md:w-[400px]"
    {...props}
  />
)
export const Basic: Story = {
  render: ({ ...props }) => (
    <div className="w-[90vw] flex justify-center overflow-x-auto">
      <DefaultExample {...props} footer={<span>4h ago </span>}>
        <span>Card content, you can add html elements too.</span>
      </DefaultExample>
    </div>
  ),
}

export const Statuses: Story = {
  render: () => (
    <div className="flex gap-8 flex-col items-start lg:items-center md:w-full  overflow-x-auto w-[90vw] py-12 md:py-0">
      <DefaultExample
        title="Hoverable Card"
        hoverable
        footer={<span>4h ago </span>}
      >
        <span>Card content, you can add html elements too.</span>
      </DefaultExample>

      <DefaultExample
        title={
          <div className="flex gap-2 items-center">
            <Image
              width={50}
              height={50}
              src="https://plus.blue-panda.dev/logo.webp"
              className="p-2"
              alt="logo"
              title="logo"
            />
            <div className="flex flex-col items-start gap-2">
              <span>Custom title - Panda UI Kit</span>
              <span className="text-normal-500 font-light text-sm">
                blue-panda.dev
              </span>
            </div>
          </div>
        }
        footer={<span>4h ago </span>}
      >
        Card content, you can add html elements too.
      </DefaultExample>
    </div>
  ),
}

export const Types: Story = {
  render: () => (
    <div className="gap-8 flex flex-wrap justify-center overflow-y-auto h-[90vh] px-2 w-[100vw]">
      <div className="flex flex-col gap-2 items-center">
        <div className="text-xl text-primary-600 mb-2">Normal</div>
        {Object.keys(UI_TYPES_CONFIG)
          .filter((key) => key !== 'inverted')
          .map((key, index) => (
            <DefaultExample
              title="Hoverable Card"
              key={index}
              variant={key as UI_VARIANT}
              hoverable
              footer={<span>4h ago </span>}
            >
              <span>Card content, you can add html elements too.</span>
            </DefaultExample>
          ))}
      </div>

      <div className="flex flex-col gap-2 items-center">
        <div className="text-xl text-primary-600 mb-2">Outlined</div>
        {Object.keys(UI_TYPES_CONFIG)
          .filter((key) => key !== 'inverted')
          .map((key, index) => (
            <DefaultExample
              outline
              title="Hoverable Card"
              key={index}
              variant={key as UI_VARIANT}
              hoverable
              footer={<span>4h ago </span>}
            >
              <span>Card content, you can add html elements too.</span>
            </DefaultExample>
          ))}
        <DefaultExample
          title="Hoverable Card"
          magic
          footer={<span>4h ago </span>}
        >
          <span>Card content, you can add html elements too.</span>
        </DefaultExample>
      </div>
    </div>
  ),
}
