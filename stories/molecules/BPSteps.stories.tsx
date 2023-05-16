import { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { FiStar, FiGlobe } from 'react-icons/fi'
import { GiPanda } from 'react-icons/gi'
import BPSteps from '@components/molecules/BPSteps'
import { UI_TYPES_CONFIG, UI_VARIANT } from '@core/types/ui-kit'
import { hideControl } from '@core/utils/storybook'

export default {
  title: 'Molecules/BPSteps',
  component: BPSteps,
  argTypes: {
    items: hideControl,
  },
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
  render: ({ ...props }) => (
    <div className="w-[95vw] lg:w-[400px]">
      <BPSteps
        {...props}
        items={items}
        hoverable
        onValueChange={(v) => alert(v)}
      />
    </div>
  ),
}

export const Statuses: Story = {
  render: () => (
    <div className="w-[90vw] h-[90vh] overflow-y-auto">
      <div className="text-xl text-primary-600 py-6 text-center">
        Steps 2 and 3 are Disabled
      </div>

      <BPSteps items={itemsDisabled} />
      <BPSteps variant="danger" items={itemsDisabled} />
      <BPSteps outline variant="danger" items={itemsDisabled} />

      <div className="text-xl text-primary-600 py-6 text-center">Hoverable</div>
      <BPSteps items={items} hoverable />
      <BPSteps variant="danger" items={items} hoverable />
      <BPSteps outline variant="danger" items={items} hoverable />
      <div className="text-xl text-primary-600 py-6 text-center">
        Step 2 is Active
      </div>
      <BPSteps items={itemsWithActive} />
      <BPSteps variant="danger" items={itemsWithActive} />
      <BPSteps outline variant="danger" items={itemsWithActive} />

      <div className="text-xl text-primary-600 py-6 text-center">
        Many steps
      </div>
      <BPSteps className="overflow-y-auto" items={manySteps} hoverable />
    </div>
  ),
}

export const Types: Story = {
  render: () => (
    <div className="w-[100vw] h-[90vh] overflow-y-auto flex flex-col md:flex-row gap-16 px-6">
      <div className="flex flex-col gap-8 items-center w-full">
        <div className="text-xl text-primary-600">Normal</div>
        {Object.keys(UI_TYPES_CONFIG).map((key, index) => (
          <BPSteps
            hoverable
            items={items}
            key={index}
            variant={key as UI_VARIANT}
          />
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
            variant={key as UI_VARIANT}
          />
        ))}

        <BPSteps magic outline items={items} />
      </div>
    </div>
  ),
}
