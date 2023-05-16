import { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'
import BPUpload from '@components/molecules/BPUpload'
import { UI_TYPES_CONFIG, UI_VARIANT } from '@core/types/ui-kit'
import { hideControl } from '@core/utils/storybook'

export default {
  title: 'Molecules/BPUpload',
  component: BPUpload,
  argTypes: {
    accept: hideControl,
    onChange: hideControl,
  },
} as Meta<typeof BPUpload>

type Story = StoryObj<typeof BPUpload>

export const Basic: Story = {
  render: ({ ...args }: any) => (
    <>
      <BPUpload {...args} />
    </>
  ),
}

export const Multiple: Story = {
  render: () => (
    <>
      <BPUpload multiple />
    </>
  ),
}

export const Types: Story = {
  render: () => (
    <div className="w-[90vw] justify-center gap-16 md:flex block overflow-y-auto h-[90vh] px-6">
      <div className="flex flex-col gap-8 items-center">
        <div className="text-xl text-primary-600">Normal</div>
        {Object.keys(UI_TYPES_CONFIG).map((key, index) => (
          <BPUpload key={index} variant={key as UI_VARIANT} />
        ))}
      </div>

      <div className="flex flex-col gap-8 items-center">
        <div className="text-xl text-primary-600">Outlined</div>
        {Object.keys(UI_TYPES_CONFIG).map((key, index) => (
          <BPUpload outline key={index} variant={key as UI_VARIANT} />
        ))}

        <BPUpload magic outline />
      </div>
    </div>
  ),
}

const ExampleReadFile = () => {
  const [files, setFiles] = useState([])

  return (
    <>
      Reading files from outside: {files.length}
      <div>
        {files?.map((file: any, index) => (
          <p key={index}>{file.name}</p>
        ))}
      </div>
      <BPUpload multiple onChange={(value: any) => setFiles(value)} />
    </>
  )
}

export const ReadFile: Story = {
  render: () => <ExampleReadFile />,
}
