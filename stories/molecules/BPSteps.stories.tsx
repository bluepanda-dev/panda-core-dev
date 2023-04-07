import { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { FiStar, FiGlobe } from 'react-icons/fi'
import { GiPanda } from 'react-icons/gi'
import BPSteps from '@components/molecules/BPSteps'
import { UI_TYPES_CONFIG, UI_TYPE } from '@core/types/ui-kit'

export default {
  title: 'Molecules/BPSteps',
  component: BPSteps,
  argTypes: {},
} as Meta<typeof BPSteps>

type Story = StoryObj<typeof BPSteps>

const items = [
  {
    label: 'Step 1',
    icon: <GiPanda />,
  },
  {
    label: 'Step 2',
    icon: <FiStar />,
  },
  {
    label: 'Step 3',
    icon: <FiGlobe />,
  },
]

const itemsWithActive = [
  {
    label: 'Step 1',
    icon: <GiPanda />,
  },
  {
    label: 'Step 2',
    icon: <FiStar />,
    active: true,
  },
  {
    label: 'Step 3',
    icon: <FiGlobe />,
  },
]

const manySteps = new Array(8).fill(0).map((_, index) => ({
  label: `Step ${index + 1}`,
  icon: <GiPanda />,
}))

const itemsDisabled = [
  {
    label: 'Step 1',
    icon: <GiPanda />,
  },
  {
    label: 'Step 2',
    icon: <FiStar />,
    disabled: true,
  },
  {
    label: 'Step 3',
    icon: <FiGlobe />,
    disabled: true,
  },
]

export const Basic: Story = {
  render: () => (
    <div className="w-[400px] md:w-[800px]">
      <BPSteps items={items} hoverable onValueChange={(v) => alert(v)} />
    </div>
  ),
}

export const Statuses: Story = {
  render: () => (
    <div className="w-[400px] md:w-[800px]">
      <div className="text-xl text-primary-600 py-6">
        Steps 2 and 3 are Disabled
      </div>

      <BPSteps items={itemsDisabled} />
      <BPSteps type="danger" items={itemsDisabled} />
      <BPSteps outline type="danger" items={itemsDisabled} />

      <div className="text-xl text-primary-600 py-6">Hoverable</div>
      <BPSteps items={items} hoverable />
      <BPSteps type="danger" items={items} hoverable />
      <BPSteps outline type="danger" items={items} hoverable />
      <div className="text-xl text-primary-600 py-6">Step 2 is Active</div>
      <BPSteps items={itemsWithActive} />
      <BPSteps type="danger" items={itemsWithActive} />
      <BPSteps outline type="danger" items={itemsWithActive} />

      <div className="text-xl text-primary-600 py-6">Many steps</div>
      <BPSteps items={manySteps} hoverable />
    </div>
  ),
}

export const Types: Story = {
  render: () => (
    <div className="w-[100vw] h-[90vh] overflow-y-auto flex flex-col md:flex-row gap-16 px-6">
      <div className="flex flex-col gap-8 items-center w-full">
        <div className="text-xl text-primary-600">Normal</div>
        {Object.keys(UI_TYPES_CONFIG).map((key, index) => (
          <BPSteps hoverable items={items} key={index} type={key as UI_TYPE} />
        ))}
      </div>

      <div className="flex flex-col gap-8 items-center w-full">
        <div className="text-xl text-primary-600">Outlined</div>
        {Object.keys(UI_TYPES_CONFIG).map((key, index) => (
          <BPSteps
            hoverable
            outline
            items={items}
            key={index}
            type={key as UI_TYPE}
          />
        ))}

        <BPSteps magic outline items={items} />
      </div>
    </div>
  ),
}
