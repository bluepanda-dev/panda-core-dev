import { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import BPButton from '@components/atoms/BPButton'
import BPPanel from '@components/molecules/BPPanel'
import { UI_TYPES_CONFIG, UI_VARIANT } from '@core/types/ui-kit'
import { hideControl } from '@core/utils/storybook'

export default {
  title: 'Molecules/BPPanel',
  component: BPPanel,
  argTypes: {
    hints: hideControl,
    footer: hideControl,
  },
} as Meta<typeof BPPanel>

type Story = StoryObj<typeof BPPanel>

const DefaultExample = ({
  // eslint-disable-next-line no-unused-vars
  children,
  variant,
  magic,
  outline,
  ...props
}: any) => {
  return (
    <BPPanel
      title="Panel Title"
      description="Panel Description"
      hints={<span className="justify-self-start">Some hints......</span>}
      footer={
        <>
          <BPButton size="sm" outline>
            Details
          </BPButton>
          <BPButton size="sm" variant={variant} magic={magic} outline={outline}>
            Download
          </BPButton>
        </>
      }
      className="w-[90vw] md:w-[400px] lg:w-[400px]"
      variant={variant}
      magic={magic}
      outline={outline}
      {...props}
    ></BPPanel>
  )
}

export const Basic: Story = {
  render: ({ ...props }) => (
    <>
      <DefaultExample {...props} />
    </>
  ),
}

export const Types: Story = {
  render: () => (
    <div className="w-[90vw] flex flex-col lg:flex-row lg:justify-center gap-16 overflow-y-auto h-[90vh] px-12 md:px-0">
      <div className="w-full">
        <div className="text-xl text-primary-600 py-6 text-center">Normal</div>
        <div className="flex flex-col gap-8 items-center pb-6">
          {Object.keys(UI_TYPES_CONFIG).map((key, index) => (
            <DefaultExample
              key={index}
              variant={key as UI_VARIANT}
              title={`Panel ${key}`}
            />
          ))}
        </div>
      </div>

      <div className="w-full">
        <div className="text-xl text-primary-600 py-6 text-center">
          Outlined
        </div>
        <div className="flex flex-col gap-8 items-center pb-6">
          {Object.keys(UI_TYPES_CONFIG).map((key, index) => (
            <DefaultExample
              key={index}
              variant={key as UI_VARIANT}
              outline={true}
              title={`Panel ${key}`}
            />
          ))}
          <DefaultExample magic outline={true} title="Panel Magic" />
        </div>
      </div>
    </div>
  ),
}
