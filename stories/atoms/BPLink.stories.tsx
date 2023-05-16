import { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import BPLink from '@components/atoms/BPLink'
import { UI_TYPES_CONFIG, UI_VARIANT } from '@core/types/ui-kit'

export default {
  title: 'Atoms/BPLink',
  component: BPLink,
  argTypes: {},
} as Meta<typeof BPLink>

type Story = StoryObj<typeof BPLink>

export const Basic: Story = {
  render: ({ ...args }: any) => <BPLink {...args}>Default link</BPLink>,
}

export const Underline: Story = {
  render: ({ ...args }: any) => (
    <BPLink {...args} underline>
      Underline link
    </BPLink>
  ),
}

export const Types: Story = {
  render: () => (
    <div className="flex gap-16 w-[100vw] h-[90vh] overflow-y-auto px-6 justify-center">
      <div className="flex flex-col gap-8 items-center">
        <div className="text-xl text-primary-600">Normal</div>
        {Object.keys(UI_TYPES_CONFIG).map((key, index) => (
          <BPLink key={index} variant={key as UI_VARIANT}>
            My Link
          </BPLink>
        ))}
        <BPLink magic>My Link</BPLink>
      </div>
      <div className="flex flex-col gap-8 items-center">
        <div className="text-xl text-primary-600">Underline</div>
        {Object.keys(UI_TYPES_CONFIG).map((key, index) => (
          <BPLink underline key={index} variant={key as UI_VARIANT}>
            My Link
          </BPLink>
        ))}
        <BPLink magic underline>
          My Link
        </BPLink>
      </div>
    </div>
  ),
}
