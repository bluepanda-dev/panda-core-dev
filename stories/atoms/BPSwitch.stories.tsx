import { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import BPSwitch from '@components/atoms/BPSwitch'
import { UI_TYPES_CONFIG, UI_TYPE } from '@core/types/ui-kit'

export default {
  title: 'Atoms/BPSwitch',
  component: BPSwitch,
  argTypes: {},
} as Meta<typeof BPSwitch>

type Story = StoryObj<typeof BPSwitch>

export const Basic: Story = {
  render: () => (
    <BPSwitch id="1" onCheckedChange={console.log}>
      Label switch
    </BPSwitch>
  ),
}

export const Types: Story = {
  render: () => (
    <div className="w-full flex flex-col gap-12">
      <div className="text-xl text-primary-600">Normal</div>
      <div className="grid grid-cols-3 gap-6 items-center">
        {Object.keys(UI_TYPES_CONFIG).map((key, index) => (
          <BPSwitch id={key} key={index} type={key as UI_TYPE}>
            Switch {key}
          </BPSwitch>
        ))}
      </div>

      <div className="text-xl text-primary-600">Outlined</div>
      <div className="grid grid-cols-3 gap-6 items-center">
        {Object.keys(UI_TYPES_CONFIG).map((key, index) => (
          <BPSwitch outline id={key} key={index} type={key as UI_TYPE}>
            Switch {key}
          </BPSwitch>
        ))}

        <BPSwitch magic outline id={'magic'}>
          Switch magic
        </BPSwitch>
      </div>
    </div>
  ),
}