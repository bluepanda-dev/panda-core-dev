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
  render: ({ children, ...args }: any) => (
    <BPSwitch id="1" {...args} onCheckedChange={console.log}>
      Label switch
    </BPSwitch>
  ),
}

export const Statuses: Story = {
  render: () => (
    <div className="flex gap-4 w-full items-center">
      <BPSwitch id="1" onCheckedChange={console.log} disabled>
        Disabled switch
      </BPSwitch>

      <BPSwitch
        type="danger"
        outline
        id="2"
        onCheckedChange={console.log}
        disabled
      >
        Disabled switch
      </BPSwitch>

      <BPSwitch type="danger" id="3" onCheckedChange={console.log} disabled>
        Disabled switch
      </BPSwitch>
    </div>
  ),
}

export const Types: Story = {
  render: () => (
    <div className="md:w-full  gap-16 block overflow-y-auto h-[700px] px-2 w-[300px] text-center">
      <div className="text-xl text-primary-600 mb-2">Normal</div>
      <div className="grid md:grid-cols-3 grid-cols-2 gap-6 items-center mb-4">
        {Object.keys(UI_TYPES_CONFIG).map((key, index) => (
          <BPSwitch id={key} key={index} type={key as UI_TYPE}>
            Switch {key}
          </BPSwitch>
        ))}
      </div>

      <div className="text-xl text-primary-600 mb-2">Outlined</div>
      <div className="grid md:grid-cols-3 grid-cols-2 gap-6 items-center">
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
