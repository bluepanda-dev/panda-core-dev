import { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { FiBell, FiMoon, FiStar } from 'react-icons/fi'
import BPDropdown, {
  BPDropdownItem,
  BPDropdownSeparator,
} from '@components/atoms/BPDropdown'
import { UI_TYPES_CONFIG, UI_VARIANT } from '@core/types/ui-kit'
import { hideControl } from '@core/utils/storybook'

export const DefaultExample = ({ children, ...props }: any) => {
  return (
    <BPDropdown trigger={children} {...props}>
      <BPDropdownItem>
        New Tab <div>⌘+T</div>
      </BPDropdownItem>
      <BPDropdownItem>
        Another <div>⌘+T</div>
      </BPDropdownItem>
      <BPDropdownSeparator />

      <BPDropdownItem>
        New Private Window <div>⇧+⌘+N</div>
      </BPDropdownItem>
    </BPDropdown>
  )
}

export default {
  title: 'Atoms/BPDropdown',
  component: BPDropdown,
  argTypes: {
    trigger: hideControl,
  },
} as Meta<typeof BPDropdown>

type Story = StoryObj<typeof BPDropdown>

export const Custom: Story = {
  render: () => (
    <div className="flex gap-8 w-full items-center">
      <DefaultExample>
        <FiBell />
      </DefaultExample>
      <DefaultExample>
        <FiMoon />
      </DefaultExample>
      <DefaultExample>
        <FiStar />
      </DefaultExample>
    </div>
  ),
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
    <div className="w-[90vw] flex flex-col gap-1 overflow-auto">
      <div className="text-xl text-center text-primary-600 my-4 p-2 border">
        Normal
      </div>
      <div className="flex gap-8 items-center md:w-full w-[90vw] overflow-x-auto self-center py-4">
        {Object.keys(UI_TYPES_CONFIG).map((key, index) => (
          <div className="flex flex-col items-center" key={index}>
            <div className="text-xl text-primary-600 my-4">{key}</div>
            <DefaultExample variant={key as UI_VARIANT} />
          </div>
        ))}
      </div>
      <div className="text-xl text-center text-primary-600 my-4 p-2 border">
        Outline
      </div>
      <div className="flex gap-8 items-center md:w-full w-[90vw] overflow-x-auto self-center py-4">
        {Object.keys(UI_TYPES_CONFIG).map((key, index) => (
          <div className="flex flex-col items-center" key={index}>
            <div className="text-xl text-primary-600 my-4">{key}</div>
            <DefaultExample variant={key as UI_VARIANT} outline />
          </div>
        ))}
      </div>
      <div className="text-xl text-center text-primary-600 my-4 p-2 border">
        Magic
      </div>
      <div className="flex gap-8 justify-center md:w-full w-[90vw] overflow-x-auto self-center py-4">
        <DefaultExample magic outline />
      </div>
    </div>
  ),
}
