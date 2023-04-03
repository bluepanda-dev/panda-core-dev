import { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import BPDropdown, {
  BPDropdownItem,
  BPDropdownSeparator,
} from '@components/atoms/BPDropdown'
import { UI_TYPES_CONFIG, UI_TYPE } from '@core/types/ui-kit'

export default {
  title: 'Atoms/BPDropdown',
  component: BPDropdown,
  argTypes: {},
} as Meta<typeof BPDropdown>

type Story = StoryObj<typeof BPDropdown>

const DefaultExample = ({ ...props }) => {
  return (
    <BPDropdown {...props}>
      <BPDropdownItem>
        New Tab <div className="RightSlot">⌘+T</div>
      </BPDropdownItem>
      <BPDropdownItem>
        Another <div className="RightSlot">⌘+T</div>
      </BPDropdownItem>
      <BPDropdownSeparator />

      <BPDropdownItem>
        New Private Window <div className="RightSlot">⇧+⌘+N</div>
      </BPDropdownItem>
    </BPDropdown>
  )
}

export const Basic: Story = {
  render: () => <DefaultExample />,
}

export const Sizes: Story = {
  render: () => (
    <div className="flex gap-8 w-full items-center">
      <DefaultExample />
      <DefaultExample size="xs" />
      <DefaultExample size="sm" />
      <DefaultExample size="lg" />
      <DefaultExample size="xl" />
    </div>
  ),
}

export const Types: Story = {
  render: () => (
    <div className="w-full flex-col flex gap-6">
      <div className="text-xl text-primary-600 my-8">Normal</div>
      <div className="flex gap-8 items-center">
        {Object.keys(UI_TYPES_CONFIG).map((key, index) => (
          <div key={index}>
            <div className="text-xl text-primary-600 my-8">{key}</div>
            <DefaultExample type={key as UI_TYPE} />
          </div>
        ))}
      </div>
      <div className="text-xl text-primary-600 my-8">Outline</div>
      <div className="flex gap-8 items-center">
        {Object.keys(UI_TYPES_CONFIG).map((key, index) => (
          <div key={index}>
            <div className="text-xl text-primary-600 my-8">{key}</div>
            <DefaultExample type={key as UI_TYPE} outline />
          </div>
        ))}
      </div>
      <div className="text-xl text-primary-600 my-8">Magic</div>
      <DefaultExample magic outline />
    </div>
  ),
}
