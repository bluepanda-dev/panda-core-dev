import { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'
import { GiPanda } from 'react-icons/gi'
import BPUpload from '@components/molecules/BPUpload'
import { UI_TYPES_CONFIG, UI_TYPE } from '@core/types/ui-kit'

export default {
  title: 'Molecules/BPUpload',
  component: BPUpload,
  argTypes: {},
} as Meta<typeof BPUpload>

type Story = StoryObj<typeof BPUpload>

export const Basic: Story = {
  render: () => (
    <>
      <BPUpload />
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
    <div className="w-[100vw] h-[90vh] overflow-y-auto flex flex-col md:flex-row gap-16 px-6">
      <div className="flex flex-col gap-8 items-center w-full">
        <div className="text-xl text-primary-600">Normal</div>
        {Object.keys(UI_TYPES_CONFIG).map((key, index) => (
          <BPUpload key={index} type={key as UI_TYPE} />
        ))}
      </div>

      <div className="flex flex-col gap-8 items-center w-full">
        <div className="text-xl text-primary-600">Outlined</div>
        {Object.keys(UI_TYPES_CONFIG).map((key, index) => (
          <BPUpload outline key={index} type={key as UI_TYPE} />
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
