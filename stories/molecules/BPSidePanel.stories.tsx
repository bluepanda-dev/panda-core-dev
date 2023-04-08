import { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import BPButton from '@components/atoms/BPButton'
import BPContainer from '@components/atoms/BPContainer'
import BPSidePanel from '@components/molecules/BPSidePanel'
import { UI_TYPES_CONFIG, UI_TYPE } from '@core/types/ui-kit'
import { DefaultExample } from 'stories/atoms/BPDropdown.stories'

export default {
  title: 'Molecules/BPSidePanel',
  component: BPSidePanel,
  argTypes: {},
} as Meta<typeof BPSidePanel>

type Story = StoryObj<typeof BPSidePanel>

const DefaultSidePanel = ({ ...props }) => {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <>
      <BPButton
        onClick={() => {
          setIsOpen(true)
        }}
        outline={props.outline}
        magic={props.magic}
        type={props.type}
      >
        Open
      </BPButton>
      <BPSidePanel
        closeModal={() => setIsOpen(false)}
        isOpen={isOpen}
        title="My Side Panel"
        {...props}
      >
        You can use all our types.
      </BPSidePanel>
    </>
  )
}

export const Basic: Story = {
  render: () => (
    <div className="h-[100vh] w-[100vw] flex justify-center items-center flex-col gap-8">
      <DefaultSidePanel />
    </div>
  ),
}

export const BasicRight: Story = {
  render: () => (
    <div className="h-[100vh] w-[100vw] flex justify-center items-center flex-col gap-8">
      <DefaultSidePanel side="right" />
    </div>
  ),
}

export const Types: Story = {
  render: () => (
    <div className="h-[100vh] w-[100vw] flex justify-center items-start gap-16">
      <div>
        <div className="text-xl text-primary-600 py-6">Normal</div>
        <div className="flex flex-col gap-2 items-center pb-6">
          {Object.keys(UI_TYPES_CONFIG).map((key, index) => (
            <DefaultSidePanel key={index} type={key as UI_TYPE} />
          ))}
        </div>
      </div>

      <div>
        <div className="text-xl text-primary-600 py-6">Outlined</div>
        <div className="flex flex-col gap-2 items-center pb-6">
          {Object.keys(UI_TYPES_CONFIG).map((key, index) => (
            <DefaultSidePanel outline key={index} type={key as UI_TYPE} />
          ))}
          <DefaultSidePanel magic outline={true} title="Panel Magic" />
        </div>
      </div>
    </div>
  ),
}
