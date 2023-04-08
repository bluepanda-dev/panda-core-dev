import { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import BPCollapsible from '@components/molecules/BPCollapsible'
import { UI_TYPES_CONFIG, UI_TYPE } from '@core/types/ui-kit'

export default {
  title: 'Molecules/BPCollapsible',
  component: BPCollapsible,
  argTypes: {},
} as Meta<typeof BPCollapsible>

type Story = StoryObj<typeof BPCollapsible>

const DefaultExample = ({ ...props }) => (
  <BPCollapsible title="@panda starred 3 repositories" {...props}>
    <span>@panda-ui/plus</span>
    <span>@panda-ui/firebase</span>
    <span>@panda-ui/stripe</span>
    <span>@panda-ui/cms</span>
  </BPCollapsible>
)

export const Basic: Story = {
  render: () => <DefaultExample />,
}

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <DefaultExample />
      <DefaultExample size="xs" />
      <DefaultExample size="sm" />
      <DefaultExample size="lg" />
      <DefaultExample size="xl" />
    </div>
  ),
}

export const Hoverable: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <div className="text-xl text-primary-600">Hoverable</div>
      <DefaultExample type="danger" outline hoverable />
    </div>
  ),
}

export const Types: Story = {
  render: () => (
    <div className="w-full  gap-16 md:flex block overflow-y-auto h-[700px] px-6">
      <div className="flex flex-col gap-8 items-center ">
        <div className="text-xl text-primary-600">Normal buttons</div>
        {Object.keys(UI_TYPES_CONFIG).map((key, index) => (
          <DefaultExample
            key={index}
            type={key as UI_TYPE}
            title={`@panda starred 3 repos - ${key}`}
            className="w-full"
          />
        ))}
      </div>
      <div className="flex flex-col gap-8 items-center">
        <div className="text-xl text-primary-600">Outlined buttons</div>
        {Object.keys(UI_TYPES_CONFIG).map((key, index) => (
          <DefaultExample
            key={index}
            type={key as UI_TYPE}
            title={`@panda starred 3 repos - ${key}`}
            className="w-full"
            outline
          />
        ))}

        <DefaultExample
          title={`@panda starred 3 repos - magic`}
          outline
          magic
          className="w-full"
        />
      </div>
    </div>
  ),
}
