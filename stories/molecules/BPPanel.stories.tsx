import { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import BPButton from '@components/atoms/BPButton'
import BPPanel from '@components/molecules/BPPanel'
import { UI_TYPES_CONFIG, UI_TYPE } from '@core/types/ui-kit'

export default {
  title: 'Molecules/BPPanel',
  component: BPPanel,
  argTypes: {},
} as Meta<typeof BPPanel>

type Story = StoryObj<typeof BPPanel>

const DefaultExample = ({ children, type, magic, outline, ...props }: any) => {
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
          <BPButton size="sm" type={type} magic={magic} outline={outline}>
            Download
          </BPButton>
        </>
      }
      className="w-[400px]"
      type={type}
      magic={magic}
      outline={outline}
      {...props}
    ></BPPanel>
  )
}

export const Basic: Story = {
  render: () => (
    <>
      <DefaultExample />
    </>
  ),
}

export const Types: Story = {
  render: () => (
    <div className="w-full  gap-16 md:flex block overflow-y-auto h-[700px] px-12 md:px-0">
      <div>
        <div className="text-xl text-primary-600 py-6 text-center">Normal</div>
        <div className="flex flex-col gap-8 ">
          {Object.keys(UI_TYPES_CONFIG).map((key, index) => (
            <DefaultExample
              key={index}
              type={key as UI_TYPE}
              title={`Panel ${key}`}
            />
          ))}
        </div>
      </div>

      <div>
        <div className="text-xl text-primary-600 py-6 text-center">
          Outlined
        </div>
        <div className="flex flex-col gap-8 ">
          {Object.keys(UI_TYPES_CONFIG).map((key, index) => (
            <DefaultExample
              key={index}
              type={key as UI_TYPE}
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
