import { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { FiAlertCircle, FiStar } from 'react-icons/fi'
import BPAccordion, {
  BPAccordionItem,
  AccordionContent,
  AccordionTrigger,
} from '@components/atoms/BPAccordion'
import { palette } from '@core/helpers/palette'
import { UI_TYPES_CONFIG, UI_TYPE } from '@core/types/ui-kit'

export default {
  title: 'Atoms/BPAccordion',
  component: BPAccordion,
  argTypes: {},
} as Meta<typeof BPAccordion>

type Story = StoryObj<typeof BPAccordion>

const DefaultExample = ({ ...props }) => (
  <BPAccordion className="w-[400px]" defaultValue="item-1" {...props}>
    <BPAccordionItem className="AccordionItem" value="item-1">
      <AccordionTrigger>Is it accessible?</AccordionTrigger>
      <AccordionContent>
        Yes. It adheres to the WAI-ARIA design pattern.
      </AccordionContent>
    </BPAccordionItem>
    <BPAccordionItem className="AccordionItem" value="item-2">
      <AccordionTrigger>Nother?</AccordionTrigger>
      <AccordionContent>NA no information</AccordionContent>
    </BPAccordionItem>
  </BPAccordion>
)

export const Basic: Story = {
  render: () => <DefaultExample />,
}

export const Sizes: Story = {
  render: () => (
    <>
      <div className="text-xl text-primary-600 text-center py-6">
        You can use xs, sm, md, lg, xl.
      </div>
      <div className="flex gap-8 w-full items-center">
        <DefaultExample />

        <BPAccordion size="xl" className="w-[500px]" defaultValue="item-1">
          <BPAccordionItem className="AccordionItem" value="item-1">
            <AccordionTrigger>Is it accessible? (XL)</AccordionTrigger>
            <AccordionContent>
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </BPAccordionItem>
          <BPAccordionItem className="AccordionItem" value="item-2">
            <AccordionTrigger>Nother?</AccordionTrigger>
            <AccordionContent>NA no information</AccordionContent>
          </BPAccordionItem>
        </BPAccordion>
      </div>
    </>
  ),
}

export const Types: Story = {
  render: () => (
    <div className="w-full flex gap-16">
      <div>
        <div className="text-xl text-primary-600 my-8">Normal</div>
        <div className="flex flex-col gap-8 items-center max-h-[90vh] overflow-y-auto px-2 pb-6">
          {Object.keys(UI_TYPES_CONFIG).map((key, index) => (
            <div key={index}>
              <div className="text-xl text-primary-600 my-8">{key}</div>
              <DefaultExample type={key as UI_TYPE} />
            </div>
          ))}
        </div>
      </div>
      <div>
        <div className="text-xl text-primary-600 my-8">Outline</div>
        <div className="flex flex-col gap-8 items-center max-h-[90vh] overflow-y-auto px-2 pb-6">
          {Object.keys(UI_TYPES_CONFIG).map((key, index) => (
            <div key={index}>
              <div className="text-xl text-primary-600 my-8">{key}</div>
              <DefaultExample type={key as UI_TYPE} outline />
            </div>
          ))}
          <div className="text-xl text-primary-600 my-8">Magic</div>
          <DefaultExample magic outline />
        </div>
      </div>
    </div>
  ),
}
