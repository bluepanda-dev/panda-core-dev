import { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import BPCollapsible from '@components/molecules/BPCollapsible'
import { UI_TYPES_CONFIG, UI_VARIANT } from '@core/types/ui-kit'

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
  render: ({ ...props }) => <DefaultExample {...props} />,
}

export const Sizes: Story = {
  render: () => (
    <div className="w-[100vw] flex flex-wrap justify-center gap-16 h-[90vh] overflow-y-auto px-6">
      <div className="mb-4 text-xl text-center text-primary-600">
        Default
        <DefaultExample />
      </div>
      <div className="mb-4 text-xl text-center text-primary-600">
        XS
        <DefaultExample size="xs" />
      </div>
      <div className="mb-4 text-xl text-center text-primary-600">
        SM
        <DefaultExample size="sm" />
      </div>
      <div className="mb-4 text-xl text-center text-primary-600">
        XL
        <DefaultExample size="xl" />
      </div>
    </div>
  ),
}

export const Hoverable: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <div className="text-xl text-center text-primary-600">Hoverable</div>
      <DefaultExample variant="danger" outline hoverable />
    </div>
  ),
}

export const Types: Story = {
  render: () => (
    <div className="w-[90vw] justify-center gap-16 md:flex block overflow-y-auto h-[90vh] px-6">
      <div className="flex flex-col gap-8 items-center ">
        <div className="text-xl text-primary-600">Normal buttons</div>
        {Object.keys(UI_TYPES_CONFIG).map((key, index) => (
          <DefaultExample
            key={index}
            variant={key as UI_VARIANT}
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
            variant={key as UI_VARIANT}
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
