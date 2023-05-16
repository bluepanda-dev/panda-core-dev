import { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import BPAccordion, {
  BPAccordionItem,
  BPAccordionContent,
  BPAccordionTrigger,
} from '@components/atoms/BPAccordion'
import { UI_TYPES_CONFIG, UI_VARIANT } from '@core/types/ui-kit'

export default {
  title: 'Atoms/BPAccordion',
  component: BPAccordion,
  argTypes: {},
} as Meta<typeof BPAccordion>

type Story = StoryObj<typeof BPAccordion>

const DefaultExample = ({ ...props }) => (
  <BPAccordion
    className="w-[90%] lg:w-[400px]"
    defaultValue="item-1"
    {...props}
  >
    <BPAccordionItem value="item-1">
      <BPAccordionTrigger>Is it accessible?</BPAccordionTrigger>
      <BPAccordionContent>
        Yes. It adheres to the WAI-ARIA design pattern.
      </BPAccordionContent>
    </BPAccordionItem>
    <BPAccordionItem value="item-2">
      <BPAccordionTrigger>Another?</BPAccordionTrigger>
      <BPAccordionContent>NA no information</BPAccordionContent>
    </BPAccordionItem>
  </BPAccordion>
)

export const Basic: Story = {
  render: ({ ...args }) => (
    <div className="flex justify-center w-[90vw]">
      <DefaultExample {...args} />
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col w-[90vw]">
      <div className="text-xl text-primary-600 text-center py-6">
        You can use xs, sm, md, lg, xl.
      </div>
      <div className="flex flex-col lg:flex-row gap-8 w-full justify-center items-center">
        <DefaultExample />

        <BPAccordion
          size="xl"
          className="w-[100%] lg:w-[500px]"
          defaultValue="item-1"
        >
          <BPAccordionItem className="AccordionItem" value="item-1">
            <BPAccordionTrigger>Is it accessible? (XL)</BPAccordionTrigger>
            <BPAccordionContent>
              Yes. It adheres to the WAI-ARIA design pattern.
            </BPAccordionContent>
          </BPAccordionItem>
          <BPAccordionItem className="AccordionItem" value="item-2">
            <BPAccordionTrigger>Another?</BPAccordionTrigger>
            <BPAccordionContent>NA no information</BPAccordionContent>
          </BPAccordionItem>
        </BPAccordion>
      </div>
    </div>
  ),
}

export const Types: Story = {
  render: () => (
    <div className="flex flex-col w-[100vw] h-[90vh] gap-16 lg:flex-row lg:w-[90vw] overflow-y-auto">
      <div className="w-[100%] lg:w-[50%] flex flex-col items-center">
        <div className="w-[90%] text-xl text-center text-primary-600 my-8 p-2 border">
          Normal
        </div>
        <div className="flex flex-col pb-6">
          {Object.keys(UI_TYPES_CONFIG).map((key, index) => (
            <div
              className="flex flex-col self-start justify-center items-center"
              key={index}
            >
              <div className="text-xl text-primary-600 my-8">{key}</div>
              <DefaultExample variant={key as UI_VARIANT} />
            </div>
          ))}
        </div>
      </div>
      <div className="w-[100%] lg:w-[50%] flex flex-col items-center">
        <div className="w-[90%] text-xl text-center text-primary-600 my-8 p-2 border">
          Outline
        </div>
        <div className="flex flex-col pb-6">
          {Object.keys(UI_TYPES_CONFIG).map((key, index) => (
            <div
              className="flex flex-col justify-center items-center"
              key={index}
            >
              <div className="text-xl text-primary-600 my-8">{key}</div>
              <DefaultExample variant={key as UI_VARIANT} outline />
            </div>
          ))}
          <div className="flex flex-col justify-center items-center">
            <div className="text-xl text-primary-600 my-8">Magic</div>
            <DefaultExample className="w-[100%] lg:w-[400px]" magic outline />
          </div>
        </div>
      </div>
    </div>
  ),
}
