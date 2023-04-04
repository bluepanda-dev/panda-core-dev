import { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import BPButton from '@components/atoms/BPButton'
import BPHoverCard from '@components/molecules/BPHoverCard'
import { UI_TYPES_CONFIG, UI_TYPE } from '@core/types/ui-kit'

export default {
  title: 'Molecules/BPHoverCard',
  component: BPHoverCard,
  argTypes: {},
} as Meta<typeof BPHoverCard>

type Story = StoryObj<typeof BPHoverCard>

const DefaultExample = ({ ...props }) => (
  <BPHoverCard
    trigger={
      <a
        className="ImageTrigger"
        href="https://twitter.com/radix_ui"
        target="_blank"
        rel="noreferrer noopener"
      >
        <img
          src="https://blue-panda.dev/_next/image?url=%2Flogo.webp&w=96&q=75"
          alt="Radix UI"
          className="w-16"
        />
      </a>
    }
    {...props}
  >
    <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
      <img
        src="https://blue-panda.dev/_next/image?url=%2Flogo.webp&w=96&q=75"
        alt="Radix UI"
        className="w-16"
      />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
        <div>
          <div className="Text bold">Blue Panda</div>
          <div className="Text faded">@bluepanda_dev</div>
        </div>
        <div className="Text">
          Components, icons, colors, and templates for building high-quality,
          accessible UI. Free and open-source.
        </div>
        <div style={{ display: 'flex', gap: 15 }}>
          <div style={{ display: 'flex', gap: 5 }}>
            <div className="Text bold">0</div>{' '}
            <div className="Text faded">Following</div>
          </div>
          <div style={{ display: 'flex', gap: 5 }}>
            <div className="Text bold">2,900</div>{' '}
            <div className="Text faded">Followers</div>
          </div>
        </div>
      </div>
    </div>
  </BPHoverCard>
)

export const Basic: Story = {
  render: () => <DefaultExample />,
}

export const Types: Story = {
  render: () => (
    <div className="w-full flex gap-16">
      <div>
        <div className="text-xl text-primary-600 py-6">Normal</div>
        <div className="flex flex-col gap-8 items-center max-h-[90vh] overflow-y-auto px-2 pb-6">
          {Object.keys(UI_TYPES_CONFIG).map((key, index) => (
            <DefaultExample
              trigger={<BPButton type={key as UI_TYPE}>Hover me</BPButton>}
              key={index}
              type={key as UI_TYPE}
            />
          ))}
        </div>
      </div>

      <div>
        <div className="text-xl text-primary-600 py-6">Outlined</div>
        <div className="flex flex-col gap-8 items-center max-h-[90vh] overflow-y-auto px-2 pb-6">
          {Object.keys(UI_TYPES_CONFIG).map((key, index) => (
            <DefaultExample
              trigger={
                <BPButton type={key as UI_TYPE} outline>
                  Hover me
                </BPButton>
              }
              key={index}
              type={key as UI_TYPE}
              outline={true}
            />
          ))}
          <DefaultExample
            magic
            outline={true}
            title="Panel Magic"
            trigger={
              <BPButton magic outline>
                Hover me
              </BPButton>
            }
          />
        </div>
      </div>
    </div>
  ),
}
