import { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import BPButton from '@components/atoms/BPButton'
import BPSidePanel from '@components/molecules/BPSidePanel'
import { UI_TYPES_CONFIG, UI_VARIANT } from '@core/types/ui-kit'
import { hideControl } from '@core/utils/storybook'

export default {
  title: 'Molecules/BPSidePanel',
  component: BPSidePanel,
  argTypes: {
    closeModal: hideControl,
  },
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
        variant={props.variant}
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
  render: ({ ...props }) => (
    <div className="h-[100vh] w-[100vw] flex justify-center items-center flex-col gap-8">
      <DefaultSidePanel {...props} />
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
    <div className="h-[90vh] w-[90vw] overflow-y-auto flex justify-center items-start gap-16">
      <div>
        <div className="text-xl text-primary-600 py-6">Normal</div>
        <div className="flex flex-col gap-2 items-center pb-6">
          {Object.keys(UI_TYPES_CONFIG).map((key, index) => (
            <DefaultSidePanel key={index} variant={key as UI_VARIANT} />
          ))}
        </div>
      </div>

      <div>
        <div className="text-xl text-primary-600 py-6">Outlined</div>
        <div className="flex flex-col gap-2 items-center pb-6">
          {Object.keys(UI_TYPES_CONFIG).map((key, index) => (
            <DefaultSidePanel outline key={index} variant={key as UI_VARIANT} />
          ))}
          <DefaultSidePanel magic outline={true} title="Panel Magic" />
        </div>
      </div>
    </div>
  ),
}
