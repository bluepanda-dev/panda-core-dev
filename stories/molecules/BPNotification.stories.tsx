import { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { FiEye } from 'react-icons/fi'
import { GiPanda } from 'react-icons/gi'
import BPButton from '@components/atoms/BPButton'
import BPNotification from '@components/molecules/BPNotification'
import { UI_TYPES_CONFIG, UI_TYPE } from '@core/types/ui-kit'

export default {
  title: 'Molecules/BPNotification',
  component: BPNotification,
  argTypes: {},
} as Meta<typeof BPNotification>

type Story = StoryObj<typeof BPNotification>

export const Basic: Story = {
  render: () => (
    <div className="w-[600px] flex justify-center">
      <BPNotification>
        <p className="font-semibold">Notification</p>
        <p>
          You can use the Notification component to display messages with icons.
        </p>
      </BPNotification>
    </div>
  ),
}

export const Custom: Story = {
  render: () => (
    <div className="w-[600px] flex-col gap-4 flex justify-center">
      <BPNotification icon={<FiEye />}>
        <p>Custom Icon</p>
      </BPNotification>
      <BPNotification className="flex justify-between">
        <p>Actions</p>
        <div className="flex gap-2">
          <BPButton outline>Close</BPButton>
          <BPButton outline>Save</BPButton>
        </div>
      </BPNotification>
    </div>
  ),
}

export const Types: Story = {
  render: () => (
    <div className="w-[100vw] flex gap-16 px-6">
      <div className="flex flex-col gap-8 items-center w-full">
        <div className="text-xl text-primary-600">Normal</div>
        {Object.keys(UI_TYPES_CONFIG).map((key, index) => (
          <BPNotification icon={<GiPanda />} key={index} type={key as UI_TYPE}>
            <p>Type {key}</p>
            <p>You can use it component to display messages with icons.</p>
          </BPNotification>
        ))}
      </div>

      <div className="flex flex-col gap-8 items-center w-full">
        <div className="text-xl text-primary-600">Outlined</div>
        {Object.keys(UI_TYPES_CONFIG).map((key, index) => (
          <BPNotification
            icon={<GiPanda />}
            outline
            key={index}
            type={key as UI_TYPE}
          >
            <p>Type {key}</p>
            <p>You can use it component to display messages with icons.</p>
          </BPNotification>
        ))}
        <BPNotification icon={<GiPanda />} magic outline>
          <p>Magic</p>
          <p>You can use it component to display messages with icons.</p>
        </BPNotification>
      </div>
    </div>
  ),
}
