import { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { FiBell, FiMoon, FiStar } from 'react-icons/fi'
import BPDropdown, {
  BPDropdownItem,
  BPDropdownSeparator,
} from '@components/atoms/BPDropdown'
import { UI_TYPES_CONFIG, UI_TYPE } from '@core/types/ui-kit'

export default {
  title: 'Atoms/BPDropdown',
  component: BPDropdown,
  argTypes: {
    trigger: {
      table: {
        disable: true,
      },
    },
  },
} as Meta<typeof BPDropdown>

type Story = StoryObj<typeof BPDropdown>

export const Basic = ({ children, ...args }: any) => (
  <BPDropdown {...args}>
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

export const Custom: Story = {
  render: () => (
    <div className="flex gap-8 w-full items-center">
      <Basic>
        <FiBell />
      </Basic>
      <Basic>
        <FiMoon />
      </Basic>
      <Basic>
        <FiStar />
      </Basic>
    </div>
  ),
}
