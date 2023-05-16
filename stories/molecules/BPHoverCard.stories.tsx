import { Meta, StoryObj } from '@storybook/react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import BPButton from '@components/atoms/BPButton'
import BPHoverCard from '@components/molecules/BPHoverCard'
import { UI_TYPES_CONFIG, UI_VARIANT } from '@core/types/ui-kit'
import { hideControl } from '@core/utils/storybook'

export default {
  title: 'Molecules/BPHoverCard',
  component: BPHoverCard,
  argTypes: {
    trigger: hideControl,
  },
} as Meta<typeof BPHoverCard>

type Story = StoryObj<typeof BPHoverCard>

const DefaultExample = ({ ...props }) => (
  <BPHoverCard
    trigger={
      <Link
        className="ImageTrigger"
        href="https://twitter.com/radix_ui"
        target="_blank"
        rel="noreferrer noopener"
      >
        <Image
          title="Radix UI"
          width={50}
          height={50}
          src="https://blue-panda.dev/_next/image?url=%2Flogo.webp&w=96&q=75"
          alt="Radix UI"
          className="w-16"
        />
      </Link>
    }
    className="w-[95vw] lg:w-[350px] md:[350px] whitespace-break-spaces"
    {...props}
  >
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 7,
      }}
    >
      <Image
        title="Radix UI"
        width={50}
        height={50}
        src="https://blue-panda.dev/logo.webp"
        alt="Radix UI"
        className="w-16"
      />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 15,
        }}
      >
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
  render: ({ ...props }) => <DefaultExample {...props} />,
}

export const Types: Story = {
  render: () => (
    <div className="w-full text-center gap-16 md:flex block overflow-y-auto h-[90vh] px-12 md:px-0">
      <div>
        <div className="text-xl text-primary-600 py-6">Normal</div>
        <div className="items-center max-h-[90vh] overflow-y-auto px-2 pb-6">
          {Object.keys(UI_TYPES_CONFIG).map((key, index) => (
            <DefaultExample
              trigger={
                <BPButton className="my-4" variant={key as UI_VARIANT}>
                  Hover me
                </BPButton>
              }
              key={index}
              variant={key as UI_VARIANT}
            />
          ))}
        </div>
      </div>

      <div>
        <div className="text-xl text-primary-600 py-6">Outlined</div>
        <div className="items-center max-h-[90vh] overflow-y-auto px-2 pb-6">
          {Object.keys(UI_TYPES_CONFIG).map((key, index) => (
            <DefaultExample
              trigger={
                <BPButton className="my-4" variant={key as UI_VARIANT} outline>
                  Hover me
                </BPButton>
              }
              key={index}
              variant={key as UI_VARIANT}
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
