import { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import BPSwitch from '@components/atoms/BPSwitch'
import { UI_TYPES_CONFIG, UI_VARIANT } from '@core/types/ui-kit'

export default {
  title: 'Atoms/BPSwitch',
  component: BPSwitch,
  argTypes: {},
} as Meta<typeof BPSwitch>

type Story = StoryObj<typeof BPSwitch>

export const Basic: Story = {
  render: ({ ...args }: any) => (
    <BPSwitch id="1" {...args} onCheckedChange={console.log}>
      Label switch
    </BPSwitch>
  ),
}

export const Statuses: Story = {
  render: () => (
    <div className="flex flex-col lg:flex-row gap-6 justify-center items-center w-full lg:w-[90vw] overflow-x-auto py-12 md:py-0 ">
      <div>
        <BPSwitch id="1" onCheckedChange={console.log} disabled>
          Disabled switch
        </BPSwitch>
      </div>

      <div>
        <BPSwitch
          variant="danger"
          outline
          id="2"
          onCheckedChange={console.log}
          disabled
        >
          Disabled switch
        </BPSwitch>
      </div>

      <div>
        <BPSwitch
          variant="danger"
          id="3"
          onCheckedChange={console.log}
          disabled
        >
          Disabled switch
        </BPSwitch>
      </div>
    </div>
  ),
}

export const Types: Story = {
  render: () => (
    <div className=" w-full  gap-16 md:flex block overflow-y-auto h-[90vh] px-12 text-center">
      <div className="flex flex-col gap-8">
        <div className="text-xl text-primary-600 mb-2">Normal</div>
        {Object.keys(UI_TYPES_CONFIG).map((key, index) => (
          <BPSwitch id={key} key={index} variant={key as UI_VARIANT}>
            Switch {key}
          </BPSwitch>
        ))}
      </div>

      <div className="flex flex-col gap-8">
        <div className="text-xl text-primary-600 mb-2 md:mt-0 mt-12">
          Outlined
        </div>
        {Object.keys(UI_TYPES_CONFIG).map((key, index) => (
          <BPSwitch outline id={key} key={index} variant={key as UI_VARIANT}>
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
